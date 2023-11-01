import React from "react";
import "./CreateCard.css";
import axios from "axios";
import { useState } from "react";
export default function CreateCard() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const create = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/quotes",
        {
          author: author,
          content: content,
          tags: [tags],
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  return (
    <div className="createcard">
      <h2>Post your Quote</h2>
      <form className="cardform">
        <input
          type="text"
          placeholder="Author"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          required
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Quote text"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          required
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Tag/Tags"
          onChange={(e) => {
            setTags(e.target.value);
          }}
          required
        ></input>
        <br></br>
        <button onClick={create}>Post it!</button>
      </form>
    </div>
  );
}
