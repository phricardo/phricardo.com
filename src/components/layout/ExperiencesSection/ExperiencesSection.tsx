"use client";

import React from "react";
import styles from "./ExperiencesSection.module.css";

const experiences = [
  {
    id: 1,
    logo: "/assets/images/brands/magalu.png",
    company: "LuizaLabs (Magazine Luiza)",
    period: "2022 - o momento",
    description:
      "Desenvolvedor no Magalu Ads (AdTech) (https://magaluads.com.br/), solução interna de publicidade da Magazine Luiza, trabalho na área de tecnologia e inovação da Magalu — LuizaLabs.",
    skills:
      "Java, Spring Boot, Micronaut, PostgreSQL, Docker, Testes Unitários e de Integração",
  },
  {
    id: 2,
    logo: "/assets/images/brands/upwork.png",
    company: "Upwork",
    period: "2020 - 2022",
    description:
      "Desenvolvedor Full Stack Freelancer, atuando em uma ampla carteira de clientes. Envolvido em todas as etapas do ciclo de desenvolvimento de software, desde a análise de requisitos até a entrega final. No decorrer dessa trajetória, desenvolvi mais de 50 sites e mantive vários deles ao longo dos anos, incluindo sistemas de SGA (Sistema de Gerenciamento de Agendamentos) e SGE (Sistema de Gestão de Estoque). Além disso, criei landing pages com alta conversão para microempresas e pequenos negócios do Rio de Janeiro.",
    skills:
      "Java, Spring Boot, Micronaut, PostgreSQL, Docker, Testes Unitários e de Integração",
  },
];

export default function ExperiencesSection() {
  return (
    <section className={styles.section} id="xp">
      <div className={`${styles.section_wrapper} container`}>
        <h1 className={styles.title}>Experiências</h1>

        <div className={styles.xps}>
          {experiences.map((xp) => (
            <div key={xp.id} className={styles.xp}>
              <div>
                <img src={xp.logo} alt={`${xp.company} logo`} />
                <h1>{xp.company}</h1>
                <span>{xp.period}</span>
              </div>
              <p>{xp.description}</p>

              <div className={styles.skills}>
                {xp.skills.split(", ").map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
