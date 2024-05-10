import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import MarvelService from '../../service/MarvelService'
import AppBanner from '../appBanner/AppBanner'
import setContent from '../../utils/setContent'

function SinglePage({Component, dataType}) {
    const {id} = useParams()
    
    const [data, setData] = useState(null)
    
    const {clearError, getCharacter, getComic, process, setProcess} = MarvelService()

    useEffect(() => {
        updateData()
    }, [id])

    function updateData() {
        clearError()

        switch (dataType) {
            case 'comics':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'))
                break;
            case 'characters':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'))
        }
    }

    function onDataLoaded(data) {
        setData(data)
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage