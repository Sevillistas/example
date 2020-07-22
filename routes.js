import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage'
import { MainPage } from './pages/MainPage'
import { PoemPage } from './pages/PoemPage'
import PoemsPage from './pages/PoemsPage'
import { CreatePoemPage } from './pages/CreatePoemPage'
import { UpdatePoemPage } from './pages/UpdatePoemPage'

export const useRoutes = isAuthenticated => {

    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/create" exact>
                    <CreatePoemPage />
                </Route>
                <Route path="/update/:id">
                    <UpdatePoemPage />
                </Route>
                <Route path="/poems" exact>
                    <PoemsPage />
                </Route>
                <Route path="/poem/:id">
                    <PoemPage />
                </Route>
                <Redirect to='/create'/>
            </Switch>
        )
    } 
    else {
        return(
            <Switch>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/poems" exact>
                    <PoemsPage />
                </Route>
                <Route path="/poem/:id">
                    <PoemPage />
                </Route>
                <Route path="/about" exact>
                    <AboutPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
}