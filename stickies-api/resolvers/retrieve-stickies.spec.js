require('dotenv').config();
const { env: { SECRET, MONGODB_URL } } = process;
const retrieveStickies = require('./retrieve-stickies');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const { User, Sticky, mongoose } = require('stickies-data');
const { ContentError, NotFoundError, UnauthorizedError } = require('../errors');
const { random } = Math;
const { randomDateGenerator } = require('../utils');

describe('retrieveStickies', () => {
    let name, surname, email, password, encryptedPassword, userId;
    let message, created;

    before(async () => {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await Promise.all([User.deleteMany(), Sticky.deleteMany()]);
    })

    beforeEach(async () => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id.toString();

        for (let i = 0; i < 10; i++) {
            message = `message-${i}`;
            created = randomDateGenerator();

            const sticky = await Sticky.create({ message, author: userId, created });

            await User.findByIdAndUpdate(userId, { $addToSet: { stickies: sticky.id } });
        };
    })

    it('should succeed on retrieve all stickies on valid userId', async () => {
        const stickies = await retrieveStickies(userId);

        expect(stickies).to.exist;
        expect(stickies).to.be.instanceof(Array);

        stickies.forEach((sticky, index) => {
            expect(sticky).to.exist;
            expect(sticky).to.be.instanceof(Object);
            expect(sticky.message).to.equal(`message-${index}`);
            expect(sticky.author.toString()).to.deep.equal(userId);
        })
    })

    it('should return an empty array if no stickies are available to display', async () => {
        await Sticky.deleteMany();

        const stickies = await retrieveStickies(userId);
        
        expect(stickies).to.exist;
        expect(stickies).to.be.instanceof(Array);
        expect(stickies.length).to.equal(0)
    })

    it('should fail to retrieve the user if the user does not exist', async () => {
        await User.deleteMany();

        let _error;

        try {
            await retrieveStickies(userId);
        } catch (error) {
            _error = error;
        }

        expect(_error).to.exist;
        expect(_error).to.be.instanceof(NotFoundError);
        expect(_error.message).to.equal(`user with id ${userId} does not exist`);
    })

    it('should fail on non-string userId', () => {
        userId = 239875;
        expect(() => retrieveStickies(userId)).to.throw(TypeError, `${userId} is not a string`);

        userId = undefined;
        expect(() => retrieveStickies(userId)).to.throw(TypeError, `${userId} is not a string`);

        userId = {};
        expect(() => retrieveStickies(userId)).to.throw(TypeError, `${userId} is not a string`);

        userId = [1, 2, 3];
        expect(() => retrieveStickies(userId)).to.throw(TypeError, `${userId} is not a string`);

        userId = false;
        expect(() => retrieveStickies(userId)).to.throw(TypeError, `${userId} is not a string`);
    })

    afterEach(async () => await Promise.all([User.deleteMany(), Sticky.deleteMany()]));

    after(async () => {
        await Promise.all([User.deleteMany(), Sticky.deleteMany()]);
        mongoose.disconnect();
    })
})