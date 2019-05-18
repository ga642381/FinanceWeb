
import React, { Component } from "react";
import { NavLink, Switch, Route } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // refer to https://codepen.io/scanfcode/pen/MEZPNd
    render() {
        return (

            <footer class="site-footer">
                <div class="container">
                    <div class="row">

                        <div class="col-md-2">
                            <h6>About</h6>
                        </div>

                        <div class="col-md-2">
                            <h6>Quick Links</h6>
                            <ul class="footer-links">
                                <li> <NavLink to="taiwan-stock">台股</NavLink></li>
                                <li ><NavLink to="crawler">爬蟲</NavLink></li>
                                <li ><NavLink to="database">資料庫</NavLink></li>
                                <li ><NavLink to="tutorial">新手上路</NavLink></li>
                            </ul>
                        </div>

                        <div class="col-md-3">
                            <h6>網站資料來源</h6>
                            <ul class="footer-links">
                                <li><a href="http://www.twse.com.tw/zh/">台灣證券交易所</a></li>
                                <li><a href="https://tw.tradingview.com/">TradingView</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;