const { sequelize, Model, DataTypes } = require("../db/config");
const { Decks } = require("./Decks");



class User extends Model {}

User.init({


    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: DataTypes.STRING,

    },
    {
        // We need to pass the connection instance
        sequelize: sequelize,
        modelName: 'User',
        timestamps: false,
    });


module.exports = {
    User,
};

// the defined model is the class itself
// console.log(User === db.models.User); // true
// const user = new User({ id: 1 });
// console.log(user.id); // undefined