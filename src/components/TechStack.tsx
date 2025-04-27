
import { useLanguage } from "@/contexts/LanguageContext";

const TechStack = () => {
  const { t } = useLanguage();
  
  const technologies = [
    { name: t('frontendDevelopment'), bgColor: "bg-blue-800", textColor: "text-blue-300" },
    { name: t('backendDevelopment'), bgColor: "bg-green-800", textColor: "text-green-300" },
    { name: t('databaseManagement'), bgColor: "bg-yellow-800", textColor: "text-yellow-300" },
    { name: t('cloudServices'), bgColor: "bg-purple-800", textColor: "text-purple-300" },
    { name: t('devOps'), bgColor: "bg-red-800", textColor: "text-red-300" },
    { name: t('uiUxDesign'), bgColor: "bg-pink-800", textColor: "text-pink-300" },
    { name: t('systemArchitecture'), bgColor: "bg-indigo-800", textColor: "text-indigo-300" },
    { name: t('projectManagement'), bgColor: "bg-orange-800", textColor: "text-orange-300" },
  ];

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-white mb-4">{t('areasOfExpertise')}</h2>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech.name}
            className={`${tech.bgColor} ${tech.textColor} px-3 py-1 rounded-full text-sm font-medium`}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
