import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TournamentShow.css";
import useCategories from "../../hooks/useCategories";
import AddCategoryForm from "../Categories/AddCategoryForm";

const TournamentShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);

  // Hook para manejar categorías
  const { categories, fetchCategories, addCategory } = useCategories(id);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/tournaments/${id}`)
      .then((response) => response.json())
      .then((data) => setTournament(data))
      .catch((error) => console.error("Error fetching tournament:", error));

    fetchCategories(); // Cargar categorías cuando se monta el componente
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

  // Ordenar categorías en el orden correcto
  const categoryOrder = ["1st Division", "2nd Division", "3rd Division", "4th Division"];

  const menCategories = categories
    .filter((cat) => cat.gender === "Men")
    .sort((a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name));

  const womenCategories = categories
    .filter((cat) => cat.gender === "Women")
    .sort((a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name));

  return (
    <div className="tournament-show-wrapper">
      {/* Nombre del torneo centrado */}
      <h1 className="tournament-title-center">{tournament.name}</h1>

      {/* Botones de edición (simulación de admin logueado) */}
      <div className="admin-actions">
        <button className="edit-button" onClick={() => navigate(`/tournaments/${id}/edit`)}>
          EDIT
        </button>
      </div>

      {/* Formulario para agregar categorías */}
      <AddCategoryForm addCategory={addCategory} existingCategories={categories} />

      <div className="tournament-show-container">
        {/* Imagen del torneo */}
        <div className="tournament-image">
          <img src={tournament.photo_url} alt={tournament.name} />
        </div>

        {/* Información del torneo */}
        <div className="tournament-details justify-content-start">
          <div className="d-flex justify-content-between">
            <h2 className="club-name">{tournament.location}</h2>
            <p className="tournament-meta">{formattedDate}</p>
          </div>

          <p className="tournament-meta">
            <strong>{tournament.city}, {tournament.state}</strong>
          </p>

          {/* Sección de categorías */}
          <div className="categories-section">
            <div className="category-group">
              <h3 className="category-title men-title">MEN</h3>
              {menCategories.length > 0 ? (
                menCategories.map((category) => (
                  <div key={category.id} className="category-card men-card">
                    {category.name}
                  </div>
                ))
              ) : (
                <p className="no-categories">No categories available</p>
              )}
            </div>

            <div className="category-group">
              <h3 className="category-title women-title">WOMEN</h3>
              {womenCategories.length > 0 ? (
                womenCategories.map((category) => (
                  <div key={category.id} className="category-card women-card">
                    {category.name}
                  </div>
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
