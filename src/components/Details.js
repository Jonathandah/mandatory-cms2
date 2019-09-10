import React from "react";
import "../css/Details.css";

function Details(props) {
  const product = props.product.data.entries[0];
  console.log(product);

  return (
    <div className="Details">
      <p className="Details__page">Details</p>
      <main className="Details__body">
        <img
          className="Details__body__image"
          src={"http://localhost:8081/" + product.Image.path}
        />
        <h2 className="Details__body__title">{product.Name}</h2>
        <p className="Details__body__price">{product.Price}</p>
        <p className="Details__body__stock">Stock: {product.Stock}</p>
        <p className="Details__body__description">{product.Description}</p>
        <button className="Details__body__add">Add to cart</button>
      </main>
    </div>
  );
}

export default Details;
