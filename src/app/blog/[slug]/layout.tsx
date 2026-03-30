import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Post',
};

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
