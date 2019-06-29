import React, { Component } from "react";
import axios from 'axios';
import { Table } from 'reactstrap';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Database extends Component {
    state = {
        stock: '',
        allData: []
    }


    handleSubmit = () => {
        const stock = this.state.stock;
        if (stock) {
            axios.get('/api/database', {
                params: {
                    stock: stock
                }
            })

                .then(res => {
                    if (res.data === 'not found') {
                        return alert('no such stock !!!')
                    }

                    this.setState({ allData: res.data })
                    console.log(this.state.allData)
                })
                .catch(error => console.log(error))
        }
    }

    handleChange = e => {
        this.setState({ stock: e.target.value });
    }

    //reminder props should be in capital case 
    render() {
        const tableStyle = this.state.allData.length ? {} : { display: 'none' };
        const stockInfo = this.state.allData.map(e => {
            return (
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
                    <div id="querier">
                        <label><b>股票代號</b></label><br />
                        <input type="text" name="stock" placeholder="輸入股票名稱/代碼" value={this.state.stock} onChange={this.handleChange} /><br />
                        <input type="submit" value="送出" onClick={this.handleSubmit} />
                    </div>

                    <div id="database-stockInfo">
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
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default Database;