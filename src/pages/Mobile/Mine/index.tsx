import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, NavBar, Skeleton } from "antd-mobile";
import { UserSetOutline, SetOutline } from "antd-mobile-icons";
import BottomBar from "../../../components/BottomBar";
import styles from "./index.less";

function Mine() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
        <div className={styles["mine-show-box"]}>
          <NavBar
            back={null}
            right={
              <SetOutline
                fontSize={20}
                onClick={() => {
                  navigate("/m/mine/setting");
                }}
              />
            }
          >
            个人中心
          </NavBar>
          <br />
          <List mode="card">
            <List.Item prefix={<UserSetOutline />} onClick={() => {}} disabled>
              个人信息
            </List.Item>
          </List>
        </div>
      )}
      <BottomBar />
    </div>
  );
}

export default Mine;
