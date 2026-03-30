import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Workbench — Blog',
  description:
    'Gear guides, signal chain deep dives, and stories from behind the bench. Expert guitar rig content from The Rig Doctor.',
  openGraph: {
    title: 'The Workbench — The Rig Doctor Blog',
    description:
      'Gear guides, signal chain deep dives, and stories from behind the bench.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
