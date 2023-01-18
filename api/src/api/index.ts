import { ApolloServer } from 'apollo-server-express';
import Schema from './Schema';
import Resolvers from './Resolvers';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';

async function startApolloServer(schema: any, resolvers: any) {
    const app = express();
    const httpServer = http.createServer(app);
    const port = 4680;

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    }) as any;

    await server.start();
    server.applyMiddleware({ app });
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: port }, resolve)
    );
    console.log(
        `Server running at http://localhost:${port}${server.graphqlPath}`
    );
}

startApolloServer(Schema, Resolvers);
