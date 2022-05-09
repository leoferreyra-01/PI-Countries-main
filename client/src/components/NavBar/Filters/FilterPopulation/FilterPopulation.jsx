import React from "react";
import { useDispatch } from "react-redux";
import { populationOrder } from "../../../../Redux/Actions";
import "./FilterPopulation.scss";

export default function FilterPopulation({ setOrder }) {
  const dispatch = useDispatch();

  function handlePopulation(e) {
    e.preventDefault();
    dispatch(populationOrder(e.target.value));
    setOrder(e.target.value);
  }

  return (
    <div className='filter-container'>
      <select className='filter-content' onChange={(e) => handlePopulation(e)}>
        <option hidden value=''>
          By Population
        </option>
        <option value='High'>Lower</option>
        <option value='Low'>Higher</option>
      </select>
    </div>
  );
}
