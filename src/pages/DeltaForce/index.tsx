import { useRequest } from "ahooks";
import { Col, Row } from "antd";
import axios from "axios";

import styles from "./index.module.less";

const DeltaForce = () => {
  const formData = new FormData();
  formData.append("version", "9c5461f4932ed49d2590cd21c73ad3f6");

  const { data } = useRequest(() =>
    axios
      .post("/api/deltaForce/getOVData", formData, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((res) => res.data.data)
  );

  const passwordCardItems = [
    { key: "db", label: "零号大坝" },
    { key: "cgxg", label: "长弓溪谷" },
    { key: "bks", label: "巴克什" },
    { key: "htjd", label: "航天基地" },
  ];

  return (
    <div className={styles["delta-force"]}>
      <Row gutter={16} style={{ width: "100%" }}>
        {passwordCardItems.map((i) => (
          <Col key={i.key} span={6}>
            <div className={styles["delta-force-item"]}>
              <div className={styles["delta-force-item-label"]}>{i.label}</div>
              <div className={styles["delta-force-item-value"]}>{data?.bdData?.[i.key].password}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DeltaForce;
