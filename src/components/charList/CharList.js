import { useState, useEffect, useRef } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  const onCharListLoaded = (charList) => {
    setCharList(charList);
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    marvelService.getAllCharacters().then(onCharListLoaded).catch(onError);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected"),
    );

    itemRefs.current[id].classList.add("char__item_selected");
    // itemRefs.current[id].focus();
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      const { id, name, thumbnail } = item;

      return (
        <li
          className="char__item"
          ref={(el) => (itemRefs.current[i] = el)}
          key={id}
          onClick={() => {
            props.onCharSelected(id);
            focusOnItem(i);
          }}
        >
          <img src={thumbnail} alt={thumbnail} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  const items = renderItems(charList.slice(0, visibleCount));

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        onClick={() => setVisibleCount(visibleCount + 9)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
