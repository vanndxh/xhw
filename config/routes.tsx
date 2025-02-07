import Index from "@/pages/index";
import Genshin from "@/pages/Genshin";
import GPT from "@/pages/GPT";
import MarkdownParse from "@/pages/MarkdownParse";
import * as Game from "@/pages/Game";
import Docs from "@/pages/Docs";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Index />,
    children: [
      { path: "", element: <Navigate to="/genshin" replace /> },
      { path: "genshin", element: <Genshin /> },
      { path: "gpt", element: <GPT /> },
      { path: "markdown", element: <MarkdownParse /> },
      { path: "docs", element: <Docs /> },
      {
        path: "/game",
        children: [
          { path: "home", element: <Game.Home /> },
          { path: "wish", element: <Game.Wish /> },
          { path: "role", element: <Game.Role /> },
        ],
      },
    ],
  },
];
