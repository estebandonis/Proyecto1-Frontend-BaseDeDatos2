import { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import stiles from "./PlayersStats.module.css";

const PlayersStats = () => {
  const { apiUrl } = useApi();
  const [averages, setAverages] = useState([]);

  const handleBackButtonClick = () => {
    window.history.back();
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

  useEffect(() => {
    getAvgPoints();
  }, []);

  return (
    <div className={stiles.bigStyles}>
      <h1>Players Stats</h1>
      <div className={stiles.botonesSection}>
        <button onClick={handleBackButtonClick}>Back To Players</button>
      </div>

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
    </div>
  );
};

export default PlayersStats;
