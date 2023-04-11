/**
 * @file 待办列表
 */
import React from "react";
import styles from "./index.module.less";
import PageLayout from "../components/PageLayout";
import { Button, Card, Collapse, Tag } from "antd";
import { CaretRightOutlined, CheckOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

interface TodoItem {
  label: React.ReactNode;
  tag?: React.ReactNode;
  color?: string;
}

function Todo() {
  const todo: any = [
    {
      label: "原神",
      children: [
        {
          label: "刷钱",
          tag: "FIXED",
        },
      ],
    },
    {
      label: "原神2",
      children: [
        {
          label: "刷钱",
          tag: "FIXED",
        },
      ],
    },
  ];
  return (
    <PageLayout>
      <Card title="待办列表" bordered={false}>
        <div className={styles["todo"]}>
          {/** 左侧列表 */}
          <Collapse
            defaultActiveKey={todo.map((i: any) => i.label)}
            ghost
            className={styles["todo-list"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            {todo.map((i: any) => (
              <Panel header={i.label} key={i?.label}>
                {i.children.map((j: TodoItem) => (
                  <div className={styles["todo-list-item"]}>
                    <div>
                      {j?.tag && <Tag color={j?.color || "blue"}>{j?.tag}</Tag>}
                      {j.label}
                    </div>
                    <div>
                      <Button icon={<CheckOutlined />} size="small" />
                    </div>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>

          {/** 右侧其他内容 */}
        </div>
      </Card>
    </PageLayout>
  );
}
export default Todo;
