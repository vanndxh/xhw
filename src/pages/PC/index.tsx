/**
 * @file PC端页面首页
 */
import React from "react";
import styles from "./index.module.less";
import SiderBar from "./components/SiderBar";

export function PC() {
  return (
    <div className={styles["pc"]}>
      <SiderBar />
      <div className={styles["pc-content"]}>test</div>
    </div>
  );
}
