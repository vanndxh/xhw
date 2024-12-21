/**
 * @file Markdown渲染页面
 */
import React, { useRef, useState } from "react";
import { Input } from "antd";
import { useSize } from "ahooks";
import MarkdownRender from "@/components/MarkdownRender";

import styles from "./index.module.less";

export default function MarkdownParse() {
  const ref = useRef<any>();
  const inputSize = useSize(ref?.current);
  const inputHeight = inputSize?.height || 72;

  const [markdownValue, setMarkdownValue] = useState("");

  return (
    <div className={styles["markdown"]}>
      <div ref={ref}>
        <Input.TextArea
          placeholder="请输入markdown格式的字符串"
          value={markdownValue}
          onChange={(e) => setMarkdownValue(e.target.value)}
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </div>

      <div className={styles["markdown-show"]} style={{ height: `calc(100vh - ${inputHeight + 80}px)` }}>
        <MarkdownRender>{markdownValue}</MarkdownRender>
      </div>
    </div>
  );
}
