const bcrypt = require("bcrypt");

const truncate = require("../utils/truncate");
const { User } = require("../../src/app/models");

jest.setTimeout(20000);

describe("User", () => {
  beforeEach(async () => await truncate());

  it("should encrypt user password", async () => {
    try {
      const user = await User.create({
        name: "João Victor",
        email: "jvpr@email.com",
        password: "123456",
      });

      expect(await bcrypt.compare("123456", user.password_hash)).toBe(true);
    } catch (error) {
      console.log(error);
    }
  });
});
