/**
 * @file 统计模块
 */
import { useMemo } from "react";
import { Card } from "antd";
import { calculateStatistics } from "../../util";
import { GachaDataType } from "../../constants";
import styles from "./index.less";

interface Props {
  /** 总数据 */
  data: GachaDataType;
}

function GachaShowStatistics(props: Props) {
  const { data } = props;

  const handledData = useMemo(() => {
    return calculateStatistics(data);
  }, [data]);

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
          label: "限定金数",
          value: handledData?.role?.limitGoldNumber || "-",
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
        <Card
          title={i?.title}
          key={i.title}
          className={styles["tab-statistics"]}
        >
          {i.items.map((j) => (
            <div className={styles["tab-statistics-item"]} key={j.label}>
              <div>{j.label}</div>
              <div>{j.value}</div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}
export default GachaShowStatistics;
