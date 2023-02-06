const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const usersDa = require("./index");
chai.use(chaiAsPromised);

const expect = chai.expect;
let user;

describe("data-access/users", () => {
  beforeEach(async () => {
    await usersDa.removeAll();
    user = await usersDa.create({
      firstName: "abd",
      lastName: "rahman",
      username: "abdr",
      password: "24434",
    });
  });

  afterEach(async () => {
    await usersDa.removeAll();
  });

  it("drops database", async () => {
    await usersDa.removeAll();
    const result = await usersDa.findAll();
    expect(result.total).to.equal(0);
  });

  it("lists users", async () => {
    const result = await usersDa.findAll();
    expect(result.total).to.equal(1);
  });

  it("find single user by id", async () => {
    const result = await usersDa.findOne(user.id);
    expect(result.id).to.eql(user.id);
  });

  it("insert a user", async () => {
    const userData = {
      firstName: "first",
      lastName: "last",
      username: "usrnm",
    };
    const newUser = await usersDa.create({ ...userData, password: "24434" });
    expect({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
    }).to.eql(userData);
  });

  it("update user", async () => {
    await usersDa.update(user.id, { firstName: "edited-fistname" });
    const result = await usersDa.findOne(user.id);
    expect(result.firstName).to.eql("edited-fistname");
  });

  it("delete a user", async () => {
    await usersDa.remove(user.id);
    const users = await usersDa.findAll();
    expect(users.total).to.equal(0);
    expect(usersDa.remove(user.id)).to.eventually.be.rejected;
  });
});
