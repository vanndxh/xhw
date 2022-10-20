import React, { useEffect, useState } from "react";
import { NavBar } from "antd-mobile";
import * as API from "@/services/api/api";
import BottomBar from "@/components/BottomBar";
import UvPie from "./components/UvPie";
import UvLine from "./components/UvLine";
import styles from "./index.less";

function UVStatistics() {
  const [uvData, setUvData] = useState();
  useEffect(() => {
    API.getUv().then((res) => {
      setUvData(res.data);
    });
  }, []);

  return (
    <div className={styles["uv"]}>
      <div className={styles["uv-header"]}>
        <NavBar back={null}>uv统计</NavBar>
      </div>
      <div className={styles["uv-body"]}>
        <div className={styles["uv-body-title"]}>各页面uv</div>
        <div className={styles["uv-body-pie"]}>
          <UvPie uvData={uvData} />
        </div>

        <div className={styles["uv-body-title"]}>总uv趋势图</div>
        <div className={styles["uv-body-pie"]}>
          <UvLine uvData={uvData} />
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
export default UVStatistics;
