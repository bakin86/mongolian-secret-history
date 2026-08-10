import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Routed through a same-origin proxy so the secret app token stays server-side.
const httpLink = new HttpLink({
  uri: "/api/erxes",
});

const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const link = ApolloLink.from([authLink, httpLink]);
