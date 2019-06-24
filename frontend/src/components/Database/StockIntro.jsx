import React, { Component } from "react";


class StockIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {}


    }

    componentDidMount() {
        const stock_code = this.props.StockCode;

        const StockIntro = document.createElement("script");
        StockIntro.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
        StockIntro.async = true;
        StockIntro.innerHTML = `  {
            "symbol": "TWSE:${stock_code}",
            "width": "100%",
            "locale": "zh_TW",
            "colorTheme": "light",
            "isTransparent": false
          }`
        const stock_intro = document.getElementById("stock-intro");
        stock_intro.appendChild(StockIntro);

    }


    render() {
        return (
            <div id="stock-intro">
            </div >
        );
    }
}

export default StockIntro;
