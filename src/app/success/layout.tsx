import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Your Mosaic',
  description: 'Your mosaic is ready! Download your high-resolution artwork.',
  robots: { index: false },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
