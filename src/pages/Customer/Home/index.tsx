import Hero from './Hero'; // <-- adjust path if needed
import FeatureSection from './FeatureSection'; 
import LoyaltyBanner from './LoyaltyBanner';

export default function Home() {
  return (
    <div className="p-4 space-y-12">
      <Hero />
      <FeatureSection />
	  <LoyaltyBanner/>
    </div>
  );
}
