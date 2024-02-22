import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useApi } from "@hooks";
//import { navigate } from "@store";

const UpdateTeam = ({ teamId, onComplete }) => {
  const { apiUrl } = useApi();
  const [team, setTeam] = useState({
    name: "",
    abbreviation: "",
    conference: "",
    division: "",
    city: "",
    arena: "",
    founded: "",
    logo: ""
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${apiUrl}/teams/find`, { params: { id: teamId } });
        setTeam(response.data);
      } catch (error) {
        console.log("An error occurred while fetching team data", error);
        alert('Error al actualizar equipo');
      }
    };

    fetchTeam();
  }, [apiUrl, teamId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${apiUrl}/teams/update/${teamId}`, team);
      onComplete();
    } catch (error) {
      console.log("An error occurred while updating team", error);
    }
  };

  return (
    <div>
      <h1>Actualizar Equipo</h1>
      <form>
        <label>
          Nombre:
          <input type="text" name="name" value={team.name} onChange={handleChange} />
        </label>
        <label>
          Abreviatura:
          <input type="text" name="abbreviation" value={team.abbreviation} onChange={handleChange} />
        </label>
        <label>
          Conferencia:
          <input type="text" name="conference" value={team.conference} onChange={handleChange} />
        </label>
        <label>
          División:
          <input type="text" name="division" value={team.division} onChange={handleChange} />
        </label>
        <label>
          Ciudad:
          <input type="text" name="city" value={team.city} onChange={handleChange} />
        </label>
        <label>
          Arena:
          <input type="text" name="arena" value={team.arena} onChange={handleChange} />
        </label>
        <label>
          Fundado:
          <input type="text" name="founded" value={team.founded} onChange={handleChange} />
        </label>
        <label>
          Logo:
          <input type="text" name="logo" value={team.logo} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSaveChanges}>Guardar Cambios</button>
      </form>
    </div>
  );
};

UpdateTeam.propTypes = {
  teamId: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default UpdateTeam;
