const { sequelize } = require("../db/config");
const { User } = require("./User");



// define in global scope
let user;

// clear db and create new user before tests
beforeAll(async () => {
  await sequelize.sync({ force: true });
  user = await User.create({ username: 'gandalf' });
});

// clear db after tests
afterAll(async () => await sequelize.sync({ force: true }));

describe('User', () => {

  test('has an "id"', async () => {
    expect(user).toHaveProperty('id');
    expect(user.id).toBe(1);
  });

  test('the created user is instance of User class', async () => {
    expect(user).toBeInstanceOf(User);
  });

  test('property "username", should be a string with appropriate value', async  () => {
    expect(user.username).toBe('gandalf');
    expect(typeof user.username).toBe("string");
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
    expect(findDeletedUser).toHaveLength(0);
  });

});
