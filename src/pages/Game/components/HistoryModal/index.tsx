/**
 * @file 抽卡记录弹窗
 */
import { Modal, Table } from "antd";
import { useSnapshot } from "valtio";
import { userData } from "../../state";
import { RoleSource } from "../../constants";

interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function HistoryModal(props: Props) {
  const { open, onCancel } = props;
  const { history } = useSnapshot(userData);

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
    {
      title: "来源",
      dataIndex: "source",
      key: "source",
      render: (text) => RoleSource[text],
    },
  ];

  return (
    <Modal title="抽卡记录" width={800} open={open} onCancel={onCancel} footer={null}>
      <Table dataSource={[...history]?.reverse()} columns={columns} size="middle" rowKey="time" />
    </Modal>
  );
}
