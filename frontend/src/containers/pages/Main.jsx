import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Input, Button, Badge } from 'reactstrap';
import axios from 'axios';
import Highcharts, { chart } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Logo from '../../assets/logo/logo.png';

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
                text: "TAIEX "
            }
        },

        legend: {
            enabled: false
        },

        title: {
            text: stockName,
            align: "left",
            style: { "color": "#333333", "fontSize": "32px" }
        },

        series: [{
            data: data
        }],

        chart: {
            height: "400px"
        }
    }
    return options
}





class Main extends Component {
    state = {
        stock: '',
        allStockData: [],
        drawProperty: 'TAIEX',
        currentStock: '台灣加權指數',
        HighChartOptions: '',
        TAIEXprediction_value: '',
        TAIEXprediction_change: '',
        TAIEXprediction_color: 'success'
    }

    getTAIEXChart = () => {
        axios.get('/api/database', {
            params: {
                stock: "TAIEX"
            }
        })
            .then(res => {
                const allStockData = res.data;
                this.setState({
                    allStockData: allStockData
                }, () => this.DRAW())
            })
    }

    getTAIEXprediction = () => {
        axios.get('/api/TAIEXprediction')
            .then(res => {
                const TAIEXprediction = res.data;
                const TAIEXprediction_value = Number(TAIEXprediction["predict"]).toFixed(2);
                const TAIEXprediction_change = Number(TAIEXprediction["change"]).toFixed(2);
                let TAIEXprediction_color = 'success';
                if (TAIEXprediction_change > 0) {
                    TAIEXprediction_color = 'danger'
                }


                this.setState({
                    TAIEXprediction_value: TAIEXprediction_value,
                    TAIEXprediction_change: TAIEXprediction_change,
                    TAIEXprediction_color: TAIEXprediction_color
                })
            })
    }

    DRAW = () => {
        const HighChartOptions = getHighChartOptions(this.state.allStockData, this.state.currentStock, this.state.drawProperty)
        this.setState({
            HighChartOptions: HighChartOptions,
        });
    }


    componentWillMount = () => {
        const currentStock = JSON.parse(sessionStorage.getItem('stock'));
        if (currentStock) {
            this.setState({ stock: currentStock.stock });
        }
        this.getTAIEXprediction();
        this.getTAIEXChart();
    }

    handleChange = e => {
        this.setState({ stock: e.target.value })
    }

    fetchData = () => {
        axios.get('/api/database', {
            params: {
                stock: this.state.stock
            }
        })
            .then(res => {
                sessionStorage.clear();
                const allStockData = res.data;
                const allDates = res.data.map(e => e.Date);
                const stockInfo = {
                    allStockData,
                    allDates
                };

                sessionStorage.clear();
                sessionStorage.setItem('stock', JSON.stringify(stockInfo));
                window.location = '/taiwan-market';
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <React.Fragment>
                <div className="main">
                    <Container className="h-50">
                        <Row className="pt-5">
                            <Col sm="3" />
                            <Col className="mt-6 pt-5">
                                <img src={Logo} style={{ width: "100%" }}></img>
                                <div className="form-inline">
                                    <Input id="main_stock_input" placeholder="輸入股票名稱/代碼, 查看公司股價" bsSize="lg" onChange={this.handleChange} style={{ width: "85%" }} />
                                    <Button onClick={this.fetchData} size='lg'> 查詢 </Button>
                                </div>
                            </Col>

                            <Col sm="3" style={{ textAlign: "center" }}>
                                <h1 style={{ paddingTop: "84%" }}>
                                    預測走勢
                                    <Badge color={this.state.TAIEXprediction_color}>
                                        {this.state.TAIEXprediction_change}
                                    </Badge>
                                </h1>
                            </Col>
                        </Row>

                    </Container>
                    <HighchartsReact highcharts={Highcharts} options={this.state.HighChartOptions} style={{ width: "100%" }} />
                </div>

            </React.Fragment >
        );
    }
}


export default Main;