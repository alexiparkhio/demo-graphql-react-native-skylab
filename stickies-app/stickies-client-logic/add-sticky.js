const { GraphQLClient } = require('graphql-request');
const context = require('./context');
const { validate } = require('./utils');

module.exports = function (message, created) {
    validate.string(message, 'message');
    validate.string(created, 'created');

    return (async () => {
        const token = await this.storage.getItem('token');

        const graphQLClient = new GraphQLClient(this.API_URL, {
            credentials: 'include',
            mode: 'cors',
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const mutation = `
        mutation {
            addSticky(message: "${message}", created: "${created}")
        }`;

        const { error } = await graphQLClient.request(mutation)
        if (error) throw new Error(error);

        return;
    })()
}.bind(context)