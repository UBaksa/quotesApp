import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.css";
import LoginCard from "./components/LoginCard/LoginCard";
import Footer from "./components/Footer/Footer";
import CreateCard from "./components/CreateCard/CreateCard";
import Card from "./components/Card/Card";

function App() {
  return (
    <div className="app">
      {/* <LoginCard></LoginCard> */}
      {/* <CreateCard></CreateCard> */}
      <Card></Card>
      <Footer></Footer>
    </div>
  );
}

export default App;
