const { request, GraphQLClient } = require('graphql-request');
const context = require('./context');
const { validate } = require('./utils');

module.exports = function (email, password) {
    validate.string(email, 'email');
    validate.email(email);
    validate.string(password, 'password');

    return (async () => {
        const graphQLClient = new GraphQLClient(this.API_URL, {
            credentials: 'include',
            mode: 'cors',
        });

        const mutation = `
    mutation {
        authenticateUser(email:"${email}", password:"${password}") {
          token
        }
      }`;

        const response = await graphQLClient.request(mutation)
        const {authenticateUser: { token }, error} = response;
        if (error) throw new Error(error);
        
        await this.storage.setItem('token', token);

        return;
    })()
}.bind(context)