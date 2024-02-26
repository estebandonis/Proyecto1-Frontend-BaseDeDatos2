import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import { navigate } from "@store"; 
import stiles from "./Teams.module.css";

const Teams = () => {
  const { apiUrl } = useApi();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [updatedTeam, setUpdatedTeam] = useState({
    name: "",
    abbreviation: "",
    conference: "",
    division: "",
    city: "",
    arena: "",
    founded: "",
    logo: ""
  });

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const handleAddButtonClick = () => {
    navigate("/addteams");
  };

  const handleUpdateButtonClick = (team) => {
    setSelectedTeam(team);
    setUpdatedTeam(team);
  };
  
  const handleDeleteButtonClick = async (id) => {
    try {
      await axios.delete(`${apiUrl}/teams/delete/${id}`);
      // Después de eliminar el equipo, volvemos a cargar la lista de equipos
      fetchTeams();
    } catch (error) {
      console.log("An error occurred while deleting team", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${apiUrl}/teams`);
      setTeams(response.data);
    } catch (error) {
      console.log("An error occurred while retrieving data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${apiUrl}/teams/find`, {
        params: { name: searchTerm }
      });
      setTeams(response.data);
    } catch (error) {
      console.log("An error occurred while searching for teams", error);
    }
  };

  const handleSave = async () => {
    // Validar la longitud del nombre
    if (updatedTeam.name.length > 250) {
      alert('El nombre debe tener como máximo 250 caracteres');
      return;
    }

    // Validar la longitud de la abreviatura
    if (updatedTeam.abbreviation.length > 5) {
      alert('La abreviatura debe tener como máximo 5 caracteres');
      return;
    }

    // Validar la longitud de la ciudad, división y conferencia
    if (
      updatedTeam.city.length > 100 ||
      updatedTeam.division.length > 100 ||
      updatedTeam.conference.length > 100
    ) {
      alert('La ciudad, división y conferencia deben tener como máximo 100 caracteres');
      return;
    }

    // Validar la longitud de "fundado"
    if (updatedTeam.founded.length > 4) {
      alert('El año de fundación debe tener como máximo 4 números');
      return;
    }
    try {
      await axios.put(`${apiUrl}/teams/update/${selectedTeam._id}`, updatedTeam);
      fetchTeams();
      setSelectedTeam(null); // Limpiar el equipo seleccionado después de guardar
    } catch (error) {
      console.log("An error occurred while updating team", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [apiUrl]);

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Teams</h1>
        <button onClick={handleBackButtonClick}>Back</button>
        <button onClick={handleAddButtonClick}>Add Team</button>
        <input
          type="text"
          placeholder="Search by team name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {selectedTeam ? (
        <div>
          <h2>Update Team</h2>
          <form>
            <label>Nombre:</label>
            <input
              type="text"
              value={updatedTeam.name}
              onChange={(e) => setUpdatedTeam({ ...updatedTeam, name: e.target.value })}
            />
            <label>Abreviacion:</label>
            <input
              type="text"
              value={updatedTeam.abbreviation}
              onChange={(e) => setUpdatedTeam({ ...updatedTeam, abbreviation: e.target.value })}
            />
            <label>Conferencia:</label>
            <input
              type="text"
              value={updatedTeam.conference}
              onChange={(e) => setUpdatedTeam({ ...updatedTeam, conference: e.target.value })}
            />
            <label>Division:</label>
            <input
              type="text"
              value={updatedTeam.division}
              onChange={(e) => setUpdatedTeam({ ...updatedTeam, division: e.target.value })}
            />
            <label>Ciudad:</label>
            <input
              type="text"
              value={updatedTeam.city}
              onChange={(e) => setUpdatedTeam({ ...updatedTeam, city: e.target.value })}
            />
            <label>Arena:</label>
            <input
              type="text"
              value={updatedTeam.arena}
              onChange={(e) => setUpdatedTeam({ ...updatedTeam, arena: e.target.value })}
            />
            <label>Fundada:</label>
            <input
              type="text"
              value={updatedTeam.founded}
              onChange={(e) => setUpdatedTeam({ ...updatedTeam, founded: e.target.value })}
            />
            <label>Logo:</label>
            <input
              type="text"
              value={updatedTeam.logo}
              onChange={(e) => setUpdatedTeam({ ...updatedTeam, logo: e.target.value })}
            />
            <button type="button" onClick={handleSave}>Guardar</button>
          </form>
        </div>
      ) : null}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Abreviacion</th>
              <th>Conferencia</th>
              <th>Division</th>
              <th>Ciudad</th>
              <th>Arena</th>
              <th>Fundada</th>
              <th>Logo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id}>
                <td>{team.name}</td>
                <td>{team.abbreviation}</td>
                <td>{team.conference}</td>
                <td>{team.division}</td>
                <td>{team.city}</td>
                <td>{team.arena}</td>
                <td>{team.founded}</td>
                <td>
                  <img src={team.logo} alt={`${team.name} Logo`} />
                </td>
                <td>
                  <button onClick={() => handleUpdateButtonClick(team)}>Actualizar</button>
                  <button onClick={() => handleDeleteButtonClick(team._id)} style={{ backgroundColor: 'red' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Teams;
