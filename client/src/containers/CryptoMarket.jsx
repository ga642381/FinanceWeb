import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { NavLink, Switch, Route } from 'react-router-dom';

class TaiwanStock extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
        script.async = true;
        script.innerHTML = `{
            "width": "100%",
            "height": "100%",
            "defaultColumn": "overview",
            "screener_type": "crypto_mkt",
            "displayCurrency": "USD",
            "colorTheme": "dark",
            "transparency": false,
            "locale": "zh_TW"
        }`

        const crypto_mkt = document.getElementById("crypto_mkt");
        crypto_mkt.appendChild(script);
    }


    render() {
        return (
            <React.Fragment>
                <div id="crypto_mkt" className="main">
                    <div className="tradingview-widget-container__widget"></div>
                    <div className="tradingview-widget-copyright"><a href="https://tw.tradingview.com/markets/cryptocurrencies/prices-all/" rel="noopener" target="_blank">
                        <span className="blue-text">加密貨幣市場</span></a>由TradingView提供</div>


                </div>

            </React.Fragment >
        )
            ;
    }
}

export default TaiwanStock;