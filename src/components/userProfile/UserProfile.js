import React, {useEffect, useState} from 'react';
import './userProfile.css';
import Navbar from "../navbar/Navbar";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Footer from "../footer/Footer";
import {useLocation} from "react-router-dom";
import api from "../../api/axiosConfig";
import pop from "../images/2.png";
import workoutTable from "../table/WorkoutTable";

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
            api.get(`/user/${userId}`)
                .then(response => {
                    setUsers(response.data);
                })
            api.get(`/user/${userId}/workouts`)
                .then(response => {
                    setWorkouts(response.data);
                })
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, [userId]);


    const [expandedWorkout, setExpandedWorkout] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [sets, setSets] = useState([]);



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
                                    <img src={pop} alt="Profile" className="profile-picture"/>
                                    <div className="profile-details">
                                        <h1 className="name">{user.name}</h1>
                                        <p className="location">{user.surname}</p>
                                        <h3 className="about">Current trainer</h3>
                                        <p className="location">{user.trainer.name}</p>
                                        <p></p>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <h2 className="profile-stats-header">Gym Stats</h2>
                                    <div className="profile-stats-details">
                                        <p><strong>Workout Count: </strong> 2</p>
                                        <p><strong>Total Volume: </strong>15 000 kg</p>
                                        <p><strong>Time spent training: </strong>5 hours</p>
                                        <p><strong>Total amout of sets: </strong>25</p>

                                    </div>
                                </Col>
                            </Row>
                        )}

                        <div className="profile-workouts">
                            <Col md={12} className="profile-workout-list">
                                <h3 className="mb-3">Workout History</h3>
                                {
                                    workouts && workouts.map((workout, id) => (
                                    <Card key={id} className="profile-workout-container mb-3">
                                        <Card.Body className="profile-workout-cards" onClick={() => toggleWorkoutDetails(workout.id)}>
                                            <Card.Title>{workout.name} | Volume: {workout.feedback}</Card.Title>
                                            <Card.Text>
                                                Comment: {workout.comment}  | Total Sets: {workout.feedback}
                                            </Card.Text>
                                            <Card.Text className="profile-workout-card-details">
                                                Click to show more details about this workout!
                                            </Card.Text>
                                                {expandedWorkout === workout.id && (
                                                    <div className="workout-details">
                                                        {exercises.map((exercise, id) => (
                                                            <div key={exercise.id}>
                                                                <strong>Exercise name: {exercise.name}</strong>
                                                                {exercise.sets.map((set, id) => (
                                                                    <p key={set.id}>
                                                                        Set: {set.id}, Reps: {set.reps}, Weight: {set.weight} kg
                                                                    </p>
                                                                ))}
                                                            </div>
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
