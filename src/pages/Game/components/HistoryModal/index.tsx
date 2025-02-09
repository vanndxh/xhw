/**
 * @file 抽卡记录弹窗
 */
import { useImperativeHandle, useState } from "react";
import { Modal, Table } from "antd";
import { useSnapshot } from "valtio";

import { userData } from "../../state";

interface Props {
  actionRef: React.MutableRefObject<{ show: () => void } | undefined>;
}

export default function HistoryModal(props: Props) {
  const { actionRef } = props;
  const { history } = useSnapshot(userData);

  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "抽卡时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "水位",
      dataIndex: "pulls",
      key: "pulls",
    },
  ];

  useImperativeHandle(actionRef, () => ({
    show: () => setOpen(true),
  }));

  return (
    <Modal title="抽卡记录" width={800} open={open} onCancel={() => setOpen(false)} footer={null} destroyOnClose>
      <Table dataSource={[...history]?.reverse()} columns={columns} size="middle" rowKey="time" />
    </Modal>
  );
}
