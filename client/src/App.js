import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.css";
import LoginCard from "./components/LoginCard/LoginCard";
import Footer from "./components/LoginCard/Footer/Footer";

function App() {
  return (
    <div className="app">
      <LoginCard></LoginCard>
      <Footer></Footer>
    </div>
  );
}

export default App;
