import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { fetchGitHubUser } from "@/functions/fetchGitHubUser";
import PageWrapper from "@/components/PageWrapper.tsx/PageWrapper";
import SkillsSection from "@/components/SkillsSection/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import ExperiencesSection from "@/components/ExperiencesSection/ExperiencesSection";

export default async function Home() {
  const user = await fetchGitHubUser("phricardo");

  return (
    <PageWrapper>
      <Header user={user} />
      <ExperiencesSection />
      <ProjectsSection />
      <SkillsSection />
      <Footer user={user} />
    </PageWrapper>
  );
}
