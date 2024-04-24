import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../service/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

function ComicsList() {
    const [comicList, setComicList] = useState([])
    const [offset, setOffset] = useState(0)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicEnd, setComicEnd] = useState(false)
    
    const {loading, error, getAllComics} = MarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    function onRequest(offset, initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicListLoaded)
    }

    function onComicListLoaded(newComicList) {
        setComicList([...comicList, ...newComicList])
        setNewItemLoading(false)
        setOffset(offset + 8)
        setComicEnd(newComicList.length < 8 ? true : false)
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicList)

    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null

    return (
        <div className="comics__list">
            {items}
            {spinner}
            {errorMessage}
            <button className="button button__main button__long"
                style={{'display': comicEnd ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;