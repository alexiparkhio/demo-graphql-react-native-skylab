require('dotenv').config();
const { env: { SECRET, MONGODB_URL } } = process;
const retrieveUsers = require('./retrieve-users');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
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

    it('should succeed on retrieve all users', async () => {
        const users = await retrieveUsers();

        expect(users).to.exist;
        expect(users).to.be.instanceof(Array);
        expect(users[0].name).to.equal(name);
        expect(users[0].surname).to.equal(surname);
        expect(users[0].email).to.equal(email);
        expect(users[0].id).to.deep.equal(userId);
    })

    it('should succeed to retrieve an empty array if no user is available', async () => {
        await User.deleteMany();
        const users = await retrieveUsers();

        expect(users).to.exist;
        expect(users).to.be.instanceof(Array);
        expect(users.length).to.equal(0);
    })

    afterEach(async () => await User.deleteMany());

    after(async () => {
        await User.deleteMany();
        mongoose.disconnect();
    })
})