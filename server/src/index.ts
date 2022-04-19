import express from "express";
export let  app = express();
app.use(express.json());
// Without middleware
app.get("/", function (req, res) {
  res.json({ hello: "world" });
});

// server=app.listen(PORT, function (err) {
//   if (err) console.log(err);
//   console.log("Server listening on PORT", PORT);
// });

app.get("/timeline",function(req, res) {

})

app.get("/defines",function(req, res) {
    
})
app.post("/defineInfos",function(req, res) {

})