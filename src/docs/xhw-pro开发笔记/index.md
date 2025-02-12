## 1 项目配置

### 1.1 项目创建

```bash
npx create-react-app [project-name] --template typescript
```

### 1.2 webpack/rsbuild 配置

- less 用现成插件
- 下面配置 proxy，实现接口跨域

```typescript
export default defineConfig({
  plugins: [pluginLess(), pluginReact()],
  html: {
    title: "小黑屋",
    favicon: "./src/assets/profile.png",
  },
  server: {
    proxy: {
      "/api/mihoyo": {
        target: "https://public-operation-hk4e.mihoyo.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api/mihoyo": "https://public-operation-hk4e.mihoyo.com",
        },
      },
    },
  },
});
```

### 1.3 路由配置的封装

需要注意，最新版写法已经更新

- history -> navigate

- switch -> routes

更多信息查看最新[官方文档](https://reactrouter.com/docs/en/v6)

```typescript
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
      { path: "BiliMusic", element: <BiliMusic /> },
    ],
  },
];
```

```tsx
const RouteElement = () => useRoutes(routes);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <GlobalStyles />
    <RouteElement />
  </BrowserRouter>
);
```

### 1.4 eslint 配置

按如下步骤操作

```bash
# 安装 eslint
npm install eslint

# 初始化
npm exec eslint --init

# 首次执行
npm exec eslint src/*
```

自定义 eslint 配置项需要在根目录新增文件 .eslintrc.js 和 .eslintignore，下面分别为两个文件的示例

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    plugins: ["@typescript-eslint"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": 0, // 解决默认react在jsx中错误
    "no-use-before-define": 2,
    "no-console": 2,
  },
};
```

```
# https文件
/src/services/vanndxh.ltd.key
/src/services/vanndxh.ltd_bundle.crt

# 静态资源
/src/assets/*

# main
/src/**/*.less
/src/docs/*
```

### 1.5 pre-commit 配置

主要思路为，通过 husky，修改 git hook 绑定，将 pre-commit 改为我们自己配置的命令（一般为 lint-staged），然后在 lint-staged 中配置，对需要预校验的文件执行 eslint，若报错，则阻塞 commit 流程，如果有需要，也可以在 lint-staged 中，配置--fix 等命令，直接修改不符合规范的代码

```bash
npm i --save-dev lint-staged husky pre-commit
```

先安装上列依赖，安装完成之后，如下配置

```bash
  "scripts": {
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": "eslint --ext .js,.jsx,.ts,.tsx"
  },
```

需要注意的是，husky 已破坏性更新，老版本是在上方 package.json 文件中一起配置 husky: {}，最新的方法是按下方步骤操作

```bash
# 1.手动启用husky
npx husky install

# 2.生成 husky 配置文件
# 执行完这一步，根目录会有一个 .husky 目录，后续也可以在这个文件中对其他 git hook 进行配置
npx husky add .husky/pre-commit "npm run lint-staged"
```

### 1.6 清理无用依赖

全局安装 depcheck

```bash
npm i -g depcheck
```

安装完成后进入项目目录下，然后执行即可

```bash
depcheck .
```

根据返回的列表直接清理即可，若存在 missing，则表示是幽灵依赖，建议安装

## 2 项目工程化

### 2.1 网站升级 HTTPS/HTTP2.0

> 本节内容以 宝塔面板 为前置条件

1. 首先要有证书，直接去买服务器的地方（腾讯云/阿里云）申请免费证书
2. 下载解压之后得到有 4 个文件
3. 进入宝塔面板-网站-设置-ssl，在页面内根据提示装入证书即可使用

### 2.2 服务器部署前端

> 本节内容以 宝塔面板 为前置条件

1. 找到文件目录，在里面上传本地 yarn build 的产物

2. 进入配置页面，将刚刚上传的 build 文件以入口形式绑定至网站

3. 处理备案等问题

### 2.3 服务器部署后端

> 本节内容以 宝塔面板 为前置条件

为了让服务器上的服务可以一直运行，不能用普通的启动方式，这里我们使用 pm2 实现

1. 宝塔面板 - 商店 - 安装pm2
2. [在后端入口文件] pm2 start index.js

需要注意的是，这样启动的服务默认是http的，不能在https的网站上使用，解决方案如下

- 方案一：将请求也升级到 https，参考本文服务端部分
- 方案二：使网站兼容 http 请求，参考下方代码

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

### 2.4 HBuilder 打包 APP

如何把我们的网站简单的封装成一个手机APP呢？

我们可以用HBuilder来实现，直接创建一个 uni-app，在生成的空项目中把主页改成一个内嵌了我们网站的iframe，这样的好处是可以不用重复打包，以服务器为准实时更新

## 3 网站内容开发

### 3.1 数据流方案

数据流方案切换至 valtio 统一管理

```tsx
export const userData = proxy<UserDataType>(initUserData);

/** 根据localStorage更新用户数据 */
const storedState = safeParse(localStorage.getItem("userData"));
if (storedState) {
  Object.assign(userData, storedState);
}

