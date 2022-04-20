import express from "express";
import { Repository } from "@sizhi/domain";
export let services: { app?: express.Application; repository?: Repository } =
  {};
export let app = express();
services.app = app;
app.use(express.json());
// Without middleware
app.get("/", function (req, res) {
  res.json({ hello: "world" });
});

// server=app.listen(PORT, function (err) {
//   if (err) console.log(err);
//   console.log("Server listening on PORT", PORT);
// });

app.get("/timeline", function (req, res) {});

app.get("/defines", function (req, res) {
  res.json({ defines: services.repository.defines });
});
app.post("/defineInfos", function (req, res) {});
