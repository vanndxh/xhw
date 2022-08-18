import { TabBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { AppOutline, UserOutline, PieOutline } from "antd-mobile-icons";
import styles from "./index.less";

interface Props {
  onChange?: () => void;
}

const BottomBar = (props: Props) => {
  const { onChange } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      key: "/",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/workspace",
      title: "工作台",
      icon: <PieOutline />,
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
        onChange={(value) => {
          navigate(value);
          onChange?.();
        }}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default BottomBar;
