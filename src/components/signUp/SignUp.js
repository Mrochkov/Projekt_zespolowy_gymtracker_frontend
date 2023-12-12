import React, {useState} from "react";
import './signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from "../navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import baseUrl from "../../api/axiosConfig"
import Footer from "../footer/Footer";



const SignUp = () => {

        const [user,setUser] = useState({
            username: "",
            email: "",
            password: ""
        });
        const {username,email,password} = user;

        const onInputChange = (e) => {
            setUser({...user,[e.target.name]: e.target.value});
        };

        const onSubmit = async (e) => {
            e.preventDefault();
            console.log(username,email,password,"POSTED :>");
            await axios.post("http://127.0.0.1:8080/users/signup",user);

        };


    return (
        <div>
            <Navbar/>
            <div className="homeSignup">
                <h1 className="signup-header">
                    Become a member now!
                </h1>
                <div className="form-container">
                    <h2 className="header">Sign up down here</h2>
                    <Form onSubmit={(e)=>onSubmit(e)}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control value={username} name = "username" type="text" placeholder="Enter username"
                                    onChange={(e)=>onInputChange(e)}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control  value = {email} name = "email" type="email" placeholder="Enter email"
                                      onChange={(e)=>onInputChange(e)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value = {password} name = "password" type="password" placeholder="Password"
                                          onChange={(e)=>onInputChange(e)}/>
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
