import React, { Component } from "react";
import { Wave } from "react-animated-text";
import CrawlerLog from "../components/Crawler/CrawlerLog"



class Crawler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            log_list: [],
            update_time: ""
        }

    }

    componentDidMount() {
        const update_time = Date.now();
        this.setState({ update_time: update_time })
    }

    render() {

        return (
            <React.Fragment>
                <div className="main" id="crawler-main">
                    <div id="crawled-title">
                        <h1 className="white">
                            <Wave text="Last Crawled Data：" />
                        </h1>
                    </div>

                    <CrawlerLog />

                </div>
            </React.Fragment >
        );
    }


}


export default Crawler;