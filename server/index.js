import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    constraintDirective,
    constraintDirectiveTypeDefs,
} from "graphql-constraint-directive";

let schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    resolvers
});
schema = constraintDirective()(schema);
const server = new ApolloServer({ schema });
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
