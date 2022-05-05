import React, { useState } from "react";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "./Loading/Loading";
import "./Home.scss";
import background from "../img/Landing.jpg";

export default function Home() {
  const [order, setOrder] = useState(""); // eslint-disable-line
  const [currentPage, setCurrentPage] = useState(1); // eslint-disable-line
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading === true ? (
        <Loading setLoading={setLoading} />
      ) : (
        <div>
          <div className="home-conteiner">
            <img
              className="home-image"
              src={background}
              alt='Background'
            />

            <div className="home-content">
              <NavBar
                setOrder={setOrder}
                setCurrentPage={setCurrentPage}
              />
              <SearchBar setCurrentPage={setCurrentPage} />
              <Cards setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
