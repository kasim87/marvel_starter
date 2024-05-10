import './charList.scss';
import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import MarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

function setContent(process, Component, newItemLoading) {

    switch(process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('unexpect process state')
    }
}

function CharList({onCharSelected}) {
    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnd, setCharEnd] = useState(false)
    
    const {getAllCharacters, process, setProcess} = MarvelService();

    useEffect(() => {
        onRequest(offset, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function onRequest(offset, initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    function onCharListLoaded(newcharList) {
        setCharList([...charList, ...newcharList])
        setNewItemLoading(false)
        setOffset(offset + 9)
        setCharEnd(newcharList.length < 9 ? true : false)
    }

    let itemRefs = useRef([])

    function focusOnItem(id) {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    function renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition key={item.id} timeout={500} classNames='char__item'>
                    <li 
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[item.id] = el}
                        key={item.id}
                        onClick={() => {
                            onCharSelected(item.id)
                            focusOnItem(item.id)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                onCharSelected(item.id)
                                focusOnItem(item.id)
                            }
                        }}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });
        
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const element = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process])

    return (
        <div className="char__list">
            {element}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnd ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;