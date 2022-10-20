import React from "react";
import { Grid } from "antd-mobile";

import BottomBar from "@/components/BottomBar";
import FakeApp from "./components/FakeApp";
import { GetApps } from "./constants";
import styles from "./index.less";

function Workspace() {
  return (
    <div className={styles["workspace"]}>
      <Grid columns={4} gap={8}>
        {GetApps().map((app, index) => {
          return (
            <Grid.Item className={styles["workspace-app"]} key={index}>
              <FakeApp
                name={app?.name}
                icon={app?.icon}
                onClick={app?.onClick}
              />
            </Grid.Item>
          );
        })}
      </Grid>

      <BottomBar />
    </div>
  );
}
export default Workspace;
