// add your database connection here
// bring in imports need to establish database connection
const {Sequelize, Model, DataTypes} = require("sequelize");
const path = require("path");

// create an instance of sequelize
const sequelize = new Sequelize({
    // states which sql framework we're using
    dialect: "sqlite",
    // points towards where db is located at
    storage: path.join(__dirname, "db.sqlite"),
    logging: false
});

// exports instance of sequelize, along with necessary imports to create tables
module.exports = {
    sequelize,
    Model,
    DataTypes
}