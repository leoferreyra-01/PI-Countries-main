import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries } from "../../Redux/Actions";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import "./Cards.scss";
import location from "../img/Location-icon-design-on-transparent-background-PNG.png";
import population from '../img/population-characteristics-population-pyramid-icon-with-gray-world-of-warcraft-transparent-png-2179832.png'

export default function Cards( {setCurrentPage, currentPage} ) {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  let [countryPerPage] = useState(9);
  const indexOfLastCountry = currentPage * countryPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countryPerPage;
  const currentCountry = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const pag = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div>
      <Pagination
        className="cards-pagination"
        currentPage={currentPage}
        totalCount={countries.length}
        pageSize={countryPerPage}
        onPageChange={pag}
      />
      <div>
        <span className="cards-conteiner">
          {currentCountry?.map((el) => {
            return (
              <div key={el.id} className="cards">
                <div className="cards-content">
                  <img src={el.flag} alt='' width='300rem' height='180rem'className='cards-flag' />
                  <h4 className="cards-name"> {el.name}</h4>
                  <h4 className="cards-info">
                    <img
                      src={location}
                      alt='location'
                      width='20rem'
                      height='20rem'
                    />
                     {el.continent}
                  </h4>
                  <h4 className="cards-info">
                  <img
                      src={population}
                      alt='location'
                      width='20rem'
                      height='20rem'
                    />
                     {el.population}
                  </h4>
                  <Link to={`/countries/${el.id}`}>
                    <button className="cards-btn">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </span>
      </div>
      <Pagination
        className="cards-pagination"
        currentPage={currentPage}
        totalCount={countries.length}
        pageSize={countryPerPage}
        onPageChange={pag}
      />
    </div>
  );
}

// classNames="cards-pagination")}
