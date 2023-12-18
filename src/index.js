import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./components/profile/Profile";
import SignUp from "./components/signUp/SignUp";
import WorkoutTable from "./components/table/WorkoutTable";
import Opinions from "./components/opinion/Opinions";
import Login from "./components/login/Login";
import Plan from "./components/plan/Plan";
import Trainers from "./components/trainers/Trainers";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import UserProfile from "./components/userProfile/UserProfile";
import AdminPanel from "./components/admin/AdminPanel";
import TrainersWorkouts from "./components/trainersWorkouts/TrainersWorkouts";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/workout" element={<WorkoutTable/>} />
              <Route path="/opinion" element={<Opinions/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/plan" element={<Plan/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/user" element={<UserProfile/>} />
              <Route path="/trainers" element={<Trainers/>} />
              <Route path="/footer" element={<Footer/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/admin" element={<AdminPanel/>} />
              <Route path="/trainerWorkouts" element={<TrainersWorkouts/>} />


          </Routes>

      </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
