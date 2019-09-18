import React, { useState } from "react";
import Rating from "react-rating";
import "../css/Review.css";
import cockpit__API from "../constants/cockpit-api";
import axios from "axios";

function Review(props) {
  const [number, updateNumber] = useState(0);
  const [title, updateTitle] = useState("");
  const [body, updateBody] = useState("");

  function postReview(e) {
    console.log(props.match.params.id);
    e.preventDefault();
    axios
      .post(cockpit__API.postReview, {
        data: {
          Title: title,
          Body: body,
          Rating: number,
          Product: {
            _id: props.product._id,
            link: "Products",
            display: props.product.Name
          }
        }
      })
      .then(response => {
        let copyReviews = [...props.reviews];
        copyReviews.push(response.data);
        props.updateReviews(copyReviews);
      });
  }

  return (
    <div className="Review">
      <form className="Review__form" onSubmit={e => postReview(e)}>
        <h2 className="Review__form__title">Add review</h2>
        <p className="Review__form__text">Title: </p>
        <input
          type="text"
          onChange={e => {
            updateTitle(e.target.value);
          }}
          value={title}
        ></input>
        <p className="Review__form__text">Rating: </p>
        <Rating onChange={e => updateNumber(e)} initialRating={number}></Rating>
        <p className="Review__form__text">Description: </p>
        <textarea
          className="Review__form__description"
          onChange={e => {
            updateBody(e.target.value);
          }}
          rows="30"
          value={body}
        ></textarea>

        <button className="Review__form__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Review;
