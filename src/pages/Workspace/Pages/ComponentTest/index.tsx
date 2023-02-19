/**
 * @file 组件测试页
 */
import React from "react";
import AutoPrint from "@/components/AutoPrint";
import styles from "./index.module.less";

function componentTest() {
  return (
    <div className={styles["component"]}>
      <AutoPrint text={"这是一段测试文本"} />
    </div>
  );
}
export default componentTest;
