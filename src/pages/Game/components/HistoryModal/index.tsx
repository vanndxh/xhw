/**
 * @file 抽卡记录弹窗
 */
import { useImperativeHandle, useState } from "react";
import { Alert, Modal, Table } from "antd";
import { useSnapshot } from "valtio";

import { userData } from "../../state";

interface Props {
  actionRef: React.MutableRefObject<{ show: () => void } | undefined>;
}

export default function HistoryModal(props: Props) {
  const { actionRef } = props;
  const { history, pullCount, level } = useSnapshot(userData);
  const goldCount = history?.length;
  const avgPulls = (pullCount - level) / history?.length;
  const mostRoleCountObj = history?.reduce((acc, cur) => {
    if (acc[cur.name!]) {
      acc[cur.name!]++;
    } else {
      acc[cur.name!] = 1;
    }
    return acc;
  }, {});
  const mostRole = Object.keys(mostRoleCountObj).reduce((acc, cur) => {
    if (mostRoleCountObj[acc] < mostRoleCountObj[cur] || acc === "") {
      return cur;
    }
    return acc;
  }, "");

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
      {goldCount && (
        <Alert
          message={
            <div>
              <span>本模型出金数学期望为</span>
              <span style={{ fontWeight: "bold" }}> 62.5 </span>
              <span>，您当前平均出金抽数是</span>
              <span style={{ fontWeight: "bold", color: avgPulls > 62.5 ? "red" : "green", margin: "0 4px" }}>
                {avgPulls.toFixed(1)}
              </span>
              <span>，最爱您的角色为 </span>
              <span style={{ fontWeight: "bold" }}>{mostRole}</span>
            </div>
          }
          type="info"
          showIcon
          style={{ margin: "10px 0" }}
        />
      )}
      <Table dataSource={[...history]?.reverse()} columns={columns} size="middle" rowKey="time" />
    </Modal>
  );
}
