import React from "react";
import Home from "../pages/Home";

import Workspace from "../pages/Workspace";
import WebRecommend from "../pages/Workspace/Pages/WebRecommend";
import Genshin from "../pages/Workspace/Pages/Genshin";
import UVStatistics from "../pages/Workspace/Pages/UVStatistics";
import CssTest from "../pages/Workspace/Pages/CssTest";
import ComponentTest from "../pages/Workspace/Pages/ComponentTest";

import Mine from "../pages/Mine";
import Author from "../pages/Mine/Author";
import Setting from "../pages/Mine/Setting";

import NotFound from "../pages/NotFound";

export const routes = [
  /** 首页 */
  {
    path: "/",
    element: <Home />,
  },

  /** 工作台 */
  {
    path: "/workspace",
    children: [
      {
        path: "",
        element: <Workspace />,
      },
      {
        path: "webRecommend",
        element: <WebRecommend />,
      },
      {
        path: "genshin",
        element: <Genshin />,
      },
      {
        path: "uvStatistics",
        element: <UVStatistics />,
      },
      {
        path: "cssTest",
        element: <CssTest />,
      },
      {
        path: "componentTest",
        element: <ComponentTest />,
      },
    ],
  },

  /** 我的 */
  {
    path: "/mine",
    children: [
      {
        path: "",
        element: <Mine />,
      },
      {
        path: "author",
        element: <Author />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },

  /** 404 Not Found */
  {
    path: "*",
    element: <NotFound />,
  },
];
