const chai = require("chai");
const expect = chai.expect;
const builder = require("./index");

describe("models/user", () => {
  it("throw error if firstName not found", () => {
    expect(() => {
      builder({
        lastName: "rahman",
        username: "abdr",
        password: "24434",
      });
    }).to.throw("\"firstName\" is required");
  });

  it("throw error if lastName not found", () => {
    expect(() => {
      builder({
        firstName: "abd",
        username: "abdr",
        password: "24434",
      });
    }).to.throw("\"lastName\" is required");
  });

  it("throw error if username not found", () => {
    expect(() => {
      builder({
        firstName: "abd",
        lastName: "rahman",
        password: "24434",
      });
    }).to.throw("\"username\" is required");
  });

  it("throw error if password not found", () => {
    expect(() => {
      builder({
        firstName: "abd",
        lastName: "rahman",
        username: "abdr",
      });
    }).to.throw("\"password\" is required");
  });
});
