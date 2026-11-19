import styles from "./AmbientBackground.module.css";

/**
 * Fixed, decorative backdrop behind the page content. It gives the liquid
 * glass surfaces something to refract (soft accent glows + a faint dot grid)
 * while staying dark and low-contrast so text remains easy to read.
 */
const AmbientBackground = () => (
  <div className={styles.root} aria-hidden="true">
    <div className={`${styles.glow} ${styles.glowA}`} />
    <div className={`${styles.glow} ${styles.glowB}`} />
    <div className={`${styles.glow} ${styles.glowC}`} />
    <div className={styles.grid} />
  </div>
);

export default AmbientBackground;
