import React, { useEffect, useState } from 'react';
import './trainersWorkouts.css';
import Navbar from "../navbar/Navbar";
import { Button, Card, Row, Col } from "react-bootstrap";
import Footer from "../footer/Footer";
import api from "../../api/axiosConfig";
import pop from "../images/2.png";

const TrainersWorkouts = () => {
    const userId = 1;
    const [user, setUser] = useState(null);
    const [expandedWorkout, setExpandedWorkout] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userResponse = await api.get(`/user/${userId}`);
                setUser(userResponse.data);

                const workoutResponse = await api.get(`/user/${userId}/workouts`);
                setWorkouts(workoutResponse.data);
            } catch(err) {
                console.log(err);
            }
        };
        getUsers();
    }, [userId]);

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

                    <Card>
                        <Card.Body>
                            {user && (
                            <h1 className="workouts-header">{user.name}</h1>
                            )}
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

export default TrainersWorkouts;
