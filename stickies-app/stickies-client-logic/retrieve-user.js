const { request, GraphQLClient } = require('graphql-request');
const context = require('./context');
const { validate } = require('./utils');

module.exports = function () {
    return (async () => {
        const token = await this.storage.getItem('token');

        const graphQLClient = new GraphQLClient(this.API_URL, {
            credentials: 'include',
            mode: 'cors',
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const query = `{
            user {
              name
              surname
              email
              stickies {
                message
                created
              }
            }
          }`;

        const { user, error } = await graphQLClient.request(query)
        if (error) throw new Error(error);

        return user;
    })()
}.bind(context)