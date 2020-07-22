import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortPoems } from '../redux/actions'

export const SortForm = () => {

    const dispatch = useDispatch()

    const sortPriorityList = [
        {name: "Название", value: "title" },
        {name: "Дата", value: "date" }
    ]

    const [titleSort, setTitleSort] = useState({
        type: ""
    })

    const [dateSort, setDateSort] = useState({
        type: ""
    })

    const sortParams = {
        title: titleSort,
        date: dateSort
    }

    const [priority, setPriority] = useState("title")

    return (
        <div className="sortForm">
            <h2 className="sortForm__heading">Сортировка</h2>
            <div className="sortForm__item">
                <h4 className="sortForm__item__heading">По названию</h4>
                <div className="sortForm__item__content">
                    <select name="sortTitle" id="sortTitle"
                    onChange={ e => {
                            setTitleSort({
                                ...titleSort,
                                type: e.target.value,
                                })
                            }
                        }>
                        <option value="">Не выбрано</option>
                        <option value="TITLE_ASC">По возрастанию</option>
                        <option value="TITLE_DESC">По убыванию</option>
                    </select>
                </div>
            </div>
            <div className="sortForm__item">
                <h4 className="sortForm__item__heading">По дате</h4>
                <div className="sortForm__item__content">
                    <select name="sortDate" id="sortDate"
                    onChange={ e => {
                            setDateSort({
                                ...dateSort,
                                type: e.target.value,
                            })
                        }
                    }>
                        <option value="">Не выбрано</option>
                        <option value="DATE_ASC">По возрастанию</option>
                        <option value="DATE_DESC">По убыванию</option>
                    </select>
                </div>
            </div>
            { titleSort.type && dateSort.type && 
                <div className="sortForm__item">
                <label htmlFor="prioritySort">Приоритет для сортировки</label>
                <select name="prioritySort" id="prioritySort"
                onChange={e => {
                            setPriority(e.target.value)
                    }
                    }>
                        {sortPriorityList.map(el => <option key={el.value} value={el.value}>{el.name}</option>)}
                </select>
                </div>
            }
            <div className="sortForm__button-container">
                <button onClick={() => dispatch(sortPoems(sortParams, priority))}>Сортировать</button>
            </div>
        </div>
    )
}