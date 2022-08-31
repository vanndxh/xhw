/**
 * @file 接口+路径打包成函数
 */
import axios from "axios";

/** global */
export const postUV = (page: string) => {
  return axios.post("/global/uv", { page });
};
export const getUv = () => {
  return axios.get("/global/uv").then((res) => {
    return res?.data;
  });
};
export const getLikeAmount = () => {
  return axios.get("/global/like").then((res: any) => {
    return res?.data;
  });
};
