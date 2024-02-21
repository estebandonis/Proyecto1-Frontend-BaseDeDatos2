import React, { useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import { navigate } from "@store";

const AddTeam = () => {
  const { apiUrl } = useApi();
  const [teamData, setTeamData] = useState({
    name: "",
    abbreviation: "",
    conference: "",
    division: "",
    city: "",
    arena: "",
    founded: "",
    logo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...teamData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/teams/create`, teamData);
      alert('Equipo añadido correctamente');
      navigate("/teams");
    } catch (error) {
      console.error('Error al añadir equipo:', error);
      alert('Error al añadir equipo');
    }
  };

  return (
    <div>
      <h2>Añadir Equipo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={teamData.name} onChange={handleChange} />
        </label>
        <label>
          Abreviatura:
          <input type="text" name="abbreviation" value={teamData.abbreviation} onChange={handleChange} />
        </label>
        <label>
          Conferencia:
          <input type="text" name="conference" value={teamData.conference} onChange={handleChange} />
        </label>
        <label>
          División:
          <input type="text" name="division" value={teamData.division} onChange={handleChange} />
        </label>
        <label>
          Ciudad:
          <input type="text" name="city" value={teamData.city} onChange={handleChange} />
        </label>
        <label>
          Arena:
          <input type="text" name="arena" value={teamData.arena} onChange={handleChange} />
        </label>
        <label>
          Fundado:
          <input type="text" name="founded" value={teamData.founded} onChange={handleChange} />
        </label>
        <label>
          Logo:
          <input type="text" name="logo" value={teamData.logo} onChange={handleChange} />
        </label>
        <button type="submit">Añadir Equipo</button>
      </form>
    </div>
  );
}


export default AddTeam;
