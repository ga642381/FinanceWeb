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

    componentWillMount = () => {
        const stock = document.URL.substring(document.URL.search('database') + 9);
        if (stock) {
            axios.get('/database', {
                params: {
                    stock
                }
            })
                .then(res => {
                    this.setState({ allData: res.data })
                })
                .catch(error => console.log(error))
            // axios.post('/database', { stock })
            //     .then(res => {
            //         if (res.data === 'not found') {
            //             return alert('no such stock')
            //         }

            //         this.setState({ allData: res.data })
            //     })
            //     .catch(error => console.log(error))
        }
    }

    handleSubmit = () => {
        window.location = '/database/' + this.state.stock
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
                        <div>
                            <div>
                                <label><b>股票代號</b></label><br />
                                <input type="text" name="stock" placeholder="輸入股票代碼 or 公司名稱" value={this.state.stock} onChange={this.handleChange} /><br />
                                <input type="submit" value="送出" onClick={this.handleSubmit} />
                            </div>
                        </div>
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