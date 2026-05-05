import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import Section from '@/components/Section';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Pedalboard build guides, signal chain tips, cable deep-dives, and gear advice from 17 years of professional rig building.',
  openGraph: {
    title: 'Blog | The Rig Doctor',
    description:
      'Pedalboard build guides, signal chain tips, and gear advice from The Rig Doctor.',
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* ── Hero ── */}
      <Section theme="dark" className="!py-16 md:!py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-4">
          From the Workbench
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#f5f5f7] mb-4">
          The Rig Doctor Blog
        </h1>
        <p className="text-lg text-[#f5f5f7]/60 max-w-2xl">
          Build guides, signal chain breakdowns, cable science, and gear
          advice — from someone who&apos;s actually built 200+ rigs.
        </p>
      </Section>

      {/* ── Featured Post ── */}
      {featured && (
        <Section theme="light">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block md:grid md:grid-cols-2 md:gap-12 items-center"
          >
            {featured.heroImage && (
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 md:mb-0 border border-black/[0.04]">
                <Image
                  src={featured.heroImage}
                  alt={featured.heroAlt || featured.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
            <div>
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F5A623] mb-3">
                {featured.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-3 group-hover:text-[#F5A623] transition-colors">
                {featured.title}
              </h2>
              <p className="text-[15px] text-black/50 leading-relaxed mb-4">
                {featured.description}
              </p>
              <div className="flex items-center gap-3 text-[13px] text-black/40">
                <span>{featured.author}</span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <span>{featured.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <time dateTime={featured.publishedAt}>
                  {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </Link>
        </Section>
      )}

      {/* ── More Posts ── */}
      {rest.length > 0 && (
        <Section theme="lightGray">
          <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-10">
            More articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-black/[0.04] overflow-hidden hover:border-black/[0.1] transition-colors"
              >
                {post.heroImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.heroAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F5A623] mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-2 group-hover:text-[#F5A623] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-black/45 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-3 text-[12px] text-black/35">
                    {post.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ── CTA ── */}
      <Section theme="dark">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Rather have us build it for you?
          </h2>
          <p className="text-lg text-[#f5f5f7]/60 mb-8 max-w-xl mx-auto">
            17 years. 200+ builds. Lifetime support. Let&apos;s talk about your
            rig.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Book a Free Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
