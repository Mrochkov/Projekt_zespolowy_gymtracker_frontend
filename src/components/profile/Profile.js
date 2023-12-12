import React, {useEffect, useState} from 'react';
import './profile.css';
import Navbar from "../navbar/Navbar";
import profilePic from '../images/pop.jpg';
import { Button, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Footer from "../footer/Footer";
import {useLocation} from "react-router-dom";
import api from "../../api/axiosConfig";

const Profile = () => {

    const {state} = useLocation();
    const trainerId = state.id;
    const [trainer,setTrainer] = useState(null);

    useEffect(() => {
       api.get("/trainer",{params: {id: trainerId}}).then((response)=> {setTrainer(response.data)});
    },[]);

    const userData = {
        name: 'Mr Wojak',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur beatae commodi dolore iusto, labore maxime nam quam? Dicta dignissimos impedit minima mollitia placeat quidem. Doloremque maiores perspiciatis reiciendis sequi!',
        location: 'Białystok, Polska',
        experience: '22 years of constant training and building my own body. Coached Krzysiu to deadlift whole enormous amount of 70kg for a total of 1 rep.',
        gyms: 'Atleta gym, Planet Fitness',
        specializations: ['Personal Training', 'Nutrition', 'Weightlifting', 'Ju-jitsu']
    };

    const [comments, setComments] = useState([
        { name: "Brajanek", message: "Podoba sie dla mnie pan trener", date: "05-12-2023" }
    ]);

    const [newComment, setNewComment] = useState({ name: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setComments([...comments, { ...newComment, date: new Date().toLocaleDateString() }]);
        setNewComment({ name: "", message: "" });
    };

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
        trainer && console.log(trainer.name);
        //window.location.href = '/contact';

    };


    return (
        <div>
            <div>
                <Navbar/>
                <div className="profile-background">
                    <div className="profile-container larger-profile">
                        <Row className="profile-row">
                            <Col md={4} className="profile-picture-col">
                                <img src={profilePic} alt="Profile" className="profile-picture" />
                                <div className="profile-details">
                                    <h1 className="name">{trainer.name}</h1>
                                    <p className="location">{userData.location}</p>
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
                                    {userData.specializations.map((specialization, index) => (
                                        <Col md={6} lg={3} key={index} className="specialization-col">
                                            <div className="specialization-item">
                                                {specialization}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                <h2 className="about">About me</h2>
                                <p className="bio">{userData.bio}</p>
                                <h2 className="about">Gyms</h2>
                                <p className="gyms">{userData.gyms}</p>
                                <h2 className="about">Experience </h2>
                                <p className="experience">{userData.experience}</p>
                            </Col>
                        </Row>


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
