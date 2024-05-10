import './charInfo.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import MarvelService from '../../service/MarvelService';
import setContent from '../../utils/setContent';

function CharInfo(props) {
    const [char, setChar] = useState(null)

    const {getCharacter, clearError, process, setProcess} = MarvelService();

    function onCharLoaded(newchar) {
        setChar(newchar)
    }

    useEffect(() => {
        updateChar()
    }, [props.charId])

    function updateChar() {
        const {charId} = props

        if (!charId) return

        clearError()

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

function View({data}) {
    const {name, description, thumbnail, homepage, wiki, comics} = data

    let imgStyle = {'objectFit' : 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'}
    }
    
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'There is no comics for this character' : null}
                {
                    comics.splice(0, 10).map((comic, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${comic.resourceURI.split('/').pop()}`}
                                >
                                    {comic.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes ={
    charId: PropTypes.number
}

export default CharInfo;