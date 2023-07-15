// import express from "express";
// import { expressMiddleware } from "@apollo/server/express4";
// import cors from "cors";
// const app = express();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    constraintDirective,
    constraintDirectiveTypeDefs,
} from "graphql-constraint-directive";
import respErrsKeyValues from "./helper/respErrsKeyValues.js";

let schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    resolvers,
});
schema = constraintDirective()(schema);
const server = new ApolloServer({
    schema,
    plugins: [
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
