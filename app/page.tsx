import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SchoolLeaderboard from "@/components/SchoolLeaderboard";
import FeatureCards from "@/components/FeatureCards";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";
import { getSchoolCounts, getTotalCount } from "@/app/actions";

export const revalidate = 60;

export default async function Home() {
  const [schools, totalCount] = await Promise.all([
    getSchoolCounts(),
    getTotalCount(),
  ]);

  const schoolCount = schools.length;

  return (
    <main className="min-h-screen bg-[#0b0b10]">
      <Nav />
      <Hero totalCount={totalCount} schoolCount={schoolCount} />

      <div className="border-t border-white/5">
        <SchoolLeaderboard schools={schools} />
      </div>

      <div className="border-t border-white/5">
        <FeatureCards />
      </div>

      <div className="border-t border-white/5">
        <WaitlistForm />
      </div>

      <Footer />
    </main>
  );
}
