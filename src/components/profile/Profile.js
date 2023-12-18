import React, {useEffect, useState} from 'react';
import './profile.css';
import Navbar from "../navbar/Navbar";
import {Button, Form, Row, Col, Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Footer from "../footer/Footer";
import {useLocation} from "react-router-dom";
import api from "../../api/axiosConfig";
import axios from "axios";

const Profile = () => {

    const { state } = useLocation();
    const trainerId = state ? state.id : null;
    const [trainer, setTrainer] = useState(null);
    const [user, setUser] = useState(null);

    /*
    useEffect(() => {
       api.get("/trainer",{params: {id: trainerId}}).then((response)=> {setTrainer(response.data)});
    },[]);


     */

    const [opinions, setOpinions] = useState([]);

    const [newOpinion, setNewOpinion] = useState({ score: "", comment: "",trainerId: "",userId:"" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewOpinion({ score: "", comment: "",trainerId: "",userId: ""});
    };

    useEffect(() => {
        if (trainerId) {

            api.get(`/user`)
                .then(response => {
                    setUser(response.data);
                    newOpinion.userId = response.data.id;
                })
            api.get("/trainer", { params: { id: trainerId } })
                .then((response) => {
                    setTrainer(response.data);
                })
            api.get(`/trainer/${trainerId}/opinions`)
                .then(response => {
                    setOpinions(response.data);
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

    const onSubmit = async (e) => {
        e.preventDefault();

       // await axios.post("http://127.0.0.1:8080/opinion", JSON.stringify(newOpinion)).
        console.log(newOpinion)
        newOpinion.trainerId = trainerId;
        await axios.post("http://127.0.0.1:8080/opinion", { data: JSON.stringify(newOpinion),headers: {'Content-Type': 'application/json;'}}).
        then(response => {console.log(response)});
        window.location.reload();
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
                            <Col md={5} className="profile-picture-col">
                            <Card className="profile-picture-card">
                                <Card.Body>

                                        <img src={getImagePath(trainer.image)} alt="Profile" className="profile-picture"/>
                                        <div className="profile-details">
                                            <h1 className="name-trainer">{trainer.name}</h1>
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

                                </Card.Body>
                            </Card>
                            </Col>


                            <Col md={7} className="profile-about">
                                <Card className="profile-about-card">
                                    <Card.Body>
                                        <h2 className="name-trainer mt-5">About me</h2>
                                        <p className="bio">{trainer.description}</p>

                                    </Card.Body>
                                </Card>
                            </Col>


                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <h2 className="name-trainer mt-3 mb-4">Specializations</h2>
                                        <Row>
                                            {trainer.specializationList.map((specialization, id) => (
                                                <Col md={6} lg={3} key={id} className="specialization-col">
                                                    <div className="specialization-item">
                                                        {specialization.name}
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                         )}

                            <Card className="gym-card">
                                <Card.Body>
                                    <h2 className="name-trainer mt-3 mb-4">Gyms</h2>
                                    <Row className="gyms-rows">

                                        {trainer && trainer.gymList.map((gym, id) => (

                                                <Col md={6} lg={6} className="gym-list">
                                                    <Card key={id}  className="gym-list-card">
                                                        <Card.Body>
                                                                <p className="gym-name"><strong>{gym.name}</strong></p>
                                                            <p className="gym-address"><strong>Address: </strong>{gym.address}</p>
                                                        </Card.Body>
                                                    </Card>

                                                </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>

                        <Card>
                            <Card.Body>
                                <div className="name-trainer mt-3 mb-4">

                                    <Row className="justify-content-md-center">
                                        <Col md={6}>
                                            <h2>Opinions</h2>
                                            {opinions.map((opinion, id) => (
                                                <div key={id} className="opinion-item">
                                                    <strong className="comment-name">User</strong>: {opinion.comment} <br/>
                                                    <small>Rating: {opinion.score}</small>
                                                </div>
                                            ))}
                                            <Form onSubmit={(e) => onSubmit(e)} className="opinion-form">
                                                <Form.Group className="opinion-name mb-3">
                                                    <Form.Control
                                                        as="select"
                                                        name="score"
                                                        value={newOpinion.score}
                                                        onChange={(e) => setNewOpinion({ ...newOpinion, score: e.target.value })}>
                                                        <option value="">Select a score</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group className="opinion-content mb-3">
                                                    <Form.Control
                                                        as="textarea"
                                                        name="message"
                                                        placeholder="Write your opinion here..."
                                                        value={newOpinion.comment}
                                                        onChange={(e) => setNewOpinion({ ...newOpinion, comment: e.target.value })}
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

                            </Card.Body>
                        </Card>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};


export default Profile;
