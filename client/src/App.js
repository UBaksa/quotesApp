import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.css";
import LoginCard from "./components/LoginCard/LoginCard";
import Footer from "./components/Footer/Footer";
import CreateCard from "./components/CreateCard/CreateCard";
import Main from "./pages/Main/Main";

function App() {
  return (
    <div className="app">
      {/* <LoginCard></LoginCard> */}
      {/* <CreateCard></CreateCard> */}
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
