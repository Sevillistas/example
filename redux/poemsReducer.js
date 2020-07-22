import { CREATE_POEM, GET_POEMS, DELETE_POEM, FILTER_POEMS, SORT_POEMS } from './types'

const initialState = { 
    poems: []
}

export const poemsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POEMS: {
            return { ...state, poems: [...action.payload] }
        }
        case FILTER_POEMS: {
            return { ...state, poems: action.payload ? [...action.payload] : state.poems}
        }
        case CREATE_POEM: {
            return { ...state, poems: [...state.poems, action.payload]}
        }
        case DELETE_POEM: {
            let idx = state.poems.findIndex(el => el._id === action.payload)
            const newArray = [
                ...state.poems.slice(0, idx),
                ...state.poems.slice(idx+1)
            ]
            return { ...state, poems: newArray }
            }
            //return { ...state, poems: state.poems.filter(poem => poem.id !== action.payload) }
            //return { ...state, poems: state.poems.splice(state.poems.findIndex(el => el._id === action.payload), 1) }
        case SORT_POEMS: {
            return { ...state, poems: [...action.payload] }
        }
        default: {
            return state
        }
    }
}