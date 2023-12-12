import React, {useEffect, useState} from 'react';
import './trainers.css';
import Navbar from "../navbar/Navbar";
import { Card, Row, Col, Button } from "react-bootstrap";
import profilePic from '../images/pop.jpg';
import cbum from "../images/cbum.jpg";
import dumbbell from '../images/dumbbell.jpg';
import Footer from "../footer/Footer";
import api from "../../api/axiosConfig";
import {useNavigate} from "react-router-dom";


const Trainers = () => {

    const [trainers,setTrainers] = useState();

    const getTrainers = async () => {
        try {
            const response = await api.get("/trainer/all")
            console.log(response.data);
            setTrainers(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTrainers();
    }, []);

    const navigate = useNavigate();

    const handleViewProfile = (e, id) => {
        //console.log(e.currentTarget.id);
        navigate('/profile/${id}', {state: {id: id}});
    };


    return (
        <div>
            <Navbar/>
            <div className="trainers-background">
                <div className="trainers-container">
                    <h1 className="header">Choose a trainer</h1>
                    <Row>
                        {
                            trainers && trainers.map((trainer, id) => (
                            <Col md={4} key={trainer.id} className="trainer-col">
                                <Card className="trainer-card">
                                    <Card.Body>
                                        <Card.Title>{trainer.name}</Card.Title>
                                        <Card.Text className="trainer-surname">{trainer.surname}</Card.Text>
                                        <Button
                                            variant="primary"
                                            className="view-profile-btn"
                                            //onClick={(e)=>handleViewProfile.bind(e, trainer)}>
                                            onClick={(e) => handleViewProfile(e,trainer.id)}>
                                                View Profile
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Trainers;