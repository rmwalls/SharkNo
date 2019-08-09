//This file handles the input from the client (web page)
var express = require("express");

var router = express.Router();

var sharkAttacks = require("../models/example.js");

router.get("/", function (req, res) {
    /*sharkAttacks.all(function(data) {
        var handlebarsObj = {
            examples: data
        };
        res.render("index", handlebarsObj);
    });*/
    res.render("index");
});

router.get("/example/:id", function (req, res) {
    sharkAttacks.take(["id"], [req.params.id], function (results) {
        result = results[0];
        var handlebarsObj = {
            example: result
        };
        res.render("example", handlebarsObj);
    })
})

router.get("/api/attacks/:year/:country/:area/:location", function (req, res) {
    var traitParamsArray = [];
    var traitArray = [];
    var year = req.params.year;
    if (year != "imashark") {
        traitParamsArray.push("year");
        traitArray.push(year);
    }
    var country = req.params.country;
    if (country != "imashark") {
        traitParamsArray.push("country");
        traitArray.push(country);
    }
    var area = req.params.area;
    if (area != "imashark") {
        traitParamsArray.push("area");
        traitArray.push(area);
    }
    var location = req.params.location;
    if (location != "imashark") {
        traitParamsArray.push("location");
        traitArray.push(location);
    }
    var paramsArray = [year, country, area, location];


    sharkAttacks.take(traitParamsArray, traitArray, function (results) {
        console.log(results);
        res.render("partials/results", {
            layout: false,
            examples: results
        });
    });
});

router.post("/api/attacks", function (req, res) {
    var traitArray = ["date", "year", "type", "country", "area", "location", "injury", "species", "pdf"];
    var conditionArray = [];
    conditionArray.push(req.body.date);
    conditionArray.push(req.body.year);
    conditionArray.push(req.body.type);
    conditionArray.push(req.body.country);
    conditionArray.push(req.body.area);
    conditionArray.push(req.body.location);
    conditionArray.push(req.body.injury);
    conditionArray.push(req.body.species);
    conditionArray.push(req.body.pdf);
    sharkAttacks.create(traitArray, conditionArray, function (results) {
        res.json({
            id: results.insertId
        });
    });
});

module.exports = router;