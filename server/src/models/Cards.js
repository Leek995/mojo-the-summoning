const { sequelize, Model, DataTypes } = require("../db/config");

class Cards extends Model {}

Cards.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: DataTypes.STRING,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING

    },
    {
    sequelize: sequelize,
    modelName: "Cards",
    timestamps: false
    });

module.exports = {
    Cards
};