const chai = require("chai");
const expect = chai.expect;
const studentBuilder = require("./index");

describe("models/student", () => {
  it("throws error if invalid payload", () => {
    const errorMessage = "\"name\" is required,\"age\" must be a number,";
    expect(() => {
      studentBuilder({
        grade: "twelve",
        age: "twleve",
        perfect: 12,
        createdBy: {
          userId: "63587db7dc752a40e09721d7",
          username: "user-editor",
        },
      });
    }).to.throw(errorMessage);
  });

  it("must have name", () => {
    const student = studentBuilder({
      name: "howie",
      createdBy: {
        userId: "63587db7dc752a40e09721d7",
        username: "user-editor",
      },
    });
    const input = student.name;
    const actual = "howie";
    expect(input).to.equal(actual);
  });

  it("can have grade", () => {
    const student = studentBuilder({
      name: "howie",
      grade: 2,
      createdBy: {
        userId: "63587db7dc752a40e09721d7",
        username: "user-editor",
      },
    });
    const input = student.grade;
    const actual = 2;
    expect(input).to.equal(actual);
  });

  it("can have age", () => {
    const student = studentBuilder({
      name: "howie",
      age: 12,
      createdBy: {
        userId: "63587db7dc752a40e09721d7",
        username: "user-editor",
      },
    });
    const input = student.age;
    const actual = 12;
    expect(input).to.equal(actual);
  });

  it("sets perfect to false by default", () => {
    const student = studentBuilder({
      name: "howie",
      createdBy: {
        userId: "63587db7dc752a40e09721d7",
        username: "user-editor",
      },
    });
    const input = student.perfect;
    const actual = false;
    expect(input).to.equal(actual);
  });
});
