import classNames from "classnames";
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
  const countries = useSelector((state) => state.countries);
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
      console.log(input);
      dispatch(postActivity(input));
      alert("Activity added correctly!");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countriesInActivity: [],
      });
      dispatch(getActivities());
      navigate("/countries");
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
    console.log(input);
  };

  return (
    <>
      {loading === true ? (
        <LoadingCreate setLoading={setLoading} />
      ) : (
        <div className={classNames("create-container")}>
          <img
            className={classNames("create-image")}
            src={background}
            alt='Background'
          />
          <div className={classNames("navigate-btn")}>
            <button
              className={classNames("btn-home")}
              onClick={(e) => {
                e.preventDefault();
                navigate("/countries");
              }}>
              Back to Home
            </button>
          </div>
          <form
            className={classNames("create-form")}
            onSubmit={(e) => handleSubmit(e)}>
            <h1 className={classNames("create-title")}>Create your Activity</h1>
            <input
              className={classNames("input-form")}
              type='text'
              name='name'
              value={input.name}
              placeholder='Activity name..'
              onChange={handleChange}
            />
            {errors.name && <p className={classNames('form-error')}>{errors.name}</p>}
            <select
              className={classNames("select-form")}
              name='difficulty'
              onChange={handleChange}>
              <option value=''>Difficulty</option>
              <option value='Begginer'>Begginer</option>
              <option value='Amateur'>Amateur</option>
              <option value='Normal'>Normal</option>
              <option value='Professional'>Professional</option>
              <option value='Expert'>Expert</option>
            </select>
            {errors.difficulty && <p className={classNames('form-error')}>{errors.difficulty}</p>}
            <input
              className={classNames("input-form")}
              type='number'
              name='duration'
              placeholder='Enter the duration in hours'
              onChange={handleChange}
            />
            {errors.duration && <p className={classNames('form-error')}>{errors.duration}</p>}
            <select
              className={classNames("select-form")}
              name='season'
              onChange={handleChange}>
              <option value=''>Season</option>
              <option value='Summer'>Summer</option>
              <option value='Autumn'>Autumn</option>
              <option value='Winter'>Winter</option>
              <option value='Spring'>Spring</option>
            </select>
            {errors.season && <p className={classNames('form-error')}>{errors.season}</p>}
            <select
              className={classNames("select-form")}
              name='country'
              placeholder='Select Countries'
              onChange={(e) => handleSelect(e)}>
              <option value=''>Select Countries</option>
              {countries.map((e) => (
                <option key={e.id} value={e.idName} name={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            {input.countries.length > 0 && (
              <div className={classNames("countries")}>
                <h3>Selected Countries</h3>
                <hr className={classNames("separation-bar")}/>
                <ul className={classNames("list-country")}>
                  {input.countries.map((c) => {
                    let name = countries.map((country) =>
                      country.idName === c ? country.name : null
                    );
                    return (
                      <li className={classNames("country-cont")} key={c.id}>
                        <button
                          name={c}
                          className={classNames("btn-cont")}
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
            {errors.countries && <p className={classNames('form-error')}>{errors.countries}</p>}
            <button className={classNames("btn-submit")} type='submit'>
              Create Activity
            </button>
          </form>
        </div>
      )}
    </>
  );
}
