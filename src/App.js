import React,{useState,useEffect} from "react";
import './App.css';
import api from './api/axiosConfig';
import Layout from "./components/Layout";
import {Routes,Route} from "react-router-dom";
import Home from "./components/home/Home";

function App() {


  return (
    <div className="App">
       <Routes>
         <Route path ="/" element={<Layout/>}>
           <Route path="/" element={<Home/>}/>
         </Route>
       </Routes>
    </div>
  );
}

export default App;
