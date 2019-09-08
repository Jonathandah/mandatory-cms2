import React from "react";
import "./css/App.css";
import axios from "axios";
import { Router, BrowserRouter as Route } from "react-router-dom";
import Main from "./components/Main";

function App() {
  return (
    <Route>
      <div className="App">
        <header className="App__header"></header>
        <Route exact path="/" component={Main} />
      </div>
    </Route>
  );
}

export default App;
