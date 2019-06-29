import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Input, Button, Badge } from 'reactstrap';

import Highcharts, { chart } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import axios from 'axios';

// like 108/06/27
// like 99/01/22
function WantedDate(ROCdate) {
    const ROCdateArr = ROCdate.split("/");
    const year = Number(ROCdateArr[0]) + 1911
    const month = ROCdateArr[1] - 1
    const day = ROCdateArr[2]
    return [year, month, day]
}



function getHighChartOptions(StockData, stockName, drawProperty) {
    const data = StockData.map(e => {
        const [year, month, day] = WantedDate(e["Date"]);
        return [Date.UTC(year, month, day), e[drawProperty]]
    })


    const options = {
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            }
        },

        yAxis: {
            title: {
                text: drawProperty
            }
        },

        legend: {
            enabled: false
        },

        title: {
            text: stockName
        },

        series: [{
            data: data
        }],

        chart: {
            height: "600px"
        }
    }
    return options
}




class TaiwanStock extends Component {
    state = {
        allStockData: [],
        allDates: [],
        drawProperty: 'ClosingPrice',
        currentStock: '',
        newStock: '',

        HighChartOptions: ''
    }


    DRAW = () => {
        const HighChartOptions = getHighChartOptions(this.state.allStockData, this.state.currentStock, this.state.drawProperty)
        this.setState({
            HighChartOptions: HighChartOptions,
        });
    }

    componentWillMount = () => {
        const stateObj = JSON.parse(sessionStorage.getItem('stock'));

        /* sessionStorage 有存東西 代表是從首頁搜尋之後跳轉過來 */
        if (stateObj) {
            const allStockData = stateObj.allStockData;
            const currentStock = stateObj.allStockData[0].Name + '-' + stateObj.allStockData[0].Code;
            console.log(allStockData);
            this.setState({
                allStockData: allStockData,
                currentStock: currentStock,
            }, () => this.DRAW())
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
        this.setState({ drawProperty: e.target.value }, () => this.DRAW());
    }

    render() {
        return (
            <React.Fragment>
                <div className="main">
                    <Container>
                        <Row>
                            <Col md="5">
                                <div className="form-inline">
                                    <Input placeholder="輸入股票名稱/代碼" bsSize="lg" value={this.state.newStock} onChange={this.handleInputChange} />
                                    <Button onClick={this.handleReSearch} size='lg'> 查詢 </Button>
                                </div>
                            </Col>

                            <Col>
                                <Input bsSize="lg" type="select" style={{ width: '200px' }} onChange={this.handleChangeProperty} >
                                    <option>ClosingPrice</option>
                                    <option>HighestPrice</option>
                                    <option>LowestPrice</option>
                                    <option>OpeningPrice</option>
                                    <option>TradeValue</option>
                                    <option>TradeVolume</option>
                                    <option>Transaction</option>
                                </Input>
                            </Col>

                            <Col>
                                <h1><Badge color="primary">{this.state.currentStock}</Badge></h1>
                            </Col>
                        </Row>
                    </Container>

                    <div style={{ width: "100%", marginTop: "50px", overflow: "hidden" }}>

                        <HighchartsReact highcharts={Highcharts} options={this.state.HighChartOptions} />
                    </div>
                </div>
                {/* <Button onClick={() => console.log(this.state)}> TEST </Button> */}
            </React.Fragment >
        )
    }
}

export default TaiwanStock;