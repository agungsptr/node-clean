const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const request = require("supertest");
const usersDa = require("../../../../data-access/users");
const setup = require("../../../../test/setup");

chai.use(chaiAsPromised);
const expect = chai.expect;

let app, user, auth;
const API_URL = "/api/user";

describe("routes/users", () => {
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
      .post("/api/auth/login")
      .send({
        username: user.username,
        password: "24434",
      })
      .then((res) => res.body.data);
  });

  afterEach(async () => {
    await usersDa.removeAll();
  });

  it(`GET ${API_URL}s`, async () => {
    const req = await request(app)
      .get(`${API_URL}s`)
      .set("Authorization", auth.token)
      .send();

    expect(req.statusCode).to.eql(200);
    expect(req.body.data.length).to.eql(1);
  });

  it(`GET ${API_URL}/:id`, async () => {
    const list = await usersDa.findAll();
    const req = await request(app)
      .get(`${API_URL}/${list.data[0].id}`)
      .set("Authorization", auth.token)
      .send();
    const expectVal = {
      ...req.body.data,
      createdAt: new Date(req.body.data.createdAt),
      updatedAt: new Date(req.body.data.updatedAt),
    };

    expect(req.statusCode).to.eql(200);
    expect(expectVal).to.eql({
      ...list.data[0],
      id: list.data[0].id.valueOf(),
    });
  });

  it(`POST ${API_URL}`, async () => {
    const data = {
      firstName: "agung2",
      lastName: "saputra2",
      username: "agungsptr2",
      password: "24434",
    };
    const req = await request(app)
      .post(`${API_URL}`)
      .set("Authorization", auth.token)
      .send(data);
    const result = req.body.data;

    expect(req.statusCode).to.eql(200);
    expect(result.firstName).to.eql(data.firstName);
    expect(result.lastName).to.eql(data.lastName);
    expect(result.username).to.eql(data.username);
  });

  it(`PATCH ${API_URL}/:id`, async () => {
    const list = await usersDa.findAll();
    const dataToUpdate = {
      firstName: "agung2-edit",
      lastName: "saputra2-edit",
    };
    const req = await request(app)
      .patch(`${API_URL}/${list.data[0].id}`)
      .set("Authorization", auth.token)
      .send(dataToUpdate);
    const result = req.body.data;

    expect(req.statusCode).to.eql(200);
    expect(result.name).to.eql(dataToUpdate.name);
  });

  it(`DELETE ${API_URL}/:id`, async () => {
    const list = await usersDa.findAll();
    const req = await request(app)
      .delete(`${API_URL}/${list.data[0].id}`)
      .set("Authorization", auth.token)
      .send();
    const updatedList = await usersDa.findAll();

    expect(req.statusCode).to.eql(200);
    expect(updatedList.total).to.eql(0);
  });
});
