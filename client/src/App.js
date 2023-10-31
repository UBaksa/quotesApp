import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.css";
import LoginCard from "./components/LoginCard/LoginCard";

function App() {
  return (
    <div className="app">
      <LoginCard></LoginCard>
    </div>
  );
}

export default App;
