var db = require("../models/example.js");
var Op = db.Sequelize.Op;


module.exports = function(app) {
  // Get all examples
  app.get("/api/attacks", function(req, res) {
    db.SharkAttacks.all(function(results) {
      res.json(results);
    });
  });

  //get specific shark attack by year
  app.get("/api/attacks/:year", function(req, res) {
    db.SharkAttacks.take(["year"],[req.params.year], function(results){
      res.json(results);
    });
  });

  //get specific shark attack by country
  app.get("/api/attack/:country/:area?", function(req, res) {
    var traitArray = ["country", "area"];
    var conditionArray = [req.params.country, req.params.area];
    db.SharkAttacks.take(traitArray, conditionArray, function(results) {
      res.json(results);
    });
  });

  //get specific shark attack by country and area
  app.get("/api/attack/:country/:area/:location?", function(req, res) {
    var traitArray = ["country", "area", "location"];
    var conditionArray = [req.params.country, req.params.area, req.params.location];
    db.SharkAttacks.take(traitArray, conditionArray, function(results) {
      res.json(results);
    });
  });

  app.get("/api/examples", function(req, res) {
    db.Example.findOne({}).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/search", function(req, res) {
    var searchString = req.query.searchString;
    // find the records that match the searchString
    db.Example.findAll({
      where: {
        text: {
          [Op.like]: "%" + searchString + "%"
        }
      }
    }).then(function(dbResult) {
      res.json(dbResult);
    });
  });

  // Create a new example
  app.post("/api/attacks", function(req, res) {
    var traitArray = ["date", "year", "type", "country", "area", "location", "injury", "species", "`href formula`"];
    var conditionArray = [];
    conditionArray.push(req.body.date);
    conditionArray.push(req.body.year);
    conditionArray.push(req.body.type);
    conditionArray.push(req.body.country);
    conditionArray.push(req.body.area);
    conditionArray.push(req.body.location);
    conditionArray.push(req.body.injury);
    conditionArray.push(req.body.species);
    conditionArray.push(req.body.href);
    db.SharkAttacks.create(traitArray, conditionArray, function(results) {
      res.json(results);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.SharkAttacks.delete("id", req.params.id, function(results) {
      res.json(results);
    });
  });
};
