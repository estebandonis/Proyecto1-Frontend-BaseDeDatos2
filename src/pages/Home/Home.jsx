import React, { useEffect, useState } from "react";
import { navigate } from "@store";
import { useStoreon } from "storeon/react";
import stiles from "./Home.module.css";

const Home = () => {
  return (
    <div className={stiles.styles}>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
