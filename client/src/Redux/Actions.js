import {
  COUNTRIES_URL,
  ACTIVITY_URL,
  GET_COUNTRIES,
  GET_DETAILS,
  GET_ACTIVITIES,
  GET_NAME_COUNTRIES,
  FILTER_ACTIVITY,
  FILTER_BY_ALPHA,
  FILTER_CONTINENT,
  POPULATION_ORDER,
} from "./Constants";
import axios from "axios";

export function getAllCountries() {
  return async function (dispatch) {
    try {
      const countries = await axios.get(COUNTRIES_URL);
      return dispatch({ type: GET_COUNTRIES, payload: countries.data });
    } catch (e) {
      return e;
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const cotJson = await axios.get(`${COUNTRIES_URL}/${id}`);
      return dispatch({ type: GET_DETAILS, payload: cotJson.data });
    } catch (e) {
      return e;
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      const actJson = await axios.get(ACTIVITY_URL);
      return dispatch({ type: GET_ACTIVITIES, payload: actJson.data });
    } catch (e) {
      return e;
    }
  };
}

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      const countriesJson = await axios.get(`${COUNTRIES_URL}?name=${name}`);
      return dispatch({
        type: GET_NAME_COUNTRIES,
        payload: countriesJson.data,
      });
    } catch (e) {}
  };
}

//POSTS

export function postActivity(payload) {
  return async function () {
    try {
      const newActivity = await axios.post(ACTIVITY_URL, payload);
      return newActivity;
    } catch (e) {
      
    }
  };
}

//FILTERS

export function filterActivity(payload) {
  return {
    type: FILTER_ACTIVITY,
    payload,
  };
}

export function filterContinent(payload) {
  return {
    type: FILTER_CONTINENT,
    payload,
  };
}

export function filterAlpha(payload) {
  return {
    type: FILTER_BY_ALPHA,
    payload,
  };
}

export function populationOrder(payload) {
  return {
    type: POPULATION_ORDER,
    payload,
  };
}
