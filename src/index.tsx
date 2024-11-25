import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./utils/routes";
import "./index.less";

/**
 * 全局注册prettyLog函数
 * 若传了一个值：该值为content，title默认为log
 * 若传了两个值：第一个是title，第二个是content
 */
(window as ObjectType).prettyLog = (text: string, subText?: string, color: string = "#1677FF") => {
  const title = subText ? text : "log";
  const content = subText ? subText : text;
  console.log(
    `%c ${title} %c ${content} %c`,
    `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
    `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
    "background:transparent"
  );
};

const RouteElement = () => useRoutes(routes);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <RouteElement />
  </BrowserRouter>
);
