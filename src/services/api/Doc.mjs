import fs from "fs";

/**
 * @file 获取项目内.md文件
 * @type GET
 * @path /doc/getMarkdownDocs
 */
export const getMarkdownDocs = (req, res) => {
  const finalList = [];
  const docTitleList = ["Docker部署Go后端", "xhw-pro开发笔记", "前端面试手册", "大模型对话技术", "开发环境配置"];
  docTitleList.forEach((item) => {
    const file = fs.readFileSync(`src\\services\\database\\docs\\${item}\\index.md`, "utf8");
    finalList.push({
      title: item,
      content: file,
    });
  });
  res.send(finalList);
};
