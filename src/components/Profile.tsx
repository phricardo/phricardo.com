import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { getExternalRoutePath } from "@/config/externalRoutes";

import profile from "../assets/images/profiles/profile.png";
import profileChristmas from "../assets/images/profiles/profile_natal.png";

function isChristmasSeason(date = new Date(), timeZone = "America/Sao_Paulo") {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);

  if (month === 12) return true;
  if (month === 1 && day <= 6) return true;

  return false;
}

const Profile = () => {
  const { language } = useLanguage();
  const isOnline = useOnlineStatus();

  const isChristmas = useMemo(() => isChristmasSeason(), []);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const update = () => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isChristmas) return;

    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [isChristmas]);

  const description =
    language === "en"
      ? "Java Backend developer with 5+ years in microservices (Kafka, RabbitMQ), relational and NoSQL databases, unit/integration testing, and front-end frameworks like React, Angular, Next.js and NestJS."
      : "Desenvolvedor Backend Java com mais de 5 anos em microserviços (Kafka, RabbitMQ), bancos relacionais e NoSQL, testes unitários/integrados e frameworks como React, Angular, Next.js e NestJS.";

  const onlineTitle = isOnline
    ? language === "pt"
      ? "On-line"
      : "Online"
    : language === "pt"
    ? "Offline"
    : "Offline";

  const socialLinkClass =
    "text-[#c7cbd2] transition-colors hover:text-white focus:outline-none focus-visible:text-white";

  return (
    <section className="w-full">
      {showConfetti && dimensions.width > 0 && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={250}
          recycle={false}
          gravity={0.15}
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      )}

      <div className="grid w-full items-center gap-8 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[315px_minmax(0,1fr)] lg:gap-10">
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <div
              className="relative h-60 w-60 overflow-hidden rounded-full sm:h-64 sm:w-64 lg:h-[280px] lg:w-[280px]"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative h-full w-full rounded-full border-[8px] border-[#15181b]"
                style={{
                  transformStyle: "preserve-3d",
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isChristmas ? 180 : 0 }}
                transition={{
                  delay: 1,
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={profile}
                  alt="Profile"
                  className="absolute inset-0 h-full w-full rounded-full object-cover"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                />

                <img
                  src={profileChristmas}
                  alt="Profile Christmas"
                  className="absolute inset-0 h-full w-full rounded-full object-cover"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full text-center md:mx-0 md:text-left">
          <div
            className={`mb-3 flex items-center justify-center gap-2.5 md:justify-start ${
              isOnline ? "text-github-green" : "text-[#ef4444]"
            }`}
          >
            <span className="relative inline-flex h-3 w-3 shrink-0 items-center justify-center">
              <span
                className={`absolute left-0 top-0 block h-3 w-3 rounded-full opacity-60 ${
                  isOnline
                    ? "bg-github-green animate-greenPulse"
                    : "bg-[#ef4444] animate-redPulse"
                }`}
              />
              <span
                className={`relative block h-3 w-3 shrink-0 rounded-full ${
                  isOnline ? "bg-github-green" : "bg-[#ef4444]"
                }`}
              />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.12em]">
              {onlineTitle}
            </span>
          </div>

          <h1 className="mb-3 text-4xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Pedro Ricardo
          </h1>

          <p className="mb-5 text-base font-medium text-[#aeb4be]">
            @phricardo <span className="mx-2 text-[#6e747d]">•</span> Backend /
            Full-stack Developer
          </p>

          <p className="mb-6 w-full text-base leading-7 text-[#eef0f3]">
            {description}
          </p>

          <div className="flex items-center justify-center gap-6 md:justify-start">
            <a
              href={getExternalRoutePath("github")}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
              aria-label="GitHub"
            >
              <Github size={23} />
            </a>

            <a
              href={getExternalRoutePath("linkedin")}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
              aria-label="LinkedIn"
            >
              <Linkedin size={23} />
            </a>

            <a
              href={getExternalRoutePath("instagram")}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
              aria-label="Instagram"
            >
              <Instagram size={23} />
            </a>

            <a
              href={getExternalRoutePath("x")}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
              aria-label="X"
            >
              <BsTwitterX size={23} />
            </a>

            <a
              href={getExternalRoutePath("youtube")}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClass}
              aria-label="YouTube"
            >
              <Youtube size={23} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
