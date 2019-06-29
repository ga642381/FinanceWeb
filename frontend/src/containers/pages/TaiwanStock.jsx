import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Input, Button } from 'reactstrap';
import axios from 'axios';

class TaiwanStock extends Component {
    state = {
        allStockData: [],
        allDates: [],
        searchIndex: 0,
        newStock: '',
        drawIndex: 0
    }

    componentWillMount = () => {
        const stateObj = JSON.parse(sessionStorage.getItem('stock'));
        const currentStock = stateObj.allStockData[0].Name + '-'+ stateObj.allStockData[0].Code;
        this.setState({
            allStockData: stateObj.allStockData,
            allDates: stateObj.allDates,
            newStock: currentStock
        });
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
                console.log(res)
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

    handleChangeSearch = e => {
        e.preventDefault();

        const selectBox = document.getElementById('select-box');
        const selectIndex  = selectBox.selectedIndex;

        this.setState({ searchIndex: selectIndex });
    }

    render() {
        return (
            <React.Fragment>
                <div className="main">
                    <Container>
                        <Row>
                            <Col>
                                <Input placeholder="重新查詢" bsSize="lg"  value={this.state.newStock} onChange={this.handleInputChange}/>
                                <Button onClick={this.handleReSearch}> 重新查詢 </Button>
                            </Col>
                        </Row>
                        <Input type="select" style={{ width: '200px' }} id="select-box" onChange={this.handleChangeSearch} >
                            <option>Change</option>
                            <option>ClosingPrice</option>
                            <option>Code</option>
                            <option>Date</option>
                            <option>HighestPrice</option>
                            <option>LowestPrice</option>
                            <option>Name</option>
                            <option>OpeningPrice</option>
                            <option>TradeValue</option>
                            <option>TradeVolume</option>
                            <option>Transcation</option>
                        </Input>
                    </Container>
                </div>
                <Button onClick={()=>console.log(this.state)}> TEST </Button>
            </React.Fragment >
        )
    }
}

export default TaiwanStock;