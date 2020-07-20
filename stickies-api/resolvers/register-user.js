const { User } = require('stickies-data');
const { validate } = require('../utils');
const { UnauthorizedError } = require('../errors');
const bcrypt = require('bcryptjs');

module.exports = (name, surname, email, password) => {
    validate.string(name, 'name');
    validate.string(surname, 'surname');
    validate.string(email, 'email');
    validate.email(email);
    validate.string(password, 'password');

    return (async() => {
        const user = await User.findOne({ email });
        if (user) throw new UnauthorizedError(`user with email ${email} already exists`);

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, surname, email, password: encryptedPassword });

        return;
    })()
}