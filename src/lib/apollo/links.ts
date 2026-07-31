import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_ERXES_API_URL,
  headers: {
    "erxes-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ?? "",
    "x-app-token": process.env.NEXT_PUBLIC_ERXES_CLIENT_PORTAL_TOKEN ?? "",
  },
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
