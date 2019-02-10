const db = require("../models");

module.exports = app => {
  // Load index page
  app.get("/", function(req, res) {
    db.Toys.findAll({ order: [["id", "DESC"]] }).then(dbToys => {
      res.render("index", {
        msg: "Welcome!",
        toys: dbToys
      });
    });
  });

  // Load sell page
  app.get("/sell", function(req, res) {
    db.Toys.findAll({}).then(function(dbToys) {
      res.render("sell", {
        msg: "Welcome!",
        toys: dbToys
      });
    });
  });

  app.get("/buy/:id", function(req, res) {
    db.Toys.findOne({ where: { id: req.params.id } }).then(function(dbToys) {
      // console.log('dbToys', dbToys);

      res.render("buy", {
        toys: dbToys
      });
    });
  });

   // Load example page and pass in an example by id
  //  app.get("/buy/:id", function(req, res) {
  //   db.Toys.findOne({ where: { id: req.params.id } }).then(function(dbToys) {
  //     // console.log('dbToys', dbToys);
  //     res.render("buy", {
  //       toys: dbToys
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
