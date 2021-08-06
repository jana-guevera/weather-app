const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

// Get the express server
const app = express();

// Set the express server to use hbs view engine
app.set("view engine", "hbs");

// Register the views path and the partials path
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); 

// Register the static files path
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

console.log("Hello");

const author = "Peter";

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: author
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: author 
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: author
    });
});

app.get("/weather", (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "You must provide an address."
        });
    }

    geocode(req.query.address, (error, response) => {
        if(error){
            return res.send({
                error: error
            });
        }

        forecast(response.latitude, response.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                });
            }

            res.send({
                forecast: forecastData,
                location: response.location,
                address: req.query.address
            });
        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: 404,
        error: "404 page not found",
        name: author
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});