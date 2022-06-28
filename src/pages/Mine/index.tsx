import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, NavBar, Skeleton, Toast } from "antd-mobile";
import { UserSetOutline, DeleteOutline, SetOutline } from "antd-mobile-icons";
import BottomBar from "../../components/BottomBar";
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
          <NavBar back={null}>个人中心</NavBar>
          <br />
          <List>
            <List.Item prefix={<UserSetOutline />} onClick={() => {}} disabled>
              个人信息
            </List.Item>
            <List.Item
              prefix={<DeleteOutline />}
              clickable={false}
              onClick={() => {
                Toast.show({
                  icon: "loading",
                  content: "清除缓存中...",
                });
                setTimeout(() => {
                  Toast.show({
                    icon: "success",
                    content: "清除缓存成功",
                    duration: 800,
                  });
                }, 1000);
              }}>
              清除缓存
            </List.Item>
            <List.Item
              prefix={<SetOutline />}
              onClick={() => {
                navigate("/mine/author");
              }}>
              关于作者
            </List.Item>
            <List.Item
              prefix={<SetOutline />}
              onClick={() => {
                navigate("/mine/setting");
              }}>
              设置
            </List.Item>
          </List>
        </div>
      )}
      <BottomBar />
    </div>
  );
}

export default Mine;
