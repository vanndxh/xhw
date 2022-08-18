import React from "react";
import { Image, ProgressBar } from "antd-mobile";
import { normalPoolRole, rolePicUrl } from "../../constants";
import styles from "./index.less";

interface Props {
  isRole: boolean;
  data: any[];
}

function GachaShowTabItem(props: Props) {
  const { isRole, data } = props;

  const getProgressColor = (count: number): string => {
    if (count <= 60) {
      return "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)";
    } else if (count <= 80) {
      return "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
    } else {
      return "linear-gradient(120deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #cf556c 100%)";
    }
  };

  return (
    <div className={styles["tab"]}>
      {data ? (
        data?.map((i, index) => {
          return (
            <div key={index} className={styles["tab-item"]}>
              <div className={styles["tab-item-left"]}>
                <Image src={rolePicUrl[i?.name]} width={20} height={20} />
                <span className={styles["tab-item-left-name"]}>{i.name}</span>
              </div>
              <ProgressBar
                percent={(i?.count / 90) * 100}
                text={i?.count}
                style={{
                  "--track-width": "12px",
                  "--track-color": "white",
                  "--fill-color": getProgressColor(i?.count),
                  "--text-width": "5px",
                }}
                className={styles["tab-item-center"]}
              />
              <div className={styles["tab-item-right"]}>
                {normalPoolRole.includes(i?.name) && isRole && (
                  <span className={styles["tab-item-right-text"]}>歪</span>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles["tab-no"]}>未获取到数据~</div>
      )}
    </div>
  );
}
export default GachaShowTabItem;
