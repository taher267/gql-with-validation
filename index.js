// import express from "express";
// import { expressMiddleware } from "@apollo/server/express4";
// import cors from "cors";
// const app = express();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import {
    constraintDirective,
    constraintDirectiveTypeDefs,
} from "graphql-constraint-directive";
import respErrsKeyValues from "./helper/respErrsKeyValues.js";
import express from 'express';
const app = express();

let schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    resolvers,
});
schema = constraintDirective()(schema);
const httpServer = createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/',
    // path: '/graphql',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async requestDidStart() {
                return {
                    async willSendResponse(requestContext) {
                        const { response, errors } = requestContext;
                        if (errors) {
                            response.body.singleResult.errors.push(respErrsKeyValues(errors));
                        }
                        return response;
                    },
                };
            },
        },
    ],
});
const { url } = await startStandaloneServer(server, {
    context: () => { },
});
console.log(`🚀 Server ready at ${url}`);

// server.logger.info()
// const middlewires = [
//     cors(),
//     expressMiddleware(server, {
//         context: async ({ req }) => ({ token: req.headers.token }),
//     }),
// ];

// if (process.env.NODE_ENV) {
//     const morgan = await import("morgan");
//     middlewires.push(morgan.default("dev"));
// }
// app.use("/", middlewires, (req, res, next) => {
//     console.log(req);
// });
