import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  renderItems(arr) {
    const items = arr.map((item) => {
      const { id, name, thumbnail } = item;

      return (
        <li
          className="char__item char__item_selected"
          key={id}
          onClick={() => this.props.onCharSelected(id)}
        >
          <img src={thumbnail} alt={thumbnail} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
