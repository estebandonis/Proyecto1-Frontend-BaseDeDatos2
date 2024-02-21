import React, { useEffect, useState } from "react";
import stiles from "./Teams.module.css";

const Teams = () => {
  const handleBackButtonClick = () => {
    window.history.back();
  };

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Teams</h1>
      </div>

      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
};

export default Teams;
