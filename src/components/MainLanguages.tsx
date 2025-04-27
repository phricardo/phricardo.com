
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiNestjs, 
  SiMongodb, 
  SiPostgresql, 
  SiAngular, 
  SiJavascript,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { Database } from 'lucide-react';
import { useState, useRef } from 'react';

type HoverState = {
  isHovered: boolean;
  position: { x: number; y: number };
};

const MainLanguages = () => {
  const { t } = useLanguage();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoverStates, setHoverStates] = useState<HoverState[]>(
    Array(10).fill({ isHovered: false, position: { x: 0, y: 0 } })
  );

  const languages = [
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Java', icon: DiJava },
    { name: 'React Js', icon: SiReact },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'NestJS', icon: SiNestjs },
    { name: 'Mongo DB', icon: SiMongodb },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'Angular 2+', icon: SiAngular },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'SQL', icon: Database },
  ];

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRefs.current[index]) {
      const rect = cardRefs.current[index]!.getBoundingClientRect();
      setHoverStates(prev => {
        const newStates = [...prev];
        newStates[index] = {
          ...newStates[index],
          position: {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          }
        };
        return newStates;
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoverStates(prev => {
      const newStates = [...prev];
      newStates[index] = {
        ...newStates[index],
        isHovered: true
      };
      return newStates;
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates(prev => {
      const newStates = [...prev];
      newStates[index] = {
        ...newStates[index],
        isHovered: false
      };
      return newStates;
    });
  };

  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold text-white mb-8">{t('mainLanguages')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {languages.map((lang, index) => {
          const Icon = lang.icon;
          return (
            <div
              key={lang.name}
              ref={el => cardRefs.current[index] = el}
              onMouseMove={(e) => handleMouseMove(index, e)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="relative"
            >
              <Card className="bg-github-secondary border border-github-border p-4 sm:p-6 transition-all duration-300 overflow-hidden">
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: hoverStates[index].isHovered
                      ? `radial-gradient(600px circle at ${hoverStates[index].position.x}px ${hoverStates[index].position.y}px, rgba(74, 222, 128, 0.1), transparent 40%)`
                      : '',
                    borderRadius: '8px'
                  }}
                />
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-github-text" />
                  <span className="text-white font-medium text-sm sm:text-base">{lang.name}</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainLanguages;
