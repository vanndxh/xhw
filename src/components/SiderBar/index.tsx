/**
 * @file 边导航栏
 */
import { Button, Menu } from "antd";
import {
  CloudSyncOutlined,
  GithubOutlined,
  RadarChartOutlined,
  YuqueOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Image } from "antd-mobile";
import xhw from "@/assets/xhw.jpeg";
import { iconUrl } from "@/utils/constants";
import styles from "./index.module.less";

export default function SiderBar() {
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
    {
      label: "我的文章",
      key: "docs",
      icon: iconUrl.yuque,
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
            clearInterval("all");
          }}
          selectedKeys={[window.location.href.split("/pc/")?.[1]]}
          mode="inline"
          items={items?.map((i: any) => ({
            ...i,
            icon:
              typeof i.icon === "string" ? (
                <Image
                  src={i?.icon}
                  style={{ borderRadius: 8, width: 20, height: 20 }}
                />
              ) : (
                i.icon
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
          <span className={styles["sider-bar-bottom-mobile-span"]} />
        </Button>

        <RadarChartOutlined
          className={styles["sider-bar-bottom-url"]}
          onClick={() => navigate("/game/index")}
        />

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
