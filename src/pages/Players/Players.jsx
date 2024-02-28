import { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import { navigate } from "@store";
import stiles from "./Players.module.css";

const ITEMS_PER_PAGE = 15;

const Players = () => {
  const { apiUrl } = useApi();
  const [players, setPlayers] = useState([]);
  const [createPlayer, setCreatePlayer] = useState(false);
  const [editPlayer, setEditPlayer] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("averagePoints");
  const [num, setNum] = useState(-1);
  const [beforeName, setBeforeName] = useState({
    name: {
      first_name: "",
      last_name: "",
    },
  });
  const [formData, setFormData] = useState({
    name: {
      first_name: "",
      last_name: "",
    },
    position: "",
    height: {
      height_feet: "",
      height_inches: "",
    },
    weight_pounds: "",
    stats: "",
    team: "",
    newTeam: "",
  });

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const reson = async () => {
    await axios
      .post(`${apiUrl}/players/find`, { sort: sort, num: num })
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  useEffect(() => {
    reson();
  }, []);

  useEffect(() => {
    reson();
  }, [sort, num]);

  const handleBackButton = () => {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 0));
  };

  const handleNextButton = () => {
    setCurrentPage((oldPage) => oldPage + 1);
  };

  const playersToShow = players.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  const deletePlayer = async (firstName, lastName) => {
    await axios
      .post(`${apiUrl}/players/delete`, {
        name: { first_name: firstName, last_name: lastName },
      })
      .then(() => {
        alert("Player Deleted");
        reson();
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission
    try {
      await axios.post(`${apiUrl}/players/create`, formData);
      reson();
      setCreatePlayer(false);
      alert("Se ha agregado el jugador exitosamente");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault(); // prevent default form submission
    try {
      await axios.put(`${apiUrl}/players/update`, {
        name: formData.name,
        position: formData.position,
        height: formData.height,
        weight_pounds: formData.weight_pounds,
        stats: formData.stats,
        team: formData.team_id,
        newTeam: formData.newTeam,
        beforeName: beforeName,
      });
      reson();
      setEditPlayer(false);
      alert("Se ha actualizado exitosamente");
    } catch (error) {
      // handle error here
      alert("No se pudo agregar el jugador", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: {
        first_name: "",
        last_name: "",
      },
      position: "",
      height: {
        height_feet: "",
        height_inches: "",
      },
      weight_pounds: "",
      stats: "",
      team: "",
      newTeam: "",
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${apiUrl}/players/find_specific`, {
        name: searchTerm,
      });
      if (response.data.length != 0) {
        setPlayers(response.data);
      } else {
        alert("No se encontraron jugadores con ese nombre");
        reson();
      }
    } catch (error) {
      console.log("An error occurred while searching for teams", error);
    }
  };

  const onClickCreate = () => {
    resetFormData();
    setCreatePlayer(true);
    setEditPlayer(false);
  };

  const onClickShow = () => {
    setCreatePlayer(false);
    setEditPlayer(false);
  };

  const onClickEdit = (player) => {
    setBeforeName(player.name);
    setFormData({ ...player, newTeam: "" });
    setEditPlayer(true);
    setCreatePlayer(false);
  };

  const handleSortChange = async (value) => {
    setSort(value.target.value);
  };

  const handleNumChange = async (value) => {
    const numero = Number(value.target.value);
    setNum(numero);
  };

  return (
    <div className={stiles.bigStyles}>
      <h1>Players</h1>
      <div className={stiles.botonesSection}>
        <button onClick={handleBackButtonClick}>Back To Main</button>
        <button onClick={onClickCreate}>Create</button>
        <button onClick={onClickShow}>Show Players</button>
        <button onClick={() => navigate("/playersstats")}>
          Player's Stats
        </button>

        {createPlayer == false && editPlayer == false ? (
          <div>
            <select onChange={handleSortChange}>
              <option value="averagePoints">Average Points</option>
              <option value="name">Name</option>
              <option value="weight_pounds">Weight</option>
              <option value="height">Height</option>
              <option value="position">Position</option>
              <option value="team_name">Team</option>
            </select>
            <select onChange={handleNumChange}>
              <option value="-1">Descendente</option>
              <option value="1">Ascendente</option>
            </select>
            <input
              type="text"
              placeholder="Search by team name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        ) : null}
      </div>

      {createPlayer == true && editPlayer == false ? (
        <div className={stiles.createPlayerSection}>
          <form>
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={formData.name.first_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, first_name: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={formData.name.last_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, last_name: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Height Feet:
              <input
                type="text"
                name="height_feet"
                value={formData.height.height_feet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: { ...formData.height, height_feet: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Height Inches:
              <input
                type="text"
                name="height_inches"
                value={formData.height.height_inches}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: {
                      ...formData.height,
                      height_inches: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Weight Pounds:
              <input
                type="text"
                name="weight_pounds"
                value={formData.weight_pounds}
                onChange={(e) =>
                  setFormData({ ...formData, weight_pounds: e.target.value })
                }
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              />
            </label>
            <label>
              Stats:
              <input
                type="text"
                name="stats"
                value={formData.stats}
                onChange={(e) =>
                  setFormData({ ...formData, stats: e.target.value })
                }
              />
            </label>
            <label>
              Team:
              <input
                type="text"
                name="team"
                value={formData.team}
                onChange={(e) =>
                  setFormData({ ...formData, team: e.target.value })
                }
              />
            </label>
            <button type="submit" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      ) : null}

      {editPlayer == true && createPlayer == false ? (
        <div className={stiles.createPlayerSection}>
          <form>
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={formData.name.first_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, first_name: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={formData.name.last_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, last_name: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Height Feet:
              <input
                type="text"
                name="height_feet"
                value={formData.height.height_feet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: { ...formData.height, height_feet: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Height Inches:
              <input
                type="text"
                name="height_inches"
                value={formData.height.height_inches}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: {
                      ...formData.height,
                      height_inches: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Weight Pounds:
              <input
                type="text"
                name="weight_pounds"
                value={formData.weight_pounds}
                onChange={(e) =>
                  setFormData({ ...formData, weight_pounds: e.target.value })
                }
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              />
            </label>
            <label>
              Stats:
              <input
                type="text"
                name="stats"
                value={formData.stats}
                onChange={(e) =>
                  setFormData({ ...formData, stats: e.target.value })
                }
              />
            </label>
            <label>
              Team:
              <input
                type="text"
                name="team"
                value={formData.newTeam}
                onChange={(e) =>
                  setFormData({ ...formData, newTeam: e.target.value })
                }
              />
            </label>
            <button type="submit" onClick={handleSubmitUpdate}>
              Update
            </button>
          </form>
        </div>
      ) : null}

      {players &&
      players.length > 0 &&
      createPlayer == false &&
      editPlayer == false ? (
        <div className={stiles.styles}>
          <div className={stiles.stylesBotones}>
            <button onClick={handleBackButton} disabled={currentPage === 0}>
              Back
            </button>
            <button
              onClick={handleNextButton}
              disabled={playersToShow.length < ITEMS_PER_PAGE}
            >
              Next
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Height</th>
                <th>Position</th>
                <th>Average Points</th>
                <th>Weight</th>
                <th>Current Team</th>
              </tr>
            </thead>
            <tbody>
              {playersToShow.map((player, index) => (
                <tr key={index}>
                  <td>
                    {player.name.first_name} {player.name.last_name}
                  </td>
                  <td>
                    {player.height.height_feet}'{player.height.height_inches}
                  </td>
                  <td>{player.position}</td>
                  <td>{player.stats[18]}</td>
                  <td>{player.weight_pounds}</td>
                  <td>{player.team_name}</td>
                  <td>
                    <div>
                      <button
                        style={{ backgroundColor: "black" }}
                        onClick={() => onClickEdit(player)}
                      >
                        Actualizar
                      </button>
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={async () => {
                          deletePlayer(
                            player.name.first_name,
                            player.name.last_name,
                          );
                        }}
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

export default Players;
