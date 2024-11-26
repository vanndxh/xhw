/**
 * @file 边导航栏
 */
import { Menu, Image, Popover, message } from "antd";
import { CopyOutlined, GithubOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PicUrl } from "@/utils/constants";
import xhw from "@/assets/xhw.jpeg";

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
      label: "抽卡模拟游戏",
      key: "game/home",
      icon: PicUrl.trashBin,
    },
    {
      label: "GPT国内镜像",
      key: "gpt",
      icon: PicUrl.gpt,
    },
    {
      label: "Markdown在线解析",
      key: "markdown",
      icon: PicUrl.markdown,
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
        <Popover
          placement="rightBottom"
          content={
            <>
              <div>
                <GithubOutlined style={{ marginRight: 5 }} />
                <a href="https://github.com/vanndxh" target="_blank" rel="noopener noreferrer">
                  https://github.com/vanndxh
                </a>
              </div>

              <div>
                <MailOutlined style={{ marginRight: 5 }} />
                <span>1025196468@qq.com</span>
                <CopyOutlined
                  onClick={() => {
                    navigator.clipboard.writeText(`1025196468@qq.com`).then(() => {
                      message.success("复制成功");
                    });
                  }}
                  style={{ color: "#1677ff", marginLeft: 5 }}
                />
              </div>
            </>
          }
        >
          <span className={styles["sider-bar-bottom-text"]}>关于作者</span>
        </Popover>
      </div>
    </div>
  );
}
