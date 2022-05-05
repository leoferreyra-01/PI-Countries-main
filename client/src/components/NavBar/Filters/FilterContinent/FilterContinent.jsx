import React from "react";
import { useDispatch } from "react-redux";
import { filterContinent } from "../../../../Redux/Actions";
import "./FilterContinent.scss";

export default function FilterContinent({ setCurrentPage }) {
  const dispatch = useDispatch();

  function handleContinent(e) {
    dispatch(filterContinent(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className='filter-container'>
      <select className='filter-content' onChange={(e) => handleContinent(e)}>
        <option value='All'>All Continents</option>
        <option value='Antarctica'>Antarctica</option>
        <option value='Europe'>Europe</option>
        <option value='Africa'>Africa</option>
        <option value='Oceania'>Oceania</option>
        <option value='Asia'>Asia</option>
        <option value='North America'>North America</option>
        <option value='South America'>South America</option>
      </select>
    </div>
  );
}
