import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const { loading, error, getAllComics } = MarvelService();

  const onComicsListLoaded = (comicsList) => setComicsList(comicsList);

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    getAllComics()
      .then(onComicsListLoaded)
      .catch(() => {
        setComicsList([]);
      });
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      const { id, thumbnail, title, price } = item;

      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${id}`}>
            <img src={thumbnail} alt={title} className="comics__item-img" />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  };

  const items = renderItems(comicsList.slice(0, visibleCount));
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        onClick={() => setVisibleCount(visibleCount + 8)}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
