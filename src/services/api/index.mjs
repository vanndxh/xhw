/**
 * @file 接口+路径打包成函数
 */
import axios from 'axios';

export const test = () => {
  return axios.get("/home/test");
};
