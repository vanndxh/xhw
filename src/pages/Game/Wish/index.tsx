/**
 * @file 游戏 - 抽卡模拟器
 */
import { useState } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

function Wish() {
  const navigate = useNavigate();

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
    <div className={styles["wish"]}>
      <div className={styles["wish-header"]}>
        <CloseOutlined
          className={styles["wish-header-close"]}
          onClick={() => navigate("/game/index")}
        />

        <div>原石：1500</div>
      </div>

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
  );
}
export default Wish;
