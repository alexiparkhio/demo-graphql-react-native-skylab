const { User } = require('stickies-data');
const { NotFoundError, UnauthorizedError } = require('../errors');
const { validate } = require('../utils');
const bcrypt = require('bcryptjs');

module.exports = (email, password) => {
    validate.string(email, 'email');
    validate.email(email);
    validate.string(password, 'password');

    return (async() => {
        const user = await User.findOne({ email });
        if (!user) throw new NotFoundError(`user with email ${email} does not exist`);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedError('wrong credentials');

        return user.id.toString();
    })();
}