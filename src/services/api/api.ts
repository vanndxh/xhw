/**
 * @file 接口+路径打包成函数
 */
import axios from "axios";

/** 请求的基础地址 */
// axios.defaults.baseURL = "http://localhost:8088";
axios.defaults.baseURL = "https://vanndxh.ltd:8088";

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
