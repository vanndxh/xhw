/**
 * @file 闪光进度条组件
 */
import styles from "./index.module.less";

interface Props {
  /** 进度条百分比 */
  percent: number;
  /** 背景色 */
  containerColor?: string;
  /** 填充色 */
  fillColor?: string;
  /** 粗细 */
  thick?: string;
}

function FlashProgress(props: Props) {
  const {
    percent,
    containerColor = "rgba(255, 255, 255, 0.4)",
    fillColor = "yellow",
    thick = "5px",
  } = props;

  return (
    <div
      className={styles["progress-container"]}
      style={{ background: containerColor, height: thick }}
    >
      <div
        className={styles["progress-fill"]}
        style={{
          width: `${percent}%`,
          background: fillColor,
          height: thick,
        }}
      />
    </div>
  );
}
export default FlashProgress;
