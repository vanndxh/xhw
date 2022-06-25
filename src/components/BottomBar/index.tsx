import { TabBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { AppOutline, UserOutline } from "antd-mobile-icons";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setRouteActive = (value: string) => {
    navigate(value);
  };
  const tabs = [
    {
      key: "/home",
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
    <TabBar
      safeArea={true}
      activeKey={location.pathname}
      onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default BottomBar;