/** 将userData保存到localStorage */
subscribe(userData, () => {
  localStorage.setItem("userData", JSON.stringify(userData));
});
```

消费也非常简单

```tsx
const { history } = useSnapshot(userData);
```

### 3.2 原神模块

通过学习开源大佬/拦截原神客户端请求，都可以获取到历史记录查询的API为

```
https://public-operation-hk4e.mihoyo.com/gacha_info/api/getGachaLog
```

而这个接口需要非常多的参数，其中很大一部分是固定的token类参数，可以从拦截的接口中直接获取，实际影响接口结果的接口只有以下几个

- gacha_type：卡池类型
- page：当前页数
- size：单页数量，官方限制了最大为20
- end_id：本页前最后一条记录的id，这个参数非常重要，实测接口并不是根据page获取，而是end_id

有了API之后，我们就可以遍历接口了，尽量用setTimeout代替setInterval，在遇到异常时有更好的表现

这里穿插一个我踩过的坑，setTimeout是异步的，所以尽量避免在内部setState并直接递归调用下一次接口，会导致参数state没有取到最新的，建议用useEffect监听state的变化，再执行下一次接口

有个很有意思的小功能，手机端打开网站时，点击按钮可以直接启动原神，这是用到了原神的短链yuanshengame://，不难但是真的很有意思~

### 3.3 移动/pc 双端自动分流

在 navigator 中获取到用户设备信息，然后对关键词进行判断，用正则表达式进行 match

```tsx
const isMobile = /mobile|android|iphone|ipad|phone/i.test(window.navigator.userAgent.toLowerCase());
```

### 3.4 毛玻璃效果

一直感觉毛玻璃效果很好看，于是决定封成一个组件，方便项目中使用，主要实现就是依靠`backdrop-filter`效果，来个最简单的例子

```css
.eg {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
}
```

## 4 服务端开发

### 4.1 环境准备

```bash
# 框架选择express
npm install express --save

# 接口热更新
npm install nodemon -g
```

### 4.2 初始化服务

```javascript
var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send({});
});

app.get("/test", function (req, res) {
  res.send("9999999");
});

var server = app.listen(8088, function () {
  var host = server.address().address;
  var port = server.address().port;
});
```

### 4.3 解决跨域问题

```javascript
/** 解决跨域问题 */
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Max-Age": 1728000,
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  req.method === "OPTIONS" ? res.status(204).end() : next();
});
```

### 4.4 连接 mysql 数据库

```javascript
import mysql from "mysql";

export const db = mysql.createConnection({
  host: "150.158.166.169",
  user: "这里写你真实的用户名",
  password: "这里写你真实的密码",
  database: "这里写你真实的数据库名",
  port: 3306,
});

export const dbInit = () => {
  db.connect();

  /** 如果没有uv表，新建一个 */
  db.query(
    "CREATE TABLE IF NOT EXISTS `uv`(`page` VARCHAR(40) NOT NULL,`time` VARCHAR(40) NOT NULL)ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    (error, results, fields) => {
      if (error) {
        console.error(error);
      }
    }
  );
};
```

### 4.5 请求升级 https

上一步之后就可以请求了，但是接口仍然是基于 http 的请求，于是打算全面升级 https

```javascript
import fs from "fs";
import https from "https";

const privateKey = fs.readFileSync("vanndxh.ltd.key", "utf8");
const certificate = fs.readFileSync("vanndxh.ltd_bundle.crt", "utf8");

const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

const server = httpsServer.listen(8088, function () {
  const host = server.address().address;
  const port = server.address().port;
});
```

### 4.6 实现 sql 语句函数化

由于直接写 sql 语句有点反人类，又因为之前写 go 的时候有现成的工具包，但是 node.js 没有，于是想自己实现一个

其实逻辑很简单，就是写个 class，然后通过链式调用返回自己，最终通过出口函数输出结果，这里又分成了两种思路：

1. 每次链式调用，都生成一部分代码，最终出口只是返回
2. 每次链式调用，都只是收集参数，最终出口函数进行参数处理并返回

我使用的是第二种，因为写起来比较简单，第一种理论上更灵活，但是处理逻辑更复杂，而我其实只是打算学着写一下，并不打算写完善然后开源，所以简单写几个常用的

```javascript
class vsql {
  /** 收集参数 */
  table_name = "";
  value_list = "";
  condition_value = "";
  column_list = "*";

  constructor(table_name) {
    this.table_name = table_name;
  }

  /** 收集参数函数 */
  values = (values) => {
    this.value_list = values.map((i) => `'${i}'`).join(",");
    return this;
  };

  columns = (columns) => {
    const temp = "";
    this.column_list = columns.join(",");
    return this;
  };

  where = (condition_value) => {
    this.condition_value = condition_value;
    return this;
  };

  /** 返回函数（结尾） */
  select = () => {
    let sql = `select ${this.column_list} from ${this.table_name}`;
    if (this.condition_value) {
      sql = sql + `where ${this.condition_value}`;
    }
    return sql;
  };

  insert = () => {
    return `insert into ${this.table_name} values (${this.value_list})`;
  };
}

module.exports = vsql;
```

### 
