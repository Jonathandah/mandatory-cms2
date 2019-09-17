import React from "react";
import { Link } from "react-router-dom";
import "../css/Item.css";

function Item(props) {
  const product = props.product;

  return (
    <li className="Item">
      <Link to={`/details/${product.Name}`} className="Item__link">
        <img
          src={"http://localhost:8081/" + product.Image.path}
          allt={`this is a ${product.Name}`}
          className="Item__link__image"
        />
      </Link>
      <h3 className="Item__name">{product.Name}</h3>
      <p className="Item__price">Price: {product.Price}$</p>
      <p className="Item__stock">Stock: {product.Stock}</p>
    </li>
  );
}

export default Item;
