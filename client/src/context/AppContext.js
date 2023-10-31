import React from "react";
import { createContext } from "react";
import { useState } from "react";

const AppContext = createContext();

function ContextProvider({ children }) {
  const [accessToken] = useState("yuim98oq-e275-45a2-bc2e-b3098036d655");
  const [quotes, setQuotes] = useState([]);
  const [token, setToken] = useState(null);
  const values = {
    quotes,
    setQuotes,
    token,
    setToken,
    accessToken,
  };
  return (
    <>
      <AppContext.Provider value={values}>{children}</AppContext.Provider>
    </>
  );
}
export { AppContext, ContextProvider };
