import React, { useState } from "react";
import './signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from "../navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

const SignUp = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        surname: "",
        phoneNumber: "",
        gender: "",
        birthday: ""
    });

    const { username, email, password, name, surname, phoneNumber, gender, birthday } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.username]: e.target.value });
        setUser({ ...user, [e.target.email]: e.target.value });
        setUser({ ...user, [e.target.password]: e.target.value });
        setUser({ ...user, [e.target.name]: e.target.value });
        setUser({ ...user, [e.target.surname]: e.target.value });
        setUser({ ...user, [e.target.phoneNumber]: e.target.value });
        setUser({ ...user, [e.target.gender]: e.target.value });
        setUser({ ...user, [e.target.birthday]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(user, "POSTED :>");
        await axios.post("http://127.0.0.1:8080/users/signup", user);
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
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control value={username} name="username" type="text" placeholder="Enter username"
                                                  onChange={onInputChange}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control value={email} name="email" type="email" placeholder="Enter email"
                                                  onChange={onInputChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} name="password" type="password" placeholder="Password"
                                          onChange={onInputChange}/>
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={name} name="name" type="text" placeholder="Enter name"
                                                  onChange={onInputChange}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control value={surname} name="surname" type="text" placeholder="Enter surname"
                                                  onChange={onInputChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control value={phoneNumber} name="phoneNumber" type="tel" placeholder="Enter phone number"
                                          onChange={onInputChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control value={gender} name="gender" as="select" onChange={onInputChange}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control value={birthday} name="birthday" type="date" onChange={onInputChange}/>
                        </Form.Group>

                        <div className="button-wrapper">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;