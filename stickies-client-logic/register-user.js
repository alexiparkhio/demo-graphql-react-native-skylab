const { request } = require('graphql-request');
const context = require('./context');
const { validate } = require('./utils');

module.exports = function (name, surname, email, password) {
    validate.string(name, 'name');
    validate.string(surname, 'surname');
    validate.string(email, 'email');
    validate.email(email);
    validate.string(password, 'password');

    return (async () => {
        const mutation = `
        mutation{
          registerUser(name:"${name}", surname:"${surname}", email:"${email}", password:"${password}")
        }`;

        const { error } = await request(this.API_URL, mutation);

        if (error) throw new Error(error);

        return;
    })()
}.bind(context)