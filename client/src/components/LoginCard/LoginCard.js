import React from "react";
import { useState, useContext } from "react";
import "./LoginCard.css";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const { setToken, accesToken, token } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logSystem = async () => {
    try {
      const user = await axios.post("http://localhost:8000/sessions", {
        username: username,
        password: password,
      });
      const userInfo = await user.data;
      localStorage.setItem("token", userInfo.accessToken);
      setToken(userInfo.accessToken);
      //   navigation("/quotes");
      console.log(userInfo.accessToken);
      console.log(token);
      console.log(localStorage.getItem("token"));
    } catch (err) {
      localStorage.clear();
      setToken(null);
      console.log(err.message);
      setPassword("");
      setUsername("");
    }
  };
  function handleRefresh(e) {
    e.preventDefault();
    logSystem(username, password);
  }

  //   const navigate = useNavigate();
  return (
    <div className="logincard">
      <h2>
        Welcome to the world of <p className="quote">Quotes</p>
      </h2>
      <form className="forma">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></input>
        <br></br>
        <br></br>
        <button onClick={handleRefresh}>Log in</button>
      </form>
    </div>
  );
}
