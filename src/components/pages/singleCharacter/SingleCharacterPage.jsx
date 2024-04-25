// import './SingleCharacterPages.scss'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Spinner from '../../spinner/Spinner'
import ErrorMessage from '../../errorMessage/errorMessage'
import MarvelService from '../../../service/MarvelService'
import AppBanner from '../../appBanner/AppBanner'

function SingleCharacterPages() {
    const {characterId} = useParams()
    const [char, setChar] = useState(null)

    const {loading, error, getCharactersComics, clearError} = MarvelService()

    useEffect(() => {
        onRequest()
    }, [characterId])

    function onRequest() {
        clearError()
        getCharactersComics(characterId)
            .then(onCharLoaded)
    }

    function onCharLoaded(newChar) {
        setChar(newChar)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

function View({char}) {
    const {title, description, pageCount, thumbnail, prices} = char

    return (
        <div className="single-character">
        <img src={thumbnail} alt={title} className="single-character__img"/>
        <div className="single-character__info">
            <h2 className="single-character__name">{title}</h2>
            <p className="single-character__descr">{description}</p>
            <p className="single-character__descr">{pageCount}</p>
            {/* <p className="single-character__descr">language: {language}</p> */}
            <div className="single-character__price">{prices}</div>
        </div>
        <Link to='/' className="single-comic__back">Back to all</Link>
    </div>
    )
}

export default SingleCharacterPages