import React, { useEffect, useState, useCallback } from 'react'
import './styles/CreatePoemPage.scss'
import { useHttp } from '../hooks/http.hook'
import { PoemForm } from '../components/PoemForm'
import { useParams } from 'react-router-dom'

export const UpdatePoemPage = () => {

    const { request } = useHttp()
    const params = useParams()
    const [poemData, setPoemData] = useState(null)

    const getInitialPoemData = useCallback(async() => {
        const data = await request(`/api/poems/${params.id}`, "GET", null)
        setPoemData(data)
    }, [request])

    useEffect(() => {
        getInitialPoemData()
    }, [getInitialPoemData])

    const updatePoem = async(poem) => {

        console.log(poem)

        let genreFixed = null
        let themesFixed = null

        if(poem.genre){
            if(typeof(poem.genre) === "object"){
                genreFixed=poem.genre
            } else {
                genreFixed=poem.genre.toLocaleLowerCase().split(", ")
                genreFixed=genreFixed.map(el => el.trimStart())
            }
        }
        if(poem.themes){
            if(typeof(poem.themes) === "object"){
                themesFixed=poem.themes
            } else {
                themesFixed=poem.themes.toLocaleLowerCase().split(", ")
                themesFixed=themesFixed.map(el => el.trimStart())
            }
        }

        const result = await request(`/api/poems/update/${params.id}`, "POST", {
            title: poem.title, 
            date: poem.date, 
            genre: genreFixed,
            themes: themesFixed,
            text: poem.text,
            imageRef: poem.imageRef,
            note: poem.note
        })
        console.log(result)
    }

    return(
        <>
            <h1>Изменить стихотворение</h1>
            { poemData && <PoemForm initialData={poemData} sendForm={updatePoem} />}
        </>
    )
}