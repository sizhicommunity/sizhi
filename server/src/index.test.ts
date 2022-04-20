import { Repository } from "@sizhi/domain";
import request from "supertest";
import { services } from ".";

let server;
beforeAll((done) => {
  let rep = new Repository({ defines: [], logs: [] }, "./testing.db");
  services.repository = rep;
  server = services.app.listen(done);
});

afterAll((done) => {
  server.close(done);
});
test("index", (done) => {
  json200("/", (res) => expect(res.body).toEqual({ hello: "world" }), done);
});
test("defines", (done) => {
  json200(
    "/defines",
    (res) => {
      expect(res.body).toEqual({ defines: [] });
    },
    done
  );
});

function json200(
  url: string,
  fun: (res: Response) => void,
  done: () => void
): void {
  request(server)
    .get(url)
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err;
      fun(res);
      done();
    });
}
