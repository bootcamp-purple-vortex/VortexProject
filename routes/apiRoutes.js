const db = require("../models");

module.exports = app => {
  // Get all examples
  // app.get("/api/examples", (req, res) => {
  //   db.Example.findAll({}).then((dbExamples) => {
  //     res.json(dbExamples);
  //   });
  // });

  // Get all sell
  app.get("/api/sell", function(req, res) {
    db.Toys.findAll({}).then(function(dbToys) {
      res.json(dbToys);
    });
  });
  

  // Create a new example
  // app.post("/api/examples", (req, res) => {
  //   db.Example.create(req.body).then((dbExample) => {
  //     res.json(dbExample);
  //   });
  // });

  app.get("/checkout", function(req, res) {
    // db.Toys.findAll({}).then(function(dbCheckout) {
      res.render("checkout", {
        msg: "Welcome!",
        // checkout: dbCheckout
      });
    // });
  });

  // Create a new sell
  app.post("/api/sell", function(req, res) {
    db.Toys.create(req.body).then(function(dbToys) {
      res.json(dbToys);
    });
  });


  // Delete an example by id
  // app.delete("/api/examples/:id", (req, res) => {
  //   db.Example.destroy({ where: { id: req.params.id } }).then((dbExample) => {
  //     res.json(dbExample);
  //   });
  // });
};
