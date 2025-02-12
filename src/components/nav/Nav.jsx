import styles from "./Nav.module.css";

import Arrow from "../arrow/Arrow";

function Nav({ text, onClick }) {
  return (
    <nav className={styles.navContainer} onClick={onClick}>
      <p className={styles.navTitle}>{text}</p>
      <div className={styles.navLine}></div>
      <Arrow className={["navArrow"]} />
    </nav>
  );
}

export default Nav;
