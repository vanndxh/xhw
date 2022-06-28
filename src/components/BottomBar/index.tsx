import { TabBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { AppOutline, UserOutline } from "antd-mobile-icons";
import styles from "./index.less";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setRouteActive = (value: string) => {
    navigate(value);
  };
  const tabs = [
    {
      key: "/",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/mine",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];

  return (
    <div className={styles["bottom-bar-box"]}>
      <TabBar
        safeArea={true}
        activeKey={location.pathname}
        onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default BottomBar;
