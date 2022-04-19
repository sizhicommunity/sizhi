import request from "supertest";
import { app } from "./index";

let server;
beforeAll((done) => {
  server = app.listen(done);
});

afterAll((done) => {
  server.close(done);
});
test("index", (done) => {
  request(server)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err;
      expect(res.body).toEqual({ hello: "world" });
      done();
    });
});
