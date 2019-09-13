import React, { useState } from "react";
import "../css/Details.css";
import { items$, updateItems } from "../store/cart-store";

function Details(props) {
  const [amount, updateAmount] = useState(1);
  const product = props.product.data.entries[0];
  const addToCart = props.addToCart;

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
            //borde jag lägga alla produkter i ett objekt istället för array? För att hitta produkterna enklare
            //bara genom att ange key.
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
  );
}

export default Details;
