import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { AuthContext } from '../context/AuthContext'
import { deletePoem } from '../redux/actions'
import './styles/PoemsList.scss'

const PoemsList = ({poems}) => {

    const { isAuthenticated } = useContext(AuthContext)

    const dispatch = useDispatch()

    const ManageLinks = ({poem}) => {
        return(
            <div className="poemList__manage">
                <div className="poemList__update">
                    <NavLink to={`/update/${poem._id}`}>Изменить</NavLink>
                </div>
                <div>
                    <button className="poemList__delete" onClick={ () => dispatch(deletePoem(poem._id)) }>Удалить</button>
                </div>
            </div>
        )
    }

    return(
        <div className="poemList-container">
        { poems.map(poem => {
            return (
                <div className="poemList" key={poem._id}>
                    <div className="poemList__title">
                        <NavLink to={`/poem/${poem._id}`}>{poem.title}</NavLink>
                    </div>
                    <div className="poemList__content">
                        <div className="poemList__date">{new Date(poem.date).toLocaleDateString()}</div>
                        <div className="poemList__image">
                            <img src={poem.imageRef} alt=""/>
                        </div>
                    </div>
                    { isAuthenticated && <ManageLinks poem={poem} /> }
                </div>
                )
            })
        }
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        poems: state.poems.poems
    }
}

export default connect(mapStateToProps, null)(PoemsList)