import React, { Component } from "react";
import { Wave } from "react-animated-text";
class CrawlerLogTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div id="crawled-title">
                <h2 className="white">
                    <Wave text="Last Crawled Data :" />
                </h2>
            </div>
        );
    }
}

export default CrawlerLogTitle;