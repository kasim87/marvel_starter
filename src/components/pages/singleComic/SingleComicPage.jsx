import './SingleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorMessage from '../../errorMessage/errorMessage';
import Spinner from '../../spinner/Spinner';
import AppBanner from '../../appBanner/AppBanner';

import MarvelService from '../../../service/MarvelService';

function SingleComicPage() {
    const {comicId} = useParams()

    const [comic, setComic] = useState(null)
    
    const {loading, error, getComic, clearError} = MarvelService()

    useEffect(() => {
        onRequest()
    }, [comicId])

    function onRequest() {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }

    function onComicLoaded(newComic) {
        setComic(newComic)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

function View({comic}) {
    const {title, description, pageCount, thumbnail, language, prices} = comic
    
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">language: {language}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;