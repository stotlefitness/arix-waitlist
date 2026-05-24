import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import SchoolLeaderboard from "@/components/SchoolLeaderboard";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";
import { getSchoolCounts } from "@/app/actions";

export const revalidate = 60;

export default async function Home() {
  const schools = await getSchoolCounts();

  return (
    <main className="min-h-screen bg-[#0b0b10]">
      <Nav />

      {/* Hero: headline + map + stats */}
      <Hero schools={schools} />

      {/* Feature cards */}
      <div className="border-t border-white/5">
        <FeatureCards />
      </div>

      {/* School leaderboard ranked list */}
      <div className="border-t border-white/5">
        <SchoolLeaderboard schools={schools} />
      </div>

      {/* Waitlist form */}
      <div className="border-t border-white/5">
        <WaitlistForm />
      </div>

      <Footer />
    </main>
  );
}
