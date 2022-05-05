import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../Redux/Actions";
import "./SearchBar.scss";
import search from "../img/search.png";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setName("");
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length > 0) {
      dispatch(getNameCountries(name));
      setCurrentPage(1);
      setName("");
    } else {
      alert("Enter a available country please c:");
    }
  }
  return (
    <div className='search-container'>
      <input
        className='search-input'
        type='text'
        placeholder={"Search a Country..."}
        value={name}
        onChange={(e) => handleSearch(e)}
      />
      <button
        className='search-btn'
        type='submit'
        onClick={(e) => handleSubmit(e)}>
        <img className='search-img' src={search} alt='Search' />
      </button>
    </div>
  );
}
