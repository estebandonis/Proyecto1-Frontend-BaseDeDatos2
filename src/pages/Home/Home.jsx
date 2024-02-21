import React, { useEffect, useState } from "react";
import { navigate } from "@store";
import { useStoreon } from "storeon/react";
import stiles from "./Home.module.css";

const Home = () => {
  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Home</h1>
      </div>

      <button onClick={() => navigate("/games")}>Games</button>
      <button onClick={() => navigate("/players")}>Players</button>
      <button onClick={() => navigate("/teams")}>Teams</button>
    </div>
  );
};

export default Home;
