import React, { useState } from "react";
import './signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from "../navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import background from "../images/background.png";
import Footer from "../footer/Footer";

const SignUp = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        surname: "",
        phoneNumber: "",
        gender: "",
        birthday: Date
    });

    const { username, email, password, name, surname, phoneNumber, gender, birthday } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(user, "POSTED :>");
        await axios.post("http://127.0.0.1:8080/signup", user).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert(error.response.data.message)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    };

    return (
        <div>
            <Navbar />
            <div className="home-signup">
                <h1 className="signup-header">
                    Become a member now!
                </h1>
                <div className="form-container">
                    <h2 className="header">Sign up down here</h2>
                    <Form className="signup-card" onSubmit={(e) => onSubmit(e)}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control value={username} name="username" type="text" placeholder="Enter username"
                                                  onChange={(e)=>{onInputChange(e)}}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control value={email} name="email" type="email" placeholder="Enter email"
                                                  onChange={(e)=>{onInputChange(e)}}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} name="password" type="password" placeholder="Password"
                                          onChange={(e)=>{onInputChange(e)}}/>
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={name} name="name" type="text" placeholder="Enter name"
                                                  onChange={(e)=>{onInputChange(e)}}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control value={surname} name="surname" type="text" placeholder="Enter surname"
                                                  onChange={(e)=>{onInputChange(e)}}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control value={phoneNumber} name="phoneNumber" type="tel" placeholder="Enter phone number"
                                          onChange={(e)=>{onInputChange(e)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control className="gender-dropdown" value={gender} name="gender" as="select" onChange={(e)=>{onInputChange(e)}}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control value={birthday} name="birthday" type="date" onChange={(e)=>{onInputChange(e)}}/>
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