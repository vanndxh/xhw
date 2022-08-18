import React from "react";
import { Divider, NavBar, Image } from "antd-mobile";

import ItemInfo from "@/components/ItemInfo";
import BottomBar from "@/components/BottomBar";
import { webData } from "./constants";
import cat from "@/assets/cat.gif";
import styles from "./index.less";

function WebRecommend() {
  return (
    <div className={styles["web"]}>
      <div className={styles["web-header"]}>
        <NavBar back={null}>网站推荐</NavBar>
      </div>

      <div className={styles["web-body"]}>
        <h3>🔨 通用</h3>
        {webData.universalWeb.map((i, index) => {
          return (
            <div
              onClick={() => {
                window.open(i.url);
              }}
              key={index}>
              <ItemInfo icon={i.icon} title={i.title} desc={i.desc} />
            </div>
          );
        })}

        <h3>🎮 游戏</h3>
        {webData.gameWeb.map((i, index) => {
          return (
            <div
              onClick={() => {
                window.open(i.url);
              }}
              key={index}>
              <ItemInfo icon={i.icon} title={i.title} desc={i.desc} />
            </div>
          );
        })}

        <h3>💻 程序猿</h3>
        {webData.programWeb.map((i, index) => {
          return (
            <div
              onClick={() => {
                window.open(i.url);
              }}
              key={index}>
              <ItemInfo icon={i.icon} title={i.title} desc={i.desc} />
            </div>
          );
        })}

        <h3>📡 关于本网站</h3>
        {webData.xhwWeb.map((i, index) => {
          return (
            <div
              onClick={() => {
                window.open(i.url);
              }}
              key={index}>
              <ItemInfo icon={i.icon} title={i.title} desc={i.desc} />
            </div>
          );
        })}

        <Divider>我也是有底线的～</Divider>
        <div className={styles["web-footer"]}>
          <Image src={cat} width={100} height={100} fit="contain" />
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
export default WebRecommend;
