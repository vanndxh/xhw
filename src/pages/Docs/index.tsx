import { useEffect, useState } from "react";
import Markdown from "@/components/Markdown";
import { getMarkdownDocs } from "@/services/api/api";
import { Anchor, Divider, Menu } from "antd";
import styles from "./index.module.less";

export default function Docs() {
  const docTitleList = ["Docker部署Go后端", "xhw-pro开发笔记", "前端面试手册", "大模型对话技术", "开发环境配置"];
  const [docList, setDocList] = useState<ObjectType[]>([]);
  const [currentDoc, setCurrentDoc] = useState(docTitleList[0]);
  const curMarkdown = docList?.find((i) => i.title === currentDoc);
  const anchorList = curMarkdown?.content
    // 统计anchor时不计算代码块
    ?.split("```")
    ?.filter((_, index) => index % 2 === 0)
    ?.join("")
    // 按行分割
    ?.split("\n")
    // 过滤找到#开头的
    ?.filter((i) => i.indexOf("#") === 0)
    // 处理出文本以及层级关系
    ?.map((j) => {
      const text = j.replaceAll("#", "").trim();
      return {
        key: text,
        href: text,
        title: text,
        level: j.split("#").length - 1,
        children: [],
      };
    })
    ?.reduce((acc, cur) => {
      let targetArr = acc;
      while (true) {
        const targetArrLevel = targetArr?.[0]?.level;
        if (targetArr?.length === 0 || targetArrLevel >= cur.level) {
          targetArr.push(cur);
          break;
        } else {
          targetArr = targetArr[targetArr.length - 1]?.children;
        }
      }
      return acc;
    }, []);

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
      <div className={styles["docs-markdown-wrapper"]}>
        <div className={styles["docs-markdown"]}>
          <div className={styles["docs-markdown-title"]}>{curMarkdown?.title}</div>
          <Divider />
          <Markdown>{curMarkdown?.content}</Markdown>
        </div>

        <Anchor
          className={styles["docs-anchor"]}
          affix={"offsetTop" as any}
          offsetTop={100}
          items={anchorList}
          onClick={(e, link) => {
            e.preventDefault();
            document.getElementById(link.href)?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        />
      </div>
    </div>
  );
}
