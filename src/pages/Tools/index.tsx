/**
 * @file 工具页面通用布局
 */
import { Outlet, useNavigate } from "react-router-dom";
import { PicUrl } from "@/utils/constants";
import { Menu, Image, message, Space } from "antd";
import { GithubOutlined, MailOutlined } from "@ant-design/icons";
import { openNewPage } from "@/utils/utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import xhw from "./xhw.jpeg";
import styles from "./index.module.less";

function ToolsLayout() {
  const navigate = useNavigate();
  const items = [
    {
      label: "原神抽卡导出",
      key: "/tools/genshin",
      icon: PicUrl.genshin,
    },
    {
      label: "GPT国内镜像",
      key: "/tools/gpt",
      icon: PicUrl.gpt,
    },
    {
      label: "Markdown在线解析",
      key: "/tools/markdown",
      icon: PicUrl.markdown,
    },
    {
      label: "抽卡小游戏",
      key: "/game/home",
      icon: PicUrl.trashBin,
    },
  ];

  return (
    <div className={styles["tools"]}>
      <div className={styles["tools-sider"]}>
        <div>
          <div className={styles["tools-sider-logo"]}>
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
                  rootClassName={styles["tools-sider-menu-icon"]}
                />
              ),
            }))}
          />
        </div>

        <div className={styles["tools-sider-bottom"]}>
          <Space>
            <GithubOutlined
              className={styles["tools-sider-bottom-icon"]}
              onClick={() => {
                openNewPage("https://github.com/vanndxh");
              }}
            />
            <CopyToClipboard text="1025196468@qq.com" onCopy={() => message.success("复制成功")}>
              <MailOutlined className={styles["tools-sider-bottom-icon"]} />
            </CopyToClipboard>
          </Space>
        </div>
      </div>

      <div className={styles["tools-content"]}>
        <Outlet />
      </div>
    </div>
  );
}
export default ToolsLayout;
