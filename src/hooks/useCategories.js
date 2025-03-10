import { useState, useEffect } from "react";

const useCategories = (tournamentId) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/tournaments/${tournamentId}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/tournaments/${tournamentId}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors.join(", ") : "Error adding category");
      }

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  return { categories, fetchCategories, addCategory };
};

export default useCategories;
