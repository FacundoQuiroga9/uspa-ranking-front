import { useState, useEffect } from 'react';
import './Ranking.css';

const Ranking = () => {
  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, [query, gender]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/players?query=${query}&gender=${gender}`);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleGenderFilter = (selectedGender) => {
    setGender(selectedGender);
  };

  const handlePlayerClick = (playerId) => {
    // Lógica para manejar el clic en un jugador, por ejemplo, navegar a la página de detalles del jugador
    console.log(`Jugador seleccionado con ID: ${playerId}`);
  };

  const handleAddPlayer = () => {
    // Lógica para agregar un nuevo jugador
    console.log('Agregar nuevo jugador');
  };

  return (
    <div className="container my-5">
      <div className="table-row mb-3">
        <div className="col d-flex align-items-center justify-content-start">
          <h1>USPA Ranking</h1>
          {/* Botón para agregar nuevo jugador */}
          <button className="btn-add-player ms-3" onClick={handleAddPlayer}>
            NEW PLAYER
          </button>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="SEARCH PLAYER"
              className="filter-input mx-3"
              value={query}
              onChange={handleSearch}
            />
            <button type="submit" className="btn-search d-flex align-items-center">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div className="ms-3">
            <button
              className={`btn-men ${gender === 'male' ? 'active' : ''}`}
              onClick={() => handleGenderFilter('male')}
            >
              MEN
            </button>
            <button
              className={`btn-women ${gender === 'female' ? 'active' : ''}`}
              onClick={() => handleGenderFilter('female')}
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
          {players.map((player) => (
            <tr key={player.id} className="clickable-row" onClick={() => handlePlayerClick(player.id)}>
              <td>{player.ranking_position}</td>
              <td>{player.name}</td>
              <td>
                {typeof player.points === 'number'
                  ? player.points.toFixed(1).replace(/\.0$/, '')
                  : 'N/A'}
              </td>
              <td>{player.tournaments_played}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación: Implementa la lógica de paginación según sea necesario */}
    </div>
  );
};

export default Ranking;
