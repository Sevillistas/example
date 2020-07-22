import React from 'react'
import "./styles/Poem.scss"

const localStore = "userText"

export const Poem = ({poem}) => {

    let preparedDate = null
    if(!poem.date){
        preparedDate="Дата неизвестна"
    } else {
        preparedDate=new Date(poem.date).toLocaleDateString()
    }

    let preparedGenre = null
    preparedGenre = poem.genre ? poem.genre.join(", ") : preparedGenre
    //console.log(preparedGenre.join(", "))

    return (
        <div className="poem">
            <h2 className="poem__title">
                {poem.title}
            </h2>
            <div className="poem__image">
                <img src={poem.imageRef} alt="" style={{objectFit: "cover"}}/>
            </div>
            <div className="genre-date">
                <div className="poem__genre" style={{textTransform: "capitalize"}}>
                    { preparedGenre }
                </div>
                <div className="poem__date">{ preparedDate }</div>
            </div>
            <div className="poem__text" style={{whiteSpace: "pre-wrap"}}>
                { poem.text }
            </div>
        </div>
    )
}