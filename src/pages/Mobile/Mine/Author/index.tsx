import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import styles from "./index.less";

function Author() {
  const navigate = useNavigate();
  return (
    <div className={styles["author-box"]}>
      <NavBar
        onBack={() => {
          navigate("/m/mine");
        }}>
        关于作者
      </NavBar>
      <div>Author</div>
    </div>
  );
}

export default Author;
