import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/"
      : "https://gql-ws-server.vercel.app/",
  // uri: "https://gql-ws-server.vercel.app",
});
const wsLink = new GraphQLWsLink(
  createClient({
    url:
      process.env.NODE_ENV === "development"
        ? // ? "ws://localhost:4000"
          "ws://localhost:4000/subscriptions"
        : "wss://gql-ws-server.vercel.app",
    // url: "wss://gql-ws-server.vercel.app",
    // url: 'ws://localhost:4000/subscriptions',
    // connectionParams: {
    //   authToken: user.authToken,
    // },
  })
);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
export default function ApolloPubSubWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
