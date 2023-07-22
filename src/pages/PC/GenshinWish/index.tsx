/**
 * @file 原神抽卡模拟器
 */
import React, { useState } from "react";
import { Button, Card } from "antd";
import PageLayout from "../components/PageLayout";
import styles from "./index.module.less";

function GenshinWish() {
  const [mockData, setMockData] = useState<any>([]);

  /** 生成模拟数据 */
  const generateData = (isSingle: boolean) => {
    /** 单抽 */
    if (isSingle) {
      setMockData([{}]);
    }

    /** 十连 */
    if (!isSingle) {
      setMockData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    }
  };

  return (
    <PageLayout>
      <Card title="原神抽卡模拟" bordered={false}>
        <div className={styles["genshin-wish"]}>
          <div className={styles["wish-show"]}>
            {mockData?.map((i: any, index: number) => (
              <div key={index} className={styles["wish-show-item"]}></div>
            ))}
          </div>

          <div className={styles["wish-buttons"]}>
            <Button
              className={styles["wish-buttons-single"]}
              onClick={() => {
                generateData(true);
              }}
            >
              单抽
            </Button>
            <Button
              className={styles["wish-buttons-ten"]}
              onClick={() => {
                generateData(false);
              }}
            >
              十连抽
            </Button>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}
export default GenshinWish;
