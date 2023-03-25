import React from "react";
import { Button, Menu } from "antd";
import { Image } from "antd-mobile";
import xhw from "@/assets/xhw.jpeg";
import styles from "./index.module.less";
import {
  CloudSyncOutlined,
  GithubOutlined,
  YuqueOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { iconUrl } from "@/utils/constants";

function SiderBar() {
  const navigate = useNavigate();
  const items: any = [
    {
      label: "原神抽卡导出",
      key: "genshin",
      icon: iconUrl.genshin,
    },
    {
      label: "GPT国内镜像",
      key: "gpt",
      icon: iconUrl.gpt,
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
          items={items?.map((i: any) => ({
            ...i,
            icon: (
              <Image
                src={i?.icon}
                style={{ borderRadius: 8, width: 20, height: 20 }}
              />
            ),
          }))}
        />
      </div>

      <div className={styles["sider-bar-bottom"]}>
        <Button
          icon={<CloudSyncOutlined />}
          onClick={() => {
            navigate("/m");
          }}
          className={styles["sider-bar-bottom-mobile"]}
        >
          手机版
        </Button>
        <GithubOutlined
          className={styles["sider-bar-bottom-url"]}
          onClick={() => {
            window.open("https://github.com/vanndxh");
          }}
        />
        <YuqueOutlined
          className={styles["sider-bar-bottom-url"]}
          onClick={() => {
            window.open("https://www.yuque.com/vanndxh/coderv");
          }}
        />
      </div>
    </div>
  );
}
export default SiderBar;
