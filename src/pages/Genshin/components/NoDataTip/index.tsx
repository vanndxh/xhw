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
            navigator.clipboard
              .writeText(`iex(irm 'https://lelaer.com/d.ps1')`)
              .then(() => {
                message.success("复制成功");
              });
          }}
        >
          点此复制命令
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
          style={{ marginBottom: 10, width: "100%" }}
        >
          {i.render()}
        </Card>
      ))}
    </div>
  );
}
export default NoDataTip;
