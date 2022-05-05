import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetails } from "../../../Redux/Actions";
import Activity from "./Activities/Activity";
import LoadingDetails from "./LoadingDetails/LoadingDetails";
import background from "../../img/Landing.jpg";
import "./Details.scss";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  function hancleClick(e) {
    e.preventDefault();
    navigate("/countries");
  }

  return (
    <>
      {loading === true ? (
        <LoadingDetails setLoading={setLoading} />
      ) : (
        <div className='details-container'>
          <div className='details-card'>
            <img className='details-img' src={background} alt='Background' />
            <div className='details-content'>
              <h1 className='details-title'>{details.name}</h1>
              <img
                className='details-flag'
                src={details.flag}
                alt={`flag from ${details.name}`}
              />
              <div className='details-info'>
                <div className='info-location'>
                  <h2>Continent: {details.continent}</h2>
                  <h2>Capital: {details.capital}</h2>
                  <h2>Subregion: {details.subregion}</h2>
                </div>
                <div className='location-maps'>
                  <button
                    className='location-btn'
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(details.mapLocation, "_blank");
                    }}>
                    📌
                  </button>
                  <h3>View Location</h3>
                </div>
                <div className='info-geography'>
                  <h2>Area:</h2>
                  <h3>{details.area} km2</h3>
                  <h2>Population:</h2>
                  <h3>{details.population}</h3>
                </div>
              </div>
              <div className='details-activity'>
                <p>
                  <strong>Activities</strong>
                </p>
              </div>
              {details.activities?.map((e) => {
                return (
                  <Activity
                    key={e.id}
                    name={e.name}
                    difficulty={e.difficulty}
                    duration={e.duration}
                    season={e.season}
                  />
                );
              })}
            </div>
            <div className='details-btn'>
              <button className='btn-home' onClick={(e) => hancleClick(e)}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
