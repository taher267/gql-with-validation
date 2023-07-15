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
const server = new ApolloServer({
    schema,
    plugins: [
        {
            async requestDidStart() {
                return {
                    async willSendResponse(requestContext) {
                        const { response, errors } = requestContext;
                        if (errors) {
                            const errs = {};
                            response.body.singleResult.errors.forEach((item) => {
                                const [mix, _, message] = item.message.split(/"; |". /);
                                const [__, Operation_key] = mix.split('" at "');
                                const [___, key] = Operation_key.split(".");
                                errs[key] = message;
                            });
                            response.body.singleResult.errors.push(errs);
                        }
                        return response;
                        // if (
                        //   response.body.kind === "single" &&
                        //   "data" in response.body.singleResult
                        // ) {
                        //   response.body.singleResult.extensions = {
                        //     ...response.body.singleResult.extensions,
                        //     hello: "world",
                        //   };
                        // }
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
