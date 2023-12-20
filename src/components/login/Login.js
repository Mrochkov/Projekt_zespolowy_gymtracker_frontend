import './login.css';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";


import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {redirect} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/perform_login', {
                username,
                password
            });
            window.location = "/user"


        } catch (error) {
            alert("Provided credentials are wrong")
        }
    };

    return (
        <div>
            <div className="home-login">
                <h1 className="login-header">Welcome back!</h1>
                <div className="form-container">
                    <h2 className="header">Login here</h2>
                    <Form onSubmit={onSubmit}>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        value={username}
                                        type="text"
                                        placeholder="Enter username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={password}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="button-wrapper">
                            <Button variant="primary" type="submit">
                               Log In
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
