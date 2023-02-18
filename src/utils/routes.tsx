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
    element: <Workspace />,
    children: [
      {
        path: "/workspace/webRecommend",
        element: <WebRecommend />,
      },
      {
        path: "/workspace/componentTest",
        element: <ComponentTest />,
      },
    ],
  },
  {
    path: "/workspace/webRecommend",
    element: <WebRecommend />,
  },
  {
    path: "/workspace/genshin",
    element: <Genshin />,
  },
  {
    path: "/workspace/uvStatistics",
    element: <UVStatistics />,
  },
  {
    path: "/workspace/cssTest",
    element: <CssTest />,
  },
  {
    path: "/workspace/componentTest",
    element: <ComponentTest />,
  },

  /** 我的 */
  {
    path: "/mine",
    element: <Mine />,
    children: [
      {
        path: "/author",
        element: <Author />,
      },
    ],
  },
  {
    path: "/mine/author",
    element: <Author />,
  },
  {
    path: "/mine/setting",
    element: <Setting />,
  },

  /** 404 Not Found */
  {
    path: "*",
    element: <NotFound />,
  },
];
