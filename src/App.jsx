import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Home from "./Pages/Home";
import AddRoom from "./Forms/AddRoom";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Rooms_Overview from "./Components/Rooms_Overview";
import "../src/my.css";

const App = () => {
  return (
    <div className="all">
      <Router>
        <div className="Nav-all">
          <Navbar />
        </div>
        <div className="hey">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/roomOverview" element={<Rooms_Overview />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
