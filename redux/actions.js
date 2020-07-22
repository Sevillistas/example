import { CREATE_POEM, GET_POEMS, DELETE_POEM, FILTER_POEMS, SORT_POEMS } from "./types"
import { request } from '../other/request'

export const createPoem = poem => {

    return async dispatch => {
        try {
            let genreFixed = poem.genre ? poem.genre.replace(/\s+/g, '').split(",") : poem.genre

            const result = await request("/api/poems/create", "POST", {
                title: poem.title, 
                date: poem.date, 
                genre: genreFixed,
                text: poem.text,
                imageRef: poem.imageRef
            })
    
            dispatch({type: CREATE_POEM, payload: result})

        } catch (error) {
            console.log(error)
        }
    }
}

export const updatePoem = (poem, id) => {

    return async dispatch => {
        try {

            let genreFixed = poem.genre ? poem.genre.replace(/\s+/g, '').split(",") : poem.genre

            const result = await request(`/api/poems/update/${id}`, "POST", {
                title: poem.title, 
                date: poem.date, 
                genre: genreFixed,
                text: poem.text,
                imageRef: poem.imageRef
            })
    
            dispatch({type: CREATE_POEM, payload: result})

        } catch (error) {
            console.log(error)
        }
    }
}

export const getPoems = () => {

    return async dispatch => {
        try {
            const data = await request("/api/poems/", "GET", null)
            dispatch({type: GET_POEMS, payload: data})
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const filterPoems = filterObj => {

    return async dispatch => {
        try {
            let genreArray = null
            let themesArray = null
            let datesBetween = null
            
            if (filterObj.date.value.from && filterObj.date.value.to){
                datesBetween = {
                    from: filterObj.date.value.from,
                    to: filterObj.date.value.to, 
                }
            }
            if(filterObj.genre.value){
                genreArray = filterObj.genre.value.toLowerCase().split(", ")
            }
            if(filterObj.themes.value){
                themesArray = filterObj.themes.value.toLowerCase().split(", ")
            }

            const filterParams = { 
                title: filterObj.title.value,
                date: filterObj.date.value.only,
                datesBetween: datesBetween,
                themes: themesArray,
                genre: genreArray,
                text: filterObj.text.value
            }
            
            const data = await request("/api/poems/filter", "POST", filterParams)
            dispatch({type: FILTER_POEMS, payload: data})
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const deletePoem = id => {

    return async dispatch => {
        try {
            const data = await request(`/api/poems/delete/${id}`, "POST", null)
            dispatch({type: DELETE_POEM, payload: id})
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const sortPoems = (sortParams, priority) => {
    return (dispatch, getState) => {
        
        const poems = getState().poems.poems;

        if(priority==="title"){
            let params = {
                date: sortParams.date, 
                title: sortParams.title
            }
            sortPoemsByKey(poems, params)
        }
        if(priority==="date"){
            let params = { 
                title: sortParams.title,
                date: sortParams.date
            }
            sortPoemsByKey(poems, params)
        }
        dispatch({type: SORT_POEMS, payload: poems})
    }
}

const sortDate = (type, a, b) => {
    let aDate = new Date(a.date).getTime()
    let bDate = new Date(b.date).getTime()
    if(type === "ASC"){
        if(aDate > bDate){
            return 1;
        }
        if (aDate < bDate){
            return -1;
        }
        return 0;
    }
    if(type === "DESC"){
        if(aDate > bDate){
            return -1;
        }
        if (aDate < bDate){
            return 1;
        }
        return 0;
    }
}

const sortPoemsByKey = (poems, sortParams) => {
    for(let key in sortParams){
        if(key === "title"){
            if(sortParams[key].type === "TITLE_ASC"){
                poems.sort((a, b) => a.title.localeCompare(b.title))
                console.log("Sorted TA", poems)
            }
            if(sortParams[key].type === "TITLE_DESC"){
                poems.sort((a, b) => b.title.localeCompare(a.title))
                console.log("Sorted TD", poems)
            }
        }
        if(key === "date"){
            if(sortParams[key].type === "DATE_ASC"){
                poems.sort(sortDate.bind(null, "ASC"))
                console.log("Sorted DA", poems)
            }
            if(sortParams[key].type === "DATE_DESC"){
                poems.sort(sortDate.bind(null, "DESC"))
                console.log("Sorted DD", poems)
            }
        }
    }
}