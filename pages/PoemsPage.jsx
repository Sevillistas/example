import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import PoemsList from '../components/PoemsList'
import { AuthContext } from '../context/AuthContext'
import { connect, useDispatch } from 'react-redux'
import FilterForm from '../components/FilterForm'
import { SortForm } from '../components/SortForm'
import { getPoems } from '../redux/actions'
import './styles/PoemsPage.scss'

const PoemsPage = () => {

    const auth = useContext(AuthContext)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPoems())
    }, [])

    if(auth.isAuthenticated){
        return(
            <div className="poems-container">
                <div className="poems-container__left">
                    <h1>Все произведения</h1>
                    <h2>Я хочу питсы</h2>
                    <PoemsList />
                </div>
                <div className="poems-container__right">
                    <FilterForm />
                    <SortForm />
                </div>
            </div>
        )
    } else {
        return(
            <div className="poems-container">
                <h1>Все произведения</h1>
                <PoemsList />
                <FilterForm />
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.poems.poems)
    return {
        poems: state.poems.poems
    }
}

export default connect(mapStateToProps, null)(PoemsPage)
