import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getActivities,
  getAllCountries,
  postActivity,
} from "../../Redux/Actions";
import LoadingCreate from "./LoadingCreate/Loading";
import background from "../img/Activities.jpg";
import "./CreateActivity.scss";

const validationForm = (input) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!input.name.trim()) {
    errors.name = "Name is required";
  }
  if (!regexName.test(input.name.trim())) {
    errors.name = "The name field only accepts letters and blanks spaces";
  }
  if (!input.difficulty) {
    errors.difficulty = "Difficulty required";
  }
  if (!input.duration) {
    errors.duration = "Duration required";
  }
  if (input.duration < 1 || input.duration > 24) {
    errors.duration = "Duration must be between 1 and 24 hours";
  }
  if (!input.season) {
    errors.season = "Season required";
  }
  if (input.countries.length === 0) {
    errors.countries = "Countries or country required";
  }
  return errors;
};

export default function CreateActivity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  const [errors, setErrors] = useState({});
  const countries = useSelector((state) => state.countries).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validationForm(input));
    const errors = validationForm(input);
    if (Object.values(errors).length === 0) {
      dispatch(postActivity(input));
      setTimeout(() => {
        navigate("/countries");
      }, 1600);
    } else {
      alert("Please complete all the entries before creating an activity");
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validationForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (input.countries.includes(e.target.value)) {
      alert(`The country ${e.target.value} has already been selected`);
    } else {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
      setErrors(
        validationForm({
          ...input,
          countries: [...input.countries, e.target.value],
        })
      );
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e.target.name),
    });
    setErrors(
      validationForm({
        ...input,
        countries: input.countries.filter((c) => c !== e.target.name),
      })
    );
  };

  return (
    <>
      {loading === true ? (
        <LoadingCreate setLoading={setLoading} />
      ) : (
        <div className='create-container'>
          <img className='create-image' src={background} alt='Background' />
          <div className='navigate-btn'>
            <button
              className='btn-home'
              onClick={(e) => {
                e.preventDefault();
                navigate("/countries");
              }}>
              Back to Home
            </button>
          </div>
          <form className='create-form' onSubmit={(e) => handleSubmit(e)}>
            <h1 className='create-title'>Create your Activity</h1>
            <input
              className='input-form'
              type='text'
              name='name'
              value={input.name}
              placeholder='Activity name..'
              onChange={handleChange}
            />
            {errors.name && <p className='form-error'>{errors.name}</p>}
            <select
              className='select-form'
              name='difficulty'
              onChange={handleChange}>
              <option hidden value=''>
                Difficulty
              </option>
              <option value='Begginer'>Begginer</option>
              <option value='Amateur'>Amateur</option>
              <option value='Normal'>Normal</option>
              <option value='Professional'>Professional</option>
              <option value='Expert'>Expert</option>
            </select>
            {errors.difficulty && (
              <p className='form-error'>{errors.difficulty}</p>
            )}
            <input
              className='input-form'
              type='number'
              name='duration'
              placeholder='Enter the duration in hours'
              onChange={handleChange}
            />
            {errors.duration && <p className='form-error'>{errors.duration}</p>}
            <select
              className='select-form'
              name='season'
              onChange={handleChange}>
              <option hidden value=''>
                Season
              </option>
              <option value='Summer'>Summer</option>
              <option value='Autumn'>Autumn</option>
              <option value='Winter'>Winter</option>
              <option value='Spring'>Spring</option>
            </select>
            {errors.season && <p className='form-error'>{errors.season}</p>}
            <select
              className='select-form'
              name='country'
              placeholder='Select Countries'
              onChange={(e) => handleSelect(e)}>
              <option hidden value=''>
                Select Countries
              </option>
              {countries.map((e) => (
                <option key={e.id} value={e.idName} name={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            {input.countries.length > 0 && (
              <div className='countries'>
                <h3>Selected Countries</h3>
                <hr className='separation-bar' />
                <ul className='list-country'>
                  {input.countries.map((c) => {
                    let name = countries.map((country) =>
                      country.idName === c ? country.name : null
                    );
                    return (
                      <li className='country-cont' key={c.id}>
                        <button
                          name={c}
                          className='btn-cont'
                          onClick={(e) => {
                            handleDelete(e);
                          }}>
                          ❌
                        </button>{" "}
                        {name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {errors.countries && (
              <p className='form-error'>{errors.countries}</p>
            )}
            <button className='btn-submit' type='submit'>
              Create Activity
            </button>
          </form>
        </div>
      )}
    </>
  );
}
