const rawUrl =
  process.env.ERXES_API_URL ??
  "https://mongoliansecrethistory.next.erxes.io/gateway/graphql";
const ERXES_API_URL = rawUrl.endsWith("/gateway/graphql")
  ? rawUrl
  : `${rawUrl.replace(/\/$/, "")}/gateway/graphql`;

/**
 * Same-origin GraphQL proxy.
 *
 * The erxes app token is a secret (`sk_…`) and must never reach the browser, so
 * client-side Apollo talks to this route and the token is attached here.
 */
export async function POST(request: Request) {
  const body = await request.text();

  const authorization = request.headers.get("authorization");

  const response = await fetch(ERXES_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-token":
        process.env.ERXES_CLIENT_PORTAL_TOKEN ??
        process.env.ERXES_APP_TOKEN ??
        "",
      ...(authorization ? { authorization } : {}),
    },
    body,
    cache: "no-store",
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("content-type") ?? "application/json",
    },
  });
}
