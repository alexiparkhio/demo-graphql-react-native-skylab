require('dotenv').config();
const { env: { SECRET, MONGODB_URL } } = process;
const addSticky = require('./add-sticky');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const { User, Sticky, mongoose } = require('stickies-data');
const { ContentError, NotFoundError, UnauthorizedError } = require('../errors');
const { random } = Math;
const { randomDateGenerator } = require('../utils');

describe('addSticky', () => {
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

        message = `message-${random()}`;
        created = randomDateGenerator();
    })

    it('should succeed on create a new sticky on valid data', async () => {
        const result = await addSticky(userId, message, created);

        expect(result).to.be.undefined;

        const sticky = await Sticky.findOne({ message, created, author: userId });

        expect(sticky).to.exist;
        expect(sticky).to.be.instanceof(Object);
        expect(sticky.message).to.equal(message);
        expect(sticky.created).to.equal(created);
        expect(sticky.author.toString()).to.deep.equal(userId);
    });

    it('should fail to add a new sticky if the user does not exist', async () => {
        await User.deleteMany();

        let _error;

        try {
            await addSticky(userId, message, created);
        } catch(error) {
            _error = error;
        }

        expect(_error).to.exist;
        expect(_error).to.be.instanceof(NotFoundError);
        expect(_error.message).to.equal(`user with id ${userId} does not exist`);
    })

    it('should fail on non-string userId', () => {
        userId = 239875;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${userId} is not a string`);

        userId = undefined;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${userId} is not a string`);

        userId = {};
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${userId} is not a string`);

        userId = [1, 2, 3];
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${userId} is not a string`);

        userId = false;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${userId} is not a string`);
    })

    it('should fail on non-string message', () => {
        userId = 'some id';

        message = 23487;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${message} is not a string`);

        message = undefined;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${message} is not a string`);

        message = {};
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${message} is not a string`);

        message = [1, 2, 3];
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${message} is not a string`);

        message = false;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${message} is not a string`);
    })

    it('should fail on non-string created', () => {
        message = 'some message';

        created = 239875;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${created} is not a string`);

        created = undefined;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${created} is not a string`);

        created = {};
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${created} is not a string`);

        created = [1, 2, 3];
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${created} is not a string`);

        created = false;
        expect(() => addSticky(userId, message, created)).to.throw(TypeError, `${created} is not a string`);
    })

    afterEach(async () => await Promise.all([User.deleteMany(), Sticky.deleteMany()]));

    after(async () => {
        await Promise.all([User.deleteMany(), Sticky.deleteMany()]);
        mongoose.disconnect();
    })
})