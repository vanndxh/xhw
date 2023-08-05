/**
 * @file 总首页-根据页面宽高自动分流
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Index() {
  const navigate = useNavigate();
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(
    window.navigator.userAgent.toLowerCase()
  );

  useEffect(() => {
    if (!isMobile) {
      navigate("/pc");
    } else {
      navigate("/m");
    }
  }, [navigate]);

  return <div />;
}
export default Index;
