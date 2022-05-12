const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();

const { Country, Activity } = require("../db.js");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    const newActivity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });
    countries.map(async (countryId) => {
      const foundCountry = await Country.findAll({
        where: { idName: countryId },
      });
      if (foundCountry) newActivity.addCountries(foundCountry);
    });
    res.status(201).json({ msg: "Activity created correctly" });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "CREATE_ACTIVITY_ERROR",
      description: "Error creating the activity",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: { model: Country, attributes: ["id", "name"] },
    });
    res.json(activities);
  } catch (e) {
    console.log("/api/src/routes/activities.js get error " + e);
    res.json({ error: "There is not an activity created" });
  }
});

router.delete("/del/:idActivity", async (req, res) => {
  const { idActivity } = req.params;
  try {
    const act = await Activity.findByPk(idActivity);
    if (!act) {
      return res.status(404).json({
        error: "ACT_NOT_FOUND",
        description: `There is no activity with the id ${idActivity}`,
      });
    }
    await act.destroy();
    return res.json({ msg: `The activity with the id ${idActivity} was deleted` });
  } catch (e) {
    console.log("/routes/activies.js error: " + e);
    return res.json({error: e.message})
  }
});
module.exports = router;
