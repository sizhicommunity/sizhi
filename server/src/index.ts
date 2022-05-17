import express, { response } from "express";
import { ContentItem, Repository, Runner } from "@sizhi/domain";
import { feeds } from "./feeds";
import path from "path";
export let services: {
  app?: express.Application;
  repository?: Repository;
  runner?: Runner;
} = {};
export let app = express();
services.app = app;
app.use(express.json());


app.use("/www", express.static(path.join(__dirname,'..',"www")));
app.get('/ping',function(req,res){
  res.status(200).send("pong")
})
app.get("/timeline/items", function (req, res) {
  res.json({ items: services.runner.timeLine.getItems() }).status(200);
});
app.get("/feedInfos", function (req, res) {
  res.json({ feedInfos: services.runner.feedInfos }).status(200);
});
app.get("/logs", function (req, res) {
  res.json({ logs: services.repository.logs }).status(200);
});
app.get("/defines", function (req, res) {
  res.json({ defines: services.repository.defines }).status(200);
});

app.get("/defines/:url", function (req,res){
  let url = decodeURIComponent( req.params.url)
  let re = services.repository.defines.find(def=> def.url === url).value();
  if(re){
    res.json({define:re}).status(200);
  }else{
    res.status(404).send();
  }
})
app.post("/defineUrls", function (req, res) {});

app.get("/myDefine", function (req, res) {
  let myDefine=  services.repository.getMyDefine();
  
  res.json({ myDefine}).status(200);
});

app.put("/myDefineUrl", async function (req, res) {
  await services.repository.setMyDefineUrl(req.body.myDefineUrl);
  res.status(202).send();
});

app.get("/rss",async function (req, res) {
  res.header("Content-Type", "application/rss+xml");
  let items =  services.runner.timeLine.getItems();

  res.status(200).send(feeds(items.map(i=>i as unknown as ContentItem)))
})
