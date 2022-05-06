const { expect, assert } = require("chai");
var should = require("chai").should();
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);

describe('POST /activity',()=>{
    before(async ()=>{
        await agent.get("/countries")
      })
    let activity
    beforeEach(()=>{
      activity={name:"Surf",difficulty:'Normal',season:"Summer",countries:["NVL"],duration:4}
    })
    xit("should create an activity",async()=>{
      await agent.post("/activity").send(activity).expect(201)
    })
    xit("the country should have the activity given",async()=>{
      await agent.post("/activity").send(activity)
      const pais=((await agent.get(`/countries/?name=N`))._body);
      expect(pais[0].activities[0].name).to.be.equal("Surf")
    })

  })