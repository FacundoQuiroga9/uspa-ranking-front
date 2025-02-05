const TournamentsCard = ({ tournament }) => {
  const defaultImage = "/tournament-template.jpg"; // ✅ Ruta de la imagen en public
  const imageUrl = tournament.photo_url || defaultImage; // ✅ Si no hay imagen, usa la predeterminada

  return (
    <div className="tournament-card-wrapper">
      <a href={`/tournaments/${tournament.id}`} className="card-link">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt={tournament.name} />
          <div className="card-body">
            <h5 className="card-title">{tournament.name}</h5>
            <p className="card-text">
              <strong>City: </strong>{tournament.city}, {tournament.state}<br />
              <strong>Club:</strong> {tournament.location}<br />
              <strong>Date:</strong> {new Date(tournament.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default TournamentsCard;
