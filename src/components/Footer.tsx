import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { getExternalRoutePath } from "@/config/externalRoutes";
import logoSrc from "../assets/images/logos/phricardo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { href: getExternalRoutePath("github"), icon: Github, label: "GitHub" },
    {
      href: getExternalRoutePath("linkedin"),
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: getExternalRoutePath("instagram"),
      icon: Instagram,
      label: "Instagram",
    },
    { href: getExternalRoutePath("x"), icon: BsTwitterX, label: "X" },
    {
      href: getExternalRoutePath("youtube"),
      icon: Youtube,
      label: "YouTube",
    },
  ];

  return (
    <footer className="mt-20 border-t border-github-border bg-github-dark">
      <div className="mx-auto max-w-[1100px] px-5 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <img
              src={logoSrc}
              alt="phricardo Logo"
              className="h-7 w-auto opacity-80"
            />
            <p className="text-center text-sm text-[#9da3ad] md:text-left">
              © {currentYear} phricardo.com. All rights reserved.
            </p>
          </div>

          <div className="flex items-center justify-center gap-5">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#aeb4be] transition-colors hover:text-white"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
