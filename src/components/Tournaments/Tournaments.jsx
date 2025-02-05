import useTournaments from "../../hooks/useTournaments";
import TournamentFilters from "./TournamentsFilters";
import TournamentCard from "./TournamentsCard";
import "./Tournaments.css";

const Tournaments = () => {
  const { tournaments, availableFilters, setFilters, applyFilters } = useTournaments();

  return (
    <div className="container my-5">
      <TournamentFilters availableFilters={availableFilters} setFilters={setFilters} applyFilters={applyFilters} />
      <div className="container tournament-container mt-5">
        {tournaments.length > 0 ? (
          tournaments.map((tournament) => <TournamentCard key={tournament.id} tournament={tournament} />)
        ) : (
          <h2 className="page-subtitle">No tournaments found.</h2>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
