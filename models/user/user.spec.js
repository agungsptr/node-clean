const chai = require("chai");
const expect = chai.expect;
const userBuilder = require("./index");

describe("models/user", () => {
  it("throws error if invalid payload", () => {
    expect(() => {
      userBuilder({
        firstName: "abd",
        lastName: "rahman",
      });
    }).to.throw("\"username\" is required,\"password\" is required");
  });

  it("must have firstName", () => {
    expect(() => {
      userBuilder({
        lastName: "rahman",
        username: "abdr",
        password: "24434",
      });
    }).to.throw("\"firstName\" is required");
  });

  it("must have lastName", () => {
    expect(() => {
      userBuilder({
        firstName: "abd",
        username: "abdr",
        password: "24434",
      });
    }).to.throw("\"lastName\" is required");
  });

  it("must have username", () => {
    expect(() => {
      userBuilder({
        firstName: "abd",
        lastName: "rahman",
        password: "24434",
      });
    }).to.throw("\"username\" is required");
  });

  it("must have password", () => {
    expect(() => {
      userBuilder({
        firstName: "abd",
        lastName: "rahman",
        username: "abdr",
      });
    }).to.throw("\"password\" is required");
  });
});
