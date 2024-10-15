import React, { useState } from "react";
import styles from "./index.module.less";
import PageLayout from "@/components/PageLayout";
import { Input } from "antd";
import MarkdownRender from "@/components/MarkdownRender";

export default function MarkdownParse() {
  const [markdownValue, setMarkdownValue] = useState("");

  return (
    <PageLayout>
      <div className={styles["markdown"]}>
        <Input
          placeholder="请输入markdown格式的字符串"
          value={markdownValue}
          onChange={(e) => setMarkdownValue(e.target.value)}
        />

        <div className={styles["markdown-show"]}>
          <MarkdownRender>{markdownValue}</MarkdownRender>
        </div>
      </div>
    </PageLayout>
  );
}
