/**
 * @file 设置弹窗
 */
import { useState } from "react";
import { Form, Modal, Switch, message } from "antd";
import { getUserData, updateUserData } from "../../utils";

interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function SettingModal(props: Props) {
  const { open, onCancel } = props;

  const [infiniteValue, setInfiniteValue] = useState(getUserData()?.infinite);

  return (
    <Modal title="设置" open={open} onCancel={onCancel} width={600} footer={null}>
      <Form>
        <Form.Item label={"无限抽卡道具"}>
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
        </Form.Item>
      </Form>
    </Modal>
  );
}
