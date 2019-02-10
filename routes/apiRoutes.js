const db = require("../models");

module.exports = app => {
  // Get all Toys
  app.get("/api/toys", (req, res) => {
    db.Toys.findAll({}).then(dbToys => {
      res.json(dbToys);
    });
  });

  // User Checkout Cart
  app.get("/checkout", (req, res) => {
    // db.Toys.findAll({}).then(function(dbCheckout) {
    res.render("checkout", {
      msg: "Welcome!"
      // checkout: dbCheckout
    });
    // });
  });

  // Create a new Toy for sale
  app.post("/api/toys", (req, res) => {
    db.Toys.create(req.body).then(dbToys => {
      res.json(dbToys);
    });
  });

  // Update buy status for item
  app.put("/api/toys", (req, res) => {
    db.Toys.update(
      { buystatus: req.body.buystatus },
      { where: { id: req.body.id } }
    ).then(dbToys => {
      res.json(dbToys);
    });
  });
};

// router.put(‘/book/:bookId’, function (req, res, next) {
//   Book.update(
//     {title: req.body.title},
//     {where: req.params.bookId}
//   )
//   .then(function(rowsUpdated) {
//     res.json(rowsUpdated)
//   })
//   .catch(next)
//  })
