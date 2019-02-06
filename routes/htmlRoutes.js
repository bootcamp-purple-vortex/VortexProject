const db = require("../models");

module.exports = app => {
  // Load index page
  app.get("/", function(req, res) {
    db.Toys.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load sell page
  app.get("/sell", function(req, res) {
    db.Toys.findAll({}).then(function(dbExamples) {
      res.render("sell", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

   // Load example page and pass in an example by id
   app.get("/sell/:id", function(req, res) {
    db.Toys.findOne({ where: { id: req.params.id } }).then(function(dbToys) {
      res.render("buy", {
        toys: dbToys
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", (req, res) => {
    db.Example.findOne({ where: { id: req.params.id } }).then((dbExample) => {
      res.render("buy", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
