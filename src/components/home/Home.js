import React from "react";
import Navbar from "../navbar/Navbar";
import "./home.css";
import cbum from "../images/cbum.jpg";
import Footer from "../footer/Footer";
import Trainers from "../trainers/Trainers";
const Home = () => {



    return (
        <div className="home" style={{ backgroundImage: `url(${cbum})` }}>
            <Navbar />
            <div className="hero-section">
                <h1>Get Fit, <br/> Get Strong, <br/> Get Healthy!</h1>
                <p>Welcome to our fitness training program designed to track your workouts,
                    help you achieve your fitness goals and transform your body!</p>
                <div className="cta-buttons">
                    <a href="/signup" className="btn start-now">Start Now!</a>
                    <button className="btn About">About us!</button>
                </div>
            </div>
            <div className="features">
                <div className="feature-item">
                    <span className="icon">🏋️</span>
                    <h3>Experienced Trainers</h3>
                    <p>Choose your own personal trainer</p>
                </div>
                <div className="feature-item">
                    <span className="icon">📈</span>
                    <h3>Track Your Workouts</h3>
                    <p>Efficiently log every session</p>
                </div>
                <div className="feature-item">
                    <span className="icon">📊</span>
                    <h3>Check the Progress</h3>
                    <p>See your gains over time</p>
                </div>
            </div>
            <Footer/>
        </div>

    );
};

export default Home;
