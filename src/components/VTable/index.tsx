import React, { ReactElement, useState } from "react";
import { Button, Form, Pagination, Table, Col, Row, Badge } from "antd";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.less";

interface FilterItem {
  label: string;
  key: string;
  render: () => ReactElement;
  span: number;
}

interface Props {
  /** 表格数据 */
  dataSource: any[];
  /** 列表项配置 */
  columns: any[];
  /** 筛选项配置 */
  filters: FilterItem[];
  /** fetch */
  fetch: () => void;
  /** 重置按键右侧额外自定义按钮 */
  extraButton?: ReactElement;
  /** 分页器左侧自定义内容 */
  batchAction?: ReactElement;
}

function VTable(props: Props) {
  const { dataSource, columns, filters, extraButton, batchAction } = props;

  const [isFold, setIsFold] = useState(true);

  return (
    <>
      <div className={styles["vtable-header"]}>
        <div className={styles["vtable-header-left"]}>
          <Row gutter={[16, 16]}>
            {(isFold ? filters?.slice(0, 4) : filters)?.map((i) => (
              <Col span={i?.span || 6} key={i?.key}>
                <Form.Item label={i?.label} name={i?.key} key={i?.key}>
                  {i?.render?.()}
                </Form.Item>
              </Col>
            ))}
          </Row>
        </div>
        <div className={styles["vtable-header-right"]}>
          <div className={styles["vtable-header-right-buttons"]}>
            {filters?.length > 4 && (
              <Badge count={isFold ? filters?.length : 0} size="small">
                <Button
                  icon={isFold ? <DownCircleOutlined /> : <UpCircleOutlined />}
                  onClick={() => {
                    setIsFold(!isFold);
                  }}
                >
                  {isFold ? "展开" : "折叠"}
                </Button>
              </Badge>
            )}
            <Button style={{ marginLeft: 10 }}>重置</Button>
            {extraButton}
          </div>
        </div>
      </div>

      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <div className={styles["vtable-footer"]}>
        <div>{batchAction}</div>
        <Pagination defaultCurrent={1} total={dataSource?.length} />
      </div>
    </>
  );
}

export default VTable;
