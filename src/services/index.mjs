/**
 * @file 接口的封装以及请求配置
 */
import express from 'express';
const app = express();

import * as Home from './api/Home.mjs';

/** 解决跨域问题 */
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 1728000,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  });
  req.method === 'OPTIONS' ? res.status(204).end() : next();
});

/** 接口的路径封装 */
app.get('/home/test', Home.getHomeTest);

const server = app.listen(8088, function () {
  const host = server.address().address;
  const port = server.address().port;
});