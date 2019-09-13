import React, { useState, useEffect } from "react";
import "../css/Cart.css";
import { items$, deleteItems } from "../store/cart-store";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { stringify } from "querystring";

function listItem(item, total, updateTotal) {
  let product = item.product;

  console.log(items$.value);

  console.log(item);

  total = parseFloat(product.Price) * item.amount;
  console.log(total);

  //updateTotal(total);

  return (
    <li className="Cart__list__item" key={product._id}>
      <img
        className="Cart__list__item__image"
        src={"http://localhost:8081/" + product.Image.path}
      />
      <h2 className="Cart__list__item__name">{product.Name}</h2>
      <p className="Cart__list__item__total">Price: {product.Price}</p>
      <p className="Cart__list__item__amount">Amount: {item.amount}</p>
      {/*delete?*/}
    </li>
  );
}

function postOrder(e, updateFinishOrder, info, Price) {
  //api for posting order to cockpit
  let List = [];
  Object.keys(items$.value).map(key => {
    let product = items$.value[key];
    List.push(product);
  });

  stringify(List);

  axios
    .post(
      "http://localhost:8081/api/collections/save/Orders?token=71576f2b35b3422c108c0e508058a3",
      {
        data: {
          Name: info.name,
          Adress: info.adress,
          Price,
          List
        }
      }
    )
    .then(response => {
      console.log(response);
      deleteItems();
    });

  e.preventDefault();
  updateFinishOrder(true);
}

function Cart() {
  const [finishOrder, updateFinishOrder] = useState(false);
  const [name, updateName] = useState("");
  const [adress, updateAdress] = useState("");
  const [total, updateTotal] = useState(0);
  const [itemArray, updateItemArray] = useState([]);

  return (
    <>
      {finishOrder ? (
        <Redirect to="/checkout" />
      ) : (
        <div className="Cart">
          <ul className="Cart__list">
            {Object.keys(items$.value).map(key =>
              listItem(items$.value[key], total, updateTotal)
            )}
          </ul>
          <div className="Cart__orderInfo">
            <p className="Cart__orderInfo__text">total{total}</p>
          </div>
          <form
            className="Cart__form"
            onSubmit={e => {
              postOrder(e, updateFinishOrder, { name, adress }, total);
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
