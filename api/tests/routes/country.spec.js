/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  id: "AAA",
  name: "PAIS",
  imgflag: "element.imgflag",
  continent: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 123,
  population: 456,
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(
    async () =>
      await Country.sync({ force: true }).then(
        async () => await Country.create(country)
      )
  );

  describe("GET /countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
    it("Responde con el nombre del Pais", () => {
      return agent
        .get("/countries/AAA")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.name).equal("PAIS");
        });
    });
  });
});
