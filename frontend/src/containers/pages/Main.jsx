import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';
import {Form, FormGroup, Input} from 'reactstrap';
import Logo from '../../assets/logo/logo.png';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }
    render() {
        return (
            <React.Fragment>
                <div className="main">
                        <Container className="h-100">
                            <Row className="h-100">
                                <Col md="3"/>
                                <Col className="mt-5">
                                    <img src={Logo} style={{width:"100%"}}></img>
                                    <Form >
                                        <FormGroup>
                                            <Input id="main_stock_input" placeholder="股票名稱/代碼" bsSize="lg"/>
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col md="3"/>
                            </Row>

                            
                        </Container>
                </div>
            </React.Fragment >
        );
    }
}


export default Main;