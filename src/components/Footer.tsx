import { Github, Linkedin, Instagram, Youtube } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { getExternalRoutePath } from "@/config/externalRoutes";
import logoSrc from "../assets/images/logos/phricardo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-github-secondary border-t border-github-border mt-24">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="flex flex-col items-center py-8">
          <img
            src={logoSrc}
            alt="phricardo Logo"
            className="h-7 w-auto mb-6 opacity-70"
          />
          <div className="flex gap-4 mb-6">
            <a
              href={getExternalRoutePath("github")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-text hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href={getExternalRoutePath("linkedin")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-text hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={getExternalRoutePath("instagram")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-text hover:text-white transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href={getExternalRoutePath("x")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-text hover:text-white transition-colors"
            >
              <BsTwitterX size={24} />
            </a>
            <a
              href={getExternalRoutePath("youtube")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-text hover:text-white transition-colors"
            >
              <Youtube size={24} />
            </a>
          </div>
          <p className="text-github-text text-sm">
            © {currentYear} phricardo.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
