import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_MENUS } from "@/graphql/cms/queries/menu";
import type { MenuItem, CpMenusData } from "@/graphql/cms/queries/menu";

const CLIENT_PORTAL_ID = process.env.ERXES_CLIENT_PORTAL_ID;

export async function getCmsMenus(locale: string) {
  try {
    const client = await getServerApolloClient();

    const [{ data: headerData }, { data: footerData }] = await Promise.all([
      client.query<CpMenusData>({
        query: CP_MENUS,
        variables: { clientPortalId: CLIENT_PORTAL_ID, language: locale, kind: "header" },
        context: { revalidate: 60 },
      }),
      client.query<CpMenusData>({
        query: CP_MENUS,
        variables: { clientPortalId: CLIENT_PORTAL_ID, language: locale, kind: "footer" },
        context: { revalidate: 60 },
      }),
    ]);

    const sort = (items: MenuItem[] = []) =>
      items
        .filter((item) => !item.parentId)
        .reduce<MenuItem[]>((acc, item) => {
          const url = item.url || "/";
          if (!acc.some((existing) => (existing.url || "/") === url)) {
            acc.push(item);
          }
          return acc;
        }, [])
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return {
      header: sort(headerData?.cpCmsMenuList || []),
      footer: sort(footerData?.cpCmsMenuList || []),
    };
  } catch (error) {
    console.warn("CMS menus query fallback:", error instanceof Error ? error.message : String(error));
    return { header: [], footer: [] };
  }
}
