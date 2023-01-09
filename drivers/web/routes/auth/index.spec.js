const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const request = require("supertest");
const usersDa = require("../../../../data-access/users");
const setup = require("../../../../test/setup");

chai.use(chaiAsPromised);
const expect = chai.expect;

let app, user, auth;
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

  it("LOGIN with wrong password", async () => {
    const req = await request(app)
      .post(`${API_URL}/login`)
      .send({ username: user.username, password: "wrong" });

    expect(req.statusCode).to.eql(401);
  });

  it("LOGIN without username or password", async () => {
    const req = await request(app)
      .post(`${API_URL}/login`)
      .send({ username: user.username });

    expect(req.statusCode).to.eql(400);
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

  it("LOGOUT with deleted user", async () => {
    await usersDa.removeAll();
    const req = await request(app)
      .post(`${API_URL}/logout`)
      .set("Authorization", auth.token)
      .send();
    expect(req.statusCode).to.eql(400);
  });

  it("LOGOUT without token", async () => {
    const req = await request(app).post(`${API_URL}/logout`).send();
    expect(req.statusCode).to.eql(400);
  });

  it("LOGOUT with invalid userId in token", async () => {
    const req = await request(app)
      .post(`${API_URL}/logout`)
      .set(
        "Authorization",
        // eslint-disable-next-line max-len
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMSIsInVzZXJuYW1lIjoiYWd1bmdzcHRyIiwiaWF0IjoxNjY3NzI3Njk4LCJleHAiOjE2Njc4MTQwOTh9.gal5Y7l074x-TuxBP2lGt7_QVAbzX3h2I18WPZnYKBw"
      )
      .send();
    expect(req.statusCode).to.eql(400);
  });
});
