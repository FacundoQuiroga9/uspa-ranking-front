import { useState, useEffect } from "react";
import "./Ranking.css";

const Ranking = () => {
  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("male"); // ✅ Por defecto se muestra el ranking masculino

  useEffect(() => {
    fetchPlayers(""); // Carga inicial sin query
  }, [gender]); // ✅ Se vuelve a hacer fetch solo cuando cambia el género

  const fetchPlayers = async (searchQuery) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/players?query=${searchQuery}&gender=${gender}`
      );
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // ✅ Evita que la página recargue
    fetchPlayers(query);
    setQuery(""); // ✅ Limpia el campo de búsqueda después de hacer la solicitud
  };

  const handleGenderFilter = (selectedGender) => {
    setGender(selectedGender);
  };

  const handlePlayerClick = (playerId) => {
    console.log(`Jugador seleccionado con ID: ${playerId}`);
  };

  const handleAddPlayer = () => {
    console.log("Agregar nuevo jugador");
  };

  return (
    <div className="container my-5">
      <div className="table-row mb-3">
        <div className="col d-flex align-items-center justify-content-start">
          <h1>USPA Ranking</h1>
          <button className="btn-add-player ms-3" onClick={handleAddPlayer}>
            NEW PLAYER
          </button>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="SEARCH PLAYER"
              className="filter-input mx-3"
              value={query}
              onChange={handleSearch}
            />
            <button type="submit" className="btn-search d-flex align-items-center">
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </form>
          <div className="ms-3">
            <button
              className={`btn-men ${gender === "male" ? "active" : ""}`}
              onClick={() => handleGenderFilter("male")}
            >
              MEN
            </button>
            <button
              className={`btn-women ${gender === "female" ? "active" : ""}`}
              onClick={() => handleGenderFilter("female")}
            >
              WOMEN
            </button>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>POS</th>
            <th>PLAYER</th>
            <th>PTS</th>
            <th>TOURNAMENTS</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((player) => (
              <tr
                key={player.id}
                className="clickable-row"
                onClick={() => handlePlayerClick(player.id)}
              >
                <td>{player.ranking_position || "N/A"}</td>
                <td>{player.name || "N/A"}</td>
                <td>{player.points ? player.points.toFixed(1) : "N/A"}</td>
                <td>{player.tournaments_played || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No players found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
