import React, { useState, useEffect } from "react";
import "./css/App.css";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { items$ } from "./store/cart-store";

function App() {
  const [searchItem, updateSearchItem] = useState("");
  const [checkbox, updateCheckbox] = useState(false);
  const [cartAmount, updateCartAmount] = useState(0);
  const [finishOrder, updateFinishOrder] = useState(false);

  useEffect(() => {
    console.log("effect for items");
    items$.subscribe(cart => {
      console.log(cart);

      if (cart) {
        updateCartAmount(Object.keys(items$.value).length);
      } else {
        updateCartAmount(0);
        console.log("items undefined");
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App__header">
          <Link to="/" className="App__header__title">
            Peachit
          </Link>
          <span className="App__header__container">
            <Link to="/cart">
              <i className="material-icons">shopping_cart</i>
            </Link>

            <p className="App__header__cart">{cartAmount}</p>
          </span>
          <Search
            updateCheckbox={updateCheckbox}
            updateSearchItem={updateSearchItem}
          />
        </header>
        <Route
          exact
          path="/"
          render={() => <Main searchItem={searchItem} checkbox={checkbox} />}
        />

        <Route path="/details/:id" render={props => <Details {...props} />} />

        <Route
          path="/cart"
          render={() => (
            <Cart
              updateFinishOrder={updateFinishOrder}
              finishOrder={finishOrder}
            />
          )}
        />
        <Route path="/checkout" component={Checkout} />
      </div>
    </Router>
  );
}

export default App;
