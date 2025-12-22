import Header from "@/components/Header";
import Profile from "@/components/Profile";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import MainLanguages from "@/components/MainLanguages";
import Footer from "@/components/Footer";
import AcademicFormation from "@/components/AcademicFormation";
import YouTubeFeed from "@/components/YouTubeFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-github-dark font-inter">
      <Header />
      <main
        id="home"
        className="max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12"
      >
        <div className="space-y-12 md:space-y-16">
          <Profile />
          <TechStack />
          <MainLanguages />
          <Experience />
          <AcademicFormation />
          <Projects />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
