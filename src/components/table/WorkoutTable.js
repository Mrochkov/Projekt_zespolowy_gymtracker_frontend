import React, {Component, useEffect, useState} from 'react';
import { Form, Button, Card, Col, Row, Modal } from 'react-bootstrap';
import Navbar from "../navbar/Navbar";
import './table.css';
import Footer from "../footer/Footer";
import axios from "axios";
import SelectInput from "@mui/material/Select/SelectInput";
import api from "../../api/axiosConfig";

class WorkoutTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            exercises: [],
            currentExercise: {
                name: '',
                sets: [],
            },

            workout: {
                userId: [],
                comment: '',
                exercises: [],
                name: ''
            },
            searchKeyword: '',
            filteredExercises: [],
        };
    }

    async componentDidMount() {
        try {
            const response = await api.get('/exercise/names');
            this.setState({ exercises: response.data, filteredExercises: response.data });

            const userResponse = await api.get('/user');
            if (!userResponse.data) {
                window.location = '/login';
                return;
            }

            this.setState(prevState => ({
                workout: { ...prevState.workout, userId: userResponse.data.id }
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            window.location = '/login';
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state.workout)
        //await axios.post("http://127.0.0.1:8080/workout", this.state.workout).
        await axios.post("http://127.0.0.1:8080/workout", { data: JSON.stringify(this.state.workout),headers: {'Content-Type': 'application/json;'}}).
        then(response => {console.log(response)});
        window.location = "/user";
    };

    handleExerciseSelect = (e) => {
        this.setState({
            currentExercise: { name: e.target.value, sets: [{ weight: '', reps: '', setId: 1 }] },
            showModal: false
        });
    };

    handleSearchChange = (e) => {
        const { exercises } = this.state;
        const keyword = e.target.value.toLowerCase();
        const filteredExercises = exercises.filter(exercise => exercise.toLowerCase().includes(keyword));
        this.setState({ searchKeyword: keyword, filteredExercises });
    };

    handleSetChange = (index, field, value) => {
        const updatedSets = this.state.currentExercise.sets.map((set, i) => (
            i === index ? { ...set, [field]: value } : set
        ));
        this.setState(prevState => ({
            currentExercise: { ...prevState.currentExercise, sets: updatedSets}
        }));
    };

    addSet = () => {
        const newSetId = this.state.currentExercise.sets.length + 1;
        this.setState(prevState => ({
            currentExercise: {...prevState.currentExercise, sets:[...prevState.currentExercise.sets, { weight: '', reps: '', setId: newSetId }]}
        }));
    };

    handleSubmitExercise = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            workout:{...prevState.workout ,exercises: [...prevState.workout.exercises, prevState.currentExercise]},
            currentExercise: {name: '',sets: []}
        }));
    };

    handleModalOpen() {
        this.setState({
            showModal: true,
            searchKeyword: '',
            filteredExercises: this.state.exercises
        });
    }

    renderSets = (sets, isDisabled) => {


        return sets.map((set, index) => (
            <Form id='workoutForm' onSubmit={(e) => this.onSubmit(e)}>
                <Row key={set.setId}>
                    <Col md={2}>
                        <Form.Group controlId={`formSetIndex-${set.setId}` }>
                            <Form.Label>Set</Form.Label>
                            <Form.Control
                                type="text"
                                value={`Set ${set.setId}`}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId={`formWeight-${set.setId}`}>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Weight"
                                value={set.weight}
                                onChange={(e) => this.handleSetChange(index, 'weight', e.target.value)}
                                disabled={isDisabled}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId={`formReps-${set.setId}`}>
                            <Form.Label>Reps</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Reps"
                                value={set.reps}
                                onChange={(e) => this.handleSetChange(index, 'reps', e.target.value)}
                                disabled={isDisabled}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        ));
    };

    render() {
        const { showModal, currentExercise, workout, filteredExercises } = this.state;


        return (
            <div>
                <Navbar/>
                <div className="container-workout">
                    <h1>Your current workout</h1>
                    <p>Select exercise below. After the exercise is finished click "submit exercise"</p>
                    <Button variant="primary mt-3" onClick={() => this.handleModalOpen()}>Select Exercise</Button>

                    {workout.exercises.map((exercise, index) => (
                        <Card className="mt-4" bg="dark" text="white" key={index}>
                            <Card.Body>
                                <Card.Title>{exercise.name}</Card.Title>
                                {this.renderSets(exercise.sets, true)}
                            </Card.Body>
                        </Card>
                    ))}

                    {currentExercise.name && (
                        <Card className="mt-4" bg="dark" text="white">
                            <Card.Body>
                                <Card.Title>Enter Details for {currentExercise.name}</Card.Title>
                                <Form onSubmit={this.handleSubmitExercise}>
                                    {this.renderSets(currentExercise.sets, false)}
                                    <Button variant="secondary mt-3" onClick={this.addSet}>Add Set</Button>
                                    <Button variant="primary mt-3 ml-2" type="submit">Submit Exercise</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    )}

                    <Form.Group className="workout-title my-3 mt-4">
                        <Form.Label><strong>Title</strong></Form.Label>
                        <Form.Control
                            value={workout.name}
                            name="name"
                            type="text"
                            placeholder="Enter workout title..."
                            onChange={e => this.setState({ workout: { ...workout, name: e.target.value } })}
                        />
                    </Form.Group>

                    <Form.Group id='workoutForm' className="mt-3">
                        <Form.Label><strong>Workout Comment</strong></Form.Label>
                        <Form.Control
                            className="workout-comment"
                            as="textarea"
                            rows={3}
                            value={workout.comment}
                            placeholder="Enter any comments about the workout"
                            onChange={e => this.setState({ workout: { ...workout, comment: e.target.value } })}
                        />
                    </Form.Group>


                    <Button form='workoutForm' variant="success mt-3 ml-2" type="submit" >Submit Workout</Button>



                    <Modal
                        show={showModal}
                        onEntered={() => this.setState({ searchKeyword: '' })}
                        onHide={() => this.setState({ showModal: false })}
                        size="x1"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Select an Exercise</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-body">
                            <Form.Control
                                type="text"
                                placeholder="Search exercise..."
                                value={this.state.searchKeyword}
                                onChange={this.handleSearchChange}
                            />
                            <Form.Control className="exercise-select" as="select" onChange={this.handleExerciseSelect} multiple>
                                {filteredExercises.map((exercise, index) => (
                                    <option key={index} value={exercise}>{exercise}</option>
                                ))}
                            </Form.Control>
                        </Modal.Body>
                    </Modal>

                </div>
                <Footer/>
            </div>
        );
    }
}

export default WorkoutTable;