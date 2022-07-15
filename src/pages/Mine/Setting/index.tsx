import { getLikeAmount } from "@/services/api/api";
import { IsToday } from "@/utils/IsToday";
import { List, NavBar, Toast } from "antd-mobile";
import { LikeOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Item } = List;

function Setting() {
  const navigate = useNavigate();

  /**
   * hooks
   */
  const [likeAmount, setLikeAmount] = useState(0);
  const [lastLikeTime, setLastLikeTime] = useState(
    localStorage.getItem("lastLikeTime") || ""
  );
  useEffect(() => {
    getLikeAmount().then((res) => {
      setLikeAmount(res.data.data.amount);
    });
  }, []);

  /**
   * 数据处理
   */
  const isToday: boolean = IsToday(new Date(lastLikeTime));
  /** 处理点赞请求 */
  const handleClickLike = () => {
    if (lastLikeTime && isToday) {
      Toast.show({
        icon: "fail",
        content: "今日已点赞!",
      });
    } else {
      localStorage.setItem("lastLikeTime", new Date().toISOString());
      setLastLikeTime(localStorage.getItem("lastLikeTime")!);
      getLikeAmount(1).then((res) => {
        setLikeAmount(res.data.data.amount);
      });
      Toast.show({
        icon: "success",
        content: <div>你是第{likeAmount}个点赞的好心人</div>,
      });
    }
  };

  return (
    <div>
      <NavBar
        onBack={() => {
          navigate("/mine");
        }}>
        设置
      </NavBar>
      <List mode="card">
        <Item prefix={<LikeOutline />} onClick={handleClickLike}>
          支持作者
        </Item>
      </List>
    </div>
  );
}

export default Setting;
