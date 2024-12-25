/**
 * @file 首页 - 重定向
 */
import { Outlet, useNavigate } from "react-router-dom";
import { PicUrl } from "@/utils/constants";
import { Menu, Image, message, Space } from "antd";
import { GithubOutlined, MailOutlined } from "@ant-design/icons";
import { openNewPage } from "@/utils/utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import xhw from "../assets/xhw.jpeg";
import styles from "./index.module.less";

export default function Index() {
  const navigate = useNavigate();

  const items = [
    {
      label: "原神抽卡导出",
      key: "/genshin",
      icon: PicUrl.genshin,
    },
    {
      label: "GPT国内镜像",
      key: "/gpt",
      icon: PicUrl.gpt,
    },
    {
      label: "Markdown在线解析",
      key: "/markdown",
      icon: PicUrl.markdown,
    },
    {
      label: "抽卡小游戏",
      key: "/game/home",
      icon: PicUrl.trashBin,
    },
  ];

  /** 以前该项目内有pc/移动端分流逻辑，现已删除，代码保留一下 */
  // const isMobile = /mobile|android|iphone|ipad|phone/i.test(
  //   window.navigator.userAgent.toLowerCase()
  // );

  return (
    <div className={styles["layout"]}>
      <div className={styles["layout-sider"]}>
        <div>
          <div className={styles["layout-sider-logo"]}>
            <Image src={xhw} width={120} height={80} preview={false} />
          </div>
          <Menu
            onClick={(e) => {
              navigate(e?.key);
              clearInterval("all" as any);
            }}
            selectedKeys={[window.location.pathname]}
            mode="inline"
            items={items?.map((i) => ({
              ...i,
              icon: (
                <Image
                  src={i?.icon}
                  preview={false}
                  height={20}
                  width={20}
                  rootClassName={styles["layout-sider-menu-icon"]}
                />
              ),
            }))}
          />
        </div>

        <div className={styles["layout-sider-bottom"]}>
          <Space>
            <GithubOutlined
              className={styles["layout-sider-bottom-icon"]}
              onClick={() => {
                openNewPage("https://github.com/vanndxh");
              }}
            />
            <CopyToClipboard text="1025196468@qq.com" onCopy={() => message.success("复制成功")}>
              <MailOutlined className={styles["layout-sider-bottom-icon"]} />
            </CopyToClipboard>
          </Space>
        </div>
      </div>

      <div className={styles["layout-content"]}>
        <Outlet />
      </div>
    </div>
  );
}
