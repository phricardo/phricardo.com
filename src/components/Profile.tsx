import { Github, Linkedin, Instagram, Twitter, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { language } = useLanguage();

  const description =
    language === "en"
      ? "Java Backend developer with 5+ years in microservices (Kafka, RabbitMQ), relational & NoSQL databases, unit/integration testing, and front-end frameworks like React, Angular, Next.js & NestJS."
      : "Desenvolvedor Backend Java com mais de 5 anos em microserviços (Kafka, RabbitMQ), bancos relacionais e NoSQL, testes unitários/integrados e frameworks como React, Angular, Next.js & NestJS.";

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
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold text-white">Pedro Ricardo</h1>
          <BadgeCheck className="text-github-green" size={28} />
        </div>
        <p className="text-github-text mb-4">
          @phricardo • Backend / Full-stack Developer
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
