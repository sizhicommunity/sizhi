import express from "express";
import { Repository, Runner } from "@sizhi/domain";
export let services: { app?: express.Application; repository?: Repository ,runner?:Runner} =
  {};
export let app = express();
services.app = app;
app.use(express.json());
// Without middleware
app.get("/", function (req, res) {
  res.json({ hello: "world" }).status(200).send();
});

app.get("/timeline/items", function (req, res) {
  res.json({items:services.runner.timeLine.getItems()}).status(200).send();
});
app.get("/feedInfos", function (req, res) {
  res.json({ feedInfos: services.runner.feedInfos }).status(200).send();
});
app.get("/logs", function (req, res) {
  res.json({ logs: services.repository.logs }).status(200).send();
});
app.get("/defines", function (req, res) {
  res.json({ defines: services.repository.defines }).status(200).send();
});
app.post("/defineUrls", function (req, res) {});

app.get("/myDefine", function (req, res) {
  res.json({ myDefine: services.repository.getMyDefine() }).status(200).send();
});
app.put("/myDefineUrl", async function (req, res) {
  await services.repository.setMyDefineUrl(req.body.myDefineUrl);
  res.status(202).send();
});
