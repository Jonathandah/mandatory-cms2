import React from "react";
import "../css/Checkout.css";
import uuid from "uuid/v1";
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div className="Checkout">
      <div className="Checkout__container">
        <i className="material-icons green Checkout__container__icon">
          check_circle
        </i>
        <h2>Ordernumber: {uuid()}</h2>
        <p>Your order have been registerd</p>
        <Link to="/">Return home?</Link>
      </div>
    </div>
  );
}

export default Checkout;
