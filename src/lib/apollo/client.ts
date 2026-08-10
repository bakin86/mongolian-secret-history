import { ApolloClient, InMemoryCache } from "@apollo/client";
import { link } from "./links";

let instance: ApolloClient | undefined;

export function getApolloClient(): ApolloClient {
  if (!instance) {
    instance = new ApolloClient({
      link,
      cache: new InMemoryCache(),
      defaultOptions: {
        query: { errorPolicy: "all" },
        watchQuery: { errorPolicy: "all" },
      },
    });
  }
  return instance;
}
