import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import './styles/FilterForm.scss'
import { DropDownArrow } from './DropDownArrow'
import { useDispatch, connect } from 'react-redux'
import { filterPoems, getPoems } from '../redux/actions'

const FilterForm = () => {

    const dispatch = useDispatch()

    const [showSender, setShowSender] = useState(false)

    const [title, setTitle] = useState({
        value: "",
        isOpen: false,
    })
    const [date, setDate] = useState({
        value: {
            only: null,
            from: null,
            to: null
        },
        isOpen: false,
    })

    const [themes, setThemes] = useState({
        value: "",
        isOpen: false,
    })
    const [genre, setGenre] = useState({
        value: "",
        isOpen: false,
    })
    const [text, setText] = useState({
        value: "",
        isOpen: false,
    })

    let filterObj = { title, date, themes, genre, text } 

    let filterParams = [title.value, date.value.only, date.value.from,
    date.value.to, themes.value, genre.value, text.value]

    const clearInputs = () => {
        setTitle({...title, value: ""})
        setDate({...date, value: {
            only: "",
            from: "",
            to: ""
        }})
        setGenre({...genre, value: ""})
        setThemes({...themes, value: ""})
        setText({...text, value: ""})
    }

    useEffect(() => {
        let show = false
        filterParams.forEach(el => {
            if(el){
                setShowSender(true)
                show = true
            }
        })
        if(!show){
            setShowSender(false)
        }
    }, [filterParams])

    return (
        <div className="filterForm">
            <h2 className="filterForm__heading">Фильтры</h2>
            <div className="filterForm__item">
                <label htmlFor="title"
                onClick={ event => {
                    setTitle({
                        ...title, isOpen: !title.isOpen, value: ""
                    })
                }}>
                    Поиск по названию
                    <DropDownArrow isOpen={title.isOpen}/>
                </label>
                <CSSTransition
                    in={title.isOpen}
                    timeout={{
                        enter: 200,
                        exit: 200
                    }}
                    classNames={"input"}
                    mountOnEnter
                    unmountOnExit
                >
                    <input type="text" name="title" value={title.value}
                    id="title" placeholder="Введите название"
                    onChange={ event => { 
                        setTitle({
                            ...title, value: event.target.value
                        })
                        console.log(title)
                    } }/>
                </CSSTransition>
            </div>
            <div className="filterForm__item">
                <label htmlFor="date"
                onClick={ event => {
                    setDate({
                        ...date, isOpen: !date.isOpen, value: {
                            only: null,
                            from: null,
                            to: null
                        }
                    })
                }}>
                    Поиск по дате
                    <DropDownArrow isOpen={date.isOpen}/>
                </label>
                <CSSTransition
                    in={date.isOpen}
                    timeout={{
                        enter: 200,
                        exit: 200
                    }}
                    classNames={"input"}
                    mountOnEnter
                    unmountOnExit
                >
                    <div>
                        <input type="date" name="date" value={date.value.only}
                        disabled={ date.value.from || date.value.to }
                        id="date" placeholder="Введите дату"
                        min="1970-01-01" max="2090-12-31"
                        style={{width: "100%" }}
                        onChange={ event => {
                            setDate({ 
                                ...date,
                                value: {
                                    ...date.value,
                                    only: event.target.value
                                }
                            })
                            console.log(date.value.only)
                            }
                        }/> 
                        <div className="label" 
                        style={{ fontSize: 14, marginTop: 4, marginBottom: 4}}>
                            Между датами
                        </div>
                        <div style={{display: "flex"}}>
                            <input type="date" name="dateFrom" value={date.value.from}
                            id="dateFrom" placeholder="Введите дату"
                            disabled={ date.value.only }
                            style={{marginRight: 5}}
                            min="1970-01-01" max="2090-12-31"
                            onChange={ event => {
                                setDate({ 
                                    ...date,
                                    value: {
                                        ...date.value,
                                        from: event.target.value
                                    }
                                })
                                console.log(date.value.from)
                                }
                            }/>

                            <input type="date" name="dateTo" value={date.value.to}
                            id="dateTo" placeholder="Введите дату"
                            disabled={ date.value.only }
                            min="1970-01-01" max="2090-12-31"
                            onChange={ event => {
                                setDate({ 
                                    ...date,
                                    value: {
                                        ...date.value,
                                        to: event.target.value
                                    }
                                })
                                console.log(date.value.to)
                                }
                            }/>
                        </div>
                    </div>
                </CSSTransition>
            </div>
            <div className="filterForm__item">
                <label htmlFor="themes"
                onClick={ event => {
                    setThemes({
                        ...themes, isOpen: !themes.isOpen, value: ""
                    })
                }}>
                    Поиск по тематике
                    <DropDownArrow isOpen={themes.isOpen} />
                </label>
                <CSSTransition
                    in={themes.isOpen}
                    timeout={{
                        enter: 200,
                        exit: 200
                    }}
                    classNames={"input"}
                    mountOnEnter
                    unmountOnExit
                >
                    <input type="text" name="themes" value={themes.value}
                    id="themes" placeholder="Укажите темы"
                    onChange={ event => setThemes({...themes, value: event.target.value})}/>
                </CSSTransition>
            </div>
            <div className="filterForm__item">
                <label htmlFor="genre"
                onClick={ event => {
                    setGenre({
                        ...genre, isOpen: !genre.isOpen, value: ""
                    })
                }}>
                    Поиск по жанрам
                    <DropDownArrow isOpen={genre.isOpen} />
                </label>
                <CSSTransition
                    in={genre.isOpen}
                    timeout={{
                        enter: 200,
                        exit: 200
                    }}
                    classNames={"input"}
                    mountOnEnter
                    unmountOnExit
                >
                    <input type="text" name="genre"  value={genre.value}
                    id="genre" placeholder="Укажите жанры"
                    onChange={ event => setGenre({...genre, value: event.target.value})}/>
                </CSSTransition>
            </div>
            <div className="filterForm__item">
                <label htmlFor="text"
                onClick={ event => {
                    setText({
                        ...text, isOpen: !text.isOpen, value: ""
                    })
                }}>
                    Поиск по тексту стихотворения
                    <DropDownArrow isOpen={text.isOpen}/>
                </label>
                <CSSTransition
                    in={text.isOpen}
                    timeout={{
                        enter: 200,
                        exit: 200
                    }}
                    classNames={"input"}
                    mountOnEnter
                    unmountOnExit
                >
                    <input type="text" name="text" value={text.value}
                    id="text" placeholder="Укажите слово или словосочетание"
                    onChange={ event => setText({...text, value: event.target.value})}/>
                </CSSTransition>
            </div>
            { showSender && <div className="filterForm__button-container">
                <button id="btn-sender" onClick={ () => dispatch(filterPoems(filterObj)) }>Применить</button>
                <button id="btn-clear" onClick={ () => {
                    clearInputs()
                    dispatch(getPoems())
                }}>
                Очистить фильтр
                </button>
            </div> }
        </div>
    )
}

export default connect(null, null)(FilterForm)