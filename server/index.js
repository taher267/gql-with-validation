import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
// import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    constraintDirective,
    constraintDirectiveTypeDefs,
} from "graphql-constraint-directive";
// import cors from "cors";

// const app = express();
let schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    resolvers,
});
schema = constraintDirective()(schema);
const server = new ApolloServer({ schema });
const { url } = await startStandaloneServer(server);
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
