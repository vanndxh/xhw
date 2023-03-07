import React from "react";
import { Button, Menu } from "antd";
import { Image } from "antd-mobile";
import xhw from "@/assets/xhw.jpeg";
import styles from "./index.module.less";
import { CloudSyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function SiderBar() {
  const navigate = useNavigate();
  const items: any = [
    {
      label: "快捷url",
      key: "url",
    },
    {
      label: "原神抽卡导出",
      key: "genshin",
    },
  ];

  return (
    <div className={styles["sider-bar"]}>
      <div>
        <div className={styles["sider-bar-logo"]}>
          <Image src={xhw} width={120} height={80} />
        </div>
        <Menu
          onClick={(e) => {
            navigate(`/pc/${e?.key}`);
          }}
          selectedKeys={[window.location.href.split("/pc/")?.[1]]}
          mode="inline"
          items={items}
        />
      </div>
      <Button
        icon={<CloudSyncOutlined />}
        onClick={() => {
          navigate("/m");
        }}
      >
        手机版
      </Button>
    </div>
  );
}
export default SiderBar;
