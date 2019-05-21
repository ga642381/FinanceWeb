import React, { Component } from "react";
import Ticker from "../components/GlobalMarket/Ticker"
import MarketOverview from "../components/GlobalMarket/MarketOverview"
import MarketData from "../components/GlobalMarket/MarketData"

class GlobalMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
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
