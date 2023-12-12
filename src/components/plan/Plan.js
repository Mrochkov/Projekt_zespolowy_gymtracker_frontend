import React from 'react';
import './plan.css';
import Navbar from "../navbar/Navbar";
import { Form, Button } from 'react-bootstrap';
import Footer from "../footer/Footer";

const Plan = () => {
    const month = "May";
    const year = "2023";
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div>
            <Navbar/>
            <div className="plan-container">
                <h1 className="header">Schedule</h1>
                <div className="calendar-and-form">
                    <div className="calendar-container">
                        <div className="month-navigation my-2">
                            <Button className="navigation-button">Prev month</Button>
                            <h2>{month} {year}</h2>
                            <div>
                                <Button className="navigation-button">Next month</Button>
                            </div>
                        </div>
                        <div className="calendar">
                            {days.map(day => (
                                <div key={day} className="day">
                                    <div className="date">{day}</div>
                                    <div className="events">
                                        {day === 1 && <div className="event">Boxing</div>}
                                        {day === 1 && <div className="event">Weight Training</div>}
                                        {day === 9 && <div className="event">Crossfit Session</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Form className="event-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Select Date for New Event</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="New Event" />
                        </Form.Group>
                        <Button className="add-event-button" type="button">Add Event</Button>
                    </Form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Plan;
