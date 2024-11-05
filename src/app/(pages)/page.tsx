import ExperiencesSection from "@/components/layout/ExperiencesSection/ExperiencesSection";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ProjectsSection from "@/components/layout/ProjectsSection/ProjectsSection";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <ExperiencesSection />
        <ProjectsSection />
      </main>

      <Footer />
    </>
  );
}
