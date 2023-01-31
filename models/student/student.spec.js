const chai = require("chai");
const expect = chai.expect;
const builder = require("./index");

describe("models/student", () => {
  it("throw error if name not found", () => {
    expect(() => {
      builder({
        grade: 1,
        age: 21,
        perfect: true,
        createdBy: {
          userId: "63587db7dc752a40e09721d7",
          username: "user",
        },
      });
    }).to.throw("\"name\" is required");
  });

  it("throw error if grade wrong data type", () => {
    expect(() => {
      builder({
        name: "Fulan",
        grade: "One",
        age: 21,
        perfect: true,
        createdBy: {
          userId: "63587db7dc752a40e09721d7",
          username: "user",
        },
      });
    }).to.throw("\"grade\" must be a number");
  });

  it("throw error if age wrong data type", () => {
    expect(() => {
      builder({
        name: "Fulan",
        grade: 1,
        age: "TwentyOne",
        perfect: true,
        createdBy: {
          userId: "63587db7dc752a40e09721d7",
          username: "user",
        },
      });
    }).to.throw("\"age\" must be a number");
  });

  it("throw error if perfect wrong data type", () => {
    expect(() => {
      builder({
        name: "Fulan",
        grade: 1,
        age: 21,
        perfect: "trueFalse",
        createdBy: {
          userId: "63587db7dc752a40e09721d7",
          username: "user",
        },
      });
    }).to.throw("\"perfect\" must be a boolean");
  });

  it("sets perfect to false by default", () => {
    const student = builder({
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
