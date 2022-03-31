const factory = require("../../__tests__/factories");
const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../utils/truncate");

const { User } = require("../../src/app/models");

jest.setTimeout(20000);

describe("Authentication", () => {
  beforeEach(async () => await truncate());

  it("should auhtenticate with valid credentials", async () => {
    const user = await factory.create("User", { password: "123456" });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
  });

  it("should not authenticatewith invalid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "135790",
    });

    expect(response.statusCode).toEqual(401);
  });

  it("should return JWT token when authenticated", async () => {
    const user = await factory.create("User", { password: "123456" });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.statusCode).toBe(200);
  });

  it("should not be able to access private routes without token", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.statusCode).toBe(401);
  });

  it("should not be able to access private routes with invalid token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 123456)}`);

    expect(response.statusCode).toBe(401);
  });
});
