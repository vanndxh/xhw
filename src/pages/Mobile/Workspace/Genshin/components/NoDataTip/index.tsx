import React from "react";
import { Button, Card, message } from "antd";

function NoDataTip() {
  const tips = [
    {
      key: "getUrl",
      title: "怎么获取导出链接？",
      render: () =>
        `游戏打开抽卡界面，然后在powershell输入iex(irm 'https://lelaer.com/d.ps1')，将自动复制到剪贴板`,
      extra: (
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => {
            navigator.clipboard.writeText(
              `iex(irm 'https://lelaer.com/d.ps1')`
            );
            message.success("复制成功");
          }}
        >
          点此复制命令
        </Button>
      ),
    },
    {
      key: "bug",
      title: "使用bug反馈",
      render: () => (
        <>尽量按正常逻辑使用，没有测试过异常情况，有bug可以微博反馈我，谢谢啦</>
      ),
      extra: (
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => {
            window.open("https://weibo.com/u/6864286293");
          }}
        >
          联系作者
        </Button>
      ),
    },
  ];
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
    >
      {tips.map((i) => (
        <Card
          title={i.title}
          extra={i?.extra}
          key={i.key}
          style={{ marginBottom: 10, width: 400 }}
        >
          {i.render()}
        </Card>
      ))}
    </div>
  );
}
export default NoDataTip;
