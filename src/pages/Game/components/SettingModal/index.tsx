/**
 * @file 设置弹窗
 */
import { useState } from "react";
import { Button, ConfigProvider, Form, Input, Modal, Switch, message } from "antd";
import { getUserData, updateUserData } from "../../utils";

interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function SettingModal(props: Props) {
  const { open, onCancel } = props;

  const [infiniteValue, setInfiniteValue] = useState(getUserData()?.infinite);
  const [inputValue, setInputValue] = useState<string | undefined>();

  const fields = [
    {
      key: "infinite",
      label: "无限抽卡道具",
      render: () => (
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={infiniteValue}
          onChange={(val) => {
            updateUserData({ infinite: val });
            setInfiniteValue(!infiniteValue);
            message.success("设置成功");
          }}
        />
      ),
    },
    {
      key: "export",
      label: "游戏数据导出",
      render: () => (
        <Button
          onClick={() => {
            navigator.clipboard.writeText(localStorage.getItem("userData") || "");
            message.success("已复制，请粘贴使用");
          }}
          size="middle"
        >
          导出
        </Button>
      ),
    },
    {
      key: "import",
      label: "游戏数据导入",
      render: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target?.value || "")}
            style={{ width: 200, marginRight: 5 }}
            allowClear
          />
          <Button
            onClick={() => {
              Modal.confirm({
                title: "确认要导入游戏数据吗？",
                content: "导入数据会覆盖当前数据",
                onOk: () => {
                  localStorage.setItem("userData", inputValue || "");
                  message.success("游戏数据导入成功");
                  setInputValue(undefined);
                },
              });
            }}
            size="middle"
          >
            导入
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Modal title="设置" open={open} onCancel={onCancel} width={600} footer={null}>
      <ConfigProvider theme={{ components: { Form: { itemMarginBottom: 5 } } }}>
        <Form>
          {fields.map((i) => (
            <Form.Item label={i.label} key={i.key}>
              {i.render()}
            </Form.Item>
          ))}
        </Form>
      </ConfigProvider>
    </Modal>
  );
}
