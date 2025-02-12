import styles from "./TechStack.module.css";

import Js from "../icons/Js";
import React from "../icons/React";
import Ai from "../icons/Ai";
import Figma from "../icons/Figma";
import Git from "../icons/Git";
import Html from "../icons/Html";
import Ps from "../icons/Ps";
import Redux from "../icons/Redux";
import Sass from "../icons/Sass";
import Ts from "../icons/Ts";
import Vsc from "../icons/Vsc";

function TechStack() {
  return (
    <div className={styles.infoTechStack}>
      <Html />
      <Sass />
      <Js />
      <Ts />
      <React />
      <Redux />
      <Git />
      <Vsc />
      <Figma />
      <Ai />
      <Ps />
    </div>
  );
}

export default TechStack;
