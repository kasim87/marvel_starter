import "./comicsList.scss";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";

const ComicsList = () => {
  return (
    <div className="comics__list">
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
