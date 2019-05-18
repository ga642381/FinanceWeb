import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { NavLink, Switch, Route } from 'react-router-dom';

import FinanceWeb from "./containers/FinanceWeb"


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <FinanceWeb />
      </BrowserRouter >
    );
  }
}

export default App;
