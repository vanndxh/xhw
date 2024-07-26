import Index from "@/pages/index";
import Genshin from "@/pages/Genshin";
import GPT from "@/pages/GPT";
import * as Game from "@/pages/Game";

export const routes = [
  { path: "/", element: <Index /> },
  { path: "genshin", element: <Genshin /> },
  { path: "gpt", element: <GPT /> },
  {
    path: "/game",
    children: [
      { path: "home", element: <Game.Home /> },
      { path: "wish", element: <Game.Wish /> },
      { path: "role", element: <Game.Role /> },
    ],
  },
];
