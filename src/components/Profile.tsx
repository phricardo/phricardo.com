import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";
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

  // Dezembro inteiro
  if (month === 12) return true;

  // Até 6 de janeiro
  if (month === 1 && day <= 6) return true;

  return false;
}

const Profile = () => {
  const { language } = useLanguage();
  const isOnline = useOnlineStatus();

  const isChristmas = useMemo(() => isChristmasSeason(), []);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const [flipped, setFlipped] = useState(false);

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

  useEffect(() => {
    if (!isChristmas) return;

    const start = setTimeout(() => {
      const mid = setTimeout(() => setFlipped(true), 350); // metade de 0.7s
      setFlipped(false);

      return () => clearTimeout(mid);
    }, 1000);

    return () => clearTimeout(start);
  }, [isChristmas]);

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
    <div className="overflow-x-hidden">
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

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/4">
          {/* FLIP 3D */}
          <div
            className="w-64 h-64 overflow-hidden rounded-full"
            style={{ perspective: 1000 }} // dá profundidade 3D
          >
            <motion.div
              className="relative w-64 h-64 rounded-full border-4 border-github-border"
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
              {/* Frente (normal) */}
              <img
                src={profile}
                alt="Profile"
                className="absolute inset-0 w-full h-full rounded-full"
                style={{
                  backfaceVisibility: "hidden",
                }}
              />

              {/* Verso (natal) */}
              <img
                src={profileChristmas}
                alt="Profile Christmas"
                className="absolute inset-0 w-full h-full rounded-full"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              />
            </motion.div>
          </div>
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
                    isOnline
                      ? "bg-github-green animate-greenPulse"
                      : "bg-[#ef4444] animate-redPulse"
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
