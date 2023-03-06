import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, NavBar, Toast } from "antd-mobile";
import { LikeOutline, DeleteOutline, UserOutline } from "antd-mobile-icons";
import { getLikeAmount } from "@/services/api/api";
import { IsToday } from "@/utils/utils";

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
      getLikeAmount().then((res) => {
        setLikeAmount(res.data);
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
          navigate("/m/mine");
        }}>
        设置
      </NavBar>

      <List mode="card">
        <Item
          prefix={<UserOutline />}
          disabled
          onClick={() => {
            navigate("/m/mine/author");
          }}>
          关于作者
        </Item>
        <Item prefix={<LikeOutline />} onClick={handleClickLike}>
          支持作者
        </Item>
        <Item
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
        </Item>
      </List>
    </div>
  );
}

export default Setting;
