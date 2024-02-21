import React, { useEffect, useState } from "react";
import stiles from "./Players.module.css";

const Players = () => {
  const handleBackButtonClick = () => {
    window.history.back();
  };

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
