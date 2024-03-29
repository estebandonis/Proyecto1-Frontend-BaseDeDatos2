import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import { navigate } from "@store"
import stiles from "./Games.module.css";

const ITEMS_PER_PAGE = 15;
const FORM_DEFAULT = {
      _id: "",
      date : "",
      season : "",
      period : "",
      status : "",
      postseason : "",
      home_name: "",
      home_score: "",
      visitor_name: "",
      visitor_score : ""
    }

const Games = () => {
  const { apiUrl } = useApi();
  const [games, setGames] = useState([]);
  const [winStats, setWinStats] = useState([]);
  const [loseStats, setLoseStats] = useState([]);
  const [statPage, setStatPage] = useState("wins");
  const [submitGame, setSubmitGame] = useState(false);
  const [teamStats, setTeamStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState(-1);

  const [formData, setFormData] = useState(FORM_DEFAULT)
  
  const gamesToShow = currentPage * ITEMS_PER_PAGE

  const reson = async () => {
    await axios
      .get(`${apiUrl}/games/find/${gamesToShow}/${sortField}/${sortOrder}`)
      .then((response) => {
        setGames(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });

    await axios
      .get(`${apiUrl}/games/stats/wins`)
      .then((response) => {
        setWinStats(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });

    await axios
      .get(`${apiUrl}/games/stats/loses`)
      .then((response) => {
        setLoseStats(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  useEffect(() => {
    reson();
  }, [sortField, sortOrder]);

  const handleBackButtonClick = () => {
    navigate("/");
  };
  
  const handleBackButton = () => {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 0));
    reson();
  };

  const handleNextButton = () => {
    setCurrentPage((oldPage) => oldPage + 1);
    reson();
  };
  
  const deleteGame = async (id) => {
    try {
      await axios.delete(`${apiUrl}/games/delete/${id}`);
      // Después de eliminar el equipo, volvemos a cargar la lista de equipos
      reson();
      alert("Juego removido exitosamente");
    } catch (error) {
      console.log("An error occurred while deleting game", error);
    }
  };

  const updateGame = (game) => {
    setFormData(game);
    console.log(formData);
    setSubmitGame(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    console.log(formData);
    try {
      if (formData._id == "") {
        await axios.post(`${apiUrl}/games/create`, formData);
      } else {
        await axios.put(`${apiUrl}/games/update`, formData);
      }
      reson();
      setSubmitGame(false);
      setFormData(FORM_DEFAULT);
      alert("Se ha subido la informacion exitosamente");
    } catch (error) {
      // handle error here
      alert("No se pudo subir la informacion.", error);
      setSubmitGame(false);
      setFormData(FORM_DEFAULT);
    }
  };

  const showGames = () => {

  }

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Games</h1>
      </div>
      <div className={stiles.botonesSection}>
        <button onClick={handleBackButtonClick}>Back To Main</button>
        <button onClick={() => {setSubmitGame(!submitGame); setTeamStats(false)}}>Insert</button>
        <button onClick={() => {setSubmitGame(false); setTeamStats(false)}}>Show Games</button>
        <button onClick={() => {setTeamStats(!teamStats); setSubmitGame(false)}}>Show Team Stats</button>
        <select onChange={(e) => setSortField(e.target.value)}>
          <option value="date">date</option>
          <option value="season">season</option>
          <option value="period">period</option>
          <option value="home_name">home team name</option>
          <option value="home_score">home team score</option>
          <option value="visitor_name">visitor team name</option>
          <option value="visitor_score">visitor team score</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value={-1}>Descendente</option>
          <option value={1}>Ascendente</option>
        </select>
      </div>

      {submitGame == true ? (
        <div>
          <form>
            <label>
              Date:
              <input type="text" name="date" value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </label>
            <label>
              Season:
              <input
                type="text" name="season" value={formData.season}
                onChange={(e) =>
                  setFormData({...formData, season: e.target.value,})
                }
              />
            </label>
            <label>
              Period:
              <input type="text" name="period" value={formData.period}
                onChange={(e) =>
                  setFormData({...formData, period: e.target.value,})
                }
              />
            </label>
            <label>
              Status:
              <input type="text" name="status" value={formData.status}
                onChange={(e) =>
                  setFormData({...formData, status: e.target.value,})
                }
              />
            </label>
            <label>
              Postseason:
              <input type="text" name="Postseason" value={formData.postseason}
                onChange={(e) =>
                  setFormData({...formData,postseason: e.target.value,})
                }
              />
            </label>
            <label>
              Home Team Name:
              <input type="text" name="home_team_name" value={formData.home_name}
                onChange={(e) =>
                  setFormData({ ...formData, home_name: e.target.value })
                }
              />
            </label>
            <label>
              Home Team Score:
              <input type="text" name="home_team_score" value={formData.home_score}
                onChange={(e) =>
                  setFormData({ ...formData, home_score: e.target.value })
                }
              />
            </label>
            <label>
              Visitor Team Name:
              <input type="text" name="visitor_team_name" value={formData.visitor_name}
                onChange={(e) =>
                  setFormData({ ...formData, visitor_name: e.target.value })
                }
              />
            </label>
            <label>
              Visitor Team Score:
              <input type="text" name="visitor_team_score" value={formData.visitor_score}
                onChange={(e) =>
                  setFormData({ ...formData, visitor_score: e.target.value })
                }
              />
            </label>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      ) : null}

      {teamStats == true ? (
        <div>
          <select onChange={(e) => {setStatPage(e.target.value)}}>
            <option value="wins">Wins</option>
            <option value="loses">Loses</option>
          </select>
          { statPage == "wins" ? (
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {winStats.map((team, index) => (
                <tr key={index}>
                  <td>{team.team_name}</td>
                  <td>{team.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>): null}
          { statPage == "loses" ? (
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Loses</th>
              </tr>
            </thead>
            <tbody>
              {loseStats.map((team, index) => (
                <tr key={index}>
                  <td>{team.team_name}</td>
                  <td>{team.loses}</td>
                </tr>
              ))}
            </tbody>
          </table>): null}
        </div>
      ): null}

      {games && games.length > 0 && submitGame == false && teamStats == false ? (
        <div>
          <div>
            <button onClick={handleBackButton} disabled={currentPage === 0}>
              Back
            </button>
            <button onClick={handleNextButton} disabled={gamesToShow.length < ITEMS_PER_PAGE}>
              Next
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Season</th>
                <th>Period</th>
                <th>Status</th>
                <th>Postseason</th>
                <th>Home Team Name</th>
                <th>Home Team Score</th>
                <th>Visitors Team Name</th>
                <th>Visitors Team Score</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={index}>
                  <td>{game.date}</td>
                  <td>{game.season}</td>
                  <td>{game.period}</td>
                  <td>{game.status}</td>
                  <td>{game.postseason.toString()}</td>
                  <td>{game.home_name}</td>
                  <td>{game.home_score}</td>
                  <td>{game.visitor_name}</td>
                  <td>{game.visitor_score}</td>
                  <td>
                    <div>
                      <button
                        style={{ backgroundColor: "grey" }}
                        onClick={async () => {updateGame(game)}}
                      >
                        Actualizar
                      </button>
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={async () => {deleteGame(game._id)}}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Games;
