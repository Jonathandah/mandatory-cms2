import React, { useState, useEffect } from "react";
import "./css/App.css";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";
import Search from "./components/Search";
import Cart from "./components/Cart";
import { items$, updateItems } from "./store/cart-store";

function App() {
  const [product, updateProduct] = useState({});
  const [searchItem, updateSearchItem] = useState("");
  const [checkbox, updateCheckbox] = useState(false);
  const [cartAmount, updateCartAmount] = useState(0);

  function getProduct(id) {
    axios
      .get(
        `http://localhost:8081/api/collections/get/Products?token=71576f2b35b3422c108c0e508058a3&filter[_id]=${id}`
      )
      .then(response => {
        updateProduct(response);
      })
      .catch(error => console.log(error));
  }

  /*
  useEffect(() => {
    let number = 0;
    for (let _ in items$.value) {
      number++;
      updateCartAmount(number);
    }
  }, [updateItems]);
*/

  function addToCart() {
    let number = 0;
    for (let _ in items$.value) {
      number++;
      updateCartAmount(number);
    }
  }

  return (
    <Router>
      <div className="App">
        <header className="App__header">
          <Link to="/" className="App__header__title">
            Peachit
          </Link>
          <Link to="/cart">Cart</Link>
          <p>{cartAmount}</p>
          <Search
            updateCheckbox={updateCheckbox}
            updateSearchItem={updateSearchItem}
          />
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <Main
              searchItem={searchItem}
              getProduct={getProduct}
              checkbox={checkbox}
            />
          )}
        />
        {!product.data ? null : (
          <Route
            path="/details/:id"
            render={() => <Details product={product} addToCart={addToCart} />}
          />
        )}
        <Route path="/cart" component={Cart} />
      </div>
    </Router>
  );
}

export default App;
