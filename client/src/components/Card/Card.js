import React, { useEffect } from "react";
import "./Card.css";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Card({
  id,
  content,
  author,
  upvotesCount,
  downvotesCount,
  givenVotes,
}) {
  const [upvotes, setUpVotes] = useState(upvotesCount);
  const [downvotes, setDownVotes] = useState(downvotesCount);
  const [givenvote, setGivenVote] = useState(givenVotes);

  // const accesToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";
  const { accesToken, token } = useContext(AppContext);
  // const { quotes, setQuotes } = useContext(AppContext);
  console.log("state:", givenvote);

  function vote(up, down) {
    let output1 = (up / (up + down)) * 100;
    let output2 = output1.toFixed(0);
    if (!isFinite(output2)) {
      output2 = 100;
    }
    if (output2 >= 80) {
      return (
        <p id="votes" style={{ color: "green" }}>
          {output2}%
        </p>
      );
    } else if (output2 >= 60) {
      return (
        <p id="votes" style={{ color: "limegreen" }}>
          {output2}%
        </p>
      );
    } else if (output2 >= 40) {
      return (
        <p id="votes" style={{ color: "orange" }}>
          {output2}%
        </p>
      );
    } else if (output2 >= 20) {
      return (
        <p id="votes" style={{ color: "yellow" }}>
          {output2}%
        </p>
      );
    } else if (output2 >= 0) {
      return (
        <p id="votes" style={{ color: "red" }}>
          {output2}%
        </p>
      );
    }
  }
  // console.log(givenvote, "givnenn");
  const upvote = () => {
    if (givenvote === "none") {
      console.log(localStorage.getItem("token"));
      axios
        .post(
          `http://localhost:8000/quotes/${id}/upvote`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setGivenVote("upvote");
          setUpVotes(upvotes + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (givenvote === "upvote") {
      axios
        .delete(
          `http://localhost:8000/quotes/${id}/upvote`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setGivenVote("none");
          setUpVotes(upvotes - 1);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (givenvote === "downvote") {
      axios
        .delete(
          `http://localhost:8000/quotes/${id}/downvote`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setDownVotes(downvotes - 1);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .post(
          `http://localhost:8000/quotes/${id}/upvote`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setGivenVote("upvote");
          setUpVotes(upvotes + 1);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const downvote = () => {
    if (givenvote === "none") {
      console.log(localStorage.getItem("token"));
      axios
        .post(
          `http://localhost:8000/quotes/${id}/downvote`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setGivenVote("downvote");
          // console.log(result.data);
          setDownVotes(downvotes + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (givenvote === "downvote") {
      axios
        .delete(
          `http://localhost:8000/quotes/${id}/downvote`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setGivenVote("none");
          setDownVotes(downvotes - 1);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (givenvote === "upvote") {
      axios
        .delete(
          `http://localhost:8000/quotes/${id}/upvote`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setUpVotes(upvotes - 1);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .post(
          `http://localhost:8000/quotes/${id}/downvote`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setGivenVote("downvote");
          setDownVotes(downvotes + 1);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="card">
      <div className="one">
        <ArrowDropUpIcon
          className={givenvote === "upvote" ? "active" : "passive"}
          fontSize="large"
          onClick={() => upvote()}
        ></ArrowDropUpIcon>
        <h3>{vote(upvotes, downvotes)}</h3>
        <h5>
          {upvotes} / {downvotes}
        </h5>
        <ArrowDropDownIcon
          fontSize="large"
          className={givenvote === "downvote" ? "active" : "passive"}
          onClick={() => downvote()}
        ></ArrowDropDownIcon>
      </div>
      <div className="second">
        <h3>{content}</h3>
        <h5>{author}</h5>
      </div>
    </div>
  );
}
