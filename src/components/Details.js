import React, { useState } from "react";
import "../css/Details.css";
import { items$, updateItems } from "../store/cart-store";

function Details(props) {
  const [amount, updateAmount] = useState(1);
  const product = props.product.data.entries[0];

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
        <input
          type="number"
          name="quantity"
          min="1"
          value={amount}
          onChange={e => updateAmount(e.target.value)}
        ></input>
        <button
          className="Details__body__add"
          onClick={_ => {
            let item = {
              product,
              amount: parseInt(amount)
            };

            if (items$.value) {
              let copyCart = [...items$.value];
              copyCart.push(item);
              updateItems(copyCart);
            } else {
              let array = [];
              array.push(item);
              updateItems(array);
            }

            console.log(items$.value);
          }}
        >
          Add to cart
        </button>
      </main>
    </div>
  );
}

export default Details;
