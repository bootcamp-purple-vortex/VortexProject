var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Get all sell
  app.get("/api/sell", function(req, res) {
    db.Toys.findAll({}).then(function(dbToys) {
      res.json(dbToys);
    });
  });
  

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new sell
  app.post("/api/sell", function(req, res) {
    db.Toys.create(req.body).then(function(dbToys) {
      res.json(dbToys);
    });
  });


  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
