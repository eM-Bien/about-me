import styles from "./Intro.module.css";
import Logo from "./Logo";

function Intro() {
  return (
    <section className={styles.introSection}>
      <div className={styles.introSectionBg}></div>
      <Logo />
      <div className={styles.introSectionHorizontalLine}></div>
      <div
        className={`${styles.introSectionHorizontalLine} ${styles["introSectionHorizontalLine--bold"]}`}
      ></div>
      <div className={styles.introSectionHide}></div>
    </section>
  );
}

export default Intro;
