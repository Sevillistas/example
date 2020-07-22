import React,  { useState, useEffect } from 'react'

export const PoemForm = ({initialData, sendForm}) => {

    const [title, setTitle] = useState(initialData.title)
    const [date, setDate] = useState(initialData.date)
    const [genre, setGenre] = useState(initialData.genre)
    const [themes, setThemes] = useState(initialData.themes)
    const [text, setText] = useState(initialData.text)
    const [imageRef, setImageRef] = useState(initialData.imageRef)
    const [note, setNote] = useState(initialData.note)

    useEffect(()=>{
        console.log(initialData)
    }, [initialData])

    const poem = {
        title, date, genre, themes, text, imageRef, note
    }

    return(
        <div className="form">
        <div className="form__item">
            <label htmlFor="title">Название</label>
            <input type="text" name="title" id="title" required
            onChange={ event => { 
                setTitle(event.target.value)
                console.log(event.target.value)} 
            }
            defaultValue={ initialData.title } />
        </div>
        <div className="form__item">
            <label htmlFor="date">Дата создания</label>
            <input type="date" name="date" id="date"
            min="1970-01-01" max="2090-12-31"
            onChange={ event => {
                setDate(event.target.value)
                console.log(event.target.value)}
            }
            defaultValue={ initialData.date ? new Date(initialData.date).toISOString().substr(0, 10) : initialData.date }/>
        </div>
        <div className="form__item">
            <label htmlFor="themes">Темы</label>
            <input type="text" name="themes" id="themes" 
            title="Напишите примечание"
            onChange={ event => {
                setThemes(event.target.value)
                console.log(event.target.value)}
            }
            defaultValue={  initialData.themes ? initialData.themes.join(", ") : initialData.themes }/>
        </div> 
        <div className="form__item">
            <label htmlFor="genre">Жанры</label>
            <input type="text" name="genre" id="genre" 
            title="Укажите жанры через запятую" placeholder="пример: Лирика, воспоминания, ..."
            onChange={ event => {
                setGenre(event.target.value)
                console.log(event.target.value)}
            }
            defaultValue={  initialData.genre ? initialData.genre.join(", ") : initialData.genre }/>
        </div>
        <div className="form__item">
            <label htmlFor="text">Текст стихотворения</label>
            <textarea name="text" id="text" required
            onChange={ event => {
                setText(event.target.value)
                console.log(event.target.value)}
            }
            defaultValue = { initialData.text }>
            </textarea>
        </div>
        <div className="form__item">
            <label htmlFor="imageRef">Ссылка на изображение</label>
            <input type="text" name="imageRef" id="imageRef" 
            title="Вставьте ссылку на изображение"
            onChange={ event => {
                setImageRef(event.target.value)
                console.log(event.target.value)}
            }
            defaultValue={ initialData.imageRef }/>
        </div>
        <div className="form__item">
            <label htmlFor="note">Примечание</label>
            <input type="text" name="note" id="note" 
            title="Напишите примечание"
            onChange={ event => {
                setNote(event.target.value)
                console.log(event.target.value)}
            }
            defaultValue={ initialData.note }/>
        </div>  
        <div className="button-container">
            <button onClick={sendForm.bind(null, poem)}>Сохранить</button>
        </div>
    </div> 
    )
}