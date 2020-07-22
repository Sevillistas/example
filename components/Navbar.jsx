import React from 'react'
import './styles/Navbar.scss'
import { NavLink } from 'react-router-dom'

export const Navbar = ({ isAuth }) => {

    const NavbarLinksAuth = () => {
        return(
            <ul className="navbar-links">
                <li>
                    <NavLink className="navbar-link" 
                    to="/create">Добавить стих</NavLink>
                </li>
                <li>
                    <NavLink className="navbar-link" 
                    to="/poems">Стихотворения</NavLink>
                </li>
            </ul>
        )
    }

    const NavbarLinksNotAuth = () => {
        return (
        <ul className="navbar-links">
            <li>
                <NavLink className="navbar-link" 
                to="/">Главная</NavLink>
            </li>
            <li>
                <NavLink className="navbar-link" 
                to="/poems">Стихотворения</NavLink>
            </li>
            <li>
                <NavLink className="navbar-link" 
                to="/about">Об авторе</NavLink>
            </li>
        </ul>
        )
    }

    return(
        <nav>   
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="https://i.imgur.com/38vEUJ1.png" 
                    style={{width: 40+"px", height: 40+"px"}} alt=""
                    className="navbar-logo__image"/>
                    <NavLink to="/"
                    className="navbar-logo__text">
                        Poetry
                    </NavLink>
                    { isAuth ? <NavbarLinksAuth /> : <NavbarLinksNotAuth />}
                </div>
            </div>
        </nav>
    )
}