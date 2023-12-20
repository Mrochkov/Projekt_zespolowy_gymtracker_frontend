import React, { useEffect, useState } from 'react';
import './userProfile.css';
import Navbar from "../navbar/Navbar";
import { Button, Card, Row, Col } from "react-bootstrap";
import Footer from "../footer/Footer";
import api from "../../api/axiosConfig";
import pop from "../images/2.png";
import {format} from "date-fns";

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const [expandedWorkout, setExpandedWorkout] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [formattedDate,setFormattedDate] = useState(new Date())



useEffect(() => {
    const fetchData = async () => {
        try {
            const userResponse = await api.get('/user');
            setUser(userResponse.data);

            const userId = userResponse.data.id;
            const workoutResponse = await api.get(`/user/${userId}/workouts`);

            console.log("workoutResponse:", workoutResponse.data);

            // Pobierz szczegóły treningów
            const workoutsWithDetails = await Promise.all(workoutResponse.data.map(async (workout) => {
                console.log("workout: " + workout.id);
                const exerciseResponse = await api.get(`/workout/${workout.id}/exercises`);
                const exercisesWithSets = await Promise.all(exerciseResponse.data.map(async (exercise) => {
                    const setsResponse = await api.get(`/exercise/${exercise.id}/sets`);
                    const sets = setsResponse.data.map((set) => ({ ...set }));
                    return { ...exercise, sets };
                }));

                // Zwróć trening z jego szczegółami
                return { ...workout, exercises: [...exercisesWithSets] };
            }));

            console.log("workoutsWithDetails:", workoutsWithDetails);

            // Ustaw wszystkie treningi z ich szczegółami w stanie
            setWorkouts(workoutsWithDetails);
        } catch (error) {
            console.error("Error fetching data:", error);
            window.location = "/login";
        }
    };

    fetchData();
}, []);
 



    const getWorkoutdetails = async (id) => {
        try {
            const exerciseResponse = await api.get(`/workout/${id}/exercises`);
            const exercisesWithSets = await Promise.all(exerciseResponse.data.map(async (exercise) => {
                const setsResponse = await api.get(`/exercise/${exercise.id}/sets`);
                return { ...exercise, sets: setsResponse.data };
            }));
            setExercises(exercisesWithSets)


        } catch (err) {
            console.error("Error fetching exercises and sets:", err);
        }
    }

    const toggleWorkoutDetails = async (id) => {
        if (expandedWorkout === id) {
            setExpandedWorkout(null);
        } else {
            setExpandedWorkout(id);
        }
    };

    const calculateTotalVolume = () => {
        if (!workouts || workouts.length === 0) return 0;

        return workouts.reduce((totalVolume, workout) => {
            if (!workout.exercises || workout.exercises.length === 0) return totalVolume;

            return totalVolume + workout.exercises.reduce((exerciseVolume, exercise) => {
                if (!exercise.sets || exercise.sets.length === 0) return exerciseVolume;

                return exerciseVolume + exercise.sets.reduce((setVolume, set) => {
                    return setVolume + (set.weight * set.reps);
                }, 0);
            }, 0);
        }, 0);
    };

    const calculateTotalExercises = () => {
        if (!workouts || workouts.length === 0) return 0;

        return workouts.reduce((totalExercises, workout) => {
            if (!workout.exercises || workout.exercises.length === 0) return totalExercises;

            return totalExercises + workout.exercises.length;
        }, 0);
    };

    const calculateTotalSets = () => {
        if (!workouts || workouts.length === 0) return 0;

        return workouts.reduce((totalSets, workout) => {
            if (!workout.exercises || workout.exercises.length === 0) return totalSets;

            return totalSets + workout.exercises.reduce((exerciseSets, exercise) => {
                if (!exercise.sets || exercise.sets.length === 0) return exerciseSets;

                return exerciseSets + exercise.sets.length;
            }, 0);
        }, 0);
    };


    return (
        <div className="user-main-container">
            <Navbar/>
            <div className="user-profile-background">
                <div className="user-profile-container larger-profile">

                    {user && (
                        <Row className="user-profile-row">
                            <Col md={5} className="user-profile-picture-col">
                                <Card>
                                    <Card.Body className="p-5">
                                        <img src={pop} alt="Profile" className="user-profile-picture"/>
                                        <h1 className="user-info">{user.name}</h1>
                                        <p className="location">{user.surname}</p>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={7} className="user-profile-d">
                                <Card>
                                    <Card.Body className="p-5">
                                        <div className="user-profile-details">
                                            <h3 className="user-info">Current trainer</h3>
                                            <p className="location">{user.trainer.name} {user.trainer.surname}</p>
                                            <h3 className="user-info">Email</h3>
                                            <p className="location">{user.email}</p>
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
                                        <p className="stat-value">{calculateTotalVolume()} kg</p>
                                    </Col>
                                    <Col md={3} className="gym-stat-item">
                                        <h5>Total Exercises</h5>
                                        <p className="stat-value">{calculateTotalExercises()}</p>
                                    </Col>
                                    <Col md={3} className="gym-stat-item">
                                        <h5>Total Sets</h5>
                                        <p className="stat-value">{calculateTotalSets()}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>


                    <Card>
                        <Card.Body>
                            <h3 className="user-workout-history-title mb-3">Workout History</h3>
                            {workouts && workouts.slice().reverse().map((workout, id) => (
                                <Card key={id} className="user-profile-workout-container mb-3">
                                    <Card.Body className="user-profile-workout-cards" onClick={() => toggleWorkoutDetails(workout.id)}>
                                        <Card.Title> {workout.name} </Card.Title>
                                        <Card.Text>
                                            <p className="">{format(workout.beginning_time, "dd-MM-yyyy \n H:mma")}</p>
                                            {!expandedWorkout && (
                                                <Card.Text className="user-profile-workout-card-details">
                                                    Click to see details
                                                </Card.Text>
                                            )}
                                        </Card.Text>
                                        {expandedWorkout === workout.id && (
                                            <div className="user-workout-details">
                                                {workout.exercises.map((exercise, id) => (
                                                    <div  key={exercise.id} className="user-workout-details-exercise" >
                                                        <strong>Exercise name: {exercise.name}</strong>
                                                        {exercise.sets.map((set, idx) => (
                                                            <p key={set.id} className="user-workout-details-exercise-sets" >
                                                                Set: {idx + 1}, Reps: {set.reps}, Weight: {set.weight} kg
                                                            </p>
                                                        ))}
                                                    </div>
                                                ))}
                                                <Card.Text className="card-workout-comment">
                                                    <p className="comment">Comment</p>
                                                    <p className="comment-label"><strong>{workout.comment}</strong></p>
                                                    <p className="comment mt-3">Feedback</p>
                                                    <p className="feedback-label"><strong>{workout.feedback}</strong></p>
                                                </Card.Text>
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
