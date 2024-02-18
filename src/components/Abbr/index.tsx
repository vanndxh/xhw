/**
 * @file 文案超长自动省略
 */
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import styles from "./index.module.less";

interface Props {
  /**
   * @description 主要内容
   * @default ''
   */
  text: string;
  /**
   * @description 文案展示几行
   * @default 1
   */
  line?: number;
}

function Abbr(props: Props) {
  const { text, line = 1 } = props;

  const [element, setElement] = useState<HTMLElement | undefined>();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const isOverflow = element
    ? element.scrollHeight > element.clientHeight
    : false;

  useEffect(() => {
    if (document.getElementById("abbr")) {
      setElement(document.getElementById("abbr")!);
    }
  }, []);

  // 特殊情况兜底
  if (text === null || !String(text)) {
    return null;
  }

  return (
    <Tooltip
      title={text}
      open={tooltipOpen}
      onOpenChange={(open) => setTooltipOpen(open ? isOverflow : false)}
    >
      <span
        id="abbr"
        className={styles["multi-line"]}
        style={{ WebkitLineClamp: line }}
      >
        {text}
      </span>
    </Tooltip>
  );
}
export default Abbr;
