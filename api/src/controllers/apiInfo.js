const axios = require("axios");
const { Country, Activity } = require("../db");
const {preLoadedActivities} = require("./activitiesPreLoaded");

const getApiInfo = async () => {
  try {
    const apiInfo = (await axios.get("https://restcountries.com/v3/all")).data;
    await apiInfo.map((element) => {
      Country.findOrCreate({
        where: {
          idName: element.cca3,
          name: element.name.common,
          flag: element.flags[0],
          continent: element.continents[0],
          capital: element.capital ? element.capital[0] : "Capital not found",
          subregion: element.subregion
            ? element.subregion
            : "Subregion not found",
          area: element.area,
          population: element.population,
          mapLocation: element.maps.googleMaps,
        },
      });
    });
    return "Countries successfully added in database...";
  } catch (e) {
    console.log("/api/src/routes/apiInfo.js apiInfo error: " + e);
  }
};

const getActivityData = async () => {
  try {
    const dbData = await Activity.findAll({
      include: {
        model: Country,
      },
    });
    return dbData;
  } catch (error) {
    console.log(error);
  }
};

const chargeActivitiesData = async () => {
  const dbData = await getActivityData();
  if (dbData.length < 1) {
    try {
      for (let i = 0; i < preLoadedActivities.length; i++) {
        const newActivity = await Activity.create({
          name: preLoadedActivities[i].name,
          difficulty: preLoadedActivities[i].difficulty,
          duration: preLoadedActivities[i].duration,
          season: preLoadedActivities[i].season,
        });

        preLoadedActivities[i].countriesInActivity.map(async (id) => {
          const founded = await Country.findAll({
            where: { idName: id},
          })
          if(founded) newActivity.addCountries(founded);
        })
      }
      return 'Activities successfully added in database...';
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = { 
  getApiInfo, 
  chargeActivitiesData, 
};
