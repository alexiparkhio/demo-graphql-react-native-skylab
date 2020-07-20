const { User } = require('stickies-data');

module.exports = () => {
    return (async () => {
        const users = await User.find().lean();
        users.forEach(user => {
            user.id = user._id.toString();
            delete user._id, delete user.__v;
        })

        return users;
    })();
}