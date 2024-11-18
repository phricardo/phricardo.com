"use client";

import React from "react";
import { MingcuteTrophyLine } from "../Icons";
import styles from "./ExperiencesSection.module.css";
import { Motion } from "../motion";

const experiences = [
  {
    id: 1,
    logo: "/assets/images/brands/magalu.png",
    company: "LuizaLabs (Magazine Luiza)",
    start: "2022-06-12",
    end: null,
    description:
      "Desenvolvedor no Magalu Ads (AdTech) (https://magaluads.com.br/), solução interna de publicidade da Magazine Luiza, trabalho na área de tecnologia e inovação da Magalu — LuizaLabs. Como desenvolvedor, estou engajado no processo de desenvolvimento de novas funcionalidades e implementações, além de possuir habilidades em DEVOPs (CI/CD) e Gitlab para aprimorar os processos.",
    skills:
      "Java, Spring Boot, Micronaut, Arquitetura de Microsserviços, PostgreSQL, Docker, Testes Unitários e de Integração",
  },
  {
    id: 2,
    logo: "/assets/images/brands/upwork.png",
    company: "Upwork",
    start: "2020-02-10",
    end: "2022-05-10",
    description:
      "Desenvolvedor Full Stack Freelancer, atuando em uma ampla carteira de clientes. Envolvido em todas as etapas do ciclo de desenvolvimento de software, desde a análise de requisitos até a entrega final. No decorrer dessa trajetória, desenvolvi mais de 50 sites e mantive vários deles ao longo dos anos, incluindo sistemas de SGA (Sistema de Gerenciamento de Agendamentos) e SGE (Sistema de Gestão de Estoque). Além disso, criei landing pages com alta conversão para microempresas e pequenos negócios do Rio de Janeiro.",
    skills:
      "Javascript, Typescript, React, Angular, Java, Spring Boot, Micronaut, PostgreSQL, Docker, Testes Unitários e de Integração",
  },
];

const calculateExperienceDuration = (
  start: string,
  end: string | null
): { years: number; months: number } => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  return {
    years,
    months,
  };
};

const formatExperiencePeriod = (
  startYear: number,
  end: string | null,
  years: number,
  months: number
): string => {
  let period = `${startYear} - o momento`;
  if (end) period = `${startYear} - ${end}`;

  const yearPart = years > 0 ? `${years} ano${years > 1 ? "s" : ""}` : "";
  const monthPart =
    months > 0 ? `${months} ${months > 1 ? "meses" : "mês"}` : "";

  if (yearPart && monthPart) {
    period += ` (${yearPart} e ${monthPart})`;
  } else if (yearPart) {
    period += ` (${yearPart})`;
  } else if (monthPart) {
    period += ` (${monthPart})`;
  }

  return period;
};

export default function ExperiencesSection() {
  return (
    <section id="xp">
      <div className={`container`}>
        <Motion
          as="div"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2 }}
        >
          <h1 className={`title`}>
            <MingcuteTrophyLine /> Experiências
          </h1>

          <p>
            Desenvolvedor Backend Java com mais de 4 anos de experiência.
            Trabalho com aplicações distribuídas em Arquitetura de
            Microsserviços utilizando “message brokers” como o Kafka e RabbitMQ.
            Conhecimento e prática em Banco de Dados relacionais e não
            relacionais, como também conhecimento de testes unitários e de
            integração. Aptidão com diversas tecnologias, como React, Angular,
            Javascript, Typescript, Java, Spring Boot, Next.js e NestJS.
          </p>
        </Motion>

        <div className={styles.xps}>
          {experiences.map((xp, index) => {
            const { years, months } = calculateExperienceDuration(
              xp.start,
              xp.end
            );
            const startYear = new Date(xp.start).getFullYear();
            const period = formatExperiencePeriod(
              startYear,
              xp.end,
              years,
              months
            );

            return (
              <Motion
                as="div"
                key={xp.id}
                className={styles.xp}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className={styles.contentCard}>
                  <div>
                    <img src={xp.logo} alt={`${xp.company} logo`} />
                    <p className={styles.period}>{period}</p>
                  </div>

                  <div className={styles.skills}>
                    {(xp.skills || "").split(", ").map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </Motion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
