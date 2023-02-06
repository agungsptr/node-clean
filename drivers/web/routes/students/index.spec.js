const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const request = require("supertest");
const studentsDa = require("../../../../data-access/students");
const usersDa = require("../../../../data-access/users");
const setup = require("../../../../test/setup");

chai.use(chaiAsPromised);
const expect = chai.expect;

let app, user, auth;
const API_URL = "/api/student";

describe("routes/students", () => {
  before(async () => {
    app = await setup.beforeAction();
  });

  beforeEach(async () => {
    await usersDa.removeAll();
    await studentsDa.removeAll();
    user = await usersDa.create({
      firstName: "agung",
      lastName: "saputra",
      username: "agungsptr",
      password: "24434",
    });
    await studentsDa.create({
      name: "howie",
      age: 12,
      grade: 3,
      perfect: true,
      createdBy: {
        userId: `${user.id}`,
        username: user.username,
      },
    });
    await studentsDa.create({
      name: "bill",
      age: 13,
      grade: 3,
      perfect: false,
      createdBy: {
        userId: `${user.id}`,
        username: user.username,
      },
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
    await studentsDa.removeAll();
  });

  it(`GET ${API_URL}s`, async () => {
    const req = await request(app)
      .get(`${API_URL}s`)
      .set("Authorization", auth.token)
      .send();

    expect(req.statusCode).to.eql(200);
    expect(req.body.page.total).to.eql(2);
  });

  it(`GET ${API_URL}/:id`, async () => {
    const list = await studentsDa.findAll();
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
      grade: 1,
      name: "agungsptr",
      age: 17,
      perfect: true,
      createdBy: {
        userId: `${user.id}`,
        username: user.username,
      },
    };
    const req = await request(app)
      .post(`${API_URL}`)
      .set("Authorization", auth.token)
      .send(data);
    const result = req.body.data;
    delete result.id;
    delete result.createdAt;
    delete result.updatedAt;

    expect(req.statusCode).to.eql(200);
    expect(result).to.eql(data);
  });

  it(`PATCH ${API_URL}/:id`, async () => {
    const list = await studentsDa.findAll();
    const dataToUpdate = {
      grade: 2,
      name: "agungsptr-edit",
      age: 18,
      perfect: false,
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
    const list = await studentsDa.findAll();
    const req = await request(app)
      .delete(`${API_URL}/${list.data[0].id}`)
      .set("Authorization", auth.token)
      .send();
    const updatedList = await studentsDa.findAll();

    expect(req.statusCode).to.eql(200);
    expect(updatedList.total).to.eql(1);
  });
});
