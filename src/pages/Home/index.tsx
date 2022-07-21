import { Divider, NavBar, Image } from "antd-mobile";
import BottomBar from "@/components/BottomBar";
import { webData } from "./constants";
import styles from "./index.less";
import ItemInfo from "@/components/ItemInfo";

function Home() {
  return (
    <div className={styles["home"]}>
      <div className={styles["home-header"]}>
        <NavBar back={null}>主页</NavBar>
      </div>

      <div className={styles["home-body"]}>
        <h3>🔨通用</h3>
        {webData.universalWeb.map((i, index) => {
          return (
            <div
              onClick={() => {
                window.open(i.url);
              }}>
              <ItemInfo
                icon={i.icon}
                title={i.title}
                desc={i.desc}
                key={index}
              />
            </div>
          );
        })}

        <h3>🎮游戏</h3>
        {webData.gameWeb.map((i, index) => {
          return (
            <div
              onClick={() => {
                window.open(i.url);
              }}>
              <ItemInfo
                icon={i.icon}
                title={i.title}
                desc={i.desc}
                key={index}
              />
            </div>
          );
        })}

        <h3>💻程序猿</h3>
        {webData.programWeb.map((i, index) => {
          return (
            <div
              onClick={() => {
                window.open(i.url);
              }}>
              <ItemInfo
                icon={i.icon}
                title={i.title}
                desc={i.desc}
                key={index}
              />
            </div>
          );
        })}

        <Divider>我也是有底线的～</Divider>
        <div className={styles["home-footer"]}>
          <Image
            src={"../../assets/cat.gif"}
            width={100}
            height={100}
            fit="contain"
          />
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default Home;
