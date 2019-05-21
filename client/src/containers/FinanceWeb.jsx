import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';

import Header from "./Header";
import Footer from "./Footer";

import TaiwanStock from "./TaiwanStock";
import GlobalMarket from "./GlobalMarket";
import Crawler from "./Crawler";
import CryptoMarket from "./CryptoMarket";
import Database from "./Database";

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
                    <Route path="/" exact component={Crawler} />
                    <Route path="/taiwan-market" component={TaiwanStock} />
                    <Route path="/crypto-market" component={CryptoMarket} />
                    <Route path="/global-market" component={GlobalMarket} />
                    <Route path="/crawler" component={Crawler} />
                    <Route path="/database" component={Database} />
                </Switch>

                <Footer />
            </React.Fragment>
        );
    }
}



export default FinanceWeb;