const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);

describe("POST /api/authenticate", () => {
  it("should perform authentication and return JWT token", async () => {
    const res = await chai.request(app).post("/api/authenticate").send({
      email: "john@gmail.com",
      password: "password",
    });

    expect(res.statusCode).to.equal(200);
  });
});

describe("POST /api/follow/{id}", () => {
  it("should follow user with {id} by authenticated user", async () => {
    const res = await chai
      .request(app)
      .post(`/api/follow/64368a866c8da1f2aa49cb63`)
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw"
      );

    expect(res.statusCode).to.equal(200);
  });

  it("should return 401 when jwt token is not provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/follow/64368a866c8da1f2aa49cb63`);

    expect(res.statusCode).to.equal(401);
  });
});

describe("POST /api/unfollow/{id}", () => {
  it("should unfollow user with {id} by authenticated user", async () => {
    const res = await chai
      .request(app)
      .post(`/api/unfollow/64368a866c8da1f2aa49cb63`)
      .set(
        "auth-token",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw`
      );

    expect(res.statusCode).to.equal(200);
  });

  it("should return 401 when jwt token is not provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/unfollow/64368a866c8da1f2aa49cb63}`);

    expect(res.statusCode).to.equal(401);
  });
});

describe("GET /api/user", () => {
  it("should return user profile for authenticated user", async () => {
    const res = await chai
      .request(app)
      .get("/api/user")
      .set(
        "auth-token",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw`
      );

    expect(res.statusCode).to.equal(200);
    expect(res.body.name).to.equal("John");
    expect(res.body.followers).to.equal(0);
    expect(res.body.following).to.equal(0);
  });

  it("should return 401 when jwt token is not provided", async () => {
    const res = await chai.request(app).get("/api/user");

    expect(res.statusCode).to.equal(401);
  });
});
