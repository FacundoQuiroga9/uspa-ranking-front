import React from "react";

const TournamentFilters = ({ availableFilters, setFilters, applyFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container flex-wrap mt-5 d-flex justify-content-between align-items-center">
      <h1 className="page-title">Calendar</h1>
      <form className="d-flex mobile-inputs align-items-center">
        <select name="year" className="form-control mx-2 filter-input" onChange={handleChange}>
          <option value="">Year</option>
          {availableFilters.years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select name="month" className="form-control mx-2 filter-input" onChange={handleChange}>
          <option value="">Month</option>
          {availableFilters.months.map((month) => (
            <option key={month} value={month}>
              {new Date(2024, month - 1, 1).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        <select name="city" className="form-control mx-2 filter-input" onChange={handleChange}>
          <option value="">City</option>
          {availableFilters.cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select name="state" className="form-control mx-2 filter-input" onChange={handleChange}>
          <option value="">State</option>
          {availableFilters.states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <button type="button" className="btn-filter" onClick={applyFilters}>
          FILTER
        </button>
      </form>
    </div>
  );
};

export default TournamentFilters;
