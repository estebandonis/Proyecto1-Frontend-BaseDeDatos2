import React, { useEffect, useState } from "react";
import { useApi } from "@hooks";
import stiles from "./Players.module.css";

const Players = () => {
  const { loading, data, handleRequest } = useApi();

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const reson = async () => {
    const response = await handleRequest("GET", "/players/find");
    return response.data;
  };

  useEffect(() => {
    console.log(reson());
  }, []);

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Players</h1>
      </div>

      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
};

export default Players;
