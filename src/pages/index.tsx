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

import { PicUrl } from "@/utils/constants";
import { openNewPage } from "@/utils/utils";
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
      icon: PicUrl.genshin,
    },
    {
      label: "抽卡模拟器",
      key: "/game/home",
      icon: <GiftOutlined />,
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
