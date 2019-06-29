
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // refer to https://codepen.io/scanfcode/pen/MEZPNd
    render() {
        return (

            <footer className="site-footer">
                <div className="container">
                    <div className="row">

                        <div className="col-md-2">
                            <h6>About</h6>
                            一個財經資料統整平台，結合網路爬蟲，將資料放到MongoDB內供研究使用。
                        </div>

                        <div className="col-md-2">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li> <NavLink to="taiwan-stock">台灣股市</NavLink></li>
                                <li><NavLink to="global-market">全球市場</NavLink></li>
                                <li><NavLink to="crypto-market">加密貨幣</NavLink></li>
                                <li ><NavLink to="database">資料庫</NavLink></li>
                                <li ><NavLink to="crawler">爬蟲後台</NavLink></li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <h6>網站資料來源</h6>
                            <ul className="footer-links">
                                <li><a href="http://www.twse.com.tw/zh/">台灣證券交易所</a></li>
                                <li><a href="https://tw.tradingview.com/">TradingView</a></li>
                                <li>Logo made with <a href="/en/" title="Free Online Logo Maker">DesignEvo</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;
