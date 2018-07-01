"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const prisma_binding_1 = require("prisma-binding");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const AuthPayload = require("./resolvers/AuthPayload");
const resolvers = {
    Query,
    Mutation,
    Subscription,
    AuthPayload
};
const prisma = new prisma_binding_1.Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET
});
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: req => (Object.assign({}, req, { prisma: prisma }))
});
server.start(() => console.log('Server is running on http://localhost:4000 ...'));
//# sourceMappingURL=index.js.map