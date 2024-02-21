import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "@hooks";
import stiles from "./Teams.module.css";

const Teams = () => {
  const { apiUrl } = useApi();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBackButtonClick = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${apiUrl}/teams`);
        console.log("datos", response)
        setTeams(response.data);
      } catch (error) {
        console.log("An error occurred while retrieving data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [apiUrl]);

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Teams</h1>
        <button onClick={handleBackButtonClick}>Back</button>
      </div>

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
            </tr>
          </thead>
          <tbody>
          {Array.isArray(teams) && teams.map((team) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Teams;
