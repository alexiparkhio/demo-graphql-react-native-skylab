require('dotenv').config();
const { env: { MONGODB_URL } } = process;
const bcrypt = require('bcryptjs');
const { expect } = require('chai');
const { mongoose, User } = require('stickies-data');
const { random } = Math;
const registerUser = require('./register-user');
const { UnauthorizedError, ContentError } = require('../errors');

describe('registerUser', () => {
    let name, surname, email, password, match;

    before(async () => {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await User.deleteMany();
    });

    beforeEach(() => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
    })

    it('should succeed to register a new user on correct and valid inputs', async () => {
        const result = await registerUser(name, surname, email, password);

        expect(result).to.be.undefined;

        const user = await User.findOne({ name, surname, email });

        expect(user).to.exist;
        expect(user).to.be.instanceof(Object);
        expect(user.name).to.equal(name);
        expect(user.surname).to.equal(surname);
        expect(user.email).to.equal(email);
        expect(user.password).not.to.equal(password);

        match = await bcrypt.compare(password, user.password);

        expect(match).to.be.true;
    })

    it('should fail to register a user if the user already exists on the database', async () => {
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, surname, email, password: encryptedPassword });

        let _error;

        try {
            await registerUser(name, surname, email, password);
        } catch (error) {
            _error = error;
        }

        expect(_error).to.exist;
        expect(_error).to.be.instanceof(UnauthorizedError);
        expect(_error.message).to.equal(`user with email ${email} already exists`);
    });

    it('should fail on non-string name', () => {
        name = 239875;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${name} is not a string`);

        name = undefined;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${name} is not a string`);

        name = {};
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${name} is not a string`);

        name = [1, 2, 3];
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${name} is not a string`);

        name = false;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${name} is not a string`);
    })

    it('should fail on non-string surname', () => {
        name = `name-${random()}`;
        surname = 932857;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${surname} is not a string`);

        surname = undefined;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${surname} is not a string`);

        surname = {};
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${surname} is not a string`);

        surname = [1, 2, 3];
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${surname} is not a string`);

        surname = false;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${surname} is not a string`);
    })

    it('should fail on non-string email', () => {
        surname = `surname-${random()}`;
        email = 239875;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${email} is not a string`);

        email = undefined;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${email} is not a string`);

        email = {};
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${email} is not a string`);

        email = [1, 2, 3];
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${email} is not a string`);

        email = false;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${email} is not a string`);
    })

    it('should fail on a non-email email', () => {
        email = 'skdjfnc';
        expect(() => registerUser(name, surname, email, password)).to.throw(ContentError, `${email} is not an e-mail`);
    })

    it('should fail on non-string password', () => {
        email = `email-${random()}@gmail.com`;
        password = 239875;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${password} is not a string`);

        password = undefined;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${password} is not a string`);

        password = {};
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${password} is not a string`);

        password = [1, 2, 3];
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${password} is not a string`);

        password = false;
        expect(() => registerUser(name, surname, email, password)).to.throw(TypeError, `${password} is not a string`);
    })

    afterEach(async () => await User.deleteMany())

    after(async () => {
        await User.deleteMany();
        await mongoose.disconnect();
    })
})  