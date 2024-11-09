"use client";

import React from "react";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import styles from "./EmblaCarousel.module.css";
import Link from "next/link";
import {
  InstagramLine,
  MingcuteExternalLinkLine,
  MingcuteGithubLine,
} from "../Icons";

type Slide = {
  src?: string;
  title: string;
};

export default function EmblaCarousel({
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
                  height={400}
                  width={300}
                  alt={slide.title}
                  src={`${slide.src ? slide.src : ""}`}
                  className={styles.image}
                />
              </div>
              <div className={styles.embla__slide_info}>
                <h1>{slide.title}</h1>
                <div>
                  <Link href="">
                    <MingcuteGithubLine /> Repositório
                  </Link>
                  <Link href="">
                    <MingcuteExternalLinkLine /> Link
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
