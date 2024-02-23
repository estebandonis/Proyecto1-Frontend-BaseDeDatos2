import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import stiles from "./Games.module.css";

const ITEMS_PER_PAGE = 15;
const FORM_DEFAULT = {
      // _id: "",
      date : "",
      season : "",
      period : "",
      status : "",
      postseason : "",
      home_team : {
        name : "",
        score : ""
      },
      visitor_team : {
        name : "",
        score : ""
      }
    }

const Games = () => {
  const { apiUrl } = useApi();
  const [games, setGames] = useState([]);
  const [submitGame, setSubmitGame] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [formData, setFormData] = useState(FORM_DEFAULT)
  
  const gamesToShow = games.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  const handleBackButtonClick = () => {
    window.history.back();
  };
  
  const handleBackButton = () => {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 0));
  };

  const handleNextButton = () => {
    setCurrentPage((oldPage) => oldPage + 1);
  };
  
  const deleteGame = async (id) => {
    try {
      await axios.delete(`${apiUrl}/teams/delete/${id}`);
      // Después de eliminar el equipo, volvemos a cargar la lista de equipos
      fetchTeams();
    } catch (error) {
      console.log("An error occurred while deleting team", error);
    }
  };

  const updateGame = (game) => {
    setFormData(game);
    setSubmitGame(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    try {
      if (games._id == "") {
        await axios.post(`${apiUrl}/games/create`, formData);
      } else {
        await axios.put(`${apiUrl}/games/update`, formData);
      }
      reson();
      setSubmitGame(false);
      setFormData(FORM_DEFAULT);
      alert("Se ha agregado el jugador exitosamente");
    } catch (error) {
      // handle error here
      alert("No se pudo agregar el jugador", error);
    }
  };

  const reson = async () => {
    await axios
      .get(`${apiUrl}/games/find`)
      .then((response) => {
        setGames(response.data);
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
      <div className={stiles.styles}>
        <h1>Games</h1>
      </div>
      <div className={stiles.botonesSection}>
        <button onClick={handleBackButtonClick}>Back To Main</button>
        <button onClick={() => setSubmitGame(!submitGame)}>Insert</button>
        <button onClick={() => setSubmitGame(false)}>Show Players</button>
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
              <input type="text" name="home_team_name" value={formData.home_team.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    home_team: { ...formData.home_team, name: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Home Team Score:
              <input type="text" name="home_team_score" value={formData.home_team.score}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    home_team: { ...formData.home_team, score: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Visitor Team Name:
              <input type="text" name="visitor_team_name" value={formData.visitor_team.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    visitor_team: { ...formData.visitor_team, name: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Visitor Team Score:
              <input type="text" name="visitor_team_score" value={formData.home_team.score}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    visitor_team: { ...formData.visitor_team, score: e.target.value },
                  })
                }
              />
            </label>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      ) : null}

      {games && games.length > 0 && submitGame == false ? (
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
              {gamesToShow.map((game, index) => (
                <tr key={index}>
                  <td>{game.date}</td>
                  <td>{game.season}</td>
                  <td>{game.period}</td>
                  <td>{game.status}</td>
                  <td>{game.postseason}</td>
                  <td>{game.home_team.name}</td>
                  <td>{game.home_team.score}</td>
                  <td>{game.visitor_team.name}</td>
                  <td>{game.visitor_team.score}</td>
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
