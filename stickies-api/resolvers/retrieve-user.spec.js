require('dotenv').config();
const { env: { SECRET, MONGODB_URL } } = process;
const retrieveUser = require('./retrieve-user');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const atob = require('atob');
const { User, mongoose } = require('stickies-data');
const { ContentError, NotFoundError, UnauthorizedError } = require('../errors');
const { random } = Math;

describe('retrieveUser', () => {
    let name, surname, email, password, encryptedPassword, userId;

    before(async () => {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await User.deleteMany();
    })

    beforeEach(async () => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id.toString();
    })

    it('should succeed on retrieve the user on valid userId', async () => {
        const user = await retrieveUser(userId);

        expect(user).to.exist;
        expect(user).to.be.instanceof(Object);
        expect(user.name).to.equal(name);
        expect(user.surname).to.equal(surname);
        expect(user.email).to.equal(email);
        expect(user.password).not.to.equal(password);
        expect(user.stickies).to.exist;
        expect(user.stickies).to.be.instanceof(Array);
    })

    it('should fail to retrieve the user if the user does not exist', async () => {
        await User.deleteMany();

        let _error;

        try {
            await retrieveUser(userId);
        } catch(error) {
            _error = error;
        }

        expect(_error).to.exist;
        expect(_error).to.be.instanceof(NotFoundError);
        expect(_error.message).to.equal(`user with id ${userId} does not exist`);
    })

    it('should fail on non-string userId', () => {
        userId = 239875;
        expect(() => retrieveUser(userId)).to.throw(TypeError, `${userId} is not a string`);

        userId = undefined;
        expect(() => retrieveUser(userId)).to.throw(TypeError, `${userId} is not a string`);

        userId = {};
        expect(() => retrieveUser(userId)).to.throw(TypeError, `${userId} is not a string`);

        userId = [1, 2, 3];
        expect(() => retrieveUser(userId)).to.throw(TypeError, `${userId} is not a string`);

        userId = false;
        expect(() => retrieveUser(userId)).to.throw(TypeError, `${userId} is not a string`);
    })

    afterEach(async () => await User.deleteMany());

    after(async () => {
        await User.deleteMany();
        mongoose.disconnect();
    })
})