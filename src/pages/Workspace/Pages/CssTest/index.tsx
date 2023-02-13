import React from "react";
import { NavBar } from "antd-mobile";
import BottomBar from "@/components/BottomBar";
import styles from "./index.less";

function CssTest() {
  return (
    <div className={styles["css"]}>
      <div className={styles["css-header"]}>
        <NavBar back={null}>css练习</NavBar>
      </div>

      <div className={styles["css-body"]}>
        <div className={styles["css-body-child"]}></div>
      </div>

      <BottomBar />
    </div>
  );
}
export default CssTest;
