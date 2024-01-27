/**
 * @file 首页 - 重定向
 */
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Index() {
  const navigate = useNavigate();

  /** 以前该项目内有pc/移动端分流逻辑，现已删除，但保留一下 */
  // const isMobile = /mobile|android|iphone|ipad|phone/i.test(
  //   window.navigator.userAgent.toLowerCase()
  // );

  useEffect(() => {
    navigate("/pc");
  }, [navigate]);

  return <div />;
}
