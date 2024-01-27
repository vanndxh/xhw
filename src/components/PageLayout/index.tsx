/**
 * @file PC端页面通用布局组件
 */
import React from "react";
import SiderBar from "@/components/SiderBar";
import styles from "./index.module.less";

interface Props {
  /** 内部内容 */
  children?: React.ReactNode;
}

function PageLayout(props: Props) {
  const { children } = props;

  return (
    <div className={styles["pc"]}>
      <SiderBar />
      <div className={styles["pc-content"]}>{children}</div>
    </div>
  );
}
export default PageLayout;
