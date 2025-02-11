/**
 * @file 一个卡池的出金展示
 */
import { ConfigProvider, Descriptions, Divider, Space, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import GoldLine from "../GoldLine";
import { getGenshinRoleImg } from "@/utils/utils";
import { roleList } from "../../constants";

import styles from "./index.module.less";

interface Props {
  isRole?: boolean;
  data: ObjectType[];
}

function GoldTotal(props: Props) {
  const { isRole, data } = props;

  const getStatistics = () => {
    const goldCount = data?.[0]?.name === "已垫" ? data?.length - 1 : data?.length;
    const pullCount = data?.reduce((pre, cur) => pre + cur.count, 0);
    const limitCount = data?.reduce((pre, cur) => {
      const isNormal = cur.name === "已垫" || roleList.find((i) => cur.name === i.name)?.isNormal;
      return isNormal ? pre : pre + 1;
    }, 0);
    const goldPull = data?.reduce((pre, cur) => (cur.name !== "已垫" ? pre + cur.count : pre), 0);
    const avgGold = goldCount ? (goldPull / goldCount).toFixed(1) : "-";
    const avgLimit = limitCount ? (goldPull / limitCount).toFixed(2) : "-";
    const waiPercent = goldCount ? (((goldCount - limitCount) / goldCount) * 100).toFixed(1) : "-";

    const getColor = (value, threshold) => {
      if (value === "-") {
        return "#000";
      }
      return value > threshold ? "red" : "green";
    };

    return [
      {
        label: (
          <Space size={4}>
            平均每金抽数
            <Tooltip placement="top" title={"数学期望：62"} arrow={false}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        ),
        children: <div style={{ fontWeight: "bold", color: getColor(avgGold, 62) }}>{avgGold}</div>,
      },
      {
        label: (
          <Space size={4}>
            平均每限定抽数
            <Tooltip placement="top" title={"数学期望：93"} arrow={false}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        ),
        children: <div style={{ color: getColor(avgLimit, 93) }}>{avgLimit}</div>,
        hide: !isRole,
      },
      {
        label: (
          <Space size={4}>
            歪概率
            <Tooltip placement="top" title={"数学期望：45%"} arrow={false}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        ),
        children: <div style={{ color: getColor(waiPercent, 45) }}>{waiPercent}%</div>,
        hide: !isRole,
      },
      { label: "限定角色数", children: limitCount, hide: !isRole },
      { label: "总抽数/总金数", children: `${pullCount}/${goldCount}` },
    ]?.filter((i) => !i?.hide);
  };

  return (
    <div className={styles["gacha-show"]}>
      {data?.map((i, index) => {
        const targetObj = roleList.find((j) => i?.name === j?.name);
        return (
          <GoldLine
            picUrl={
              i?.name === "已垫"
                ? "https://t1.xianx.com.cn/xstatic/img/rarity/5.png"
                : getGenshinRoleImg(targetObj?.englishName || "")
            }
            name={i?.name}
            count={i?.count}
            key={index}
          />
        );
      })}

      <Divider />

      <ConfigProvider theme={{ components: { Descriptions: { itemPaddingBottom: 0 } } }}>
        <Descriptions size="small" items={getStatistics()} column={1} bordered />
      </ConfigProvider>
    </div>
  );
}
export default GoldTotal;
