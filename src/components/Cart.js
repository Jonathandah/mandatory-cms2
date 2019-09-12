import React, { useState, useEffect } from "react";
import "../css/Cart.css";
import { items$, updateItems } from "../store/cart-store";
import { Redirect } from "react-router-dom";

function listItem(item) {
  let product = item.product;

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

function postOrder(e, updateFinishOrder, info) {
  //api for posting order to cockpit
  e.preventDefault();
  updateFinishOrder(true);
  console.log(info.adress);
  console.log(info.name);
}

function Cart() {
  const [finishOrder, updateFinishOrder] = useState(false);
  const [name, updateName] = useState("");
  const [adress, updateAdress] = useState("");

  return (
    <>
      {finishOrder ? (
        <Redirect to="/checkout" />
      ) : (
        <div className="Cart">
          <ul className="Cart__list">
            {Object.keys(items$.value).map(key => listItem(items$.value[key]))}
          </ul>
          <form
            className="Cart__form"
            onSubmit={e => {
              postOrder(e, updateFinishOrder, { name, adress });
            }}
          >
            <p className="Cart__form__text">Name</p>
            <input
              className="Cart__form__input"
              typ="text"
              onChange={e => {
                updateName(e.target.value);
              }}
              value={name}
              required
            />
            <p className="Cart__form__text">Adress</p>
            <input
              className="Cart__form__input"
              typ="text"
              onChange={e => {
                updateAdress(e.target.value);
              }}
              value={adress}
              required
            />
            <button className="Cart__form__submit" type="submit">
              Confirm
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Cart;
