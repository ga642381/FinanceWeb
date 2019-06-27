import React, { Component } from "react";
import { NavLink } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { logged_in: false, user_name: '' }
    }

    componentWillMount() {
        fetch('/api/userdata')
            .then(res => res.json())
            .then(res => {
                if (Object.keys(res).length === 0) {
                    this.setState({ logged_in: false })
                }

                else {
                    this.setState({
                        logged_in: true,
                        user_name: res
                    })
                }
            })
    }


    render() {
        if (!this.state.logged_in) {
            return (
                <header id="Header">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <ul className="navbar-nav">
                            <li className="navi-item"><NavLink to="main">首頁</NavLink></li>
                            <li className="navi-item"><NavLink to="crawler">爬蟲後台</NavLink></li>
                            <li className="navi-item"><NavLink to="taiwan-market">台灣股市</NavLink></li>
                            <li className="navi-item"><NavLink to="global-market">全球市場</NavLink></li>
                            <li className="navi-item"><NavLink to="crypto-market">加密貨幣</NavLink></li>
                            
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="navi-item"><a href="/auth/login">登入</a></li>
                            <li className="navi-item"><a href="/auth/register">註冊</a></li>
                        </ul>
                    </nav>
                </header>
            );
        }

        else {
            return (
                <header id="Header">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <ul className="navbar-nav">
                            <li className="navi-item"><NavLink to="main">首頁</NavLink></li>
                            <li className="navi-item"><NavLink to="crawler">爬蟲後台</NavLink></li>
                            <li className="navi-item"><NavLink to="taiwan-market">台灣股市</NavLink></li>
                            <li className="navi-item"><NavLink to="global-market">全球市場</NavLink></li>
                            <li className="navi-item"><NavLink to="crypto-market">加密貨幣</NavLink></li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="navi-item"><span>{`Welcome: ${this.state.user_name}`}</span></li>
                            <li className="navi-item"><a href="/auth/logout">登出</a></li>

                        </ul>
                    </nav>
                </header >
            );
        }
    }
}

export default Header;