const { GraphQLClient } = require('graphql-request');
const context = require('./context');

module.exports = function () {
    return (async () => {
        const graphQLClient = new GraphQLClient(this.API_URL, {
            credentials: 'include',
            mode: 'cors',
        });

        const query = `{
            stickies {
              message
              author {
                name
                surname
                email
              }
              created
            }
          }`;

        const { stickies, error } = await graphQLClient.request(query);
        if (error) throw new Error(error);
        
        return stickies;
    })();
}.bind(context);