import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import BottomBar from "../../components/BottomBar";
import styles from "./index.less";
import TransparentCard from "@/components/TransparentCard";

function Home() {
  const navigator = useNavigate();

  return (
    <div className={styles["home-box"]}>
      <NavBar back={null}>主页</NavBar>

      <div className={styles["home-content"]}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "100px",
          }}>
          <TransparentCard
            width="40%"
            height="70px"
            borderRadius={16}
            bgOpacity={0.1}
            blurDegree={3}>
            1
          </TransparentCard>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default Home;
