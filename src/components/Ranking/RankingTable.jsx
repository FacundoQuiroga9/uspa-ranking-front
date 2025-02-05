import React from "react";

const RankingTable = ({ players, handlePlayerClick }) => {
  return (
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
  );
};

export default RankingTable;
