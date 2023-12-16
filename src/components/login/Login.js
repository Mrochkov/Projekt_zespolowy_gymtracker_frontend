import React from "react";
import './login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from "../navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from "../footer/Footer";

const SignUp = () => {
    return (
        <div>
            <Navbar/>
            <div className="home-login">
                <h1 className="login-header">
                    Welcome back!
                </h1>
                <div className="form-container">
                    <h2 className="header">Login here</h2>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div className="button-wrapper">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default SignUp;
