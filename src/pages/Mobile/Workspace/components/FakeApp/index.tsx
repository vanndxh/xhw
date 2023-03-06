import React from "react";
import { Image } from "antd-mobile";
import styles from "./index.less";

interface Props {
  icon?: string;
  name: string;
  onClick: () => void;
}

function FakeApp(props: Props) {
  const { icon, name, onClick } = props;

  return (
    <div className={styles["fake-app"]} onClick={onClick}>
      <div className={styles["fake-app-icon"]}>
        <Image
          src={icon}
          width={40}
          height={40}
          fit="contain"
          style={{ borderRadius: 8 }}
        />
      </div>
      <div className={styles["fake-app-name"]}>{name}</div>
    </div>
  );
}
export default FakeApp;
