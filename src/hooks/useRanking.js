import { useState, useEffect } from "react";

const useRanking = () => {
  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("male"); // ✅ Por defecto se muestra el ranking masculino

  useEffect(() => {
    fetchPlayers("");
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPlayers(query);
    setQuery(""); // ✅ Limpia el input después de la búsqueda
  };

  return {
    players,
    query,
    setQuery,
    gender,
    setGender,
    handleSearchSubmit,
  };
};

export default useRanking;
