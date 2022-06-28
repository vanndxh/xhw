import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar
        onBack={() => {
          navigate("/mine");
        }}>
        设置
      </NavBar>
      asd
    </div>
  );
}

export default Setting;
