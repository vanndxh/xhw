import { useImperativeHandle, useState } from "react";
import { List, Modal, Image, Flex, Descriptions } from "antd";
import { useSnapshot } from "valtio";

import { roleList } from "@/pages/Genshin/constants";
import { getGenshinRoleImg } from "@/utils";
import { userData } from "../../state";

import styles from "./index.module.less";

interface Props {
  actionRef: React.MutableRefObject<{ show: () => void } | undefined>;
}

export default function RoleBook(props: Props) {
  const { actionRef } = props;
  const { history } = useSnapshot(userData);

  const [open, setOpen] = useState(false);

  useImperativeHandle(actionRef, () => ({
    show: () => setOpen(true),
  }));

  return (
    <Modal title="角色图鉴" open={open} onCancel={() => setOpen(false)} width={600} footer={null}>
      <List
        dataSource={roleList}
        renderItem={(roleObj) => {
          const firstGetTime = history.find((i) => i.name === roleObj.name)?.time;
          const picSize = 70;
          return (
            <Flex gap={12} style={{ padding: 5 }}>
              <Image
                src={getGenshinRoleImg(roleObj.englishName)}
                width={picSize}
                height={picSize}
                preview={false}
                style={{ filter: firstGetTime ? "none" : "grayscale(1)" }}
              />
              <Descriptions
                title={`${roleObj.name} | ${roleObj.englishName}`}
                className={styles["desc"]}
                items={[
                  { label: "初登场版本", children: roleObj.version },
                  { label: "初次获得时间", children: firstGetTime || "-" },
                ]}
                column={1}
              />
            </Flex>
          );
        }}
        style={{ height: "60vh", overflow: "auto" }}
      />
    </Modal>
  );
}
