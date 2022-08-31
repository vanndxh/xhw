import { db } from "../database/db.mjs";

/**
 * @file 用户访问页面时记录uv
 * @type POST
 * @path /global/uv
 */
export const postUv = (req, res) => {
  const page = req?.body?.page || "home";

  db.query(
    `insert into uv values ('${page}', '${new Date().toLocaleString()}')`,
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        res.json({
          code: 200,
          message: "记录用户uv成功",
        });
      }
    }
  );
};

/**
 * @file 获取uv数
 * @type GET
 * @path /global/uv
 */
export const getUv = (req, res) => {
  db.query(`select * from uv`, (error, results, fields) => {
    if (error) {
      throw error;
    } else {
      res.json({
        code: 200,
        data: {
          total: results?.length,
          home: results?.filter((i) => i?.page === "home")?.length,
          genshin: results?.filter((i) => i?.page === "genshin")?.length,
          web: results?.filter((i) => i?.page === "web")?.length,
        },
        message: "获取uv成功",
      });
    }
  });
};

/**
 * @file 获取点赞数
 * @type GET
 * @path /global/like
 */
export const getLikeAmount = (req, res) => {
  db.query(
    `insert into like_data values ('${new Date().toLocaleString()}')`,
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        db.query(`select * from like_data`, (error, results, fields) => {
          if (error) {
            throw error;
          } else {
            res.send({
              code: 200,
              data: results?.length,
              message: "获取uv成功",
            });
          }
        });
      }
    }
  );
};
