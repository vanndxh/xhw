/**
 * @file 总首页-根据页面宽高自动分流
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.screen.width > window.screen.height) {
      navigate("/pc");
    } else {
      navigate("/m");
    }
  }, [navigate]);

  return <div />;
}
export default Index;
