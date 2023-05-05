const {sequelize, Model, DataTypes } = require("../db/config");

class Decks extends Model{}

Decks.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER
},
    {
        sequelize: sequelize,
        modelName: "Decks",
        timestamps: false
    })

module.exports = {
    Decks
}