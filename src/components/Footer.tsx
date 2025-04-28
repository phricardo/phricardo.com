import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-github-secondary border-t border-github-border mt-24">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="flex flex-col items-center py-8">
          <div className="flex gap-4 mb-6">
            <a
              href="https://github.com/phricardo/"
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
              href="https://twitter.com/phricardorj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-text hover:text-white transition-colors"
            >
              <Twitter size={24} />
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
