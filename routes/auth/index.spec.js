const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const request = require("supertest");
const usersDa = require("../../data-access/users");
const setup = require("../../test/setup");

chai.use(chaiAsPromised);
const expect = chai.expect;

let app;
let user;
let auth;
const API_URL = "/api/auth";

describe("routes/auth", () => {
  before(async () => {
    app = await setup.beforeAction();
  });

  beforeEach(async () => {
    await usersDa.removeAll();
    user = await usersDa.create({
      firstName: "agung",
      lastName: "saputra",
      username: "agungsptr",
      password: "24434",
    });

    auth = await request(app)
      .post(`${API_URL}/login`)
      .send({
        username: user.username,
        password: "24434",
      })
      .then((res) => res.body.data);
  });

  afterEach(async () => {
    await usersDa.removeAll();
  });

  it(`LOGIN ${API_URL}/login`, async () => {
    const req = await request(app)
      .post(`${API_URL}/login`)
      .send({ username: user.username, password: "24434" });

    expect(req.statusCode).to.eql(200);
  });

  it(`LOGOUT ${API_URL}/logout`, async () => {
    const req = await request(app)
      .post(`${API_URL}/logout`)
      .set("Authorization", auth.token)
      .send();
    expect(req.statusCode).to.eql(200);

    const tryGetUsers = await request(app)
      .get("/api/users")
      .set("Authorization", auth.token)
      .send();
    expect(tryGetUsers.statusCode).to.eql(401);
  });
});
