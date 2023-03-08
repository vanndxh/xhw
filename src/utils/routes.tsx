import React from "react";
/** 分流 */
import Index from "../pages/index";

/** pc */
import { PCUrl } from "../pages/PC";
import PCGenshin from "../pages/PC/Genshin";

/** mobile */
import Mobile from "../pages/Mobile";

import Workspace from "../pages/Mobile/Workspace";
import WebRecommend from "../pages/Mobile/Workspace/WebRecommend";
import Genshin from "../pages/Mobile/Workspace/Genshin";
import CssTest from "../pages/Mobile/Workspace/CssTest";
import ComponentTest from "../pages/Mobile/Workspace/ComponentTest";

import Mine from "../pages/Mobile/Mine";
import Author from "../pages/Mobile/Mine/Author";
import Setting from "../pages/Mobile/Mine/Setting";

/** 404 */
import NotFound from "../pages/NotFound";
import { Navigate } from "react-router-dom";

export const routes = [
  /**
   * 自动分流页
   */
  {
    path: "/",
    element: <Index />,
  },

  /**
   * PC端
   */
  {
    path: "/pc",
    children: [
      {
        path: "",
        element: <Navigate to="/pc/genshin" />,
      },
      {
        path: "url",
        element: <PCUrl />,
      },
      {
        path: "genshin",
        element: <PCGenshin />,
      },
    ],
  },

  /** 移动端 */
  {
    path: "/m",
    children: [
      {
        path: "",
        element: <Mobile />,
      },
      {
        path: "workspace",
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
            path: "cssTest",
            element: <CssTest />,
          },
          {
            path: "componentTest",
            element: <ComponentTest />,
          },
        ],
      },
      {
        path: "mine",
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
    ],
  },

  /** 404 Not Found */
  {
    path: "*",
    element: <NotFound />,
  },
];
