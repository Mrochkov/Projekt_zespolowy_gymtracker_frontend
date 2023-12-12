import React, { Component } from 'react';
import { Form, Button, Card, Col, Row, Modal } from 'react-bootstrap';
import Navbar from "../navbar/Navbar";
import './table.css';
import Footer from "../footer/Footer";

class WorkoutTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedExercise: '',
            sets: [],
            exercises: []
        };
    }

    handleExerciseSelect = (e) => {
        this.setState({
            selectedExercise: e.target.value,
            sets: [{ weight: '', reps: '', setId: 1 }],
            showModal: false
        });
    };

    handleSetChange = (index, field, value) => {
        const updatedSets = this.state.sets.map((set, i) => (
            i === index ? { ...set, [field]: value } : set
        ));
        this.setState({ sets: updatedSets });
    };

    addSet = () => {
        const newSetId = this.state.sets.length + 1;
        this.setState(prevState => ({
            sets: [...prevState.sets, { weight: '', reps: '', setId: newSetId }]
        }));
    };

    handleSubmitExercise = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            exercises: [...prevState.exercises, { name: prevState.selectedExercise, sets: prevState.sets }],
            selectedExercise: '',
            sets: []
        }));
    };

    renderSets = (sets, isDisabled) => {
        return sets.map((set, index) => (
            <Row key={set.setId}>
                <Col md={2}>
                    <Form.Group controlId={`formSetIndex-${set.setId}`}>
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
        ));
    };

    render() {
        const { showModal, selectedExercise, sets, exercises } = this.state;

        return (
            <div>
                <Navbar/>
                <div className="container-workout">
                    <h1>Your current workout</h1>

                    {exercises.map((exercise, index) => (
                        <Card className="mt-4" bg="dark" text="white" key={index}>
                            <Card.Body>
                                <Card.Title>{exercise.name}</Card.Title>
                                {this.renderSets(exercise.sets, true)}
                            </Card.Body>
                        </Card>
                    ))}

                    {selectedExercise && (
                        <Card className="mt-4" bg="dark" text="white">
                            <Card.Body>
                                <Card.Title>Enter Details for {selectedExercise}</Card.Title>
                                <Form onSubmit={this.handleSubmitExercise}>
                                    {this.renderSets(sets, false)}
                                    <Button variant="secondary mt-3" onClick={this.addSet}>Add Set</Button>
                                    <Button variant="primary mt-3 ml-2" type="submit">Submit Exercise</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    )}

                    <Button variant="primary mt-3" onClick={() => this.setState({ showModal: true })}>Select Exercise</Button>
                    <Button variant="success mt-3 ml-2" type="submitWorkout" >Submit Workout</Button>

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
