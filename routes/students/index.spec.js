const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const request = require("supertest");
const app = require("../../drivers/server");
const studentDa = require("../../data-access/students");

chai.use(chaiAsPromised);
const expect = chai.expect;

const API_URL = "/api/student";

describe("routes/students", () => {
  beforeEach(async () => {
    await studentDa.removeAll();
    const howie = {
      name: "howie",
      age: 12,
      grade: 3,
      prefect: true,
    };
    const bill = {
      name: "bill",
      age: 13,
      grade: 3,
      prefect: false,
    };
    await studentDa.create(howie);
    await studentDa.create(bill);
  });

  afterEach(async () => {
    await studentDa.removeAll();
  });

  it(`GET ${API_URL}s`, async () => {
    const req = await request(app).get(`${API_URL}s`).send();

    expect(req.statusCode).to.eql(200);
    expect(req.body.data.length).to.eql(2);
  });

  it(`GET ${API_URL}/:id`, async () => {
    const list = await studentDa.findAll();
    const req = await request(app).get(`${API_URL}/${list[0].id}`).send();

    expect(req.statusCode).to.eql(200);
    expect(req.body.data).to.eql({ ...list[0], id: list[0].id.valueOf() });
  });

  it(`POST ${API_URL}`, async () => {
    const data = {
      grade: 1,
      name: "agungsptr",
      age: 17,
      prefect: true,
    };
    const req = await request(app).post(`${API_URL}`).send(data);
    const result = req.body.data;
    delete result.id;

    expect(req.statusCode).to.eql(200);
    expect(result).to.eql(data);
  });

  it(`PATCH ${API_URL}/:id`, async () => {
    const list = await studentDa.findAll();
    const dataToUpdate = {
      grade: 2,
      name: "agungsptr-edit",
      age: 18,
      prefect: false,
    };
    const req = await request(app)
      .patch(`${API_URL}/${list[0].id}`)
      .send(dataToUpdate);
    const result = req.body.data;
    delete result.id;

    expect(req.statusCode).to.eql(200);
    expect(result).to.eql(dataToUpdate);
  });

  it(`DELETE ${API_URL}/:id`, async () => {
    const list = await studentDa.findAll();
    const req = await request(app).delete(`${API_URL}/${list[0].id}`).send();
    const updatedList = await studentDa.findAll();

    expect(req.statusCode).to.eql(200);
    expect(updatedList.length).to.eql(1);
  });
});
