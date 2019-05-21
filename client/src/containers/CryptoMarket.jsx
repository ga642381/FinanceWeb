import React, { Component } from "react";

class CryptoMarket extends Component {
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

                </div>

            </React.Fragment >
        )
            ;
    }
}

export default CryptoMarket;