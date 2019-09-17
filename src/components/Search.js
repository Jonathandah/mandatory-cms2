import React from "react";
import "../css/Search.css";

function Search(props) {
  const updateCheckbox = props.updateCheckbox;
  const updateSearchItem = props.updateSearchItem;
  return (
    <div className="Search">
      <input
        className="Search__input"
        onChange={e => updateSearchItem(e.target.value)}
        placeholder="Search..."
      ></input>
      <span className="Search__container">
        <p className="Search__container__text">Stock Only</p>
        <input
          type="checkbox"
          onClick={e => updateCheckbox(e.target.checked)}
          className="Search__container__checkbox"
        />
      </span>
    </div>
  );
}

export default Search;
