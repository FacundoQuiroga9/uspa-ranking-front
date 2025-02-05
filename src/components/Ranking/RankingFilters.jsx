import React from "react";

const RankingFilters = ({ query, setQuery, gender, setGender, handleSearchSubmit }) => {
  return (
    <div className="col d-flex align-items-center justify-content-end">
      <form className="d-flex" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="SEARCH PLAYER"
          className="filter-input mx-3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn-search d-flex align-items-center">
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </form>
      <div className="ms-3">
        <button
          className={`btn-men ${gender === "male" ? "active" : ""}`}
          onClick={() => setGender("male")}
        >
          MEN
        </button>
        <button
          className={`btn-women ${gender === "female" ? "active" : ""}`}
          onClick={() => setGender("female")}
        >
          WOMEN
        </button>
      </div>
    </div>
  );
};

export default RankingFilters;
