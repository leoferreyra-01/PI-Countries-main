const express = require("express");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();

const { Country, Activity } = require("../db.js");

router.use(express.json());

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let findName = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: Activity,
      });
      if (findName.length) {
        return res.json(findName);
      }
      return res
        .status(404)
        .json({
          error: "COUNTRY_NOT_FOUND",
          description: "The entered country does not exist.",
        });
    }
    const countryInDB = await Country.findAll({
      include: { model: Activity },
    });
    res.status(200).json(countryInDB);
  } catch (e) {
    console.log("/routes/countries get error", e.message);
    return res
      .status(404)
      .send({ error: "NOT_FOUND", description: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
      },
    });
    country
      ? res.status(200).json(country)
      : res
          .status(404)
          .json({
            error: "COUNTRY_NOT_FOUND",
            description: `There is not a country with ${id.toUpperCase()}`,
          });
  } catch (e) {
    console.log("/routes/countries/:id get error", e);
    res.status(500).send({ error: "ID_ERROR", description: "Error found ID" });
  }
});

module.exports = router;
