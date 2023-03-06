/**
 * @file 组件测试页
 */
import React, { useState } from "react";
import AutoPrint from "@/components/AutoPrint";
import styles from "./index.module.less";
import FlashProgress from "@/components/FlashProgress";
import { Button } from "antd";

function ComponentTest() {
  const [percent, setPercent] = useState(50);

  return (
    <div className={styles["component"]}>
      <AutoPrint text={"这是一段测试文本"} />

      <div style={{ width: 200 }}>
        <FlashProgress percent={percent} fillColor="rgb(254, 224, 120)" />
      </div>

      <Button
        onClick={() => {
          setPercent((pre) => pre + 10);
        }}
      >
        +10
      </Button>
    </div>
  );
}
export default ComponentTest;
