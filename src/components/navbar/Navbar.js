import React from "react";
import dumbbell from '../images/dumbbell.jpg';
import './navbar.css';

const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-black" id="headerNav">
        <div className="container-fluid">
          <a className="navbar-brand d-block d-lg-none" href="/">
            <img src={dumbbell} height="80" alt="Dumbbell"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link mx-2 active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" aria-current="page" href="plan">Schedule</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="/workout">Workouts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="/">
                  <img src={dumbbell} height="80" alt="Dumbbell"/>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="profile">Groups</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="trainers">Trainers</a>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <a className="nav-link mx-2" href="login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="signup">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
