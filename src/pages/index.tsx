/**
 * @file 首页 - 重定向
 */
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, Image, message, Layout, Button, Flex } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FileMarkdownOutlined,
  FileTextOutlined,
  GiftOutlined,
  GithubOutlined,
  LeftOutlined,
  MailOutlined,
  OpenAIOutlined,
  RightOutlined,
} from "@ant-design/icons";

import { openNewPage } from "@/utils";
import xhw from "../assets/xhw.jpeg";

import styles from "./index.module.less";

const { Sider, Content } = Layout;

export default function Index() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      label: "原神抽卡导出",
      key: "/genshin",
      icon: "https://th.bing.com/th?id=OSK.6c0cc1959345baf7c6e5ae5c1458cc25&w=46&h=46&c=11&rs=1&qlt=80&o=6&dpr=2&pid=SANGAM",
    },
    {
      label: "抽卡模拟器",
      key: "/game",
      icon: <GiftOutlined />,
    },
    {
      label: "三角洲每日密码",
      key: "/deltaForce",
      icon: "data:image/png;base64,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",
    },
    {
      label: "文章",
      key: "/docs",
      icon: <FileTextOutlined />,
    },
    {
      label: "Markdown在线解析",
      key: "/markdown",
      icon: <FileMarkdownOutlined />,
    },
    {
      label: "ChatGPT国内镜像",
      key: "/gpt",
      icon: <OpenAIOutlined />,
      disabled: true,
    },
  ];

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
            icon:
              typeof i?.icon === "string" ? (
                <Image src={i.icon} preview={false} style={{ opacity: i?.disabled ? 0.5 : 1 }} />
              ) : (
                i.icon
              ),
            disabled: i?.disabled,
          }))}
        />

        {!collapsed && (
          <Flex className={styles["layout-sider-bottom"]}>
            <Button type="text" icon={<GithubOutlined />} onClick={() => openNewPage("https://github.com/vanndxh")} />
            <CopyToClipboard text="1025196468@qq.com" onCopy={() => message.success("复制成功")}>
              <Button type="text" icon={<MailOutlined />} />
            </CopyToClipboard>
          </Flex>
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
