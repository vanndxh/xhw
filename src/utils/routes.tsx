import { Navigate } from "react-router-dom";

import Index from "@/pages/index";
import Genshin from "@/pages/Genshin";
import GPT from "@/pages/GPT";
import Docs from "@/pages/Docs";
import GameIndex from "@/pages/Game/GameIndex";
import Wish from "@/pages/Game/Wish";

export const routes = [
  { path: "/", element: <Index /> },
  { path: "genshin", element: <Genshin /> },
  { path: "gpt", element: <GPT /> },
  { path: "docs", element: <Docs /> },
  {
    path: "/game",
    children: [
      { path: "index", element: <GameIndex /> },
      { path: "wish", element: <Wish /> },
    ],
  },
];
