import React, { useState, useEffect } from "react";
import "./css/Main.css";
import Axios from "axios";

function Main() {
  const [products, updateProducts] = useState([]);

  useEffect(_ => {
    getProducts();
  }, []);

  function getProducts() {
    axios
      .get(
        `https://loclahost:8081/api/collections/get/Products?token=71576f2b35b3422c108c0e508058a3`
      )
      .then(response => {
        updateProducts(response.data.entries);
      })
      .catch(error => console.log(error));
  }

  function getProduct() {}

  return (
    <div className="Main">
      <ul className="Main__list">{}</ul>
    </div>
  );
}

export default Main;
