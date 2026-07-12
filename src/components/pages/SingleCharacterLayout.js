import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./SingleCharacterLayout.scss";

const SingleCharacterLayout = () => {
  const { id } = useParams();
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter } = MarvelService();

  const onCharLoaded = (charData) => setChar(charData);

  const updateChar = () => {
    getCharacter(id)
      .then(onCharLoaded)
      .catch(() => {
        setChar(null);
      });
  };

  useEffect(() => {
    updateChar();
  }, [id]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="single-comic">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail } = char;

  return (
    <>
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </>
  );
};

export default SingleCharacterLayout;
