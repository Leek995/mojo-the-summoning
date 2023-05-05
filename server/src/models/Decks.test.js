const { sequelize } = require("../db/config");
const { Decks } = require("../models/Decks");
const {where} = require("sequelize");

let decks;

beforeAll(async () => {
    await sequelize.sync({force: true});
    decks = await Decks.create({name: 'Strong', xp: 300});
});
afterAll(async () => {
    await sequelize.sync({force: true});
});

describe('Decks', () => {
    test('is a instances of Decks', async () => {
        expect(decks).toBeInstanceOf(Decks);
    });
    test('has an "id"', async () => {
        expect(decks).toHaveProperty('id');
        expect(decks.id).toBe(1);
    });
    test('property "xp", should be a integer', async () => {
        expect(typeof decks.xp).toBe('number');
        expect(decks.xp).toBe(300);
    });
    test('property "name", should be a string with the appropriate value', async () =>{
        expect(typeof decks.name).toBe('string');
        expect(decks.name).toBe('Strong');
    })
    test('CRUD functionality, should UPDATE decks in table', async () => {
        let findByNameInDbAndUpdate = await Decks.findOne({
            where: {name: decks.name},
        });
        await findByNameInDbAndUpdate.update({name: 'Weak'})
        let afterUpdate = await Decks.findOne({
            where: {name: 'Weak'}
        })
        expect(afterUpdate.name).toBe('Weak')
    })
    test('CRUD functionality, should DELETE decks from table', async () =>{
        let findAllDecksInDb = await Decks.findAll();
        expect(findAllDecksInDb).toHaveLength(1);
        await decks.destroy();
        let deletedDeck = await Decks.findByPk(1);
        expect(deletedDeck).toBe(null);
    })
});


