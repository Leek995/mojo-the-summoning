const { sequelize } = require("../db/config");
const { Cards, Decks } = require("./index");



let cards, cards2, cards3, decks, decks2, decks3, cardsORM, decksORM;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    cards = await Cards.create({name: 'Wild', mojo: 1, stamina: 10, imgUrl: '//cards.com'});
    cards2 = await Cards.create({name: 'L', mojo: 3, stamina: 4, imgUrl: '//cards.com'});
    cards3 = await Cards.create({name: 'Mix', mojo: 7, stamina: 95, imgUrl: '//cards.com'});
    decks = await Decks.create({name: 'iron', xp: 1});
    decks2 = await Decks.create({name: 'steel', xp: 5});
    decks3 = await Decks.create({name: 'rune', xp: 40});

    cardsORM = await Cards.findAll();
    decksORM = await Decks.findAll();

    decksORM[0].addCards([cardsORM[0], cardsORM[2]]);
    // decksORM[1].addCard(cardsORM[1]);
    // decksORM[2].addCards([cardsORM[0], cardsORM[1], cardsORM[3]]);
});

afterAll(async () => {
    await sequelize.sync({ force: true });
});

describe('Cards', () => {

    test('the created cards are an instance of Cards class', async () => {
        expect(cards).toBeInstanceOf(Cards);
    });

    test('has an id', async () => {
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

    test('should check validity of one-to-many association', async () =>{
        let findOneDeckAndCardsAssociated = await Decks.findOne({
            where:{ name: 'iron' },
            include: Cards
        })
        expect(findOneDeckAndCardsAssociated.Cards[0].name).toBe('Wild')
        let findOneCardAndCheckDeckIdAssociation = await Cards.findOne({
            where: {DeckId: 1},
            include: Decks
        })
        expect(findOneDeckAndCardsAssociated.Cards[0].DeckId).toBe(findOneCardAndCheckDeckIdAssociation.id)

        // console.log(findOneDeckAndCardsAssociated.Cards)
    })

    test('CRUD functionality, should READ from Cards table', async () => {
        let findImgUrlInTable = await Cards.findOne({
            where: {imgUrl: cards.imgUrl},
        });
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
        expect(await Cards.findAll()).toHaveLength(3);
        await (await Cards.findByPk(1)).destroy();
        // expect(await Cards.findAll()).toStrictEqual([]);
    });

});