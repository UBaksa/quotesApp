import React from "react";
import "./Header.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Header() {
  const { token, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    setToken(null);
    navigate("/");
  }
  function create() {
    navigate("/create");
  }

  return (
    <div className="header">
      <button
        className="leftbutton"
        onClick={() => {
          logout();
        }}
      >
        Log out
      </button>
      <button className="rightbutton" onClick={() => create()}>
        Create Quote
      </button>
    </div>
  );
}
