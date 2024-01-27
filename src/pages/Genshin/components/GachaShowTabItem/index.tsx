/**
 * @file 数据展示tab项
 */
import { Image, Progress } from "antd";
import { normalPoolRole, rolePicUrl } from "../../constants";
import styles from "./index.less";

interface Props {
  isRole: boolean;
  data: ObjectType[];
}

function GachaShowTabItem(props: Props) {
  const { isRole, data } = props;

  const getProgressColor = (count: number): string => {
    if (count <= 60) {
      return "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)";
    }
    if (count <= 80) {
      return "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
    }
    return "linear-gradient(120deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #cf556c 100%)";
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
              <Progress
                percent={(i?.count / 90) * 100}
                strokeColor={getProgressColor(i?.count)}
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
