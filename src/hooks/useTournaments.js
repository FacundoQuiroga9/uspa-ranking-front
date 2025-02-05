import { useState, useEffect } from "react";

const useTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),
    month: "",
    city: "",
    state: "",
  });

  const [availableFilters, setAvailableFilters] = useState({
    years: [],
    months: [],
    cities: [],
    states: [],
  });

  useEffect(() => {
    fetchTournaments(filters);
  }, []); // ✅ Se ejecuta solo una vez al cargar la página

  const fetchTournaments = async (filters) => {
    const queryString = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/tournaments?${queryString}`);
      const data = await response.json();

      if (data.tournaments) {
        setTournaments(data.tournaments);
        setAvailableFilters(data.filters);
      } else {
        setTournaments([]);
        setAvailableFilters({ years: [], months: [], cities: [], states: [] });
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const applyFilters = () => {
    fetchTournaments(filters);
  };

  return { tournaments, availableFilters, setFilters, applyFilters };
};

export default useTournaments;
