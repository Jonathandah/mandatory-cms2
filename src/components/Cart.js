import React, { useState, useEffect } from "react";
import "../css/Cart.css";
import { items$, updateItems } from "../store/cart-store";

function listItem(item) {
  let product = item.product;
  console.log(item);
  console.log("item amount", item.amount);
  console.log("price", product.Price);
  let total = item.amount * product.Price;
  return (
    <li className="Cart__list__item" key={product._id}>
      <img
        className="Cart__list__item__image"
        src={"http://localhost:8081/" + product.Image.path}
      />
      <h2 className="Cart__list__item__name">{product.Name}</h2>
      <p className="Cart__list__item__total">total: {total}</p>
      <p className="Cart__list__item__amount">Amount: {item.amount}</p>
      {/*delete?*/}
    </li>
  );
}
function Cart() {
  return (
    <div className="Cart">
      <ul className="Cart__list">
        {Object.keys(items$.value).map(key => listItem(items$.value[key]))}
      </ul>
    </div>
  );
}

export default Cart;
