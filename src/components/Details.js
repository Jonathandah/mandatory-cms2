import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "../css/Details.css";
import { items$, updateItems } from "../store/cart-store";
import Review from "./Review";
import axios from "axios";
import cockpit__API from "../constants/cockpit-api";
import Rating from "react-rating";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Details(props) {
  const [amount, updateAmount] = useState(1);
  const [product, updateProduct] = useState(null);
  const [reviews, updateReviews] = useState([]);

  function addItem() {
    let item = {
      product,
      amount: parseInt(amount)
    };
    let copyCart = { ...items$.value };
    if (copyCart[product.Name]) {
      //om produkten finns
      copyCart[product.Name].amount += item.amount;
    } else {
      //om produkten inte finns
      copyCart[product.Name] = item;
    }
    updateItems(copyCart);
  }

  useEffect(() => {
    axios
      .get(cockpit__API.products + `&filter[Name]=${props.match.params.id}`)
      .then(response => {
        console.log(response);
        updateProduct(response.data.entries[0]);

        axios
          .get(
            cockpit__API.reviews +
              `&filter[Product].[display]=${props.match.params.id}`
          )
          .then(res => {
            updateReviews(res.data.entries);
          });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      {product ? (
        <div className="Details">
          <main className="Details__body">
            <Carousel>
              {product.Image.map(x => {
                return (
                  <div key={x.path}>
                    <img
                      className="Details__body__image"
                      src={"http://localhost:8081/" + x.path}
                    />
                  </div>
                );
              })}
            </Carousel>
            <div className="Details__body__box">
              <h2 className="Details__body__box__title">{product.Name}</h2>
              <span className="Details__body__box__container">
                <p className="Details__body__box__price">{product.Price}$</p>
                <p className="Details__body__box__stock">
                  Stock: {product.Stock}
                </p>
                <p className="Details__body__box__description">
                  {product.Description}
                </p>
              </span>
              <span className="Details__body__box__container--inputs">
                <input
                  className="Details__body__box__container__input"
                  type="number"
                  name="quantity"
                  min="1"
                  value={amount}
                  onChange={e => updateAmount(e.target.value)}
                ></input>
                <button
                  className="Details__body__box__container__add"
                  onClick={_ => addItem()}
                >
                  ADD TO CART
                </button>
              </span>
            </div>
          </main>
          <Review
            {...props}
            product={product}
            reviews={reviews}
            updateReviews={updateReviews}
          />
          <div className="Details__body__container">
            <ul className="Details__body__container__list">
              {reviews.length > 0
                ? reviews.map(review => {
                    return (
                      <li
                        className="Details__body__container__list__review"
                        key={review._id}
                      >
                        <h3 className="Details__body__container__list__review__title">
                          {review.Title}
                        </h3>
                        <Rating initialRating={review.Rating}></Rating>
                        <p className="Details__body__container__list__review__info">
                          {review.Body}
                        </p>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Details;
