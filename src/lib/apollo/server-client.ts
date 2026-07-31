import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export async function getServerApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.ERXES_API_URL,
      headers: {
        "erxes-app-token": process.env.ERXES_APP_TOKEN ?? "",
        "x-app-token": process.env.ERXES_CLIENT_PORTAL_TOKEN ?? "",
      },
      fetchOptions: { next: { revalidate: 60 } },
    }),
    cache: new InMemoryCache(),
  });
}
