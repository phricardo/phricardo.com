import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { language } = useLanguage();

  const description =
    language === "en"
      ? "Full-stack developer passionate about creating innovative solutions. Specialized in React, Node.js, and cloud technologies."
      : "Desenvolvedor full-stack apaixonado por criar soluções inovadoras. Especializado em React, Node.js e tecnologias em nuvem.";

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-1/4">
        <img
          src="https://github.com/phricardo.png"
          alt="Profile"
          className="rounded-full w-64 h-64 border-4 border-github-border"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-2">Pedro Ricardo</h1>
        <p className="text-github-text mb-4">
          @phricardo • Full-stack Developer
        </p>
        <p className="text-github-text mb-6">{description}</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/phricardo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-text hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/phricardorj/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-text hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://instagram.com/phricardorj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-text hover:text-white transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://x.com/phricardorj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-text hover:text-white transition-colors"
          >
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
