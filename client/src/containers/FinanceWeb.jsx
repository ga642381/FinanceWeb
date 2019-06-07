import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

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
                    <Route exact path="/taiwan-market" component={TaiwanStock} />
                    <Route exact path="/crypto-market" component={CryptoMarket} />
                    <Route exact path="/global-market" component={GlobalMarket} />
                    <Route exact path="/crawler" component={Crawler} />
                    <Route exact path="/database" component={Database} />


                    {/*if components above not rendered, render the component below
                    catch ALL*/}
                    <Route render={() => <Redirect to="/" />} />
                </Switch>

                <Footer />
            </React.Fragment>
        );
    }
}



export default FinanceWeb;