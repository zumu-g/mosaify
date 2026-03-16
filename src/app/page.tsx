import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Gallery } from '@/components/landing/gallery';
import { SuggestedUses } from '@/components/landing/suggested-uses';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Pricing } from '@/components/landing/pricing';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Gallery />
      <SuggestedUses />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}
