"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { MingcuteExternalLinkLine, MingcuteGithubLine } from "../Icons";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import styles from "./ProjectsCarousel.module.css";

type Slide = {
  thumbnail?: string;
  title: string;
  build?: string;
  repo?: string;
};

export default function ProjectsCarousel({
  slides,
  options,
}: {
  slides: Slide[];
  options?: EmblaOptionsType;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__slide_image}>
                <Image
                  layout="fill"
                  alt={slide.title}
                  src={`${slide.thumbnail ? slide.thumbnail : ""}`}
                  className={styles.image}
                />
              </div>
              <div className={styles.embla__slide_info}>
                <h1>{slide.title}</h1>
                <div>
                  {slide.build && (
                    <Link href={slide.build} target="_blank">
                      <MingcuteExternalLinkLine /> Visitar On-line
                    </Link>
                  )}
                  {slide.repo && (
                    <Link href={slide.repo} target="_blank">
                      <MingcuteGithubLine /> Repositório
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Link
            target="_blank"
            href="https://github.com/phricardo?tab=repositories"
            className={`${styles.embla__slide} ${styles.slide_more}`}
          >
            <MingcuteExternalLinkLine /> Ver todos os projetos
          </Link>
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`${styles.embla__dot} ${
                index === selectedIndex ? styles.embla__dot_selected : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
