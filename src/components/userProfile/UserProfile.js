import React, { useEffect, useState } from 'react';
import './userProfile.css';
import Navbar from "../navbar/Navbar";
import { Button, Card, Row, Col } from "react-bootstrap";
import Footer from "../footer/Footer";
import api from "../../api/axiosConfig";
import pop from "../images/2.png";

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const [expandedWorkout, setExpandedWorkout] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await api.get('/user');
                setUser(userResponse.data);

                const userId = userResponse.data.id;
                const workoutResponse = await api.get(`/user/${userId}/workouts`);
                setWorkouts(workoutResponse.data);
            } catch (error) {
                window.location ="/login"
            }
        };

        fetchData();
    }, []);

    const toggleWorkoutDetails = async (id) => {
        if (expandedWorkout === id) {
            setExpandedWorkout(null);
            setExercises([]);
        } else {
            setExpandedWorkout(id);
            try {
                const exerciseResponse = await api.get(`/workout/${id}/exercises`);
                const exercisesWithSets = await Promise.all(exerciseResponse.data.map(async (exercise) => {
                    const setsResponse = await api.get(`/exercise/${exercise.id}/sets`);
                    return { ...exercise, sets: setsResponse.data };
                }));
                setExercises(exercisesWithSets);
            } catch (err) {
                console.error("Error fetching exercises and sets:", err);
            }
        }
    };

    return (
        <div className="user-main-container">
            <Navbar/>
            <div className="user-profile-background">
                <div className="user-profile-container larger-profile">

                    {user && (
                        <Row className="user-profile-row">
                            <Col md={4} className="user-profile-picture-col">
                                <Card>
                                    <Card.Body className="p-5">
                                        <img src={pop} alt="Profile" className="user-profile-picture"/>
                                        <h1 className="user-info">{user.name}</h1>
                                        <p className="location">{user.surname}</p>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={8} className="user-profile-d">
                                <Card>
                                    <Card.Body className="p-5">
                                        <div className="user-profile-details">
                                            <h3 className="user-info">Current trainer</h3>
                                            <p className="location">{user.trainer.name}</p>
                                            <h3 className="user-info">Gender</h3>
                                            <p className="location">{user.gender}</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}

                    <div className="gym-stats-section mb-4">
                        <Card>
                            <Card.Body>
                                <Row>
                                    <h2 className="user-profile-stats-header text-center">Gym Stats</h2>

                                    <Col md={3} className="gym-stat-item">
                                        <h5>Workout Count</h5>
                                        <p className="stat-value">{workouts.length}</p>
                                    </Col>
                                    <Col md={3} className="gym-stat-item">
                                        <h5>Total Volume</h5>
                                        <p className="stat-value">15 000 kg</p>
                                    </Col>
                                    <Col md={3} className="gym-stat-item">
                                        <h5>Time Spent Training</h5>
                                        <p className="stat-value">5 hours</p>
                                    </Col>
                                    <Col md={3} className="gym-stat-item">
                                        <h5>Total Amount of Sets</h5>
                                        <p className="stat-value">25</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>


                    <Card>
                        <Card.Body>
                            <h3 className="user-workout-history-title mb-3">Workout History</h3>
                            {workouts && workouts.map((workout, id) => (
                                <Card key={id} className="user-profile-workout-container mb-3">
                                    <Card.Body className="user-profile-workout-cards" onClick={() => toggleWorkoutDetails(workout.id)}>
                                        <Card.Title>{workout.name}</Card.Title>
                                        <Card.Text>
                                            Comment: {workout.comment}
                                        </Card.Text>
                                        <Card.Text className="user-profile-workout-card-details">
                                            Click to show more details about this workout!
                                        </Card.Text>
                                        {expandedWorkout === workout.id && (
                                            <div className="user-workout-details">
                                                {exercises.map((exercise, id) => (
                                                    <div  key={exercise.id} className="user-workout-details-exercise" >
                                                        <strong>Exercise name: {exercise.name}</strong>
                                                        {exercise.sets.map((set, idx) => (
                                                            <p key={set.id} className="user-workout-details-exercise-sets" >
                                                                Set: {idx + 1}, Reps: {set.reps}, Weight: {set.weight} kg
                                                            </p>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default UserProfile;
