/**
 * @file 待办列表
 */
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import PageLayout from "../components/PageLayout";
import { Button, Card, Collapse, Tag } from "antd";
import {
  CaretRightOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddTodoListModal from "./AddTodoListModal";

const { Panel } = Collapse;

interface TodoItem {
  label: React.ReactNode;
  tag?: React.ReactNode;
  color?: string;
}

function Todo() {
  const [todoList, setTodoList] = useState<any>([]);
  const [addOpen, setAddOpen] = useState(false);

  const todoInit: any = [
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
        {
          label: "刷钱2",
          tag: "FIXED2",
        },
      ],
    },
  ];

  useEffect(() => {
    /** todo list 初始化 */
    setTodoList(todoInit);
    // eslint-disable-next-line
  }, []);

  return (
    <PageLayout>
      <Card title="待办列表" bordered={false}>
        <div className={styles["todo"]}>
          {/** 左侧列表 */}
          <div className={styles["todo-left"]}>
            <div className={styles["todo-left-buttonline"]}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => {
                  setAddOpen(true);
                }}
              >
                新增
              </Button>
            </div>

            <Collapse
              defaultActiveKey={todoList.map((i: any) => i.label)}
              ghost
              className={styles["todo-left-list"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              {todoList?.map((i: any) => (
                <Panel header={i.label} key={i?.label}>
                  {i.children.map((j: TodoItem) => (
                    <div
                      className={styles["todo-left-list-item"]}
                      key={j?.label as any}
                    >
                      <div>
                        {j?.tag && (
                          <Tag color={j?.color || "blue"}>{j?.tag}</Tag>
                        )}
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
          </div>

          {/** 右侧其他内容 */}
          <div className={styles["todo-other"]}></div>
        </div>
      </Card>

      {/** modals */}
      <AddTodoListModal
        open={addOpen}
        onCancel={() => {
          setAddOpen(false);
        }}
        todoList={todoList}
        setTodoList={setTodoList}
      />
    </PageLayout>
  );
}
export default Todo;
