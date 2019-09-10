import React from "react";

function Search(props) {
  const updateCheckbox = props.updateCheckbox;
  const updateSearchItem = props.updateSearchItem;
  return (
    <div className="Search">
      <input
        type="checkbox"
        onClick={e => updateCheckbox(e.target.checked)}
        className="Search__checkbox"
      />
      <p className="">Show stock</p>
      <input
        className="Search__input"
        onChange={e => updateSearchItem(e.target.value)}
      ></input>
    </div>
  );
}

export default Search;
