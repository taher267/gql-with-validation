// import ApolloWrapper from "@/context/ApolloWrapper";
import ApolloPubSubWrapper from "@/context/ApolloPubSubWrapper";
import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//   return (
//     <ApolloWrapper>
//       <Component {...pageProps} />
//     </ApolloWrapper>
//   );
// }

export default function App({ Component, pageProps }) {
  return (
    <ApolloPubSubWrapper>
      <Component {...pageProps} />
    </ApolloPubSubWrapper>
  );
}
