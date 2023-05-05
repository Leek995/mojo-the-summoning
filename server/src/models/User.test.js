// const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
// const { User } = require('./User')
// const db = require('../db/config')
const { sequelize } = require("../db/config");
const { User } = require("./User");


// define in global scope
let user;

// clear db and create new user before tests
beforeAll(async () => {
  await sequelize.sync({ force: true })
  user = await User.create({ username: 'gandalf' })
})

// clear db after tests
afterAll(async () => await sequelize.sync({ force: true }))

describe('User', () => {
  test('has an id', async () => {
    expect(user).toHaveProperty('id');
    expect(user.id).toBe(1);
  })
  test('user is instance of User class', async ()=>{
    expect(user).toBeInstanceOf(User);
  })
  test('username functionality', async  ()=>{
    expect(user.username).toBe('gandalf');
  })
  test('Should delete user from table', async ()=>{
    let deletedUser = await user.destroy()
    let findDeletedUser = await User.findAll()
    expect(findDeletedUser).toHaveLength(0)
  })

})
