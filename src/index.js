import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";
import "antd/dist/antd.variable.min.css";
import NavigationBar from "./components/Global/NavigationBar";
import Home from "./pages/Home/Home";
import Footer from "./components/Global/Footer";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About";
import Transportation from "./pages/Transportation";
import Observation from "./pages/Observation";
import Login from "./pages/Login/Login.js";
import Map from "./components/Map/Map.jsx"
ReactDOM.render(
  <div>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/projects" element={<Projects />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/map" element={<Map />} exact />
        <Route path="/transportation" element={<Transportation />} exact />
        <Route path="/observation" element={<Observation />} exact />
        <Route path="/login" element={<Login />} exact />
      </Routes>
      <Footer />
    </Router>
  </div>,
  document.getElementById("root")
);
