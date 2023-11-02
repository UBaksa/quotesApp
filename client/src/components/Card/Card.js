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
  const [givenvotes, setGivenVotes] = useState(givenVotes);
  const { accesToken, token } = useContext(AppContext);

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

  function like() {
    if (givenvotes === "none") {
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
          setGivenVotes("upvote");
          console.log(result.data);
          setUpVotes(upvotesCount + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (givenvotes === "upvote") {
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
          setGivenVotes("none");
          console.log(result.data);
          setUpVotes(upvotesCount - 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (givenVotes === "downvote") {
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
          console.log(result.data);
          setDownVotes(downvotes - 1);
        })
        .catch((err) => {
          console.log(err);
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
          setGivenVotes("upvote");
          console.log(result.data);
          setUpVotes(upvotesCount + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function dislike() {
    if (givenvotes === "none") {
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
          setGivenVotes("downvote");
          console.log(result.data);
          setDownVotes(downvotesCount + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (givenvotes === "downvote") {
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
          setGivenVotes("none");
          console.log(result.data);
          setDownVotes(downvotesCount - 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (givenvotes === "upvote") {
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
          console.log(result.data);
          setUpVotes(upvotesCount - 1);
        })
        .catch((err) => {
          console.log(err);
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
          setGivenVotes("downvote");
          console.log(result.data);
          setDownVotes(downvotes + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    console.log(upvotes);
  }, []);
  return (
    <div className="card">
      <div className="one">
        <ArrowDropUpIcon
          className={givenvotes === "upvote" ? "active" : "passive"}
          onClick={() => {
            like;
          }}
          fontSize="large"
        ></ArrowDropUpIcon>
        <h3>{vote(upvotes, downvotes)}</h3>
        <h5>
          {upvotes} / {downvotes}
        </h5>
        <ArrowDropDownIcon
          fontSize="large"
          className={givenvotes === "downvote" ? "active" : "passive"}
          onClick={() => dislike()}
        ></ArrowDropDownIcon>
      </div>
      <div className="second">
        <h3>{content}</h3>
        <h5>{author}</h5>
      </div>
    </div>
  );
}
