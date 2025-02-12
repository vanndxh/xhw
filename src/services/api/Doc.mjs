import fs from "fs";

/**
 * @file 获取项目内.md文件
 * @type GET
 * @path /doc/getMarkdownDocs
 */
export const getMarkdownDocs = (req, res) => {
  const finalList = [];
  const docTitleList = req?.query?.docTitleList || [];
  docTitleList.forEach((item) => {
    const file = fs.readFileSync(`src\\docs\\${item}.md`, "utf8");
    finalList.push({
      title: item,
      content: file,
    });
  });
  res.send(finalList);
};
