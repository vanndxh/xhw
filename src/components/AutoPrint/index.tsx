/**
 * @file 自动打印组件
 * @param text 需要打印的文本
 */
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";

interface Props {
  /** 需要展示的文本 */
  text: string;
}

function AutoPrint(props: Props) {
  const { text } = props;

  /** 是否展示右侧光标 */
  const [isShowCursor, setIsShowCursor] = useState(true);
  /** 展示文本位数 */
  const [showNumber, setShowNumber] = useState(0);

  let cursorTimer: any, textTimer: any;

  useEffect(() => {
    textTimer = setInterval(() => {
      console.log("textTimer", textTimer);
      setIsShowCursor((pre) => !pre);
    }, 500);

    cursorTimer = setInterval(() => {
      console.log(350 + 100 * Math.random(), cursorTimer);
      setShowNumber((pre) => pre + 1);
    }, 350 + 100 * Math.random());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    /** TODO: 以下清空无效，待修复 */
    if (showNumber === text?.length) {
      clearInterval(textTimer);
      clearInterval(cursorTimer);
    }
  }, [showNumber]);

  return (
    <div className={styles["auto-print"]}>
      {/** 左边文字部分 */}
      <div className={styles["auto-print-left"]}>
        {text?.substring(0, showNumber)}
      </div>

      {/** 右边光标部分 */}
      <div
        className={styles["auto-print-right"]}
        style={{ display: isShowCursor ? "" : "none" }}
      ></div>
    </div>
  );
}
export default AutoPrint;
