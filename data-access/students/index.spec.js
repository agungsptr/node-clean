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
    const students = await studentsDa.findAll();
    const input = students.length;
    const actual = 0;
    expect(input).to.equal(actual);
  });

  it("list students", async () => {
    const input = await studentsDa.findAll();
    const actual = 2;
    expect(input.length).to.equal(actual);
  });

  it("find student by id", async () => {
    const students = await studentsDa.findAll();
    const id = students[0].id;

    const student = await studentsDa.findOne(id);
    const input = student.id;
    const actual = id;
    expect(input).to.eql(actual);
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
    const newStudent = await studentsDa.create(felix);
    const obj = newStudent;
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
    const result = await studentsDa.findOne(student.id);
    expect(result.name).to.eql("updated name");
  });

  it("delete student", async () => {
    const students = await studentsDa.findAll();
    const id = students[0].id.toString();
    const validInput = await studentsDa.remove(id);
    expect(validInput).to.eql(null);

    const newStudents = await studentsDa.findAll();
    const inputLength = newStudents.length;
    const actualLength = 1;
    expect(inputLength).to.equal(actualLength);
    expect(studentsDa.remove(42)).to.eventually.be.rejected;
  });
});
