import Index from "@/pages/index";
import Genshin from "@/pages/Tools/Genshin";
import GPT from "@/pages/Tools/GPT";
import MarkdownParse from "@/pages/Tools/MarkdownParse";
import ToolsLayout from "@/pages/Tools";
import * as Game from "@/pages/Game";

export const routes = [
  { path: "/", element: <Index /> },
  {
    path: "/tools",
    element: <ToolsLayout />,
    children: [
      { path: "", redirect: "genshin" },
      { path: "genshin", element: <Genshin /> },
      { path: "gpt", element: <GPT /> },
      { path: "markdown", element: <MarkdownParse /> },
    ],
  },
  {
    path: "/game",
    children: [
      { path: "home", element: <Game.Home /> },
      { path: "wish", element: <Game.Wish /> },
      { path: "role", element: <Game.Role /> },
    ],
  },
];
