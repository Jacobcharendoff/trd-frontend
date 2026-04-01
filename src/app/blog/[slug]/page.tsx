'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Section from '@/components/Section';
import { BlogPostSchema } from '@/components/StructuredData';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#f5f5f7] mb-4">Post not found</h1>
          <p className="text-[#f5f5f7]/70 mb-8">
            We couldn't find that post. It might have been archived or moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold px-8 py-4 rounded-full trd-cta-primary"
          >
            Back to the Workbench
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Gear Guide':
        return 'bg-[#10B981]';
      case 'Signal Chain':
        return 'bg-[#0071E3]';
      case 'Behind the Bench':
        return 'bg-purple-500';
      case 'Tone Tips':
        return 'bg-blue-500';
      default:
        return 'bg-[#0071E3]';
    }
  };

  return (
    <>
      <BlogPostSchema
        title={post.title}
        description={post.excerpt}
        date={post.date}
        url={`https://www.therigdr.com/blog/${slug}`}
      />
      {/* ──── ARTICLE HERO ──── */}
      <Section theme="light" id="article-hero" reveal>
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0071E3] hover:text-[#005BB5] font-semibold mb-8 transition-colors"
          >
            ← Back to posts
          </Link>
        </div>

        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`${getCategoryColor(
                post.category
              )} text-white text-xs font-semibold px-3 py-1 rounded-full`}
            >
              {post.category}
            </span>
            <span className="text-sm text-[#1d1d1f]/50">{post.date}</span>
            <span className="text-sm text-[#1d1d1f]/50">•</span>
            <span className="text-sm text-[#1d1d1f]/50">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-[#1d1d1f]/70 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </Section>

      {/* ──── ARTICLE CONTENT ──── */}
      <Section theme="light" reveal>
        <div
          className="max-w-[720px] mx-auto prose prose-base text-[#1d1d1f]
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-[#1d1d1f]
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[#1d1d1f]
            [&_p]:text-base [&_p]:text-[#1d1d1f]/80 [&_p]:leading-relaxed [&_p]:mb-6
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-6
            [&_li]:mb-2 [&_li]:text-[#1d1d1f]/80
            [&_strong]:font-semibold [&_strong]:text-[#1d1d1f]
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Section>

      {/* ──── MORE FROM THE BENCH ──── */}
      {relatedPosts.length > 0 && (
        <Section theme="lightGray" id="related" reveal>
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f]">
              More from the bench.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                <div className="bg-white rounded-2xl p-6 h-full flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[#0071E3] border border-transparent">
                  <div className="mb-4">
                    <span
                      className={`${getCategoryColor(
                        relatedPost.category
                      )} text-white text-xs font-semibold px-3 py-1 rounded-full inline-block`}
                    >
                      {relatedPost.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3 leading-tight flex-grow">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-[#1d1d1f]/60 mb-6 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#1d1d1f]/50 border-t border-[#f5f5f7] pt-4">
                    <span>{relatedPost.date}</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ──── CTA ──── */}
      <Section theme="dark" id="cta" reveal>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] mb-4">
            Need help with your rig?
          </h2>
          <p className="text-lg text-[#f5f5f7]/70 mb-8">
            Let's talk about your tone and build something that sounds like you.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold px-8 py-4 rounded-full trd-cta-primary"
          >
            Book a consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
