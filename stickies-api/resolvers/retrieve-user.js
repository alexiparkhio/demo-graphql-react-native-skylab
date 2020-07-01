const { User } = require('stickies-data');
const { validate } = require('../utils');
const { NotFoundError } = require('../errors');

module.exports = userId => {
    validate.string(userId, 'userId');

    return (async () => {
        const user = await User.findById(userId).lean();
        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`);

        user.id = user._id.toString();
        delete user._id;
        delete user.__v;

        return user
    })();
}