import { Navigate } from "react-router-dom";

import Index from "@/pages/index";
import PCGenshin from "@/pages/PC/Genshin";
import GPT from "@/pages/PC/GPT";
import Docs from "@/pages/PC/Docs";
import GameIndex from "@/pages/Game/GameIndex";
import Wish from "@/pages/Game/Wish";

export const routes = [
  /** 自动分流页 */
  { path: "/", element: <Index /> },

  /**
   * PC端
   */
  {
    path: "/pc",
    children: [
      { path: "", element: <Navigate to="/pc/genshin" /> },
      { path: "genshin", element: <PCGenshin /> },
      { path: "gpt", element: <GPT /> },
      { path: "docs", element: <Docs /> },
    ],
  },

  /**
   * 游戏相关
   */
  {
    path: "/game",
    children: [
      { path: "index", element: <GameIndex /> },
      { path: "wish", element: <Wish /> },
    ],
  },
];
