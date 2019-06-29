import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Input, Button } from 'reactstrap';
import axios from 'axios';

import Logo from '../../assets/logo/logo.png';

class Main extends Component {
    state = {
        stock: ''
    }

    componentWillMount = () => {
        const currentStock = JSON.parse(sessionStorage.getItem('stock'));
        if (currentStock) {
            this.setState({ stock: currentStock.stock });
        }
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
                    <Container className="h-100">
                        <Row className="h-100">
                            <Col md="3" />
                            <Col className="mt-5">
                                <img src={Logo} style={{ width: "100%" }}></img>
                                <div>
                                    <Input id="main_stock_input" placeholder="股票名稱/代碼" bsSize="lg" onChange={this.handleChange} />
                                    <Button onClick={this.fetchData}> 送出 </Button>
                                </div>
                            </Col>
                            <Col md="3" />
                        </Row>


                    </Container>
                </div>

            </React.Fragment >
        );
    }
}


export default Main;