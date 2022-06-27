import React from "react";
import { Skeleton } from "antd-mobile";
import { useEffect, useState } from "react";
import styles from "./index.less";

function Mine() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles["mine-box"]}>
      {isLoading ? (
        /** loading skeleton */
        <div className={styles["skeleton-box"]}>
          <Skeleton.Title animated />
          <Skeleton.Paragraph lineCount={5} animated />
        </div>
      ) : (
        <div className={styles.text}>index</div>
      )}
    </div>
  );
}

export default Mine;
