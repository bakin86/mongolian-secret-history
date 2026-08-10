import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_PAGE } from "@/graphql/cms/queries/page";
import type { CpPageData, CpPageVariables } from "@/graphql/cms/queries/page";

export async function getCmsPage(locale: string, slug: string) {
  try {
    const client = await getServerApolloClient();
    const { data } = await client.query<CpPageData, CpPageVariables>({
      query: CP_PAGE,
      variables: { slug, language: locale },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    return data?.cpCmsPageDetail ?? null;
  } catch (error) {
    console.warn(`CMS page query fallback (${slug}):`, error instanceof Error ? error.message : String(error));
    return null;
  }
}
