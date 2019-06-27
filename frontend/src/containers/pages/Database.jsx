import React, { Component } from "react";
import { Table } from 'reactstrap';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Database extends Component {
    state = {
        stock: '',
        allData: [{
            Change: 2.5,
            ClosingPrice: 238,
            Code: "2330",
            Date: "108/06/03",
            HighestPrice: 238.5,
            LowestPrice: 232,
            Name: "台積電",
            OpeningPrice: 235.5,
            TradeValue: 8651389851,
            TradeVolume: 36687092,
            Transaction: 8857
        }]
    }

    handleSubmit = e => {
        e.preventDefault();
        // axios.post('/database', { stock: this.state.stock })
        //     .then(res => {
        //         if (res.data === 'not found')
        //             return this.setState({ allData: [] });

        //         console.log('response  ', res.data)
        //         this.setState({ allData: res.data });
        //     })
        //     .catch(error => console.log(error));
        fetch('/database/' + this.state.stock)
            .then(res => {

            })
            .catch(error => console.log(error))
    }

    handleChange = e => {
        this.setState({ stock: e.target.value });
    }

    //reminder props should be in capital case 
    render() {
        const tableStyle = this.state.allData.length ? {} : { display: 'none' };
        const stockInfo = this.state.allData.map(e => {
            return(
                <tr>
                    <td> {e.Change} </td>
                    <td> {e.ClosingPrice} </td>
                    <td> {e.Code} </td>
                    <td> {e.Date} </td>
                    <td> {e.HighestPrice} </td>
                    <td> {e.LowestPrice} </td>
                    <td> {e.Name} </td>
                    <td> {e.OpeningPrice} </td>
                    <td> {e.TradeValue} </td>
                    <td> {e.TradeVolume} </td>
                    <td> {e.Transaction} </td>
                </tr>
            )
        })
        return (
            <React.Fragment>
                <div id="database" className="main">
                    <Table style={tableStyle}>
                        <thead>
                            <tr>
                                <th> Change </th>
                                <th> ClosingPrice </th>
                                <th> Code </th>
                                <th> Date </th>
                                <th> HighestPrice </th>
                                <th> LowestPrice </th>
                                <th> Name </th>
                                <th> OpeningPrice </th>
                                <th> TradeValue </th>
                                <th> TradeVolume </th>
                                <th> Transaction </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockInfo}
                        </tbody>
                    </Table>
                    <div id="querier">
                        <form action='search'>
                            <div>
                                <label><b>股票代號</b></label><br />
                                <input type="text" name="stockNo" placeholder="輸入股票代碼 or 公司名稱" value={this.state.stock} onChange={this.handleChange} /><br />
                                <input type="submit" value="送出" />
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default Database;