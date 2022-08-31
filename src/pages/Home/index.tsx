import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Image, Button } from "antd-mobile";

import BottomBar from "@/components/BottomBar";
import { postUV } from "@/services/api/api";
import xhw from "@/assets/xhw.jpeg";
import styles from "./index.less";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    postUV("home");
  }, []);

  return (
    <div className={styles["home"]}>
      <div className={styles["home-header"]}>
        <NavBar back={null}>主页</NavBar>
      </div>

      <div className={styles["home-body"]}>
        <div className={styles["home-body-content"]}>
          <Image src={xhw} width={300} height={150} fit="contain" />
          <Button
            fill="outline"
            onClick={() => {
              navigate("/workspace");
            }}>
            这破网站能
            <span className={styles["home-body-content-gan"]}>干</span>嘛 ➡️
          </Button>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default Home;
