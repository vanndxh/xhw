/**
 * @file 分组选择组件
 */
import React, { useState } from "react";
import styles from "./index.module.less";
import { Input, Select } from "antd";

interface Props {
  value?: string;

  onChange?: (e: string) => void;
  /** 已有分类 */
  classes: string[];
}

function ClassSelect(props: Props) {
  const { value, onChange, classes } = props;
  /** 是否选择了新建 */
  const [isAdd, setIsAdd] = useState(false);

  return (
    <div className={styles["class-select"]}>
      <Select
        defaultValue={false}
        className={styles["class-select-select"]}
        onChange={(e) => {
          setIsAdd(e);
          onChange?.(undefined as any);
        }}
        options={[
          {
            label: "从已有分组选择",
            value: false,
          },
          {
            label: "新建",
            value: true,
          },
        ]}
      />

      {/** 从已有分组选择 */}
      {!isAdd && (
        <Select
          value={value}
          allowClear
          placeholder="请选择分组"
          onChange={(e) => {
            onChange?.(e);
          }}
          className={styles["class-select-input"]}
          options={classes?.map((i: any) => ({
            label: i,
            value: i,
          }))}
        />
      )}

      {/** 新建 */}
      {isAdd && (
        <Input
          value={value}
          maxLength={7}
          className={styles["class-select-input"]}
          placeholder="请输入分组名，最多7个字"
          allowClear
          onChange={(e) => {
            onChange?.(e?.target?.value);
          }}
        />
      )}
    </div>
  );
}
export default ClassSelect;
