import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from "./Header";
import Footer from "./Footer";

import TaiwanStock from "./pages/TaiwanStock";
import GlobalMarket from "./pages/GlobalMarket";
import Crawler from "./pages/Crawler";
import CryptoMarket from "./pages/CryptoMarket";
import Database from "./pages/Database";
import Main from "./pages/Main";

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
                    <Route path="/" exact component={Main} />
                    <Route exact path="/taiwan-market" component={TaiwanStock} />
                    <Route exact path="/crawler" component={Crawler} />
                    <Route exact path="/crypto-market" component={CryptoMarket} />
                    <Route exact path="/global-market" component={GlobalMarket} />                    
                    <Route path="/database" component={Database} />


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