import React, {useEffect, useState} from 'react';
import './userProfile.css';
import Navbar from "../navbar/Navbar";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Footer from "../footer/Footer";
import {useLocation} from "react-router-dom";
import api from "../../api/axiosConfig";

const UserProfile = () => {

    const userId = 1;

    /*
    useEffect(() => {
       api.get("/trainer",{params: {id: trainerId}}).then((response)=> {setTrainer(response.data)});
    },[]);


     */
    const [user, setUsers] = useState(null);

    const getUsers = async () => {
        try {
            const response = await api.get(`/user/${userId}`, { params: { id: userId } })
            console.log(response.data);
            setUsers(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, [userId]);


    const [expandedWorkout, setExpandedWorkout] = useState(null);

    const toggleWorkoutDetails = (id) => {
        if (expandedWorkout === id) {
            setExpandedWorkout(null);
        } else {
            setExpandedWorkout(id);
        }
    };

    const sampleWorkouts = [
        {
            id: 1,
            title: "Push Day",
            date: "2023-03-01",
            totalVolume: 8000,
            totalSets: 20,
            exercises: [
                { name: "Bench Press", sets: 5, reps: 8, weight: "100kg" },
                { name: "Shoulder Press", sets: 4, reps: 10, weight: "60kg" },
                { name: "Tricep Dips", sets: 3, reps: 12, weight: "Bodyweight" }
            ]
        },
        {
            id: 2,
            title: "Pull Day",
            date: "2023-03-04",
            totalVolume: 7500,
            totalSets: 18,
            exercises: [
                { name: "Deadlift", sets: 5, reps: 5, weight: "120kg" },
                { name: "Pull-ups", sets: 5, reps: 10, weight: "Bodyweight" },
                { name: "Barbell Rows", sets: 4, reps: 8, weight: "80kg" }
            ]
        },
        {
            id: 3,
            title: "Leg Day",
            date: "2023-03-08",
            totalVolume: 8200,
            totalSets: 22,
            exercises: [
                { name: "Squats", sets: 6, reps: 6, weight: "110kg" },
                { name: "Leg Press", sets: 5, reps: 10, weight: "200kg" },
                { name: "Lunges", sets: 4, reps: 12, weight: "40kg" }
            ]
        }
    ];

    //const trainer = location.state.trainer;
/*
    const getImagePath = (image) => {
        return require(`../images/${image}`);
    };
 */

    return (
        <div>
            <div>
                <Navbar/>
                <div className="profile-background">
                    <div className="profile-container larger-profile">
                        {user && (
                            <Row className="profile-row">
                                <Col md={4} className="profile-picture-col">
                                    <img src={(user.image)} alt="Profile" className="profile-picture"/>
                                    <div className="profile-details">
                                        <h1 className="name">{user.name}</h1>
                                        <p className="location">{user.surname}</p>
                                        <h3 className="profile-stats-header">Gym Stats</h3>
                                        <div className="profile-stats-details">
                                            <p><strong>Workout Count: 3</strong> {}</p>
                                            <p><strong>Total Volume: 15 000</strong> {} kg</p>
                                            <p><strong>Leg Days Skipped: 3</strong> {}</p>
                                        </div>
                                        <p></p>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <h2 className="about">Brithday</h2>
                                    <p className="bio">{user.birthday}</p>
                                    <h2 className="about">Gender</h2>
                                    <p className="bio">{user.gender}</p>
                                    <h2 className="about">Current trainer</h2>
                                    <p className="bio">{user.trainer.name}</p>
                                </Col>
                            </Row>
                        )}

                        <div className="profile-workouts">
                            <Col md={12} className="profile-workout-list">
                                <h3>Workout History</h3>
                                {sampleWorkouts.map((workout) => (
                                    <Card key={workout.id} className="mb-3">
                                        <Card.Body className="profile-workout-cards" onClick={() => toggleWorkoutDetails(workout.id)}>
                                            <Card.Title>{workout.title} | {workout.date}</Card.Title>
                                            <Card.Text>
                                                Total Volume: {workout.totalVolume} kg | Total Sets: {workout.totalSets}
                                            </Card.Text>
                                            <Card.Text className="profile-workout-card-details">
                                                Click to show more details about this workout!
                                            </Card.Text>
                                            {expandedWorkout === workout.id && (
                                                <div className="workout-details">
                                                    {workout.exercises.map((exercise, index) => (
                                                        <p key={index}>
                                                            {exercise.name}: {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Col>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};


export default UserProfile;
