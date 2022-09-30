const chai = require("chai");
const expect = chai.expect;
const studentBuilder = require("./index");

describe("models/student", () => {
  it("throws error if invalid payload", () => {
    const errorMessage = [
      "must have name as string",
      "age must be a number",
      "grade must be a number",
      "prefect must be a boolean",
    ].join(",");

    expect(() => {
      studentBuilder({
        grade: "twelve",
        age: "twleve",
        prefect: 12,
      });
    }).to.throw(errorMessage);
  });
  it("must have name", () => {
    const student = studentBuilder({
      name: "howie",
    });
    const input = student.name;
    const actual = "howie";
    expect(input).to.equal(actual);
  });
  it("can have grade", () => {
    const student = studentBuilder({ name: "howie", grade: 2 });
    const input = student.grade;
    const actual = 2;
    expect(input).to.equal(actual);
  });
  it("can have age", () => {
    const student = studentBuilder({ name: "howie", age: 12 });
    const input = student.age;
    const actual = 12;
    expect(input).to.equal(actual);
  });
  it("sets prefect to false by default", () => {
    const student = studentBuilder({ name: "howie" });
    const input = student.prefect;
    const actual = false;
    expect(input).to.equal(actual);
  });
});
