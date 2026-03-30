import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Workbench — Blog',
  description:
    'Gear guides, signal chain deep dives, and stories from behind the bench. From The Rig Doctor.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
