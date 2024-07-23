import React from 'react'
import Navbar from './components/Navbar.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home.js';
import About from './components/About.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Footer from './components/Footer.js';
import PrivateComponent from './components/PrivateComponent.js';
import Addprod from './components/addprod.js';
import Updprod from './components/updprod.js';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
            <Route element={<PrivateComponent/>}>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/addprod" element={<Addprod/>} />
              <Route exact path="/updprod/:id" element={<Updprod/>} />
              <Route exact path="/about" element={<About />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup/>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default App
