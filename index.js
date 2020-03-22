const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var helpers = require("./functions.js");
var imageLinksFromFunct = "";

//routes
app.get("/", async function(req, res){
  imageLinksFromFunct = await helpers.getImages("", "");
  res.render("index.ejs", {imageLinks : imageLinksFromFunct});
});

app.get("/results", function(req, res){
  res.render("index.ejs", {imageLinks: imageLinksFromFunct});
});

app.post("/searchImage", async function(req, res){
  imageLinksFromFunct = await helpers.getImages(req.body.keyword, req.body.Orientation);
  res.redirect("/results");
});

app.get("/*", function(req, res){
  res.send("Page not found");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Express Server is Running...");
});
