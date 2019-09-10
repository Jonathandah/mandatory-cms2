import React, { useState } from "react";
import "./css/App.css";
import axios from "axios";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";
import Search from "./components/Search";

function App() {
  const [product, updateProduct] = useState({});
  const [searchItem, updateSearchItem] = useState("");

  function getProduct(id) {
    axios
      .get(
        `http://localhost:8081/api/collections/get/Products?token=71576f2b35b3422c108c0e508058a3&filter[_id]=${id}`
      )
      .then(response => {
        console.log(response);
        updateProduct(response);
      })
      .catch(error => console.log(error));
  }

  return (
    <Router>
      <div className="App">
        <header className="App__header">
          <h1 className="App__header__title">Peachit</h1>
          <Search updateSearchItem={updateSearchItem} />
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <Main searchItem={searchItem} getProduct={getProduct} />
          )}
        />
        {!product.data ? null : (
          <Route
            path="/details/:id"
            render={() => <Details product={product} />}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
