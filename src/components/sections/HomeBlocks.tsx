import Image from "@/components/common/Image";
import Button from "@/components/ui/Button";
import Reveal, { RevealClip } from "@/components/common/Reveal";
import type { HomeBlock, HomeBlockImage } from "@/lib/cms/homeBlocks";

/**
 * Renders CMS-authored home page sections.
 *
 * Editors pick only two things: which side the imagery sits on (via the child
 * category) and how many images they upload. The image count picks the grid, so
 * there is no way to author a section the design cannot render.
 *
 * Reveals go through `Reveal`, not the shared sections' `clipPath` animation —
 * that one leaves imagery permanently invisible whenever its viewport observer
 * misses, and CMS imagery must always end up on screen.
 */

/** Tailwind cannot see class names built at runtime, so spell them out. */
const GRID_BY_COUNT: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1",
};

function gridClass(count: number) {
  return GRID_BY_COUNT[count] ?? "grid-cols-2";
}

/** The lead image of a 3-up runs full width above the pair beneath it. */
function cellClass(index: number, count: number) {
  if (count === 1) return "aspect-[4/3]";
  if (count === 2) return "aspect-[16/10]";
  if (count === 3) return index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]";
  return "aspect-[4/3]";
}

function BlockImage({
  image,
  className,
  delay,
}: {
  image: HomeBlockImage;
  className: string;
  delay: number;
}) {
  return (
    <RevealClip delay={delay} className={className}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover transition-transform duration-700 hover:scale-105"
      />
    </RevealClip>
  );
}

function HomeBlockSection({
  block,
  locale,
}: {
  block: HomeBlock;
  locale: string;
}) {
  const { title, description, images, ctaLabel, ctaUrl, imageOnRight } = block;

  // Blocks store site-internal paths without a locale prefix so one block works
  // for every language.
  const href = ctaUrl.startsWith("/") ? `/${locale}${ctaUrl}` : ctaUrl;

  return (
    <section className="bg-[#FAFAF8] py-6 md:py-10">
      <div className="container-custom">
        <div
          className={`grid items-stretch gap-6 ${
            imageOnRight ? "lg:grid-cols-[45%_1fr]" : "lg:grid-cols-[1fr_45%]"
          }`}
        >
          <div
            className={`grid gap-4 ${gridClass(images.length)} ${
              imageOnRight ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {images.map((image, index) => (
              <BlockImage
                key={`${image.src}-${index}`}
                image={image}
                className={cellClass(index, images.length)}
                delay={index * 150}
              />
            ))}
          </div>

          <Reveal
            delay={100}
            className={`flex flex-col justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 lg:p-16 ${
              imageOnRight ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <Reveal delay={350}>
              <h3 className="font-elegant text-3xl md:text-4xl font-medium text-[#0A2C7A] dark:text-white">
                {title}
              </h3>
            </Reveal>
            {description ? (
              <Reveal delay={500}>
                <p className="text-[#5A5A5A] dark:text-slate-300 leading-[1.8] text-sm md:text-base mt-5">
                  {description}
                </p>
              </Reveal>
            ) : null}
            {ctaLabel ? (
              <Reveal delay={650} className="mt-8">
                <Button
                  href={href}
                  variant="outline"
                  className="uppercase text-[11px] tracking-[0.15em] px-6 py-3"
                >
                  {ctaLabel}
                </Button>
              </Reveal>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function HomeBlocks({
  blocks,
  locale,
}: {
  blocks: HomeBlock[];
  locale: string;
}) {
  return (
    <>
      {blocks.map((block) => (
        <HomeBlockSection key={block.id} block={block} locale={locale} />
      ))}
    </>
  );
}
