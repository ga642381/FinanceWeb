import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import FinanceWeb from "./containers/FinanceWeb"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <BrowserRouter>
        <FinanceWeb />
      </BrowserRouter >
    );
  }
}




export default App;
