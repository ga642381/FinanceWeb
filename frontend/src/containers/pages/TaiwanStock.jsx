import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Input, Button, Badge } from 'reactstrap';
import axios from 'axios';

class TaiwanStock extends Component {
    state = {
        allStockData: [],
        allDates: [],
        searchProperty: 'Change',
        drawProperty: '',
        currentStock: '',
        newStock: ''
    }

    componentWillMount = () => {
        const stateObj = JSON.parse(sessionStorage.getItem('stock'));

        /* sessionStorage 有存東西 代表是從首頁搜尋之後跳轉過來 */
        if (stateObj) {
            const currentStock = stateObj.allStockData[0].Name + '-' + stateObj.allStockData[0].Code;
            this.setState({
                allStockData: stateObj.allStockData,
                allDates: stateObj.allDates,
                currentStock
            });
        }

        /* sessionStorage 是空的 代表是直接點擊台灣股市跳轉過來 */
        else {
            axios.get('/api/database', {
                params: {
                    stock: 2330
                }
            })
                .then(res => {
                    const allStockData = res.data;
                    const allDates = res.data.map(e => e.Date);
                    const stockInfo = {
                        allStockData,
                        allDates
                    }

                    sessionStorage.setItem('stock', JSON.stringify(stockInfo));
                    this.setState({
                        allStockData,
                        allDates,
                        currentStock: '台積電-2330'
                    })
                })
                .catch(error => console.log(error))
        }
    }

    handleInputChange = e => {
        this.setState({ newStock: e.target.value })
    }

    handleReSearch = () => {
        axios.get('/api/database', {
            params: {
                stock: this.state.newStock
            }
        })
            .then(res => {
                if (res.data === 'not found') {
                    alert('no such stock !!!');
                    return window.location.reload();
                }

                sessionStorage.clear();
                const allStockData = res.data;
                const allDates = res.data.map(e => e.Date);
                const stockInfo = {
                    allStockData,
                    allDates
                }

                sessionStorage.setItem('stock', JSON.stringify(stockInfo));
                this.setState({
                    allStockData,
                    allDates,
                });
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    handleChangeProperty = e => {
        e.preventDefault();
        
        this.setState({ searchProperty: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <div className="main">
                    <Container>
                        <h1><Badge> {this.state.currentStock} </Badge></h1>
                        <Row>
                            <Col>
                                <Input placeholder="重新查詢" bsSize="lg" value={this.state.newStock} onChange={this.handleInputChange} />
                                <Button onClick={this.handleReSearch}> 重新查詢 </Button>
                            </Col>
                        </Row>
                        <Input type="select" style={{ width: '200px' }} onChange={this.handleChangeProperty} >
                            <option>Change</option>
                            <option>ClosingPrice</option>
                            <option>HighestPrice</option>
                            <option>LowestPrice</option>
                            <option>OpeningPrice</option>
                            <option>TradeValue</option>
                            <option>TradeVolume</option>
                            <option>Transcation</option>
                        </Input>
                    </Container>
                </div>
                <Button onClick={() => console.log(this.state)}> TEST </Button>
            </React.Fragment >
        )
    }
}

export default TaiwanStock;