import React, { Component } from "react";
import axios from 'axios';
import { Table, Input, Button } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";

class Database extends Component {
    state = {
        stock: '',
        allData: [],
        logged_in: false
    }

    componentWillMount = () => {
        if (!this.state.logged_in) {
            axios.get('/api/userdata')
                .then(res => {
                    if (Object.keys(res.data).length === 0) return;

                    this.setState({ logged_in: true })
                })
                .catch(error => console.log(error))
        }
    }

    handleSubmit = () => {
        if (!this.state.logged_in) {
            return alert('Log in first !!!');
        }

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
                    <td> {e.Date} </td>
                    <td> {e.Name} </td>
                    <td> {e.Code} </td>
                    <td> {e.HighestPrice} </td>
                    <td> {e.LowestPrice} </td>
                    <td> {e.OpeningPrice} </td>
                    <td> {e.ClosingPrice} </td>
                    <td> {e.Change} </td>
                    <td> {e.TradeValue} </td>
                    <td> {e.TradeVolume} </td>
                    <td> {e.Transaction} </td>
                </tr>
            )
        })
        return (
            <React.Fragment>
                <div id="database" className="main">
                    <div id="querier" className="form-inline">
                        <Input type="text" name="stock" placeholder="輸入股票代碼 or 公司名稱" bsSize="lg" value={this.state.stock} onChange={this.handleChange} /><br />
                        <Button type="submit" size="lg" onClick={this.handleSubmit} >送出 </Button>
                    </div>
                    <div id="database-container">
                        <div id="database-stockInfo">
                            <Table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th> Date </th>
                                        <th> Name </th>
                                        <th> Code </th>
                                        <th> HighestPrice </th>
                                        <th> LowestPrice </th>
                                        <th> OpeningPrice </th>
                                        <th> ClosingPrice </th>
                                        <th> Change </th>
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
                </div>
            </React.Fragment >
        );
    }
}

export default Database;