import { Repository, Runner } from "@sizhi/domain";
import request from "supertest";
import { services } from ".";
import fs from "fs";
jest.setTimeout(20000);

let server;
beforeAll((done) => {
  let rep = new Repository({ defines: [], logs: [] }, "./testing.db");
  services.repository = rep;
  services.runner = new Runner(rep, 2);
  server = services.app.listen(done);
});

afterAll((done) => {
  server.close(done);
  fs.unlinkSync("./testing.db");
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

test("my define", async () => {
  await request(server)
    .put("/myDefineUrl")
    .send({ myDefineUrl: "mock:../define/test/mockString" })
    .expect(202);
  await request(server)
    .get("/myDefine")
    .expect(200)
    .expect((res) =>
      expect(res.body.myDefine).toEqual(
        expect.objectContaining({ url: "mock:../define/test/mockString" })
      )
    );
});
test("logs", (done) => {
  json200(
    "/logs",
    (res) => {
      expect(res.body.logs.length).toBeGreaterThan(0);
    },
    done
  );
});
test("feed infos", async () => {
  await new Promise((r) => setTimeout(r, 2000));
  let res = await request(server).get("/feedInfos").expect(200);
  let infos = res.body.feedInfos;
  expect(infos.length).toBeGreaterThan(0);
  expect(infos).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ feedPath: "follow/work" }),
    ])
  );
});
test("content items", async () => {
  await new Promise((r) => setTimeout(r, 3000));
  let res = await request(server).get("/timeline/items").expect(200);
  expect(res.body.items.length).toBeGreaterThan(0);
});

function json200(
  url: string,
  fun: (res) => void,
  done: () => void,
  code: number = 200
): void {
  request(server)
    .get(url)
    .expect("Content-Type", /json/)
    .expect(code)
    .expect(fun)
    .end(function (err, res) {
      if (err) throw err;
      done();
    });
}
