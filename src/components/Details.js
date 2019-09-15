import React, { useState, useEffect } from "react";
import "../css/Details.css";
import { items$, updateItems } from "../store/cart-store";
import axios from "axios";

function Details(props) {
  const [amount, updateAmount] = useState(1);
  const [product, updateProduct] = useState(null);
  //props.product.data.entries[0];
  //console.log

  useEffect(() => {
    axios
      .get(
        /*
    cockpit__Api.products,
    { filter: { id } }
    */
        `http://localhost:8081/api/collections/get/Products?token=71576f2b35b3422c108c0e508058a3&filter[Name]=${props.match.params.id}`
      )
      .then(response => {
        console.log(response);
        updateProduct(response.data.entries[0]);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      {product ? (
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
                console.log("before", items$.value);
                if (items$.value) {
                  let copyCart = { ...items$.value };
                  if (copyCart[product.Name]) {
                    //om produkten finns
                    copyCart[product.Name].amount += item.amount;
                  } else {
                    //om produkten inte finns
                    copyCart[product.Name] = item;
                  }
                  updateItems(copyCart);
                  //addToCart(); // kan man använda useEffect isället?
                } else {
                  let obj = {};
                  obj[product.Name] = item;
                  updateItems(obj);
                  //addToCart();
                }

                console.log("after", items$.value);
              }}
            >
              Add to cart
            </button>
          </main>
        </div>
      ) : null}
    </>
  );
}

export default Details;
