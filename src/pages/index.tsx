/**
 * @file 首页 - 重定向
 */
import { Outlet, useNavigate } from "react-router-dom";
import { PicUrl } from "@/utils/constants";
import { Menu, Image, message, Space, Layout, Button } from "antd";
import { GithubOutlined, LeftOutlined, MailOutlined, RightOutlined } from "@ant-design/icons";
import { openNewPage } from "@/utils/utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import xhw from "../assets/xhw.jpeg";
import { useState } from "react";
import styles from "./index.module.less";

const { Sider, Content } = Layout;

export default function Index() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

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
      disabled: true,
    },
    {
      label: "Markdown在线解析",
      key: "/markdown",
      icon: PicUrl.markdown,
    },
    {
      label: "文章",
      key: "/docs",
      icon: PicUrl.doc,
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
    <Layout className={styles["layout"]}>
      <Sider
        className={styles["layout-sider"]}
        theme="light"
        width={256}
        collapsedWidth={60}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className={styles["layout-sider-logo"]}>
          <Image src={xhw} preview={false} height={collapsed ? 0 : 80} />
        </div>

        <Menu
          onClick={(e) => {
            navigate(e?.key);
            clearInterval("all" as any);
          }}
          selectedKeys={[window.location.pathname]}
          items={items?.map((i) => ({
            ...i,
            icon: <Image src={i?.icon} preview={false} style={{ opacity: i?.disabled ? 0.5 : 1 }} />,
            disabled: i?.disabled,
          }))}
        />

        {!collapsed && (
          <Space className={styles["layout-sider-bottom"]}>
            <Button type="text" icon={<GithubOutlined />} onClick={() => openNewPage("https://github.com/vanndxh")} />
            <CopyToClipboard text="1025196468@qq.com" onCopy={() => message.success("复制成功")}>
              <Button type="text" icon={<MailOutlined />} />
            </CopyToClipboard>
          </Space>
        )}

        <div className={styles["layout-sider-trigger"]} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </div>
      </Sider>

      <Content style={{ background: "#fff" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
