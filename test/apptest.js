const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const db = require("../models");
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe("GET /api/toys", function () {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function() {
      request = chai.request(server);
      return db.sequelize.sync({ force: true });
    });
  
    // orderid: DataTypes.INTEGER,
    // deliveringUserId: DataTypes.INTEGER,
  
    it("should find all toys", function(done) {
      // Add some examples to the db to test with
      db.Order.bulkCreate([
        { orderid: 1, deliveringUserId: 1 },
        { orderid: 2, deliveringUserId: 2 }
      ]).then(function () {
        // Request the route that returns all examples
        request.get("/api/toys").end(function (err, res) {
          var responseStatus = res.status;
          // var responseBody = res.body;
  
          // Run assertions on the response
  
          expect(err).to.be.null;
  
          expect(responseStatus).to.equal(200);
  
          // expect(responseBody)
          //   .to.be.an("array")
          //   .that.has.lengthOf(2);
  
          // expect(responseBody[0])
          //   .to.be.an("object")
          //   .that.includes({ text: "First Example", description: "First Description" });
  
          // expect(responseBody[1])
          //   .to.be.an("object")
          //   .that.includes({ text: "Second Example", description: "Second Description" });
  
          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
    });
  });

