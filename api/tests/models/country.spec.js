const { Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

const countryTest = {
  name: "Neverland",
  idName: "NVL",
  flag: "dasdasdasd.png",
  continent: "America",
  capital: "Neverland",
  subregion: "North America",
  population: 10,
  area: 2,
};

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validaciones", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("name", async () => {
      it("Should return an error if the name is not sended", (done) => {
        Country.create({})
          .then(() => done(new Error("Valid name is required")))
          .catch(() => done());
      });
      it("Should create a country only if a name, flag, continent, capital and idName are provided", async () => {
        let pais = await Country.create({
          idName: 'NVL',
          name: "Neverland",
          flag: "dasdada.jpg",
          continent: "America",
          capital: "Neverland",
        });
        expect(pais.dataValues.name).equal("Neverland");
      });
    });
    describe("create", () => {
      it("Should load the values provided to create a country", async () => {
        let pais = await Country.create(countryTest);
        let neverland = pais.dataValues;
        expect(neverland.name).to.equal(countryTest.name);
        expect(neverland.idName).to.equal(countryTest.idName);
        expect(neverland.flagImg).to.equal(countryTest.flagImg);
        expect(neverland.population).to.equal(countryTest.population);
        expect(neverland.subregion).to.equal(countryTest.subregion);
        expect(neverland.area).to.equal(countryTest.area);
        expect(neverland.continent).to.equal(countryTest.continent);
        expect(neverland.capital).to.equal(countryTest.capital);
      });
    });
  });
});