const { sequelize } = require("../db/config");
const { Cards } = require("./Cards");



let cards;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    cards = await Cards.create({name: 'Wild', mojo: 1, stamina: 10, imgUrl: '//cards.com'});
});

afterAll(async () => {
    await sequelize.sync({ force: true });
});

describe('Cards', () => {
    test('the created cards are an instance of Cards class', async () => {
        expect(cards).toBeInstanceOf(Cards);
    });
    test('has an id', async () =>{
        expect(cards).toHaveProperty('id');
        expect(cards.id).toBe(1);
    });
    test('has properties', async () => {
        expect(cards.name).toBe('Wild');
        expect(cards.mojo).toBe(1);
        expect(typeof cards.mojo).toBe("number");
        expect(cards.stamina).toBe(10);
        expect(typeof cards.stamina).toBe("number");
        expect(cards.imgUrl).toBe('//cards.com')
    });
    test('CRUD functionality, should READ from Cards table', async () => {
        let findImgUrlInTable = await Cards.findOne({
            where: {imgUrl: cards.imgUrl},
        })
        expect(findImgUrlInTable.name).toBe(cards.name);
    })
    test('CRUD functionality, should Update instance in Cards table', async () => {
        let findStaminaInTableAndUpdate = await Cards.findOne({
            where: {stamina: 10},
        });
        expect(findStaminaInTableAndUpdate.name).toBe('Wild');
        await findStaminaInTableAndUpdate.update({stamina: 100});
        let afterUpdate = await Cards.findOne({
            where: {stamina: 100},
        });
        expect(afterUpdate.id).toBe(1);
        expect(afterUpdate.stamina).toBe(100);
    });
    test('CRUD functionality, should DELETE instance of cards from table', async () => {
        let pullCurrentInstanceFromTable = await Cards.findByPk(1);
        expect(pullCurrentInstanceFromTable.name).toBe('Wild');
        expect(await Cards.findAll()).toHaveLength(1);
        await (await Cards.findByPk(1)).destroy();
        expect(await Cards.findAll()).toStrictEqual([]);
    })


})