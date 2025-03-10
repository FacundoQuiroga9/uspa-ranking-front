import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TournamentShow.css";

const TournamentShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/tournaments/${id}`)
      .then((response) => response.json())
      .then((data) => setTournament(data))
      .catch((error) => console.error("Error fetching tournament:", error));
  }, [id]);

  if (!tournament) {
    return <h2 className="loading-message">Loading...</h2>;
  }

  // Formatear la fecha
  const formattedDate = new Date(tournament.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="tournament-show-wrapper">
      {/* Nombre del torneo centrado */}
      <h1 className="tournament-title-center">{tournament.name}</h1>

      {/* Botones de edición (simulación de admin logueado) */}
      <div className="admin-actions">
        <button className="edit-button" onClick={() => navigate(`/tournaments/${id}/edit`)}>
          EDIT
        </button>
        <button className="add-category-button" onClick={() => navigate(`/tournaments/${id}/categories/new`)}>
          ADD CATEGORY
        </button>
      </div>

      <div className="tournament-show-container">
        {/* Imagen del torneo */}
        <div className="tournament-image">
          <img src={tournament.photo_url} alt={tournament.name} />
        </div>

        {/* Información del torneo */}
        <div className="tournament-details justify-content-start">
          <div className="d-flex justify-content-between">
            <h2 className="club-name">{tournament.location}</h2>
            <p className="tournament-meta">
              {formattedDate}
            </p>
          </div>

          <p className="tournament-meta">
            <strong>{tournament.city}, {tournament.state}</strong>
          </p>

          {/* Sección de categorías */}
          <div className="categories-section">
            <div className="category-group">
              <h3 className="category-title men-title">MEN</h3>
              {tournament.men_categories?.length > 0 ? (
                tournament.men_categories.map((category, index) => (
                  <div key={index} className="category-card men-card">{category}</div>
                ))
              ) : (
                <p className="no-categories">No categories available</p>
              )}
            </div>

            <div className="category-group">
              <h3 className="category-title women-title">WOMEN</h3>
              {tournament.women_categories?.length > 0 ? (
                tournament.women_categories.map((category, index) => (
                  <div key={index} className="category-card women-card">{category}</div>
                ))
              ) : (
                <p className="no-categories">No categories available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Descripción ocupando todo el ancho */}
      <div className="tournament-description">
        <p>{tournament.description || "No description available."}</p>
      </div>
    </div>
  );
};

export default TournamentShow;
