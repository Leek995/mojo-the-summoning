const { sequelize } = require("../db/config");
const { User, Decks } = require("./index");
const {where} = require("sequelize");
// const { Decks } = require("./Decks");



// define in global scope
let user, user2, user3, decks, decks2, decks3, decksORM, usersORM;

// clear db and create new user before tests
beforeAll(async () => {
  await sequelize.sync({ force: true });
  user = await User.create({ username: 'ken112751' });
  user2 = await User.create({ username: 'livepluto' });
  user3 = await User.create({ username: 'dinner300' });
  decks = await Decks.create({name: 'iron', xp: 1});
  decks2 = await Decks.create({name: 'steel', xp: 5});
  decks3 = await Decks.create({name: 'rune', xp: 40});

  usersORM = await User.findAll();
  decksORM = await Decks.findAll();
  usersORM[0].setDeck(decksORM[0]);
  usersORM[1].setDeck(decksORM[1]);
  usersORM[2].setDeck(decksORM[2]);

  // console.log(JSON.stringify(findTestOne, 2, null))
  console.log(JSON.stringify(usersORM, 2, null))
  // console.log(usersORM[0].__proto__)

});

// clear db after tests
// afterAll(async () => await sequelize.sync({ force: true }));

describe('User', () => {

  test('has an "id"', async () => {
    expect(user).toHaveProperty('id');
  });

  test('the created user is instance of User class', async () => {
    expect(user).toBeInstanceOf(User);
  });

  test('property "username", should be a string with appropriate value', async  () => {
    expect(user.username).toBe('ken112751');
    expect(typeof user.username).toBe("string");
  });

  test('should verify association with Decks Table', async () => {
    let findTestOne = await User.findOne({
      where: {username: "dinner300"},
      include: Decks
    });
    expect(findTestOne.id).toBe(3);
    expect(findTestOne.Deck.xp).toBe(40);
    expect(findTestOne.Deck.name).toBe('rune');
    expect(findTestOne.DeckId).toBe(3);
  });

  test('should update decks via associations', async () => {
    let findInstanceTwoUpdateDecksByUser = await User.findOne({
      where: { username: 'dinner300'},
      include: Decks
    });
    expect(findInstanceTwoUpdateDecksByUser.Deck.id).toBe(3);
    await findInstanceTwoUpdateDecksByUser.update({
      Deck: {name: 'mithril'}
    });
    let findInstanceToUpdateInDecks = await Decks.findByPk(findInstanceTwoUpdateDecksByUser.DeckId);

    await findInstanceToUpdateInDecks.update({name: 'mithril'});
    let findInstanceToCheckUpdate = await Decks.findOne({where: {name: 'mithril'}});
    expect(findInstanceToCheckUpdate.name).toBe('mithril');
  });

  test('CRUD functionality, should UPDATE users in table', async () => {
    let findByNameInDbAndUpdate = await User.findOne({
      where: {username: user.username},
    });
    await findByNameInDbAndUpdate.update({username: 'Malik'});
    let afterUpdate = await User.findOne({
      where: {username: 'Malik'},
    });
    expect(afterUpdate.username).toBe('Malik');
  });

  test('CRUD functionality, should DELETE user from table', async () => {
    await user.destroy();
    let findDeletedUser = await User.findAll();
    expect(findDeletedUser).toHaveLength(2);
  });

});
