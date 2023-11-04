import React from "react";
import { Route, Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Create from "./pages/Create/Create";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/quotes"} element={<Main />}></Route>
        <Route path={"/create"} element={<Create />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
