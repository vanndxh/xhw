import React from "react";
import { Button, Menu } from "antd";
import { Image } from "antd-mobile";
import xhw from "@/assets/xhw.jpeg";
import styles from "./index.module.less";
import { CloudSyncOutlined } from "@ant-design/icons";

function SiderBar() {
  const items: any = [
    {
      label: "test",
      key: "test",
    },
  ];

  return (
    <div className={styles["sider-bar"]}>
      <div>
        <div className={styles["sider-bar-logo"]}>
          <Image src={xhw} width={120} height={80} />
        </div>
        <Menu onClick={() => {}} mode="inline" items={items} />
      </div>
      <Button icon={<CloudSyncOutlined />}>手机版</Button>
    </div>
  );
}
export default SiderBar;
