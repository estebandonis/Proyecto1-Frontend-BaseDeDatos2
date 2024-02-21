import React, { useEffect, useState } from "react";
import stiles from "./Games.module.css";

const Games = () => {
  const handleBackButtonClick = () => {
    window.history.back();
  };

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Games</h1>
      </div>
      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
};

export default Games;
