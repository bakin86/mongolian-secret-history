import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import CmsContent from "@/components/cms/CmsContent";
import { stripHtml } from "@/lib/cms/html";
import { notFound } from "next/navigation";
import type { Page } from "@/graphql/cms/queries/page";

interface CmsPageShellProps {
  page: Page | null;
  namespace?: string;
}

export default async function CmsPageShell({ page }: CmsPageShellProps) {
  if (!page) notFound();

  return (
    <InnerPageLayout>
      <PageHero
        label=""
        title={page.name || ""}
        subtitle={stripHtml(page.description || "")}
      />
      <section className="bg-white py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[900px] px-6 lg:px-0">
          <CmsContent html={page.content || ""} />
        </div>
      </section>
    </InnerPageLayout>
  );
}
