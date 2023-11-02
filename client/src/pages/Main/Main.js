import React from "react";
import Card from "../../components/Card/Card";
import "./Main.css";
import { useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

export default function Main() {
  const { quotes, setQuotes, accessToken } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const quotesPerPage = 4;
  const [numPages, setNumPages] = useState(
    Math.ceil(quotes.length / quotesPerPage)
  );

  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const handleTag = (e) => {
    const tag = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
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
        console.log(result.data.quotes[0].upvotesCount);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredQuotes = quotes.filter((quote) => {
    if (selectedQuotes.length === 0) {
      return true;
    }
    return quote.tags.some((tag) => selectedQuotes.includes(tag));
  });

  return (
    <div className="main">
      <div className="quotess">
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
                  givenVotee={quote.givenvotes}
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
            color="secondary"
          />
        )}
      </div>
    </div>
  );
}
