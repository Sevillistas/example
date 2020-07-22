import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Poem } from '../components/Poem'
import { useHttp } from '../hooks/http.hook'

export const PoemPage = () => {

    const params = useParams()
    const [poem, setPoem] = useState(null)

    const { request } = useHttp()

    const getPoem = useCallback(async() => {
        const data = await request(`/api/poems/${params.id}`, "GET", null)
        setPoem(data)
        console.log(data)
    }, [request, params.id])

    useEffect(() => {
        getPoem()
    }, [getPoem])

    return(
        <>
        { poem && <Poem poem={poem} /> }
        </>
    )
}