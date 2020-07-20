const { validate } = require('../utils');
const { Sticky, User } = require('stickies-data');
const { NotFoundError } = require('../errors');

module.exports = (userId, message, created) => {
    validate.string(userId, 'userId');
    validate.string(message, 'message');
    validate.string(created, 'created');

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`);

        const sticky = await Sticky.create({ author: userId, message, created });
        await User.findByIdAndUpdate(userId, { $addToSet: { stickies: sticky.id } });

        return;
    })();
}