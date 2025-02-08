/**
 * @file Markdown渲染页面
 */
import { useState } from "react";
import { Flex, Input } from "antd";
import Markdown from "@/components/Markdown";

import styles from "./index.module.less";

export default function MarkdownParse() {
  const [markdownValue, setMarkdownValue] = useState("");

  return (
    <Flex className={styles["markdown"]} gap={16}>
      <div className={styles["markdown-input-wrapper"]}>
        <Input.TextArea
          placeholder="请输入markdown格式的字符串"
          value={markdownValue}
          onChange={(e) => setMarkdownValue(e.target.value)}
          className={styles["markdown-input"]}
          style={{ height: "100%" }}
        />
      </div>

      <div className={styles["markdown-show"]}>
        <Markdown>{markdownValue}</Markdown>
      </div>
    </Flex>
  );
}
