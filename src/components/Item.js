import React from "react";
import { Link } from "react-router-dom";
import "../css/Item.css";

function Item(props) {
  const product = props.product;

  return (
    <li className="Item">
      <img
        src={"http://localhost:8081/" + product.Image.path}
        allt={`this is a ${product.Name}`}
        className="Item__image"
      />
      <h3 className="Item__name">{product.Name}</h3>
      <p className="Item__price">Price: {product.Price}$</p>
      <p className="Item__stock">Stock: {product.Stock}</p>
      <Link to={`/details/${product.Name}`}>Go to..</Link>
    </li>
  );
}

export default Item;
