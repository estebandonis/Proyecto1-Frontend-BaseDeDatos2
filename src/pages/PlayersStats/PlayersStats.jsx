import { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import { navigate } from "@store";
import stiles from "./PlayersStats.module.css";

const PlayersStats = () => {
  const { apiUrl } = useApi();
  const [averages, setAverages] = useState([]);
  const [mvps, setMvps] = useState([]);

  const handleBackButtonClick = () => {
    navigate("/games")
  };

  const getAvgPoints = async () => {
    await axios
      .get(`${apiUrl}/players/find/averagePoints`)
      .then((response) => {
        setAverages(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  const getMVPs = async () => {
    await axios
      .get(`${apiUrl}/players/find/mvpRace`)
      .then((response) => {
        setMvps(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  useEffect(() => {
    getAvgPoints();
    getMVPs();
  }, []);

  return (
    <div className={stiles.bigStyles}>
      <h1>Players Stats</h1>
      <div className={stiles.botonesSection}>
        <button onClick={handleBackButtonClick}>Back To Players</button>
      </div>

      <h2>League Averages</h2>

      <table>
        <thead>
          <tr>
            <th>Average games played</th>
            <th>Average field goals made</th>
            <th>Average field goals attempted</th>
            <th>Average freethrows attempted</th>
            <th>Average rebounds</th>
            <th>Average assists</th>
            <th>Average personal fouls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{averages.averageGamesPlayed}</td>
            <td>{averages.averageFGM}</td>
            <td>{averages.averageFGA}</td>
            <td>{averages.averageFT}</td>
            <td>{averages.averageRebound}</td>
            <td>{averages.averageAssist}</td>
            <td>{averages.averagePF}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <th>Average steals</th>
          <th>Average blocks</th>
          <th>Average turnovers</th>
          <th>Average points</th>
          <th>Average field goal percentage</th>
          <th>Average field goal 3 percentage</th>
          <th>Average free throw percentage</th>
        </thead>
        <tbody>
          <td>{averages.averageSteals}</td>
          <td>{averages.averageBlocks}</td>
          <td>{averages.averageTurnovers}</td>
          <td>{averages.averagePoints}</td>
          <td>{averages.averageFGP}</td>
          <td>{averages.averageFG3P}</td>
          <td>{averages.averageFTP}</td>
        </tbody>
      </table>

      <h2>MVP Race</h2>

      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>MVP Score</th>
          </tr>
        </thead>
        <tbody>
          {mvps.map((player, index) => (
            <tr key={index}>
              <td>{player.name.first_name} {player.name.last_name}</td>
              <td>{player.mvpScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersStats;
