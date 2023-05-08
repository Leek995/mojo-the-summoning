const { User } = require("./User.js");
const { Decks } = require("./Decks.js");
const { Attacks } = require("./Attacks");
const { Cards } = require("./Cards");



// import the rest of your models above

//set up the associations here
Decks.hasOne(User);
User.belongsTo(Decks);

Decks.hasMany(Cards);
Cards.belongsTo(Decks);

Cards.belongsToMany(Attacks, { through: 'SpecialMoves' });
Attacks.belongsToMany(Cards, { through: 'SpecialMoves' });



// and then export them all below
module.exports = {
    User,
    Decks,
    Attacks,
    Cards
}
