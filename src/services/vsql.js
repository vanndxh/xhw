class vsql {
  /** 收集参数 */
  table_name = "";
  value_list = "";
  condition_value = "";
  column_list = "*";

  constructor(table_name) {
    this.table_name = table_name;
  }

  /** 收集参数函数 */
  values = (values) => {
    this.value_list = values.map((i) => `'${i}'`).join(",");
    return this;
  };

  columns = (columns) => {
    const temp = "";
    this.column_list = columns.join(",");
    return this;
  };

  where = (condition_value) => {
    this.condition_value = condition_value;
    return this;
  };

  /** 返回函数（结尾） */
  select = () => {
    let sql = `select ${this.column_list} from ${this.table_name}`;
    if (this.condition_value) {
      sql = sql + `where ${this.condition_value}`;
    }
    return sql;
  };

  insert = () => {
    return `insert into ${this.table_name} values (${this.value_list})`;
  };
}

module.exports = vsql;
