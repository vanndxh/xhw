import { SafeArea } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import styles from "./index.less";

function Home() {
  const navigator = useNavigate();
  function handleClick() {
    navigator("/mine");
  }
  return (
    <>
      <div className={styles.text}>index</div>
      <button onClick={handleClick}>jump to mine page</button>
      <SafeArea position="bottom" />
    </>
  );
}

export default Home;
