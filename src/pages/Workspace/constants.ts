import { useNavigate } from "react-router-dom";
import { Toast } from "antd-mobile";

import wzry from "@/assets/wzry.png";
import ys from "@/assets/ys.jpeg";

export const GetApps = () => {
  const navigate = useNavigate();

  return [
    {
      icon: ys,
      name: "原神",
      onClick: () => {
        navigate("/workspace/genshin");
      },
    },
    {
      icon: wzry,
      name: "王者荣耀",
      onClick: () => {
        Toast.show({
          content: "这也信?",
        });
      },
    },
    {
      icon: "https://bpic.588ku.com/element_origin_min_pic/19/04/09/e9fce6e83b97827742824bf4c4efdfdd.jpg",
      name: "小网站推荐",
      onClick: () => {
        navigate("/workspace/webRecommend");
      },
    },
  ];
};
