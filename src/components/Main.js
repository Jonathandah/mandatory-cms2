import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Main.css";
import axios from "axios";
const Token = "71576f2b35b3422c108c0e508058a3";

function items(product, getProduct) {
  return (
    <li key={product._id} className="Main__list__item">
      <img
        src={"http://localhost:8081/" + product.Image.path}
        allt={`this is a ${product.Name}`}
        className="Main__list__item__image"
      />
      <h3 className="Main__list__item__name">{product.Name}</h3>
      <p className="Main__list__item__price">Price: {product.Price}$</p>
      <p className="Main__list__item__stock">Stock: {product.Stock}</p>
      <Link
        to={`/details/${product.Name}`}
        onClick={() => getProduct(product._id)}
      >
        Go to..
      </Link>
    </li>
  );
}

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
      <ul className="Main__list">{products.map(i => items(i, getProduct))}</ul>
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
