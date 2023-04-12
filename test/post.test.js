const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const app = require("../index");

describe("POST /api/posts/", () => {
  it("should create a new post with valid parameters and delete it afterwards", async () => {
    const data = {
      title: "Test Post",
      desc: "This is a test post",
    };
    const res = await chai
      .request(app)
      .post("/api/posts/")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw"
      )
      .send(data);

    expect(res.statusCode).to.equal(200);
    expect(res.body.title).to.equal(data.title);
    expect(res.body.desc).to.equal(data.desc);

    const savedId = res.body.postId;
    const res2 = await chai
      .request(app)
      .delete(`/api/posts/${savedId}`)
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw"
      );

    expect(res.statusCode).to.equal(200);
  });
});

describe("POST /api/like/{id}", () => {
  it("should like the post with {id} by the authenticated user.", async () => {
    const res = await chai
      .request(app)
      .post("/api/like/64369221435e927887222893")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw"
      );

    expect(res.statusCode).to.equal(200);
  });
});

describe("POST /api/unlike/{id}", () => {
  it("should unlike the post with {id} by the authenticated user.", async () => {
    const res = await chai
      .request(app)
      .post("/api/unlike/64369221435e927887222893")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw"
      );

    expect(res.statusCode).to.equal(200);
  });
});

describe("POST /api/comment/{id}", () => {
  it("should add comment for post with {id} by the authenticated user.", async () => {
    const data = {
      comment: "Test comment",
    };
    const res = await chai
      .request(app)
      .post("/api/comment/64369221435e927887222893")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw"
      )
      .send(data);

    expect(res.statusCode).to.equal(200);
  });
});

describe("GET /api/posts/{id}", () => {
  it("should return a single post with {id} populated with its number of likes and comments.", async () => {
    const res = await chai
      .request(app)
      .get("/api/posts/64369221435e927887222893")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw"
      );

    expect(res.statusCode).to.equal(200);
    expect(res.body.likes).to.equal(0);
    expect(res.body.comments.should.be.a("number"));
  });
});

describe("GET /api/all_posts/", () => {
  it("should return all posts created by authenticated user sorted by post time.", async () => {
    const res = await chai
      .request(app)
      .get("/api/all_posts")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNjg5MGQ2YzhkYTFmMmFhNDljYjYyIn0sImlhdCI6MTY4MTI5NTY4OX0.EfaTF_3PH19K53gT2sXYAvka-qIdLyLZV1KzVAk3Baw"
      );

    expect(res.statusCode).to.equal(200);
    expect(res.body.should.be.a("array"));
  });
});
