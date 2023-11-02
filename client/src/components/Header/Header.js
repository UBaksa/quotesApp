import React from "react";
import "./Header.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Header() {
  const { setToken } = useContext(AppContext);

  //   const navigation = useNavigate();

  //   function logout() {
  //     localStorage.clear();
  //     setToken(null);
  //     navigation("/");
  //   }
  //   function createQuote() {
  //     navigation("/post");
  //   }
  return (
    <div className="header">
      <h1>Quote page</h1>
      <button className="leftbutton">Log out</button>
      <button className="rightbutton">Create Quote</button>
    </div>
  );
}
