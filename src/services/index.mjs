/**
 * @file 接口封装+请求配置+数据库初始化
 */
import express from "express";
import { dbInit } from "./database/db.mjs";

import * as Global from "./api/Global.mjs";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/** 数据库初始化 */
dbInit();

/** 解决跨域问题 */
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Max-Age": 1728000,
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  req.method === "OPTIONS" ? res.status(204).end() : next();
});

/** 接口的路径封装 */
app.post("/global/uv", Global.postUv);
app.get("/global/uv", Global.getUv);
app.get("/global/like", Global.getLikeAmount);

const server = app.listen(8088, function () {
  const host = server.address().address;
  const port = server.address().port;
});
