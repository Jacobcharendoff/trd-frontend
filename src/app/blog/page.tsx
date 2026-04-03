'use client';

import Link from 'next/link';
import Section from '@/components/Section';
import { getAllPosts, getFeaturedPost } from '@/lib/blog';

export default function BlogPage() {
  const featuredPost = getFeaturedPost();
  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((post) => !post.featured);

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
      {/* ──── HERO SECTION ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora min-h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 py-20 w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#f5f5f7] mb-4">
              The Workbench.
            </h1>
            <p className="text-lg sm:text-xl text-[#f5f5f7]/80 max-w-2xl mx-auto leading-relaxed">
              Gear guides, signal chain deep dives, and stories from behind the bench.
            </p>
          </div>
        </div>
      </div>

      {/* ──── FEATURED POST ──── */}
      {featuredPost && (
        <Section theme="light" id="featured" reveal>
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              Featured.
            </h2>
          </div>
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#f5f5f7] hover:border-[#0071E3] transition-all duration-300 cursor-pointer hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`${getCategoryColor(
                    featuredPost.category
                  )} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {featuredPost.category}
                </span>
                <span className="text-sm text-[#1d1d1f]/50">{featuredPost.date}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-4 leading-tight">
                {featuredPost.title}
              </h3>
              <p className="text-lg text-[#1d1d1f]/70 mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#1d1d1f]/50">{featuredPost.readTime}</span>
                <span className="text-[#0071E3] font-semibold">Read more →</span>
              </div>
            </div>
          </Link>
        </Section>
      )}

      {/* ──── ALL POSTS GRID ──── */}
      <Section theme="lightGray" id="posts" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            All Posts.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="bg-white rounded-2xl p-6 h-full flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[#0071E3] border border-transparent">
                <div className="mb-4">
                  <span
                    className={`${getCategoryColor(
                      post.category
                    )} text-white text-xs font-semibold px-3 py-1 rounded-full inline-block`}
                  >
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3 leading-tight flex-grow">
                  {post.title}
                </h3>
                <p className="text-sm text-[#1d1d1f]/60 mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-[#1d1d1f]/50 border-t border-[#f5f5f7] pt-4">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ──── CTA SECTION ──── */}
      <Section theme="dark" id="cta" reveal>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] mb-4">
            Got a topic you want us to cover?
          </h2>
          <p className="text-lg text-[#f5f5f7]/70 mb-8">
            Drop us a line and let us know what you want to learn about. We're always listening.
          </p>
          <a
            href="mailto:jacob@therigdr.com"
            className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-[#1d1d1f] font-semibold px-8 py-4 rounded-full trd-cta-primary"
          >
            Email the bench
          </a>
        </div>
      </Section>
    </>
  );
}
