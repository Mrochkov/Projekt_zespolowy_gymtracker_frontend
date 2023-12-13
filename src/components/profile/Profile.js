import React, {useEffect, useState} from 'react';
import './profile.css';
import Navbar from "../navbar/Navbar";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Footer from "../footer/Footer";
import {useLocation} from "react-router-dom";
import api from "../../api/axiosConfig";
import cbum from "../images/cbum.jpg";

const Profile = () => {

    const { state } = useLocation();
    const trainerId = state ? state.id : null;
    const [trainer, setTrainer] = useState(null);

    /*
    useEffect(() => {
       api.get("/trainer",{params: {id: trainerId}}).then((response)=> {setTrainer(response.data)});
    },[]);


     */

    const [comments, setComments] = useState([
        { name: "Brajanek", message: "Podoba sie dla mnie pan trener", date: "05-12-2023" }
    ]);

    const [newComment, setNewComment] = useState({ name: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setComments([...comments, { ...newComment, date: new Date().toLocaleDateString() }]);
        setNewComment({ name: "", message: "" });
    };

    useEffect(() => {
        if (trainerId) {
            api.get("/trainer", { params: { id: trainerId } })
                .then((response) => {
                    setTrainer(response.data);
                })
        }
    }, [trainerId]);



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



    //const trainer = location.state.trainer;

    const handleViewProfile = () => {
        window.location.href = '/contact';

    };

    const getImagePath = (image) => {
        return require(`../images/${image}`);
    };

    return (
        <div>
            <div>
                <Navbar/>
                <div className="profile-background">
                    <div className="profile-container larger-profile">
                        {trainer && (
                        <Row className="profile-row">
                            <Col md={4} className="profile-picture-col">
                                <img src={getImagePath(trainer.image)} alt="Profile" className="profile-picture"/>
                                <div className="profile-details">
                                    <h1 className="name">{trainer.name}</h1>
                                    <p className="location">{trainer.surname}</p>
                                    <h5 className="rating-text"><strong>Price:</strong></h5>
                                    <p className="rating-text">{trainer.hourlyRate} zł/h</p>
                                    <p className="rating-text"><strong>Rating: </strong></p>
                                    <div className="rating">{renderRating()}</div>
                                    <Button
                                        className="button-contact"
                                        onClick={handleViewProfile}>
                                        Contact
                                    </Button>
                                </div>
                            </Col>
                            <Col md={8}>
                                <h2 className="specializations-title">Specializations</h2>
                                <Row>
                                    {trainer && trainer.specializationList.map((specialization, id) => (
                                        <Col md={6} lg={3} key={id} className="specialization-col">
                                            <div className="specialization-item">
                                                {specialization.name}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>

                                <h2 className="about">About me</h2>
                                <p className="bio">{trainer.description}</p>

                                <Row>
                                    <h2 className="gym-title">Gyms</h2>
                                    {trainer && trainer.gymList.map((gym, id) => (
                                        <Col md={12} key={id} className="gym-col">
                                            <div className="gym-item">
                                                - {gym.name}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>


                            </Col>
                        </Row>
                         )}

                        <div className="profile-opinions">
                            <Row className="justify-content-md-center">
                                <Col md={6}>
                                    <h2>Opinions</h2>
                                    {comments.map((comment, index) => (
                                        <div key={index} className="opinion-item">
                                            <strong>{comment.name}</strong>: {comment.message} <br/>
                                            <small>{comment.date}</small>
                                        </div>
                                    ))}
                                    <Form onSubmit={handleSubmit} className="opinion-form">
                                        <Form.Group className="opinion-name mb-3">
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Your name"
                                                value={newComment.name}
                                                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group className="opinion-content mb-3">
                                            <Form.Control
                                                as="textarea"
                                                name="message"
                                                placeholder="Write your opinion here..."
                                                value={newComment.message}
                                                onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Button
                                            variant="primary"
                                            type="submit">
                                            Add Opinion
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};


export default Profile;
