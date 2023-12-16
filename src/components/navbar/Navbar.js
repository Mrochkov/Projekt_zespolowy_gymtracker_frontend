import React, { useState } from "react";
import dumbbell from '../images/dumbbell.jpg';
import './navbar.css';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-black" id="headerNav">
        <div className="container-fluid">
          <a className="navbar-brand d-block d-lg-none" href="/">
            <img src={dumbbell} height="80" alt="Dumbbell"/>
          </a>
          <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-center`} id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link mx-2" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" aria-current="page" href="/plan">Schedule</a>
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
                <a className="nav-link mx-2" href="/profile/1">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="user/1">UserProfile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="/trainers">Trainers</a>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <a className="nav-link mx-2" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="/signup">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
