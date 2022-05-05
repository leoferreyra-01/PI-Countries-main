import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCountries } from "../../Redux/Actions";
import FilterActivity from "./Filters/FilterActivity/FilterActivity";
import FilterAlpha from "./Filters/FilterAlpha/FilterAlpha";
import FilterContinent from "./Filters/FilterContinent/FilterContinent";
import FilterPopulation from "./Filters/FilterPopulation/FilterPopulation";
import "./NavBar.scss";

export default function NavBar({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFilters(e) {
    e.preventDefault();
    dispatch(getAllCountries());
    setCurrentPage(1);
  }

  function handleClick(e) {
    e.preventDefault();
    navigate("/create");
  }
  return (
    <div className='nav-container'>
      <FilterActivity setCurrentPage={setCurrentPage} />
      <FilterContinent setCurrentPage={setCurrentPage} />
      <FilterAlpha setOrder={setOrder} />
      <FilterPopulation setOrder={setOrder} />
      <button className='nav-btn' onClick={(e) => handleFilters(e)}>
        Clear Filters
      </button>
      <button className='nav-btn' onClick={(e) => handleClick(e)}>
        Create Activity
      </button>
    </div>
  );
}
