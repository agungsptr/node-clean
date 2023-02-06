const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const studentsDa = require("./index");
const usersDa = require("../users");

chai.use(chaiAsPromised);
const expect = chai.expect;
let user, student;

describe("data-access/students", () => {
  beforeEach(async () => {
    await usersDa.removeAll();
    await studentsDa.removeAll();
    user = await usersDa.create({
      firstName: "agung",
      lastName: "saputra",
      username: "agungsptr",
      password: "24434",
    });
    student = await studentsDa.create({
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
  });

  afterEach(async () => {
    await studentsDa.removeAll();
  });

  it("drops database", async () => {
    await studentsDa.removeAll();
    const list = await studentsDa.findAll();
    expect(list.total).to.equal(0);
  });

  it("list students", async () => {
    const list = await studentsDa.findAll();
    expect(list.total).to.equal(2);
  });

  it("find student by id", async () => {
    const data = await studentsDa.findOne(student.id);
    expect(data.id).to.eql(student.id);
  });

  it("insert student", async () => {
    const felix = {
      name: "felix",
      grade: 2,
      age: 6,
      createdBy: {
        userId: `${user.id}`,
        username: user.username,
      },
    };
    const data = await studentsDa.create(felix);
    const obj = data;
    delete obj.id;
    delete obj.createdAt;
    delete obj.updatedAt;
    const actual = {
      name: "felix",
      grade: 2,
      age: 6,
      perfect: false,
      createdBy: {
        userId: `${user.id}`,
        username: user.username,
      },
    };
    expect(obj).to.eql(actual);
  });

  it("throw error if insert student with invalid payload", async () => {
    const invalid = {
      name: "bill",
      grade: "INSERT POISON INTO THIS",
    };
    expect(studentsDa.create(invalid)).to.eventually.be.rejected;
  });

  it("update student", async () => {
    await studentsDa.update(student.id, { name: "updated name" });
    const data = await studentsDa.findOne(student.id);
    expect(data.name).to.eql("updated name");
  });

  it("delete student", async () => {
    const data = await studentsDa.remove(student.id);
    expect(data).to.eql(null);

    const list = await studentsDa.findAll();
    expect(list.total).to.equal(1);
    expect(studentsDa.remove(42)).to.eventually.be.rejected;
  });
});
