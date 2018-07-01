import {GraphQLServer} from "graphql-yoga";
import {Prisma} from "prisma-binding";
import * as Query from "./resolvers/Query";
import * as Mutation from "./resolvers/Mutation";
import * as AuthPayload from "./resolvers/AuthPayload";

const resolvers = {
    Query,
    Mutation,
    AuthPayload
};

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET
});

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        prisma: prisma
    })
});

server.start(() => console.log('Server is running on http://localhost:4000 ...'));