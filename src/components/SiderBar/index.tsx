/**
 * @file 边导航栏
 */
import { Menu, Image } from "antd";
import { GithubOutlined, RadarChartOutlined, YuqueOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import xhw from "@/assets/xhw.jpeg";
import { PicUrl } from "@/utils/constants";
import styles from "./index.module.less";

export default function SiderBar() {
  const navigate = useNavigate();
  const items = [
    {
      label: "原神抽卡导出",
      key: "genshin",
      icon: PicUrl.genshin,
    },
    {
      label: "GPT国内镜像",
      key: "gpt",
      icon: PicUrl.gpt,
    },
    {
      label: "我的文章",
      key: "docs",
      icon: PicUrl.yuque,
    },
  ];

  return (
    <div className={styles["sider-bar"]}>
      <div>
        <div className={styles["sider-bar-logo"]}>
          <Image src={xhw} width={120} height={80} preview={false} />
        </div>
        <Menu
          onClick={(e) => {
            navigate(`/${e?.key}`);
            clearInterval("all");
          }}
          selectedKeys={[window.location.pathname?.slice(1)]}
          mode="inline"
          items={items?.map((i) => ({
            ...i,
            icon: (
              <Image
                src={i?.icon}
                preview={false}
                height={20}
                width={20}
                rootClassName={styles["sider-bar-menu-icon"]}
              />
            ),
          }))}
        />
      </div>

      <div className={styles["sider-bar-bottom"]}>
        <RadarChartOutlined className={styles["sider-bar-bottom-url"]} onClick={() => navigate("/game/home")} />

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
