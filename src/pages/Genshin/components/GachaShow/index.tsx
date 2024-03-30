/**
 * @file 一个卡池的出金展示
 */
import { ConfigProvider, Descriptions } from "antd";
import GachaItem from "../GachaItem";
import { roleList } from "@/pages/Game/constants";
import { PicUrl } from "@/utils/constants";
import { normalPoolRole } from "../../constants";

import styles from "./index.module.less";

interface Props {
  isRole?: boolean;
  data: ObjectType[];
}

function GachaShow(props: Props) {
  const { isRole, data } = props;

  const getStatistics = () => {
    const goldCount = data?.[0]?.name === "已垫" ? data?.length - 1 : data?.length;
    const pullCount = data?.reduce((pre, cur) => pre + cur.count, 0);
    const limitCount = data?.reduce((pre, cur) => ([...normalPoolRole, "已垫"].includes(cur.name) ? pre : pre + 1), 0);
    return [
      { label: "总金数", children: goldCount },
      { label: "总抽数", children: pullCount },
      { label: "每金抽数", children: data?.length ? (pullCount / goldCount).toFixed(2) : 0 },
      { label: "限定角色数", children: limitCount, hide: !isRole },
      {
        label: "每限定角色抽数",
        children: data?.length ? (pullCount / limitCount).toFixed(2) : 0,
        hide: !isRole,
      },
    ]?.filter((i) => !i?.hide);
  };

  return (
    <div className={styles["gacha-show"]}>
      <div className={styles["gacha-show-list"]}>
        {data?.map((i, index) => (
          <GachaItem
            picUrl={i?.name === "已垫" ? PicUrl.question : roleList.find((j) => i?.name === j?.name)?.picUrl || ""}
            name={i?.name}
            count={i?.count}
            key={index}
          />
        ))}
      </div>

      <div className={styles["gacha-show-statistics"]}>
        <ConfigProvider theme={{ components: { Descriptions: { itemPaddingBottom: 0 } } }}>
          <Descriptions title="本周期统计" items={getStatistics()} column={1} />
        </ConfigProvider>
      </div>
    </div>
  );
}
export default GachaShow;
