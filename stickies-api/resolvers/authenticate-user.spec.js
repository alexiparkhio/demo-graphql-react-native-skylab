require('dotenv').config();
const { env: { SECRET, MONGODB_URL } } = process;
const authenticateUser = require('./authenticate-user');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const atob = require('atob');
const { User, mongoose } = require('stickies-data');
const { ContentError, NotFoundError, UnauthorizedError } = require('../errors');
const { random } = Math;

describe('authenticateUser', () => {
    let name, surname, email, password, encryptedPassword, userId;

    before(async () => {
        await mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        await User.deleteMany();
    })

    beforeEach(async() => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id.toString();
    })

    it('should succeed on auth the user on valid data', async () => {
        const result = await authenticateUser(email, password);
        expect(result).to.exist;
        expect(result).to.be.a("string");

        const user = await User.findById(result);
        expect(user).to.exist;
        expect(user).to.be.instanceof(Object);
        expect(user.name).to.equal(name);
        expect(user.surname).to.equal(surname);
        expect(user.email).to.equal(email);
        expect(user.id.toString()).to.equal(result);
    })

    it('should fail on wrong credentials', async () => {
        let _error;

        try {
            await authenticateUser(email, `wrong-${password}`);
        } catch(error){
            _error = error;
        }

        expect(_error).to.exist;
        expect(_error).to.be.instanceof(UnauthorizedError);
        expect(_error.message).to.equal('wrong credentials');
    })

    it('should fail to auth the user if the user does not exist', async () => {
        let _error;

        try {
            await authenticateUser(`wrong-${email}`, password);
        } catch(error){
            _error = error;
        }

        expect(_error).to.exist;
        expect(_error).to.be.instanceof(NotFoundError);
        expect(_error.message).to.equal(`user with email wrong-${email} does not exist`);
    })

    it('should fail on non-string email', () => {
        email = 239875;
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${email} is not a string`);

        email = undefined;
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${email} is not a string`);

        email = {};
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${email} is not a string`);

        email = [1, 2, 3];
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${email} is not a string`);

        email = false;
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${email} is not a string`);
    })

    it('should fail on a non-email email', () => {
        email = 'skdjfnc';
        expect(() => authenticateUser(email, password)).to.throw(ContentError, `${email} is not an e-mail`);
    })

    it('should fail on non-string password', () => {
        email = `email-${random()}@gmail.com`;
        password = 239875;
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${password} is not a string`);

        password = undefined;
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${password} is not a string`);

        password = {};
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${password} is not a string`);

        password = [1, 2, 3];
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${password} is not a string`);

        password = false;
        expect(() => authenticateUser(email, password)).to.throw(TypeError, `${password} is not a string`);
    })

    afterEach(async() => await User.deleteMany());

    after(async() => {
        await User.deleteMany();
        mongoose.disconnect();
    })
})