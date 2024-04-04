/**
 * @file 角色列表页
 */
import { useEffect, useMemo, useState } from "react";
import { Breadcrumb, Col, Row, Select, Descriptions, ConfigProvider } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import RoleCard from "../components/RoleCard";
import { getIsHaveRole, getUserData } from "../utils";
import { roleList } from "../constants";

import styles from "./index.module.less";

function Role() {
  const userData = getUserData();

  const [filterMap, setFilterMap] = useState<ObjectType>({});
  const [curRoleId, setCurRoleId] = useState<string | undefined>();
  const [dataShow, setDataShow] = useState(roleList);

  const filters = [
    {
      key: "name",
      label: "角色名称",
      render: () => (
        <Select
          value={filterMap?.name}
          onChange={(val) => setFilterMap({ ...filterMap, name: val })}
          options={roleList.map((i) => ({ label: i.name, value: i.name }))}
          allowClear
          showSearch
          placeholder="请搜索角色名称"
          style={{ width: 200 }}
        />
      ),
    },
    {
      key: "classification",
      label: "角色分类",
      render: () => (
        <Select
          value={filterMap?.classification}
          onChange={(val) => setFilterMap({ ...filterMap, classification: val })}
          options={[
            { label: "已拥有", value: "HAVE" },
            { label: "未拥有", value: "NOT_HAVE" },
          ]}
          allowClear
          placeholder="请选择角色分类"
          style={{ width: 200 }}
        />
      ),
    },
  ];
  const targetRoleData = useMemo(() => {
    const targetHistory = userData?.history?.filter((i) => i?.id === curRoleId);
    return {
      ...(roleList.find((i) => i.id === curRoleId) || {}),
      // 第一次获得时间
      firstGetTime: targetHistory?.[0]?.time,
      // 共获得几次
      totalTimes: targetHistory?.length,
      // 平均每次获得抽数
      avgPulls: (
        targetHistory?.map((i) => i?.pulls)?.reduce((pre, cur) => pre + cur, 0) / targetHistory?.length
      ).toFixed(1),
    };
  }, [curRoleId]);

  useEffect(() => {
    // name 筛选
    let filteredList = roleList.filter((i) => i.name.indexOf(filterMap?.name || "") !== -1);

    // 分类筛选
    if (filterMap?.classification === "HAVE") {
      filteredList = filteredList.filter((i) => getIsHaveRole(i.id));
    }
    if (filterMap?.classification === "NOT_HAVE") {
      filteredList = filteredList.filter((i) => !getIsHaveRole(i.id));
    }
    setDataShow(filteredList);
  }, [filterMap]);

  return (
    <div className={styles["role"]}>
      <Breadcrumb
        items={[{ href: "/game/home", title: <HomeOutlined style={{ fontSize: 16 }} /> }, { title: "角色列表" }]}
        style={{ fontSize: 16, width: "100%" }}
      />

      <div className={styles["role-body"]}>
        <div className={styles["role-list"]}>
          <Row className={styles["role-list-filter"]} gutter={16}>
            {filters.map((i) => (
              <Col span={8} key={i.key} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ width: 70 }}>{i.label}</span>
                {i.render()}
              </Col>
            ))}
          </Row>

          <div className={styles["role-list-box"]}>
            <Row>
              {dataShow.map((i) => {
                const isHaveRole = getIsHaveRole(i.id);
                return (
                  <Col
                    span={4}
                    key={i.id}
                    className={styles["role-list-item"]}
                    onClick={() => {
                      if (isHaveRole) {
                        setCurRoleId(curRoleId === i.id ? undefined : i.id);
                      }
                    }}
                    style={{
                      filter: isHaveRole ? "none" : "grayscale(1)",
                      cursor: isHaveRole ? "pointer" : "not-allowed",
                    }}
                  >
                    <RoleCard {...i} isGold />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>

        <div className={styles["role-detail"]} style={{ width: curRoleId ? 400 : 0, opacity: curRoleId ? 1 : 0 }}>
          <ConfigProvider theme={{ components: { Descriptions: { itemPaddingBottom: 5 } } }}>
            <Descriptions
              title={targetRoleData?.name}
              style={{ padding: 0 }}
              items={[
                {
                  label: "第一次获得时间",
                  children: targetRoleData?.firstGetTime,
                },
                {
                  label: "共获得次数",
                  children: targetRoleData?.totalTimes,
                },
                {
                  label: "平均每次获得抽数",
                  children: targetRoleData?.avgPulls,
                },
              ]}
              column={1}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
export default Role;
