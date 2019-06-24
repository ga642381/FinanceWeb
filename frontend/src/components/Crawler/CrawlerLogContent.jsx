import React, { Component } from "react";
import fetch from "node-fetch";

class CrawlerLogContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            log_list: [],
            update_time: ""
        }
    }

    getCrawledLog() {
        fetch("/api/crawledlog")
            .then(res => res.json())
            .then(res => this.setState({ log_list: res }))
            .catch(err => err);

    }

    getTime() {
        function checkTime(i) {
            if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
            return i;
        }

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        return (h + ":" + m + ":" + s)
    }

    componentDidMount() {
        //only enter once
        this.interval = setInterval(
            () => {
                this.getCrawledLog();
                const TIME = this.getTime()
                this.setState({ update_time: TIME })
            }, 2000
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <React.Fragment>
                <section id="crawled-log">

                    <ul id="crawled-log-list">
                        {this.state.log_list.map((e, i) => {
                            return <li className="white" key={i}>{e}</li>
                        })}
                    </ul>

                </section>

                <section id="crawled-footer">
                    <p>
                        <i>最後更新時間：{this.state.update_time}</i><br />
                        <i><small>(每 2 秒同步一次)</small></i>

                    </p>
                </section>
            </React.Fragment >
        );
    }
}

export default CrawlerLogContent;