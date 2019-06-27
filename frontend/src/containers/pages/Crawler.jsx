import React, { Component } from "react";
import CrawlerLogContent from "../../components/Crawler/CrawlerLogContent";
import CrawlerLogTitle from "../../components/Crawler/CrawlerLogTitle";


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
                    <div id="crawled-log-container">
                        <CrawlerLogTitle />
                        <CrawlerLogContent />
                    </div>
                </div>
            </React.Fragment >
        );
    }


}


export default Crawler;