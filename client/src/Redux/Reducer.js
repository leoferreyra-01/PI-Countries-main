import {
  GET_COUNTRIES,
  GET_DETAILS,
  GET_ACTIVITIES,
  GET_NAME_COUNTRIES,
  FILTER_ACTIVITY,
  FILTER_BY_ALPHA,
  FILTER_CONTINENT,
  POPULATION_ORDER,
} from "./Constants";
const initialState = {
  countries: [],
  allCountries: [],
  details: [],
  activities: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_NAME_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case FILTER_BY_ALPHA:
      const sortAlph =
        action.payload === "A-Z"
          ? state.countries.sort((a, b) => a.name.localeCompare(b.name))
          : state.countries.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        countries: sortAlph,
      };
    case FILTER_CONTINENT:
      const allCountries = state.allCountries;
      const continentFilter =
        action.payload === "All"
          ? allCountries
          : allCountries.filter(
              (country) => country.continent === action.payload
            );
      return {
        ...state,
        countries: continentFilter,
      };
    case POPULATION_ORDER:
      const population =
        action.payload === "High"
          ? state.countries.sort((a, b) => a.population - b.population)
          : state.countries.sort((a, b) => b.population - a.population);
      return {
        ...state,
        countries: population,
      };
    case FILTER_ACTIVITY:
      const countriesAct = state.countries
      const countriesAll = state.allCountries
      const activityFilter =
        action.payload === "All"
          ? countriesAll
          : countriesAct.filter(
              (e) =>
                e.activities &&
                e.activities.map((e) => e.name).includes(action.payload)
            );
      return {
        ...state,
        countries: activityFilter,
      };
    default:
      return { ...state };
  }
};

export default reducer;
