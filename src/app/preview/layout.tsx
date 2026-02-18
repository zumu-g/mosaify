import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview Your Mosaic',
  description:
    'Choose your mosaic style and size, then preview your artwork before purchasing.',
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
