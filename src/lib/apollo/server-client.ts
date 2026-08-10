import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export async function getServerApolloClient() {
  const rawUrl =
    process.env.ERXES_API_URL ??
    "https://mongoliansecretstory.next.erxes.io/gateway/graphql";
  const uri = rawUrl.endsWith("/gateway/graphql")
    ? rawUrl
    : `${rawUrl.replace(/\/$/, "")}/gateway/graphql`;

  return new ApolloClient({
    link: new HttpLink({
      uri,
      headers: {
        // The erxes CMS gateway requires `x-app-token` header carrying the Client Portal token
        "x-app-token":
          process.env.ERXES_CLIENT_PORTAL_TOKEN ??
          process.env.ERXES_APP_TOKEN ??
          "",
      },
      fetchOptions: { next: { revalidate: 60 } },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { errorPolicy: "all" },
      watchQuery: { errorPolicy: "all" },
    },
  });
}
