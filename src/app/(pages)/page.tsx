import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SkillsSection from "@/components/SkillsSection/SkillsSection";
import ExperiencesSection from "@/components/ExperiencesSection/ExperiencesSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ExperiencesSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
}
