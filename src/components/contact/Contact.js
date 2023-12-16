import React, { useState } from 'react';
import { Card, ListGroup, Form, Button, InputGroup } from 'react-bootstrap';
import pop from '../images/1.png';
import cbum from "../images/cbum.jpg";
import dumbbell from '../images/dumbbell.jpg';
import "./contact.css";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";


const Contact = () => {


    return (
        <div>
            <Navbar/>

            <div className="messenger-container">
                <h1 className="header">Conversation with </h1>
                <Card style={{ width: '500px', marginTop: '40px' }}>
                    <Card.Header className="conversation-window">Conversation</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <img src={pop} alt="P 1" className="profile-pic"/>
                            <span>We go gym!</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <img src={cbum} alt="P 2" className="profile-pic"/>
                            <span>When??</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <img src={pop} alt="P 1" className="profile-pic"/>
                            <span>Tomorrow morning.</span>
                        </ListGroup.Item>
                    </ListGroup>
                    <Form>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Type a message..."
                            />
                                <Button variant="primary" type="submit">Send</Button>
                        </InputGroup>
                    </Form>
                </Card>
            </div>
            <Footer/>
        </div>
    );
};

export default Contact;
