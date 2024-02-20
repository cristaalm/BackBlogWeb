const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
chai.should();

describe("/POST users", () => {
  it("It should be create users", (done) => {
    let users = {
      username: "adminUser",
      name: "administrador",
      email: "admin@gmail.com",
      password: "admin123",
      profile: "administrador",
    };
    chai
      .require(app)
      .post("/api/users")
      .send(users)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/PATCH/:id users", () => {
  it("It should update by id", (done) => {
    const id = 1;
    let users = {
      id: id,
      username: "adminUser",
      name: "administrador",
      email: "admin@gmail.com",
      password: "admin123",
      profile: "administrador",
    };
    chai
      .request(app)
      .patch("/api/users/" + id)
      .send(users)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/GET users", () => {
  it("It should GET all the users", (done) => {
    chai
      .request(app)
      .get("/api/users/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("It should GET a user by id", (done) => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/users/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/DELETE/:id users", () => {
    it("It should DELETE users by id", (done) => {
      const id = 2;
      chai
        .request(app)
        .delete("/api/users/" + id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });