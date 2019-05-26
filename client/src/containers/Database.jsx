import React, { Component } from "react";
import StockIntro from "../components/Database/StockIntro"

//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock_code: "2330",
            history_data: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const stockNo = this.state.stock_code;
        fetch('http://localhost:5000/database/' + stockNo)
            .then(res => res.text())
            .then(res => this.setState({ history_data: res }))

        console.log(this.state.history_data)
    }

    stockCodeChange = (event) => {
        this.setState({ stock_code: event.target.value })
    }

    handleChangeStart = (date) => {
        this.setState({
            startDate: date
        });
        console.log(date);
    }

    handleChangeEnd = (date) => {
        this.setState({
            endDate: date
        });
    }


    //reminder props should be in capital case 
    render() {
        return (

            <React.Fragment>
                <div id="database" className="main">
                    <StockIntro StockCode={this.state.stock_code} />
                    <div id="querier">


                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label><b>股票代號</b></label><br />
                                <input type="text" name="stockNo" placeholder="2330" value={this.state.stock_code} onChange={this.stockCodeChange} /><br />
                                <input type="submit" value="送出" />
                            </div>
                        </form>
                    </div>



                </div>
            </React.Fragment >
        );
    }
}
/*

                                <div className="Database-date">
                                    <p style={{ margin: 0 }}><b>Start Date</b></p>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        selectsStart
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        dateFormat="yyyy/MM"
                                        showMonthYearPicker
                                        onChange={this.handleChangeStart}
                                        name="start"
                                    />
                                </div>

                                <div className="Database-date-right">
                                    <p style={{ margin: 0 }}><b>End Date</b></p>
                                    <DatePicker
                                        selected={this.state.endDate}
                                        selectsEnd
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        dateFormat="yyyy/MM"
                                        showMonthYearPicker
                                        onChange={this.handleChangeEnd}
                                        name="end"
                                    />

                                </div>
                                */

export default Database;