import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Link } from "react-router-dom";
import "../css/Main.css";
import axios from "axios";
const Token = "71576f2b35b3422c108c0e508058a3";

function Main(props) {
  const checkbox = props.checkbox;
  const getProduct = props.getProduct;
  const searchItem = props.searchItem;
  const [products, updateProducts] = useState([]);
  const [page, updatePage] = useState(1);
  const [skip, updateSkip] = useState(0);
  const [total, updateTotal] = useState(0);

  function getProducts() {
    let regexStock = "";
    if (checkbox) regexStock = "^[1-9]d*";
    axios
      .post(
        `http://localhost:8081/api/collections/get/Products?limit=${5}&skip=${skip}&token=${Token}`,
        {
          filter: {
            Name: { $regex: searchItem },
            Stock: { $regex: regexStock }
          }
        }
      )
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
      if (skip + 5 < total) {
        updateSkip(skip + 5);
        updatePage(page + 1);
      }
    } else {
      if (skip >= total || skip > 0) {
        updateSkip(skip - 5);
        updatePage(page - 1);
      }
    }
  }

  return (
    <div className="Main">
      <p className="main__page">main side</p>
      <ul className="Main__list">
        {products.map(i => (
          <Item key={i._id} product={i} getProduct={getProduct} />
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
  );
}

export default Main;
