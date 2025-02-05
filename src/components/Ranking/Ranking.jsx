import useRanking from "../../hooks/useRanking";
import RankingFilters from "./RankingFilters";
import RankingTable from "./RankingTable";
import "./Ranking.css";

const Ranking = () => {
  const { players, query, setQuery, gender, setGender, handleSearchSubmit } = useRanking();

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
        <RankingFilters
          query={query}
          setQuery={setQuery}
          gender={gender}
          setGender={setGender}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>
      <RankingTable players={players} handlePlayerClick={handlePlayerClick} />
    </div>
  );
};

export default Ranking;
