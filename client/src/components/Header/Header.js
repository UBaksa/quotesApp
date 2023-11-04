import React from "react";
import "./Header.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Header() {
  const { setToken, token } = useContext(AppContext);

  return (
    <div className="header">
      <button
        className="leftbutton"
        onClick={() => {
          localStorage.clear();
          setToken(null);
          navigation("/");
        }}
      >
        Log out
      </button>
      <button className="rightbutton">Create Quote</button>
    </div>
  );
}
