import React, {useEffect, useState} from 'react';
import './trainers.css';
import Navbar from "../navbar/Navbar";
import { Card, Row, Col, Button } from "react-bootstrap";
import profilePic from '../images/1.png';
import cbum from "../images/cbum.jpg";
import dumbbell from '../images/dumbbell.jpg';
import Footer from "../footer/Footer";
import api from "../../api/axiosConfig";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDumbbell} from "@fortawesome/free-solid-svg-icons";


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


    const renderRating = () => {
        let rating = [];
        for (let i = 0; i < 5; i++) {
            rating.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faDumbbell}
                    className={i < 4 ? "rating-icon active" : "rating-icon"}
                />
            );
        }
        return rating;
    };


    const navigate = useNavigate();

    const handleViewProfile = (e, id) => {
        //console.log(e.currentTarget.id);
        navigate(`/profile/${id}`, { state: { id: id } });
    };

    const getImagePath = (image) => {
        return require(`../images/${image}`);
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
                                        <Card.Img variant="top" src={getImagePath(trainer.image)} className="trainer-image" />
                                        <Card.Title><strong>{trainer.name}</strong></Card.Title>
                                        <Card.Text className="trainer-surname">Price: {trainer.hourlyRate} zł/h</Card.Text>
                                        <Card.Text className="trainer-surname">Rating: {trainer.score}</Card.Text>

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