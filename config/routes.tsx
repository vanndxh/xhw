import { Navigate } from "react-router-dom";

import Index from "@/pages/index";

import Genshin from "@/pages/Genshin";
import GPT from "@/pages/GPT";
import MarkdownParse from "@/pages/MarkdownParse";
import Game from "@/pages/Game";
import Docs from "@/pages/Docs";
import DeltaForce from "@/pages/DeltaForce";

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
      { path: "game", element: <Game /> },
      { path: "deltaForce", element: <DeltaForce /> },
    ],
  },
];
