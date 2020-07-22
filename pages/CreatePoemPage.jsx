import React from 'react'
import './styles/CreatePoemPage.scss'
import { useHttp } from '../hooks/http.hook'
import { PoemForm } from '../components/PoemForm'


export const CreatePoemPage = () => {

    const { request } = useHttp()

    const initialData = {
        title: "",
        date: null,
        genre: "",
        themes: "",
        text: "",
        imageRef: null,
        note: "",
    }

    const createPoem = async(poem) => {

        let genreFixed = null
        let themesFixed = null

        if(poem.genre){
            genreFixed=poem.genre.toLocaleLowerCase().split(", ")
            genreFixed=genreFixed.map(el => el.trimStart())
        }

        if(poem.themes){
            themesFixed=poem.themes.toLocaleLowerCase().split(", ")
            themesFixed=themesFixed.map(el => el.trimStart())
        }

        const result = await request("/api/poems/create", "POST", {
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
            <h1>Добавить стихотворение</h1>
            <PoemForm initialData sendForm={createPoem}/>
        </>
    )
}