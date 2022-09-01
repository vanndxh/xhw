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
      let uvTrend = {};
      let tempData = {};
      results?.map((i) => {
        /** 处理trend数据 */
        const tag = `${i?.time?.split("/")[0]}.${i?.time?.split("/")[1]}`;
        uvTrend = {
          ...uvTrend,
          [tag]: (uvTrend?.[tag] || 0) + 1,
        };

        /** 处理总数据 */
        tempData = {
          ...tempData,
          total: (tempData?.total || 0) + 1,
          [i?.page]: (tempData?.[i?.page] || 0) + 1,
        };
      });
      res.json({
        code: 200,
        data: {
          ...tempData,
          trend: uvTrend,
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
