import { Github, Linkedin, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BsTwitterX } from "react-icons/bs";
import { useOnlineStatus } from "@/hooks/use-online-status";

const Profile = () => {
  const { language } = useLanguage();
  const isOnline = useOnlineStatus();

  const description =
    language === "en"
      ? "Java Backend developer with 5+ years in microservices (Kafka, RabbitMQ), relational and NoSQL databases, unit/integration testing, and front-end frameworks like React, Angular, Next.js and NestJS."
      : "Desenvolvedor Backend Java com mais de 5 anos em microservicos (Kafka, RabbitMQ), bancos relacionais e NoSQL, testes unitarios/integrados e frameworks como React, Angular, Next.js e NestJS.";

  const onlineTitle = isOnline
    ? language === "pt"
      ? "On-line"
      : "Online"
    : language === "pt"
    ? "Offline"
    : "Offline";

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
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-white">Pedro Ricardo</h1>
          <div
            className={`flex items-center gap-2 ${
              isOnline ? "text-github-green" : "text-[#ef4444]"
            }`}
          >
            <span className="relative inline-flex h-3 w-3">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${
                  isOnline ? "bg-github-green animate-greenPulse" : "bg-[#ef4444] animate-redPulse"
                }`}
              />
              <span
                className={`relative inline-flex h-3 w-3 rounded-full ${
                  isOnline ? "bg-github-green" : "bg-[#ef4444]"
                }`}
              />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.08em]">
              {onlineTitle}
            </span>
          </div>
        </div>
        <p className="text-github-text mb-4">
          @phricardo Backend / Full-stack Developer
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
            href="https://www.instagram.com/phrcd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-text hover:text-white transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://x.com/phrcd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-text hover:text-white transition-colors"
          >
            <BsTwitterX size={24} />
          </a>
          <a
            href="https://www.youtube.com/@phrcd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-text hover:text-white transition-colors"
          >
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
