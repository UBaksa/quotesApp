import React from "react";
import Card from "../../components/Card/Card";
import "./Main.css";
import { useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Header from "../../components/Header/Header";

export default function Main() {
  const { quotes, setQuotes, accessToken } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const quotesPerPage = 4;
  const numPages = Math.ceil(quotes.length / quotesPerPage);

  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const selected = (e) => {
    const tag = e.target.value;
    const isSelected = e.target.checked;
    if (isSelected) {
      setSelectedQuotes([...selectedQuotes, tag]);
      setPage(1);
    } else {
      setSelectedQuotes(
        selectedQuotes.filter((selectedTag) => selectedTag !== tag)
      );
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/quotes", {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((result) => {
        setQuotes(result.data.quotes);
        console.log(result.data.quotes[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredQuotes = quotes.filter((quote) => {
    if (selectedQuotes.length === 0) {
      return true;
    } else {
      return quote.tags.some((tag) => selectedQuotes.includes(tag));
    }
  });

  return (
    <div className="main">
      <div className="top">
        <Header></Header>
      </div>
      <div className="tagnames">
        <p>Action</p>
        <p>Books</p>
        <p>Life</p>
        <p>Humor</p>
      </div>
      <div className="tags">
        <input
          type="checkbox"
          value="action"
          checked={selectedQuotes.includes("action")}
          onChange={selected}
        ></input>
        <input
          type="checkbox"
          value="books"
          checked={selectedQuotes.includes("books")}
          onChange={selected}
        ></input>
        <input
          type="checkbox"
          value="life"
          checked={selectedQuotes.includes("life")}
          onChange={selected}
        ></input>
        <input
          type="checkbox"
          value="humor"
          checked={selectedQuotes.includes("humor")}
          onChange={selected}
        ></input>
      </div>
      <div className="quotes">
        {filteredQuotes
          .map((quote) => {
            return (
              <div key={quote.id}>
                <Card
                  id={quote.id}
                  content={quote.content}
                  author={quote.author}
                  downvotesCount={quote.downvotesCount}
                  upvotesCount={quote.upvotesCount}
                  givenVotes={quote.givenVote}
                />
              </div>
            );
          })
          .slice((page - 1) * quotesPerPage, page * quotesPerPage)}
      </div>
      <div className="pagination">
        {numPages > 1 && (
          <Pagination
            className="pagination"
            size="large"
            count={numPages}
            page={page}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}
