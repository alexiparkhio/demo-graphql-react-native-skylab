const { GraphQLSchema } = require('graphql');
const mutation = require('./mutations');
const query = require('./root-query');

module.exports = new GraphQLSchema({
    mutation, query
})