import { useEffect, useState } from "react";
import MarkdownRender from "@/components/MarkdownRender";
import { getMarkdownDocs } from "@/services/api/api";
import { Divider, Menu } from "antd";
import styles from "./index.module.less";

export default function Docs() {
  const docTitleList = ["Docker部署Go后端", "xhw-pro开发笔记", "前端面试手册", "大模型对话技术", "开发环境配置"];
  const [docList, setDocList] = useState<ObjectType[]>([]);
  const [currentDoc, setCurrentDoc] = useState(docTitleList[0]);
  const curMarkdown = docList?.find((i) => i.title === currentDoc);

  useEffect(() => {
    getMarkdownDocs().then((res) => {
      setDocList(res);
    });
  }, []);

  return (
    <div className={styles["docs"]}>
      <Menu
        onClick={(e) => setCurrentDoc(e.key)}
        selectedKeys={[currentDoc]}
        items={docTitleList.map((i) => ({ key: i, label: i }))}
      />
      <div className={styles["docs-markdown"]}>
        <div className={styles["docs-markdown-title"]}>{curMarkdown?.title}</div>
        <Divider />
        <MarkdownRender>{curMarkdown?.content}</MarkdownRender>
      </div>
    </div>
  );
}
