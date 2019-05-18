import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { NavLink, Switch, Route } from 'react-router-dom';

import Header from "./Header";
import TaiwanStock from "./TaiwanStock"
import Crawler from "./Crawler"
import Footer from "./Footer";
import CryptoMarket from "./CryptoMarket"

class FinanceWeb extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <Header />

                {/*there should be "/" and component is in lower case*/}

                <Switch>
                    <Route path="/taiwan-market" component={TaiwanStock} />
                    <Route path="/crawler" component={Crawler} />
                    <Route path="/crypto-market" component={CryptoMarket} />
                </Switch>

                <Footer />
            </React.Fragment>
        );
    }
}

export default FinanceWeb;