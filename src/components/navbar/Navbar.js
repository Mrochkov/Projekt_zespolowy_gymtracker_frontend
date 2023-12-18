import React, {useEffect, useState} from "react";
import dumbbell from '../images/dumbbell.jpg';
import './navbar.css';
import api from "../../api/axiosConfig";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get('/user');
        console.log('User Response:', userResponse.data);

        if (userResponse.data) {
          setUser(userResponse.data);

          const userId = userResponse.data.id;
          const workoutResponse = await api.get(`/user/${userId}/workouts`);
          console.log('Workout Response:', workoutResponse.data);

          setWorkouts(workoutResponse.data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoggedIn(false);

      }
    };

    fetchData();
  }, []);



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
                <a className="nav-link mx-2" href='/user'>UserProfile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="/trainers">Trainers</a>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end">
              {isLoggedIn ? (
                  <li className="nav-item">
                    <a className="nav-link mx-2" href="http://localhost:8080/signout">Logout</a>
                  </li>
              ) : (
                  <>
                    <li className="nav-item">
                      <a className="nav-link mx-2" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link mx-2" href="/signup">Sign up</a>
                    </li>
                  </>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
