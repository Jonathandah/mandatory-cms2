import React, { useState, useEffect } from "react";
import cockpit_API from "../constants/cockpit-api";
import Item from "./Item";
import "../css/Main.css";
import axios from "axios";
let limit = 8;

function Main(props) {
  const checkbox = props.checkbox;
  const searchItem = props.searchItem;

  const [products, updateProducts] = useState([]);
  const [page, updatePage] = useState(1);
  const [skip, updateSkip] = useState(0);
  const [total, updateTotal] = useState(0);

  function getProducts() {
    let regexStock = "";
    if (checkbox) regexStock = "^[1-9]d*";
    axios
      .post(cockpit_API.products + `&limit=${limit}&skip=${skip}`, {
        filter: {
          Name: { $regex: searchItem },
          Stock: { $regex: regexStock }
        }
      })
      .then(response => {
        console.log(response);
        updateTotal(response.data.total);
        updateProducts(response.data.entries);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getProducts();
  }, [searchItem, checkbox, page]);

  function pagination(e) {
    if (e.target.textContent === "next") {
      if (skip + limit < total) {
        updateSkip(skip + limit);
        updatePage(page + 1);
      }
    } else {
      if (skip >= total || skip > 0) {
        updateSkip(skip - limit);
        updatePage(page - 1);
      }
    }
  }

  return (
    <>
      <header className="Main__header">
        <iframe
          src="https://giphy.com/embed/Aps6kmwB51qF2"
          frameBorder="0"
          className="giphy-embed Main__header__frame"
          allowFullScreen
        ></iframe>
      </header>
      <div className="Main">
        <ul className="Main__list">
          {products.map(i => (
            <Item key={i._id} product={i} />
          ))}
        </ul>
        <div className="Main__pageContainer__button">
          <button
            className="Main__pageContainer__button"
            onClick={e => {
              pagination(e);
            }}
          >
            previous
          </button>
          <p className="Main__pageContainer__indicator">{page}</p>
          <button
            className="Main__pageContainer__button"
            onClick={e => {
              pagination(e);
            }}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default Main;
