import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../service/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

function setContent(process, Component, newItemLoading) {

    switch(process) {
        case 'waiting':
            return <Spinner/>
            break
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break
        case 'confirmed':
            return <Component/>
            break
        case 'error':
            return <ErrorMessage/>
            break
        default:
            throw new Error('unexpect process state')
    }
}

function ComicsList() {
    const [comicList, setComicList] = useState([])
    const [offset, setOffset] = useState(0)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicEnd, setComicEnd] = useState(false)
    
    const {getAllComics, process, setProcess} = MarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    function onRequest(offset, initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicListLoaded)
            .then(() => setProcess('confirmed'))
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

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicList), newItemLoading)}
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