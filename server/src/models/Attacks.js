const { sequelize, Model, DataTypes } = require("../db/config")



class Attacks extends Model {}

Attacks.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: DataTypes.STRING,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER,

    },

    {
        sequelize: sequelize,
        modelName: "Attacks",
        timestamps: false
    });

module.exports = {
    Attacks,
};