import React, { useEffect } from "react";
import "./Card.css";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Header from "../Header/Header";

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
  const [givenvote, setgivenvote] = useState(givenVotes);
  const accesToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";
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

  function like() {
    if (givenvote == "none") {
      console.log("id", id);
      console.log("TOKE", localStorage.getItem("token"));
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
          setgivenvote("upvote");
          console.log("result", result.data);
          setUpVotes(upvotesCount + 1);
          console.log("uspesan lajk");
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
          setgivenvote("none");
          console.log(result.data);
          setUpVotes(upvotesCount - 1);
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
          setgivenvote("upvote");
          console.log(result.data);
          setUpVotes(upvotesCount + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function dislike() {
    if (givenvote == "none") {
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
          setgivenvote("downvote");
          console.log(result.data);
          setDownVotes(downvotesCount + 1);
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
          setgivenvote("none");
          console.log(result.data);
          setDownVotes(downvotesCount - 1);
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
          setgivenvote("downvote");
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
          className={givenvote === "upvote" ? "active" : "passive"}
          fontSize="large"
          onClick={() => {
            like();
          }}
        ></ArrowDropUpIcon>
        <h3>{vote(upvotes, downvotes)}</h3>
        <h5>
          {upvotes} / {downvotes}
        </h5>
        <ArrowDropDownIcon
          fontSize="large"
          className={givenvote === "downvote" ? "active" : "passive"}
          onClick={() => like()}
        ></ArrowDropDownIcon>
      </div>
      <div className="second">
        <h3 onClick={() => dislike()}>{content}</h3>
        <h5>{author}</h5>
      </div>
    </div>
  );
}
