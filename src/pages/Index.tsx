import Header from "@/components/Header";
import Profile from "@/components/Profile";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import MainLanguages from "@/components/MainLanguages";
import Footer from "@/components/Footer";
import AcademicFormation from "@/components/AcademicFormation";
import HomeArticlesSection from "@/components/HomeArticlesSection";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-github-dark font-inter text-white">
      <Header />
      <main
        id="home"
        className="relative mx-auto w-full max-w-[1100px] overflow-x-clip px-5 pb-12 pt-8 md:px-6 md:pt-10 lg:px-8"
      >
        <div className="relative z-10 w-full min-w-0 space-y-10 md:space-y-10">
          <Profile />
          <TechStack />
          <MainLanguages />
          <Experience />
          <HomeArticlesSection />
          <AcademicFormation />
          <Projects />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
