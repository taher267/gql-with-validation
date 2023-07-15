import ApolloWrapper from "@/context/ApolloWrapper";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ApolloWrapper>
      <Component {...pageProps} />
    </ApolloWrapper>
  );
}
