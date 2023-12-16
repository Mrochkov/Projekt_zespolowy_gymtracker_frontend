import React, {Component, useState} from 'react';
import { Form, Button, Card, Col, Row, Modal } from 'react-bootstrap';
import Navbar from "../navbar/Navbar";
import './table.css';
import Footer from "../footer/Footer";
import axios from "axios";

class WorkoutTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,

            currentExercise: {
                name: '',
                sets: [],
            },

            workout: {
                userId: 1,
                comment: 'comment',
                exercises: [],
                name: 'FBW'
            }
        };


    }
    onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.workout)
        //await axios.post("http://127.0.0.1:8080/workout", this.state.workout).
        await axios.post("http://127.0.0.1:8080/workout", { data: JSON.stringify(this.state.workout),headers: {'Content-Type': 'application/json;'}}).
        then(response => {console.log(response)});
    };

    handleExerciseSelect = (e) => {
        this.setState({
            currentExercise: {name: e.target.value, sets: [{ weight: '', reps: '', setId: 1 }]},
            showModal: false
        });
        console.log(this.state.workout.exercises)
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

    renderSets = (sets, isDisabled) => {
        return sets.map((set, index) => (
            <Form onSubmit={(e) => this.onSubmit(e)}>
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
        const {showModal, currentExercise, workout} = this.state;

        return (
            <div>
                <Navbar/>
                <div className="container-workout">
                    <h1>Your current workout</h1>
                    <Button variant="primary mt-3" onClick={() => this.setState({ showModal: true })}>Select Exercise</Button>

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

                    <Form.Group className="mt-3">
                        <Form.Label><strong>Workout Comment</strong></Form.Label>
                        <Form.Control
                            className="workout-comment"
                            as="textarea"
                            rows={3}
                            placeholder="Enter any comments about the workout"
                        />
                    </Form.Group>

                    <Button variant="success mt-3 ml-2" type="submit" >Submit Workout</Button>

                    <Modal show={showModal} onHide={() => this.setState({ showModal: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Select an Exercise</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Select aria-label="Select Exercise" onChange={this.handleExerciseSelect}>
                                <option value="">Open this select menu</option>
                                <option value="Squats">Squats</option>
                                <option value="Deadlift">Deadlift</option>
                                <option value="Bench Press">Bench Press</option>
                            </Form.Select>
                        </Modal.Body>
                    </Modal>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default WorkoutTable;