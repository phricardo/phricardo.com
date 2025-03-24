"use client";

import React from "react";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MingcuteExternalLinkLine } from "../Icons";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./ProjectsCarousel.module.css";

const projects = [
  {
    name: "Site 1",
    image: "https://placehold.co/300x400/EEE/31343C",
    liveUrl: "https://site1.com",
    githubUrl: "https://github.com/username/site1",
  },
  {
    name: "Site 2",
    image: "https://placehold.co/300x400/EEE/31343C",
    liveUrl: "https://site2.com",
    githubUrl: "https://github.com/username/site2",
  },
  {
    name: "Site 3",
    image: "https://placehold.co/300x400/EEE/31343C",
    liveUrl: "https://site3.com",
    githubUrl: "https://github.com/username/site3",
  },
  {
    name: "Site 4",
    image: "https://placehold.co/300x400/EEE/31343C",
    liveUrl: "https://site4.com",
    githubUrl: "https://github.com/username/site4",
  },
  {
    name: "Site 5",
    image: "https://placehold.co/300x400/EEE/31343C",
    liveUrl: "https://site4.com",
    githubUrl: "https://github.com/username/site4",
  },
];

export default function ProjectsCarousel() {
  return (
    <section className={`container ${styles.carouselSection}`}>
      <h1 className={`title`}>
        <MingcuteExternalLinkLine /> Meus Projetos
      </h1>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={30}
        slidesPerView={4}
        a11y={{ enabled: false }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 4 },
        }}
        className={styles.mySwiper}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className={styles.card}>
              <img
                src={project.image}
                alt={project.name}
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
