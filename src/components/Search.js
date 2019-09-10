import React from "react";

function Search(props) {
  const updateSearchItem = props.updateSearchItem;
  return (
    <div className="Search">
      <input
        className="Search"
        onChange={e => updateSearchItem(e.target.value)}
      ></input>
    </div>
  );
}

export default Search;
