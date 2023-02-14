import React, { ReactElement } from "react";
import { Button, Form, Pagination, Table } from "antd";
import styles from "./index.module.less";

interface FilterItem {
  label: string;
  key: string;
  render: () => ReactElement;
}

interface Props {
  /** 表格数据 */
  dataSource: any[];
  /** 列表项配置 */
  columns: any[];
  /** 筛选项配置 */
  filters: FilterItem[];
  /** 重置按键右侧额外自定义按钮 */
  extraButton?: ReactElement;
  /** 分页器左侧自定义内容 */
  batchAction?: ReactElement;
}

function VTable(props: Props) {
  const { dataSource, columns, filters, extraButton, batchAction } = props;

  return (
    <>
      <div className={styles["vtable-header"]}>
        <div className={styles["vtable-header-left"]}>
          {filters?.map((i) => (
            <Form.Item label={i?.label} name={i?.key} key={i?.key}>
              <div>{i?.render?.()}</div>
            </Form.Item>
          ))}
        </div>
        <div>
          <Button>重置</Button>
          {extraButton}
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
