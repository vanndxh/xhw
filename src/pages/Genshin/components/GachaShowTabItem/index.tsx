import React from "react";
import { normalPoolRole } from "../../constants";
import styles from "./index.less";

interface Props {
  isRole: boolean;
  data: any[];
}

function GachaShowTabItem(props: Props) {
  const { isRole, data } = props;

  return (
    <div className={styles["tab"]}>
      {data ? (
        data?.map((i, index) => {
          return (
            <div
              key={index}
              className={styles["tab-item"]}
              style={{
                background: isRole
                  ? normalPoolRole.includes(i.name)
                    ? "rgba(255, 0, 0, 0.5)"
                    : "rgba(0, 255, 0, 0.5)"
                  : "rgba(0, 255, 0, 0.5)",
              }}>
              <span>{i.name}</span>
              <span>{i.count}</span>
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
