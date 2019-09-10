import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Main.css";
import axios from "axios";

function Main(props) {
  const getProduct = props.getProduct;
  const [products, updateProducts] = useState([]);
  let test = 0;

  useEffect(() => {
    getProducts();
    console.log("hej");
  }, []);

  function items(product) {
    console.log(product);
    return (
      <li key={product._id} className="Main__list__item">
        <img
          src={"https://localhost8081/" + product.Image.path}
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

  function getProducts() {
    axios
      .get(
        `http://localhost:8081/api/collections/get/Products?token=71576f2b35b3422c108c0e508058a3`
      )
      .then(response => {
        console.log(response);
        updateProducts(response.data.entries);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="Main">
      <p>main side</p>
      <ul className="Main__list">{products.map(i => items(i))}</ul>
    </div>
  );
}

export default Main;
