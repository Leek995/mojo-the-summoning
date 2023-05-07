const { sequelize } =  require("../db/config");
const { Attacks } =  require("./Attacks");



let attacks;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    attacks = await Attacks.create({title: "Melee", mojoCost: 5, staminaCost: 20});
});

afterAll(async () => {
    await sequelize.sync({ force: true });
});

describe('Attacks', () =>{

    test('has an "id"', async () => {
        expect(attacks).toHaveProperty('id');
        expect(attacks.id).toBe(1);
    });

    test('the created attacks is an instance of Attacks class', async () => {
        expect(attacks).toBeInstanceOf(Attacks);
    });

    test('has properties with correct datatype', async () => {
        expect(attacks.title).toBe('Melee');
        expect(typeof attacks.title).toBe("string");
        expect(attacks.mojoCost).toBe(5);
        expect(typeof attacks.mojoCost).toBe("number");
        expect(attacks.staminaCost).toBe(20);
        expect(typeof attacks.staminaCost).toBe("number");
    });

    test('CRUD functionality, should READ from Attacks Table', async () => {
        let findAllAttacksFromTableAttacks = await Attacks.findAll();
        expect(findAllAttacksFromTableAttacks).toHaveLength(1);
        let findOneAttacksFromAttacksTable =  await Attacks.findOne({
            where: {mojoCost: 5},
        });
        expect(findOneAttacksFromAttacksTable.mojoCost).toBe(5);
        expect(findOneAttacksFromAttacksTable.title).toBe('Melee');
        let foundWrongInstance = await Attacks.findOne({where: {title: 'Mage'}});
        expect(foundWrongInstance).toBe(null);
    });

    test('CRUD functionality, should UPDATE instance in Attacks Table', async () => {
        let findTitleInTableAndUpdate = await Attacks.findOne({where: {title: 'Melee'}});
        expect(findTitleInTableAndUpdate.title).toBe('Melee');
        await findTitleInTableAndUpdate.update({title: 'Mage'});
        //check other properties
        let checkPropertiesAfterUpdate = await Attacks.findOne({where: {title: 'Mage'}});
        expect(checkPropertiesAfterUpdate.title).toBe('Mage');
        expect(checkPropertiesAfterUpdate.mojoCost).toBe(5);
        expect(checkPropertiesAfterUpdate.staminaCost).toBe(20);
        expect(checkPropertiesAfterUpdate.id).toBe(1);
    });

    test('CRUD functionality, should Delete instance of attacks from Table', async () => {
       let grabInstanceToDestroy =  await Attacks.findByPk(1);
       expect(grabInstanceToDestroy.id).toBe(1);
       await grabInstanceToDestroy.destroy();
       let checkIfInstanceDeleted = await Attacks.findByPk(1);
       expect(checkIfInstanceDeleted).toBe(null);
    });

});


