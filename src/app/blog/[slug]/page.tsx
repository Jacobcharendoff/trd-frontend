import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog';
import Section from '@/components/Section';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.heroImage
        ? [{ url: post.heroImage, width: 1200, height: 630, alt: post.heroAlt || post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);

  // Article JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.heroImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Rig Doctor',
      url: 'https://www.therigdr.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Article Header ── */}
      <Section theme="dark" className="!py-16 md:!py-24">
        <div className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#f5f5f7]/50 hover:text-[#f5f5f7]/80 transition-colors mb-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0071E3] mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#f5f5f7] leading-[1.1] mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-[13px] text-[#f5f5f7]/40">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>
      </Section>

      {/* ── Hero Image ── */}
      {post.heroImage && (
        <Section theme="light" className="!py-0 !-mt-8">
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden border border-black/[0.04]">
            <Image
              src={post.heroImage}
              alt={post.heroAlt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1080px) 100vw, 1080px"
              priority
            />
          </div>
        </Section>
      )}

      {/* ── Article Body ── */}
      <Section theme="light" className="!py-12 md:!py-16">
        <article className="max-w-3xl mx-auto">
          {post.sections.map((section, i) => (
            <div key={i} className="mb-8 last:mb-0">
              {section.heading &&
                (section.headingLevel === 3 ? (
                  <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mb-4 mt-10">
                    {section.heading}
                  </h3>
                ) : (
                  <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-4 mt-12 first:mt-0">
                    {section.heading}
                  </h2>
                ))}
              <div
                className="prose-trd"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}
        </article>
      </Section>

      {/* ── CTA Banner ── */}
      {post.cta && (
        <Section theme="lightGray" className="!py-12 md:!py-16">
          <div className="max-w-3xl mx-auto bg-[#0a0a0a] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f5f7] mb-4">
              {post.cta.text}
            </h2>
            <Link
              href={post.cta.href}
              className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              {post.cta.label}
            </Link>
          </div>
        </Section>
      )}

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <Section theme="light">
          <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-8">
            Keep reading
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group block bg-[#f5f5f7] rounded-2xl overflow-hidden border border-black/[0.04] hover:border-black/[0.1] transition-colors"
              >
                {rp.heroImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={rp.heroImage}
                      alt={rp.heroAlt || rp.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0071E3] mb-2">
                    {rp.category}
                  </span>
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-2 group-hover:text-[#0071E3] transition-colors leading-snug">
                    {rp.title}
                  </h3>
                  <p className="text-[13px] text-black/45 leading-relaxed line-clamp-2">
                    {rp.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
