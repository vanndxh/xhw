/**
 * @file workspace首页
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Image, Button } from "antd-mobile";

import BottomBar from "@/pages/Mobile/components/BottomBar";
import { postUV } from "@/services/api/api";
import xhw from "@/assets/xhw.jpeg";
import styles from "./index.less";

function Mobile() {
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

          <div className={styles["home-body-content-buttons"]}>
            <Button
              fill="outline"
              onClick={() => {
                navigate("/m/workspace");
              }}
            >
              Do Something →
            </Button>
            <Button fill="outline">电脑版</Button>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default Mobile;
