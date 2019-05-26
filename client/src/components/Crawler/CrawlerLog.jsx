import React, { Component } from "react";
import fetch from "node-fetch";

class CrawlerLog extends Component {
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
                <div id="crawled-log">
                    {this.state.log_list.map((e, i) => {
                        return <h4 className="white" key={i}>{e}</h4>
                    })}
                </div>

                <div id="crawled-footer">
                    <p>
                        <i>最後更新時間：{this.state.update_time}</i><br />
                        <i><small>(每 2 秒同步一次)</small></i>

                    </p>
                </div>
            </React.Fragment >
        );

    }
}

export default CrawlerLog;