import React, { useState } from "react";
import "../css/Cart.css";
import { items$, updateItems } from "../store/cart-store";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cockpit__API from "../constants/cockpit-api";

function listItem(item) {
  let product = item.product;
  console.log(product);

  return (
    <li className="Cart__list__item" key={product._id}>
      <img
        className="Cart__list__item__image"
        src={"http://localhost:8081/" + product.Image[0].path}
      />
      <h2 className="Cart__list__item__name">{product.Name}</h2>
      <p className="Cart__list__item__total">Price: {product.Price}</p>
      <p className="Cart__list__item__amount">Amount: {item.amount}</p>
      {/*delete?*/}
    </li>
  );
}

function Cart(props) {
  let total = 0;

  const finishOrder = props.finishOrder;
  const updateFinishOrder = props.updateFinishOrder;
  const [name, updateName] = useState("");
  const [adress, updateAdress] = useState("");

  function postOrder() {
    //api for posting order to cockpit
    let List = [];
    Object.keys(items$.value).map(key => {
      let product = items$.value[key];
      List.push(product);
    });

    axios
      .post(cockpit__API.postOrder, {
        data: {
          Name: name,
          Adress: adress,
          Price: total,
          List: List.map(x => ({ value: x }))
        }
      })
      .then(response => {
        console.log(response);
        updateItems();
      });

    updateFinishOrder(true);
  }

  if (items$.value) {
    Object.keys(items$.value).map(
      key =>
        (total += items$.value[key].product.Price * items$.value[key].amount)
    );
  }

  return (
    <>
      {finishOrder ? (
        <Redirect to="/checkout" />
      ) : (
        <div className="Cart">
          <ul className="Cart__list">
            {items$.value
              ? Object.keys(items$.value).map(key =>
                  listItem(items$.value[key])
                )
              : null}
          </ul>
          <div className="stressigt">
            <div className="Cart__orderInfo">
              <p className="Cart__orderInfo__text">total: {total}$</p>
            </div>

            <form
              className="Cart__form"
              onSubmit={e => {
                e.preventDefault();
                if (items$.value) {
                  postOrder();
                }
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
        </div>
      )}
    </>
  );
}

export default Cart;
