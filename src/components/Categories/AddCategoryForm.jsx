import { useState } from "react";
import "./AddCategoryForm.css";

const AddCategoryForm = ({ addCategory, existingCategories }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");

  const categoryOptions = ["1st Division", "2nd Division", "3rd Division", "4th Division"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si la categoría ya existe en el torneo
    const categoryExists = existingCategories.some(
      (cat) => cat.name === name && cat.gender === gender
    );

    if (categoryExists) {
      setError("This category already exists in this tournament.");
      return;
    }

    // Intentar agregar la categoría
    try {
      await addCategory({ name, gender });
      setName(""); // Limpiar input
      setGender("male");
      setError(""); // Limpiar errores
    } catch (err) {
      setError("Failed to add category. It may already exist.");
    }
  };

  return (
    <form className="add-category-form" onSubmit={handleSubmit}>
      <h3>Add a Category</h3>

      <div className="form-row">
        {/* Select de categorías */}
        <label>Category:</label>
        <select value={name} onChange={(e) => setName(e.target.value)} required>
          <option value="" disabled>Select a category</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Select de género */}
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="male">Men</option>
          <option value="female">Women</option>
        </select>

        {/* Botón de submit */}
        <button type="submit" className="submit-category-btn">Add</button>
      </div>

      {/* Mensaje de error si la categoría ya existe */}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default AddCategoryForm;
