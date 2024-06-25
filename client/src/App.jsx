import "./App.css";
import React, { Component } from "react";
import "@material-tailwind/react";
import NavBar from "./navigation/navBar";
import Register from "./navigation/pages/auth/register";
import Connexion from "./navigation/pages/auth/connexion";
import Profile from "./navigation/pages/profile";
import Home from "./navigation/pages/Home";
import MovieDetails from "./components/MoviesComponents/MovieDetails/movieDetails";
import NotFoundPage from "./navigation/pages/notFundPage";
import { BrowserRouter as Router, Routes, Route, Redirect, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <header className="App-header">
            <NavBar />
          </header>
          <Routes>
            <Route path="/404" element={<NotFoundPage/>} />
            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="/" exacte element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails/>} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
