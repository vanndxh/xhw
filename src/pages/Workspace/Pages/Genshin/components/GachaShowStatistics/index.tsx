import React from "react";
import styles from "./index.less";

interface Props {
  statisticsData: any;
}

function GachaShowStatistics(props: Props) {
  const { statisticsData } = props;

  return (
    <div className={styles["tab"]}>
      <div className={styles["tab-statistics"]}>
        <p className={styles["tab-statistics-title"]}>角色</p>
        <div className={styles["tab-statistics-item"]}>
          <div>总抽数</div>
          <div>{statisticsData?.rolePullNumber}</div>
        </div>
        <div className={styles["tab-statistics-item"]}>
          <div>总金数</div>
          <div>{statisticsData?.roleNumber}</div>
        </div>
        <div className={styles["tab-statistics-item"]}>
          <div>每限定角色抽数</div>
          <div>{statisticsData?.pullsPerLimitRole}</div>
        </div>
        <div className={styles["tab-statistics-item"]}>
          <div>角色不歪概率</div>
          <div>{statisticsData?.limitRate}%</div>
        </div>
      </div>

      <div className={styles["tab-statistics"]}>
        <p className={styles["tab-statistics-title"]}>武器</p>
        <div className={styles["tab-statistics-item"]}>
          <div>总抽数</div>
          <div>{statisticsData?.weaponPullNumber}</div>
        </div>
        <div className={styles["tab-statistics-item"]}>
          <div>总金数</div>
          <div>{statisticsData?.weaponGoldNumber}</div>
        </div>
        <div className={styles["tab-statistics-item"]}>
          <div>每金光抽数</div>
          <div>{statisticsData?.pullsPerWeapon}</div>
        </div>
      </div>

      <div className={styles["tab-statistics"]}>
        <p className={styles["tab-statistics-title"]}>常驻</p>
        <div className={styles["tab-statistics-item"]}>
          <div>总抽数</div>
          <div>{statisticsData?.normalPullNumber}</div>
        </div>
        <div className={styles["tab-statistics-item"]}>
          <div>总金数</div>
          <div>{statisticsData?.normalGoldNumber}</div>
        </div>
        <div className={styles["tab-statistics-item"]}>
          <div>每金光抽数</div>
          <div>{statisticsData?.pullsPerNormal}</div>
        </div>
      </div>
    </div>
  );
}
export default GachaShowStatistics;
