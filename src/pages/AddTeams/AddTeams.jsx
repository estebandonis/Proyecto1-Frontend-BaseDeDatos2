import React, { useState, useEffect } from "react";
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
  const [teamsCount, setTeamsCount] = useState(0);

  useEffect(() => {
    const fetchTeamsCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}/teams`);
        const count = response.data.length;
        setTeamsCount(count);
      } catch (error) {
        console.error("Error fetching teams count:", error);
      }
    };

    fetchTeamsCount();
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...teamData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar la longitud del nombre
    if (teamData.name.length > 250) {
      alert('El nombre debe tener como máximo 250 caracteres');
      return;
    }

    // Validar la longitud de la abreviatura
    if (teamData.abbreviation.length > 5) {
      alert('La abreviatura debe tener como máximo 5 caracteres');
      return;
    }

    // Validar la longitud de la ciudad, división y conferencia
    if (
      teamData.city.length > 100 ||
      teamData.division.length > 100 ||
      teamData.conference.length > 100
    ) {
      alert('La ciudad, división y conferencia deben tener como máximo 100 caracteres');
      return;
    }

    // Validar la longitud de "fundado"
    if (teamData.founded.length > 4) {
      alert('El año de fundación debe tener como máximo 4 números');
      return;
    }


    try {
      if (teamsCount >= 35) {
        alert("Se ha alcanzado la máxima capacidad de equipos (35)");
        return;
      }
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
