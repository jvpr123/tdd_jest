const { factory } = require("factory-girl");
const { User } = require("../src/app/models");

factory.define("User", User, {
  name: "João Victor",
  email: "jvpr@email.com",
  password: "123456",
});

module.exports = factory;
