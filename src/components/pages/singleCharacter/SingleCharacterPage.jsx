import './SingleCharacterPage.scss'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import MarvelService from '../../../service/MarvelService'
import ErrorMessage from '../../errorMessage/errorMessage'
import AppBanner from '../../appBanner/AppBanner'
import Spinner from '../../spinner/Spinner'

function SingleCharacterPage() {
    const {characterId} = useParams()
    
    const [char, setChar] = useState(null)
    
    const {loading, error, clearError, getCharacter} = MarvelService()

    useEffect(() => {
        updateChar()
    }, [characterId])

    function onCharLoaded(name) {
        setChar(name)
    }

    function updateChar() {
        clearError()

        getCharacter(characterId).then(onCharLoaded)
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

function View({char}) {
    const {name, thumbnail, description} = char

    return (
            <div className='single-character'>
                <img src={thumbnail} alt={name} className='single-character__img'/>
                <div className='single-character__info'>
                    <h2 className='single-character__name'>{name}</h2>
                    <p className='single-character__descr'>{description}</p>
                </div>
                <Link to='/' className='single-character__back'>
                    Back to all
                </Link>
            </div>
        )
    }
}

export default SingleCharacterPage