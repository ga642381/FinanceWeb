import React, { Component } from "react";
import TickerHTML from "../../components/GlobalMarket/TickerHTML"
import MarketOverviewHTML from "../../components/GlobalMarket/MarketOverviewHTML"
import MarketDataHTML from "../../components/GlobalMarket/MarketDataHTML"

class GlobalMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const MarketOverview = document.createElement("script");
    MarketOverview.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    MarketOverview.async = true;
    MarketOverview.innerHTML = MarketOverviewHTML;

    const MarketData = document.createElement("script");
    MarketData.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    MarketData.async = true;
    MarketData.innerHTML = MarketDataHTML;

    const Ticker = document.createElement("script");
    Ticker.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    Ticker.async = true;
    Ticker.innerHTML = TickerHTML;


    const global_mkt_main_left = document.getElementById("global_mkt_main_left");
    const global_mkt_main_right = document.getElementById("global_mkt_main_right");
    const global_mkt_ticker = document.getElementById("global_mkt_ticker");
    global_mkt_ticker.appendChild(Ticker);
    global_mkt_main_left.appendChild(MarketOverview);
    global_mkt_main_right.appendChild(MarketData);

  }




  render() {
    return (
      <React.Fragment>
        <div id="global_mkt" className="main">
          <div id="global_mkt_ticker">

          </div>
          <div id="global_mkt_main_left">

          </div>

          <div id="global_mkt_main_right">
          </div>

        </div>
      </React.Fragment >


    );
  }
}

export default GlobalMarket;
