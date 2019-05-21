
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <header id="Header">
                <div id="Navi-wrapper">
                    <ul className="navi-list">

                        <li className="navi-item"><NavLink to="global-market">全球市場</NavLink></li>
                        <li className="navi-item"><NavLink to="crypto-market">加密貨幣</NavLink></li>
                        <li className="navi-item"><NavLink to="crawler">爬蟲</NavLink></li>
                        <li className="navi-item"><NavLink to="database">資料庫</NavLink></li>

                    </ul>
                </div>
            </header>
        );
    }
}
//<li className="navi-item"><NavLink to="taiwan-market">台股</NavLink></li>
//<li className="navi-item"><NavLink to="tutorial">新手上路</NavLink></li>

export default Header;