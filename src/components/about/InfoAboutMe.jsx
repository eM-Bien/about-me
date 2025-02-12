import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./InfoAboutMe.module.css";

import Arrow from "../arrow/Arrow";
import TechStack from "../techStack/TechStack";

function InfoAboutMe() {
  const containerRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;

    if (container) {
      const maxScrollTop = container.scrollHeight;
      if (container.scrollTop + container.clientHeight >= maxScrollTop) {
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setIsOnTop(true);
      } else {
        container.scrollBy({
          top: window.innerHeight * 0.5,
          behavior: "smooth",
        });
        setIsOnTop(false);
      }
    }
  }, []);

  const handleContainerScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const maxScrollTop = container.scrollHeight;
      if (container.scrollTop + container.clientHeight >= maxScrollTop) {
        setIsOnTop(true);
      } else {
        setIsOnTop(false);
      }
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleContainerScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleContainerScroll);
      }
    };
  }, [handleContainerScroll]);

  return (
    <>
      <div className={styles.infoContainer} ref={containerRef}>
        <div className={styles.arrowWrapper}>
          <Arrow
            className={["scrollArrow", isOnTop ? "topArrow" : "bottomArrow"]}
            onClick={handleScroll}
          />
        </div>
        <div className={styles.infoWrapper}>
          <h1 className={styles.infoTitle}>about me</h1>
          <p className={styles.infoDescription}>
            I&apos;m not like everyone else!
          </p>
          <p className={styles.infoDescription}>
            Well, maybe a little... but don&apos;t take this away from me.
          </p>
          <p className={styles.infoDescription}>
            I’m a frontend developer with a passion for creating interfaces that
            not only work flawlessly but also look good.
          </p>
          <h2>Tech stack</h2>

          <TechStack />

          <p className={styles.infoDescription}>
            I love writing clean, readable code.
          </p>
          <p className={styles.infoDescription}>
            I have an eye for detail, a heart for UX, and the patience for
            debugging... at least until my third coffee.
          </p>
          <p className={styles.infoDescription}>
            I&apos;m looking for a place where I can grow my skills, collaborate
            with a great team, and build products that make a difference.
          </p>
          <p className={styles.infoDescription}>
            If you need someone to make your app fast, responsive, and visually
            stunning,
            <br />
            look no further!
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoAboutMe;
