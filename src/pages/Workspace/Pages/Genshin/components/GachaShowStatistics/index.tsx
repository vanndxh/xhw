import React from "react";
import styles from "./index.less";

interface Props {
  statisticsData: any;
}

function GachaShowStatistics(props: Props) {
  const { statisticsData } = props;

  const dataShow = [
    {
      title: "角色",
      items: [
        {
          label: "总抽数",
          value: statisticsData?.rolePullNumber || "-",
        },
        {
          label: "总金数",
          value: statisticsData?.roleNumber || "-",
        },
        {
          label: "每限定抽数",
          value: statisticsData?.pullsPerLimitRole || "-",
        },
        {
          label: "角色不歪概率",
          value: `${statisticsData?.limitRate}%`,
        },
      ],
    },
    {
      title: "武器",
      items: [
        {
          label: "总抽数",
          value: statisticsData?.weaponPullNumber || "-",
        },
        {
          label: "总金数",
          value: statisticsData?.weaponGoldNumber || "-",
        },
        {
          label: "每金抽数",
          value: statisticsData?.pullsPerWeapon || "-",
        },
      ],
    },
    {
      title: "常驻",
      items: [
        {
          label: "总抽数",
          value: statisticsData?.normalPullNumber || "-",
        },
        {
          label: "总金数",
          value: statisticsData?.normalGoldNumber || "-",
        },
        {
          label: "每金抽数",
          value: statisticsData?.pullsPerNormal || "-",
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
