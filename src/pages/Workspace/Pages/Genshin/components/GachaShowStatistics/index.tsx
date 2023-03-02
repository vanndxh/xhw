/**
 * @file 统计模块
 */
import React from "react";
import { calculateStatistics } from "../../utils";
import styles from "./index.less";

interface Props {
  /** 总数据数据 */
  data: any;
}

function GachaShowStatistics(props: Props) {
  const { data } = props;

  const handledData = calculateStatistics(data);
  const dataShow = [
    {
      title: "角色",
      items: [
        {
          label: "总抽数",
          value: handledData?.role?.totalPull || "-",
        },
        {
          label: "总金数",
          value: handledData?.role?.totalGold || "-",
        },
        {
          label: "每限定抽数",
          value: handledData?.role?.pullPerLimit || "-",
        },
        {
          label: "角色不歪概率",
          value: `${handledData?.role?.limitRate}%`,
        },
      ],
    },
    {
      title: "武器",
      items: [
        {
          label: "总抽数",
          value: handledData?.weapon?.totalPull || "-",
        },
        {
          label: "总金数",
          value: handledData?.weapon?.totalGold || "-",
        },
        {
          label: "每金抽数",
          value: handledData?.weapon?.pullPerLimit || "-",
        },
      ],
    },
    {
      title: "常驻",
      items: [
        {
          label: "总抽数",
          value: handledData?.normal?.totalPull || "-",
        },
        {
          label: "总金数",
          value: handledData?.normal?.totalGold || "-",
        },
        {
          label: "每金抽数",
          value: handledData?.normal?.pullPerLimit || "-",
        },
      ],
    },
  ];

  return (
    <div className={styles["tab"]}>
      {dataShow.map((i) => (
        <div className={styles["tab-statistics"]} key={i.title}>
          <p className={styles["tab-statistics-title"]}>{i.title}</p>
          {i.items.map((j) => (
            <div className={styles["tab-statistics-item"]} key={j.label}>
              <div>{j.label}</div>
              <div>{j.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default GachaShowStatistics;
