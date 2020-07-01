require('dotenv').config();
const { env: { PORT, MONGODB_URL } } = process;
const express = require('express');
const graphqlHttp = require('express-graphql');
const { mongoose } = require('stickies-data');
const schema = require('./schema');
const { jwtVerifier } = require('./middlewares');

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const api = express();

        api.use(jwtVerifier);

        api.use('/graphql', graphqlHttp(request => ({
            schema,
            graphiql: true,
            context: { request }
        })))

        api.listen(PORT, () => console.log(`Server running and listening to port ${PORT}`));
    })