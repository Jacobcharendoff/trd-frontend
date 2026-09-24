import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | The Rig Doctor`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      ...(post.updatedAt && { modifiedTime: post.updatedAt }),
      authors: [post.author],
      tags: post.tags,
      ...(post.heroImage && {
        images: [{ url: post.heroImage, alt: post.heroAlt || post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.heroImage && { images: [post.heroImage] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  /* ── structured data ───────────────────────────────── */
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Rig Doctor',
      url: 'https://therigdr.com',
    },
    ...(post.heroImage && {
      image: post.heroImage,
    }),
  };

  const faqJsonLd = post.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* FAQPage JSON-LD (conditional) */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* ── Breadcrumbs ───────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-3xl px-6 pt-28 pb-4 text-sm"
      >
        <ol className="flex items-center gap-2 text-black/50">
          <li>
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-black transition-colors">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-black/80 truncate max-w-[200px]">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* ── Article ───────────────────────────────────── */}
      <article className="mx-auto max-w-3xl px-6 pb-24">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-black/50 mb-4">
            <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs font-medium text-black/70">
              {post.category}
            </span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-black/60 leading-relaxed mb-6">
            {post.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-black/50">
            <span>By {post.author}</span>
          </div>
        </header>

        {/* Hero image */}
        {post.heroImage && (
          <div className="mb-12 overflow-hidden rounded-2xl">
            <img
              src={post.heroImage}
              alt={post.heroAlt || post.title}
              className="w-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Content sections */}
        <div className="prose prose-lg max-w-none prose-headings:text-[#1d1d1f] prose-headings:font-bold prose-headings:tracking-tight prose-p:text-black/70 prose-p:leading-relaxed prose-a:text-[#0071E3] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1d1d1f] prose-li:text-black/70 prose-ul:text-black/70">
          {post.sections.map((section, i) => (
            <div key={i} className={i > 0 ? 'mt-10' : ''}>
              {section.heading &&
                (section.headingLevel === 3 ? (
                  <h3>{section.heading}</h3>
                ) : (
                  <h2>{section.heading}</h2>
                ))}
              <div
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-black/[0.06]">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        {post.cta && (
          <div className="mt-12 rounded-2xl bg-[#f5f5f7] p-8 md:p-12 text-center">
            <p className="text-xl font-semibold text-[#1d1d1f] mb-4">
              {post.cta.text}
            </p>
            <Link
              href={post.cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-8 py-3 text-sm font-medium text-white hover:bg-[#005BB5] transition-colors"
            >
              {post.cta.label}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-black/[0.06] p-6 hover:border-black/[0.12] transition-colors"
                >
                  <span className="text-xs text-black/50 mb-2 block">
                    {r.category}
                  </span>
                  <h3 className="font-semibold text-[#1d1d1f] group-hover:text-[#0071E3] transition-colors mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-black/50 line-clamp-2">
                    {r.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
