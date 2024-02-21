import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import stiles from "./Players.module.css";

const Players = () => {
  const { apiUrl } = useApi();
  const [players, setPlayers] = useState([]);

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const reson = async () => {
    await axios
      .get(`${apiUrl}/players/find`)
      .then((response) => {
        setPlayers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  useEffect(() => {
    reson();
  }, []);

  return (
    <div className={stiles.bigStyles}>
      <h1>Players</h1>

      <button onClick={handleBackButtonClick}>Back</button>

      {players && players.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Height</th>
              <th>Position</th>
              <th>Stats</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.name.first_name} {player.name.last_name}
                </td>
                <td>
                  {player.height.height_feet}
                  {player.height.height_inches}
                </td>
                <td>{player.position}</td>
                <td>{player.stats[0]}</td>
                <td>{player.weight_pounds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Players;
