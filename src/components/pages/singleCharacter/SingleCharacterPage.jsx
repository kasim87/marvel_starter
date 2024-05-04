import './SingleCharacterPage.scss'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import MarvelService from '../../../service/MarvelService'
import ErrorMessage from '../../errorMessage/errorMessage'
import AppBanner from '../../appBanner/AppBanner'
import Spinner from '../../spinner/Spinner'


function SingleCharacterPage() {
    const {charactersId} = useParams()
    const [char, setChar] = useState(null)

    const {loading, error, clearError, getCharacter} = MarvelService()

    useEffect(() => {
        
    }, [])

    function onCharLoaded(name) {
        setChar(name)
    }

    function updateChar() {
        clearError()

        getCharacter(charactersId).then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const results = !(loading || error || !char) ? <View name={char}/> : null

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {results}
        </>
    )


function View({char}) {
    const {name, thumbnail, description} = char

    return (
            <div className='single-character'>
                <img src='' alt='' className='single-character__img'/>
                <div className='single-character__info'>
                    <h2 className='single-character__name'>{}</h2>
                    <p className='single-character__descr'>{}</p>
                </div>
                <Link to='/' className='single-character__back'>
                    Back to all
                </Link>
            </div>
        )
    }
}

export default SingleCharacterPage