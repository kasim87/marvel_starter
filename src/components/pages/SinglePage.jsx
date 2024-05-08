import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import MarvelService from '../../service/MarvelService'
import AppBanner from '../appBanner/AppBanner'
import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/Spinner'

function SinglePage({Component, dataType}) {
    const {id} = useParams()
    
    const [data, setData] = useState(null)
    
    const {loading, error, clearError, getCharacter, getComic} = MarvelService()

    useEffect(() => {
        updateData()
    }, [id])

    function updateData() {
        clearError()

        // eslint-disable-next-line default-case
        switch (dataType) {
            case 'comics':
                getComic(id).then(onDataLoaded);
                break;
            case 'characters':
                getCharacter(id).then(onDataLoaded);
        }
    }

    function onDataLoaded(data) {
        setData(data)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !data) ? <Component data={data}/> : null

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage