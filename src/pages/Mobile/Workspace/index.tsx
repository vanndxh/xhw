import React from "react";
import { Grid, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";

import BottomBar from "@/components/BottomBar";
import FakeApp from "./components/FakeApp";

import wzry from "@/assets/wzry.png";
import ys from "@/assets/ys.jpeg";
import styles from "./index.less";

function Workspace() {
  const navigate = useNavigate();

  const apps = [
    {
      icon: ys,
      name: "原神",
      onClick: () => {
        navigate("/m/workspace/genshin");
      },
    },
    {
      icon: wzry,
      name: "王者荣耀",
      onClick: () => {
        Toast.show({
          content: "这也信?",
        });
      },
    },
    {
      icon: "https://bpic.588ku.com/element_origin_min_pic/19/04/09/e9fce6e83b97827742824bf4c4efdfdd.jpg",
      name: "小网站推荐",
      onClick: () => {
        navigate("/m/workspace/webRecommend");
      },
    },
    {
      icon: "https://img.51miz.com/Element/00/80/90/39/2dc9a918_E809039_2c5773b5.jpg",
      name: "uv统计",
      onClick: () => {
        navigate("/m/workspace/uvStatistics");
      },
    },
    {
      icon: "https://bpic.588ku.com/element_origin_min_pic/19/04/09/e9fce6e83b97827742824bf4c4efdfdd.jpg",
      name: "css练习",
      onClick: () => {
        navigate("/m/workspace/cssTest");
      },
    },
    {
      icon: "https://bpic.588ku.com/element_origin_min_pic/19/04/09/e9fce6e83b97827742824bf4c4efdfdd.jpg",
      name: "component练习",
      onClick: () => {
        navigate("/m/workspace/componentTest");
      },
    },
  ];

  return (
    <div className={styles["workspace"]}>
      <Grid columns={4} gap={8}>
        {apps.map((app, index) => {
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
