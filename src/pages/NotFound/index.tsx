import { Button, ErrorBlock } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.less";

function NotFound() {
  const navigator = useNavigate();

  return (
    <ErrorBlock
      status="default"
      fullPage={true}
      title={"你走丢了哦～"}
      description={"但肯定不是我的问题！"}>
      <Button
        color="primary"
        className={styles["button"]}
        onClick={() => {
          navigator("/");
        }}>
        回首页
      </Button>
    </ErrorBlock>
  );
}

export default NotFound;
