module.exports = function(sequelize, DataTypes) {
    var Toys = sequelize.define("Toys", {
      username: DataTypes.STRING,
      toysname: DataTypes.STRING,
      price: DataTypes.STRING,
      location: DataTypes.STRING,      
      description: DataTypes.TEXT,
      image: DataTypes.STRING
    });
    return Toys;
  };
  