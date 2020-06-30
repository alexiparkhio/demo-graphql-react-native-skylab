const { User } = require('stickies-data');
const { validate } = require('../utils');
const { NotFoundError } = require('../errors');

module.exports = userId => {
    validate.string(userId, 'userId');

    return (async () => {
        const user = await User.findById(userId).lean();
        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`);

        const { name, surname, email } = user;

        return { name, surname, email };
    })();
}