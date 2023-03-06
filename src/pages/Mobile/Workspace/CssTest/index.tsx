import React from "react";
import { NavBar } from "antd-mobile";
import BottomBar from "@/components/BottomBar";
import styles from "./index.less";
import VTable from "@/components/VTable";
import { Input } from "antd";

function CssTest() {
  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];
  const filters: any = [
    {
      label: "测试筛选项",
      key: "test",
      render: () => {
        return <Input placeholder="输入试试"></Input>;
      },
    },
    {
      label: "测试筛选项",
      key: "test",
      render: () => {
        return <Input placeholder="输入试试"></Input>;
      },
    },
    {
      label: "测试筛选项",
      key: "test",
      render: () => {
        return <Input placeholder="输入试试"></Input>;
      },
    },
    {
      label: "测试筛选项",
      key: "test",
      render: () => {
        return <Input placeholder="输入试试"></Input>;
      },
    },
    {
      label: "测试筛选项",
      key: "test",
      render: () => {
        return <Input placeholder="输入试试"></Input>;
      },
    },
  ];

  return (
    <div className={styles["css"]}>
      <div className={styles["css-header"]}>
        <NavBar back={null}>css练习</NavBar>
      </div>

      {/* <div className={styles["css-body"]}>
        <div className={styles["css-body-child"]}></div>
      </div> */}

      <div className={styles["css-table-wrapper"]}>
        <div className={styles["css-table"]}>
          <VTable dataSource={dataSource} columns={columns} filters={filters} fetch={() => {}}/>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
export default CssTest;
