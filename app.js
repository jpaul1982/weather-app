require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const rp = require("request-promise");
let bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/city", (req, res) => {
  res.render("city");
});

app.get("/zip", (req, res) => {
  res.render("zip");
});

app.get("/results_city", (req, res) => {
  let query = req.query.search;
  console.log("Search params:", query);
  let weatherApiKey = process.env.WEATHER_API_KEY;
  let weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    weatherApiKey;
  rp(weatherUrl)
    .then((body) => {
      let data = JSON.parse(body);
      res.render("results", { data: data });
      console.log(data);
      })
    .catch(err => {
      if (err) {
        res.render("Error")
        return;
      }
      console.log(err);
    });
});

app.get("/results_zip", (req, res) => {
  let query = req.query.search;
  console.log("Search params:", query);
  let weatherApiKey = process.env.WEATHER_API_KEY;
  let weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    query +
    "&appid=" +
    weatherApiKey;
  rp(weatherUrl)
    .then((body) => {
      let data = JSON.parse(body);
      res.render("results", { data: data });
      console.log(data);
      })
    .catch(err => {
      if (err) {
        res.render("Error");
      }
      console.log(err);
    });
});
    
app.listen(PORT, () => {
  console.log("Weather App is listening on PORT:", PORT);
});
