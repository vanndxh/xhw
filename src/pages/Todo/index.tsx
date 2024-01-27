/**
 * @file 待办列表
 */
import React, { useEffect, useState } from "react";
import { Button, Card, Collapse, Tag } from "antd";
import {
  CaretRightOutlined,
  CheckOutlined,
  PlusOutlined,
  RestOutlined,
} from "@ant-design/icons";

import PageLayout from "@/components/PageLayout";
import AddItemModal from "./components/AddItemModal";
import DelClassModal from "./components/DelClassModal";
import styles from "./index.module.less";

const { Panel } = Collapse;

interface TodoItem {
  label: React.ReactNode;
  tag?: React.ReactNode;
  color?: string;
}

interface TodoClass {
  label: React.ReactNode;
  children?: TodoItem[];
}

function Todo() {
  const [todoList, setTodoList] = useState<TodoClass[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

  const todoInit: TodoClass[] = [
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

  const opButtons = [
    {
      icon: <PlusOutlined />,
      isDanger: false,
      onclick: () => {
        setAddOpen(true);
      },
      label: "新增",
    },
    {
      icon: <RestOutlined />,
      isDanger: true,
      onclick: () => {
        setDelOpen(true);
      },
      label: "删除分组",
    },
  ];

  const handleDeleteItem = (
    classification: string,
    todo: string,
    tag: string
  ) => {
    const newTodoList = todoList?.map((i: TodoClass) => {
      const filteredChildren = {
        ...i,
        children: i?.children?.filter(
          (j: TodoItem) => j?.tag !== tag || j?.label !== todo
        ),
      };
      return i?.label !== classification ? i : filteredChildren;
    });
    setTodoList(newTodoList);
  };

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
              {opButtons.map((i) => (
                <Button
                  key={i?.label}
                  icon={i?.icon}
                  type="primary"
                  danger={i?.isDanger}
                  onClick={i?.onclick}
                  className={styles["todo-left-buttonline-item"]}
                >
                  {i?.label}
                </Button>
              ))}
            </div>

            <Collapse
              defaultActiveKey={
                todoList?.map((i: TodoClass) => i.label) as string[]
              }
              ghost
              className={styles["todo-left-list"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              {todoList?.map((i: TodoClass) => (
                <Panel header={i.label} key={i?.label as string}>
                  {i?.children?.map((j: TodoItem) => (
                    <div
                      className={styles["todo-left-list-item"]}
                      key={j?.label as string}
                    >
                      <div>
                        {j?.tag && (
                          <Tag color={j?.color || "blue"}>{j?.tag}</Tag>
                        )}
                        {j.label}
                      </div>
                      <div>
                        <Button
                          icon={<CheckOutlined />}
                          size="small"
                          onClick={() => {
                            handleDeleteItem(
                              i?.label as string,
                              j?.label as string,
                              j?.tag as string
                            );
                          }}
                          key={"test"}
                        />
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
      {/* <AddItemModal
        open={addOpen}
        onCancel={() => {
          setAddOpen(false);
        }}
        todoList={todoList}
        setTodoList={setTodoList}
      />
      <DelClassModal
        open={delOpen}
        onCancel={() => {
          setDelOpen(false);
        }}
        todoList={todoList}
        setTodoList={setTodoList}
      /> */}
    </PageLayout>
  );
}
export default Todo;
