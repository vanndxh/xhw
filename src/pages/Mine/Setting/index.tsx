import { getLikeAmount } from "@/services/api/api";
import { List, Modal, NavBar } from "antd-mobile";
import { LikeOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Item } = List;

function Setting() {
  const navigate = useNavigate();

  const [likeAmount, setLikeAmount] = useState(0);

  useEffect(() => {
    getLikeAmount().then((res) => {
      setLikeAmount(res.data.data.amount);
    });
  }, []);

  return (
    <div>
      <NavBar
        onBack={() => {
          navigate("/mine");
        }}>
        设置
      </NavBar>
      <List mode="card">
        <Item
          prefix={<LikeOutline />}
          onClick={() => {
            getLikeAmount(1).then((res) => {
              setLikeAmount(res.data.data.amount);
            });
            Modal.show({
              content: <div>你是第{likeAmount}个点赞的好心人</div>,
              closeOnMaskClick: true,
            });
          }}>
          支持作者
        </Item>
      </List>
    </div>
  );
}

export default Setting;
