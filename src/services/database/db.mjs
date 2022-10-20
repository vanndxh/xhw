import mysql from "mysql";

export const db = mysql.createConnection({
  host: "150.158.166.169",
  user: "admin",
  password: "XHWxhw1101",
  database: "xhw-pro-db",
  port: 3306,
});

export const dbInit = () => {
  db.connect();

  /** 初始化uv表 */
  db.query(
    "CREATE TABLE IF NOT EXISTS `uv`(`page` VARCHAR(40) NOT NULL,`time` VARCHAR(40) NOT NULL)ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    (error, results, fields) => {
      if (error) {
        throw error;
      }
    }
  );

  /** 初始化like表 */
  db.query(
    "CREATE TABLE IF NOT EXISTS `like_data`(`time` VARCHAR(40) NOT NULL)ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    (error, results, fields) => {
      if (error) {
        throw error;
      }
    }
  );
};
