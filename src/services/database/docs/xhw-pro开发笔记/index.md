## 1 项目配置

### 1.1 项目创建

准备好`create-react-app`之后，运行下面代码

```bash
npx create-react-app [project-name] --template typescript
```

### 1.2 less module 配置

首先要让.less 可以作为一个 module 导出，在项目中找到`react-app-env.d`文件并进行配置

```typescript
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
```

然后安装 less 相关依赖，直接运行`npm i less less-loader --save-dev`
安装完成后对 less 进行配置，如果是按上方`项目创建`流程创建的项目，可以先直接运行`npm run eject`进行默认配置，完成之后可以在`config`文件夹中找到`webpack.config.js`
在自动生成的 sass 代码后面，仿照写上自己 less 的部分，蓝色部分为需要添加部分

```javascript
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.less$/;


// 搜索sass-loader找到对应位置
{
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: {
        // getLocalIdent: getCSSModuleLocalIdent,
        localIdentName: '[local]_[hash:base64:5]'
      },
    },
    'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
// Adds support for CSS Modules, but using LESS
// using the extension .module.less or .module.less
{
  test: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: {
        // getLocalIdent: getCSSModuleLocalIdent,
        localIdentName: '[local]_[hash:base64:5]'
      },
    },
    'less-loader'
  ),
},
```

如果以上步骤完成后，仍然不行，尝试运行`npm i -D node-sass`，可能是`create-react-app`脚手架缺陷导致

### 1.3 路由配置

这个过程中也会碰到 useHistory import 失败的问题，如果是按照`antd.mobile`中的`TabBar`遇到报错，是因为在最新的 v6 中，语法已经升级，应该如下写

```typescript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const setRouteActive = (value: string) => {
  navigate(value);
};

<TabBar
  safeArea={true}
  activeKey={location.pathname}
  onChange={(value) => setRouteActive(value)}
>
  {tabs.map((item) => (
    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
  ))}
</TabBar>;
```

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/mine" element={<Mine />} />
    <Route path="/mine/author" element={<Author />} />
    <Route path="/mine/setting" element={<Setting />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

简单来说就是

- `history`没有了，取而代之是`navigate`
- `Switch`没有了，取而代之是`Routes`

更多信息查看最新[官方文档](https://reactrouter.com/docs/en/v6)
当然以上写法不太雅观，可以用 react-router v6 最新 api `useRoutes`进行封装，写成配置文件并从外部导入

```tsx
function App() {
  const RouteElement = () => useRoutes(routes as any);

  return (
    <BrowserRouter>
      <RouteElement />
    </BrowserRouter>
  );
}
```

```tsx
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
```

其中，由于在父组件中使用了`useNavigate`等路由钩子函数，会影响路由的匹配，所以最外层/workspace 等路由下不能直接匹配 element，而是要在内层用`path: ""`来匹配“父组件”

### 1.4 alias 配置

如果是按我第一步创建的项目，直接找到`webpack.config.js`（如果没有就`npm run eject`一下），搜索 alias 找到对应代码处，添加即可
`"@": path.resolve(__dirname, '../src')`

### 1.5 node.js 的搭建

#### 安装 express

`npm install express --save`

#### 安装 nodemon

用于接口热更新
安装：`npm install nodemon -g`
使用；`nodemon index.js`（需提前进入对应路径）

#### 准备 services/index.js

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

直接复制，拿去搭建起来即可

#### 解决跨域问题

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

本方法是在请求头中解决跨域，也有其他方法

#### 用 axios 封装接口请求

安装：`npm install axios`
使用：

```typescript
axios.get("http://127.0.0.1:8088/test").then((res: any) => console.log(res));
```

#### 接口模块化封装

把接口处理，和暴露接口分开，子文件为接口处理函数，index.js 只负责接口的暴露以及监听等相关配置

```javascript
/** GET /home/test */
export const getHomeTest = (req, res) => {
  res.send("home ok");
};
```

```javascript
app.get("/home/test", Home.getHomeTest);
```

若出现无法正常 import / export 或无法正常 require 的情况，需先安装 babel-plugin-import
安装：`npm install babel-plugin-import --save-dev`
然后在`package.json`中配置 babel 相关内容

```json
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd"
      }
    ]
  ]
},
```

**以上花里胡哨的方法我好像没成功，最后用了一个奇怪的方法解决了，就是改.js 为.mjs，然后就可以使用 import 等常规 es6 语法了，感觉还挺方便。**

#### 写一个完整的带参接口

> 用 json 模拟数据库

首先把接口处理函数写好，这是具体的接口处理逻辑，包括接受参数以及返回数据

```javascript
import fs from "fs";

/**
 * @file 获取点赞数
 * @type GET
 * @path /mine/setting/likeAmount
 */
export const getLikeAmount = (req, res) => {
  const likeData = JSON.parse(
    fs.readFileSync("./src/services/database/like.json")
  );
  const newLikeData = {
    ...likeData,
    amount: likeData.amount + 1,
  };
  if (req.query.isAdd == 1) {
    fs.writeFileSync(
      "./src/services/database/like.json",
      JSON.stringify(newLikeData)
    );
  }

  res.send({
    code: 200,
    data: req.query.isAdd == 1 ? newLikeData : likeData,
    message: "success",
  });
};
```

第二部就是把这个挂到服务器上，并赋予路径
`app.get('/mine/setting/likeAmount', Mine.getLikeAmount);`
最后，把调用接口的 axios 方法，封装成统一的函数，这样在未来路径或者参数等需要更改时，可以统一修改

```typescript
/** 请求的基础地址 */
axios.defaults.baseURL = "http://localhost:8088";
// 上面这行要放到App.tsx里面，保证任何页面都会经过这行代码

export const getLikeAmount = (isAdd?: boolean) => {
  return axios.get("/mine/setting/likeAmount", { params: { isAdd } });
};
```

最后，在调用的时候，就只需要调用这个`getLikeAmount`函数，并且可以保证，每个地方调用的都是这个函数，为后面统一的修改优化作铺垫。
最后实际调用一下

```typescript
getLikeAmount(true).then((res) => {
  setLikeAmount(res.data.data.amount);
});
```

### 1.6 网站升级 http2


首先要有证书，直接去买服务器的地方（腾讯云/阿里云）申请免费证书，然后下载，解压之后文件夹内有 4 个文件，然后如果服务器装了宝塔面板，直接进入宝塔面板-网站-设置-ssl，在页面内根据提示装入证书即可使用

### 1.7 连接 mysql 数据库

首先安装需要的包，如果是 mysql 数据库，则运行`npm install mysql`
然后准备一个数据库文件，写入连接的配置信息以及初始化函数

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
        console.log(error);
      }
    }
  );
};
```

> 这里补充一下，如果发现数据库连接不上，一定要检查**端口有没有开放**，mysql 的 3306 端口不一定会默认开放的！

然后要做的就是在后端入口文件处，引入`dbInit`并运行，在 api 文件中，引入 db 并操作，示例：

```javascript
/** POST /global/uv 用户访问页面时记录uv */
export const postUv = (req, res) => {
  const page = req?.body?.page || "home";

  db.query(
    `insert into uv values ('${page}', '${new Date().toLocaleString()}')`,
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        res.json({
          code: 200,
          message: "记录用户uv成功",
        });
      }
    }
  );
};
```

这里有一个坑就是 node.js 没有现成的函数式包可以写“人能阅读的”sql 语句，后面可以优化一下

### 1.8 请求升级 https

上一步之后就可以请求了，但是接口仍然是基于 http 的请求，于是打算全面升级 https
首先要做的就是在后端入口文件处，将 https 引入并升级

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

其中，两个文件为你的 ssl 证书相关文件，在升级 http2 的时候用到过，其他应该好理解

这一步做完之后就会发现，本地 postman 已经可以请求了，但是此时浏览器环境请求还是不行，因为浏览器会把我们当成不安全请求/网站，自动进行拦截，报错大概是`ERR_CONNECTION_REFUSED`，这时候可以直接访问某个请求的链接，这时候会提示网站不安全，是否继续，选择信任继续之后，回网站就发现可以正常请求了

但是上述解法不够优雅，不可能要求用户每次都选择信任，所以我们应该把请求 url 改成从 ip 地址改成域名，因为由浏览器自己通过 dns 解析，这样才会被认为是安全的！

### 1.9 eslint 配置

- 安装 eslint `npm install eslint`
- 初始化 `npm exec eslint --init`
- 执行 `npm exec eslint src/*`

若上述步骤能直接成功允许，则完成，否则需要根据错误进行修改，大致思路基本是某类文件无法被正常识别，需要通过配置进行兼容，例如`parser: "@typescript-eslint/parser"`，是为了兼容 ts

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

### 1.10 pre-commit 配置

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

需要注意的是，husky 已破坏性更新，老版本是在上方`package.json`文件中一起配置`husky: {}`，最新的方法是单独配置

1. `npx husky install`手动启用 husky
2. `npx husky add .husky/pre-commit "npm run lint-staged"`生成 husky 配置文件

执行完这一步，根目录会有一个 .husky 目录，后续也可以在这个文件中对其他 git hook 进行配置

### 1.11 webpack迁移rsbuild

[Webpack - Rsbuild](https://rsbuild.dev/zh/guide/migration/webpack)

参考官方迁移文档即可

### 1.12 清理无用依赖

全局安装depcheck

```bash
npm i -g depcheck
```

安装完成后进入项目目录下，然后执行即可

```bash
depcheck .
```

根据返回的列表直接清理即可，若存在missing，则表示是幽灵依赖，建议安装

## 2 网站内容开发

### 2.1 原神模块的搭建

> 这个部分为原神游戏内抽卡界面改版之前获取，改版后无法再通过这种方法获取抽卡接口

首先打开自己游戏内抽卡页面，打开历史记录，重复刷新，直至获取到该页面的链接，在浏览器中打开，打开 f12 调试，在 network 中，找到调用数据的对应接口，可以得到返回结果：

```json
{
  "retcode": 0,
  "message": "OK",
  "data": {
    "page": "3",
    "size": "6",
    "total": "0",
    "list": [
      {
        "uid": "100232514",
        "gacha_type": "301",
        "item_id": "",
        "count": "1",
        "time": "2022-07-13 11:41:47",
        "name": "冷刃",
        "lang": "zh-cn",
        "item_type": "武器",
        "rank_type": "3",
        "id": "1657681560143666714"
      },
    ],
    "region": "cn_gf01"
  }
}
```

到这里思路就很清晰了，list 就是我们要找的东西，下面就是要找出如何根据一个链接，找到对应的无数个页面的请求链接，在对比历史记录链接和抽卡请求链接之间的区别之后可以发现，其实大部分参数都是一样的，只有首尾需要更改

- `page`当前页数
- `size`一页的条数，max = 20
- `end_id`上一页数据最后一条的 id，实测根据这个来取后一页数据，default = ""

大致思路总结一下就是，初始 end_id 是""，页数是 1，用 setInterval 进行间断请求，第一次的时候直接请求，数据暂存之后，把 end_id 替换成最后一条的 id，然后进行下一条，直到请求不到数据之后，清除这个 interval，循环结束，请求结束。完善功能至 3 个池子并新增统计功能，结果如下

### 2.2 图表绘制

目前体验下来，感觉[recharts](https://recharts.org/en-US/)体验最好，是类组件式开发，用起来很舒服

![image.png](https://cdn.nlark.com/yuque/0/2022/png/25537391/1662602934582-8eb7c4c9-fef2-4f2f-ac9c-cca47422e471.png#averageHue=%23f8f8f8&clientId=ufead14ca-ee20-4&from=paste&height=159&id=SqKnY&originHeight=318&originWidth=1086&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79954&status=done&style=none&taskId=u1cfa374f-feae-48bc-aab9-d34387077bc&title=&width=543)

### 2.3 实现 sql 语句函数化

由于直接写 sql 语句有点反人类，又因为之前写 go 的时候有现成的工具包，但是 node.js 居然没有（应该是我我没有找到），于是只能自己手撕...

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

### 2.4 移动/pc 双端自动分流

在 navigator 中获取到用户设备信息，然后对关键词进行判断，用正则表达式进行 match

```tsx
const isMobile = /mobile|android|iphone|ipad|phone/i.test(
  window.navigator.userAgent.toLowerCase()
);
```

### 2.5 毛玻璃效果组件封装


一直感觉毛玻璃效果很好看，于是决定封成一个组件，方便项目中使用，主要实现就是依靠`backdrop-filter`效果，来个最简单的例子

```css
.eg {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
}
```

其中，background 生成白底，用 rgba 来改变透明效果，模糊度用 backdrop-filter 来改变

```tsx
import React from "react";

interface Props {
  /** 内部内容 */
  children?: React.ReactNode;
  /** 宽度 */
  width?: string;
  /** 高度 */
  height?: string;
  /** 背景模糊度: default 8 */
  blurDegree?: number;
  /** 圆角度: default 0 */
  borderRadius?: number;
  /**
   * 白底透明度: 0-完成透明 1-完全白底（可以当正常card用）
   */
  bgOpacity?: number;
}

function TransparentCard(props: Props) {
  const { children, width, height, blurDegree, borderRadius, bgOpacity } =
    props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: width ? width : "auto",
        height: height ? height : "auto",
        backdropFilter: blurDegree ? `blur(${blurDegree}px)` : "blur(8px)",
        borderRadius: borderRadius ? `${borderRadius}px` : "0",
        background:
          bgOpacity || bgOpacity === 0
            ? `rgba(255, 255, 255, ${bgOpacity})`
            : `rgba(255, 255, 255, 0.5)`,
      }}
    >
      {children}
    </div>
  );
}

export default TransparentCard;
```

组件封完之后可以当成 div 使用，在合适的场合比 div 好看
使用样例 ⬇️

```tsx
<TransparentCard
  width="40%"
  height="70px"
  borderRadius={16}
  bgOpacity={0.1}
  blurDegree={3}
>
  1
</TransparentCard>
```

### 2.6 闪光动态进度条组件

```tsx
.my-progress-bar {
  .bar-container {
    width: 100%;
    height: 100%;
    min-height: 12px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 25px;
    position: relative;
    .bar-fill {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 25px;
      transition: width 0.6s ease;
      text-align: right;
      line-height: 30px;
    }
    .bar-fill::after {
      position: absolute;
      top: 50%;
      right: 2px;
      transform: translateY(-50%);
      content: '';
      width: 0;
      height: 0;
      z-index: 999;
      opacity: 0.6;
      animation: flickering 2s ease-in-out infinite;
    }
  }
}

@keyframes flickering {
  0% {
    box-shadow: 0 0 15px 5px #fff;
  }
  50% {
    box-shadow: 0 0 15px 7px #fff;
  }
  100% {
    box-shadow: 0 0 15px 5px #fff;
  }
}

```

## 3 项目工程化

### 3.1 部署前端资源到服务器

我使用的宝塔面板，首先找到文件目录，在里面上传本地`yarn build`的产物，随后进入配置页面，将刚刚上传的 build 文件，以入口形式绑定至网站，处理完备案等操作即可正常访问

### 3.2 hbuilder 打包

#### 常规方案

软件内先创建一个项目，5+空项目，删除初始文件，保留 unpackage 和 manifest.json，将 yarn build 生成的文件放到新项目目录下，点击生成即可（需有账号且手机验证

#### 取巧方案

首先用 hbuilder 创建一个 uni-app，在生成的空项目中把主页改成一个 iframe，占满全屏，然后直接把我们的网站地址嵌入进去，这样本质就是软件内置浏览器，这样的好处是可以不用重复打包，只要发布到服务器就自动更新到软件。

### 3.3 pm2 实现后端快速部署服务器

**pm2 是干什么的？**

正常的服务（例如在本地跑起来的），会在关闭终端之后关闭，而 pm2 的作用就是，让这些服务持久运行，快速实现部署，如果服务器安装了宝塔面板，直接打开商店进行安装

安装完之后，用终端或者图形操作，进入**后端入口文件**，进入之后，用终端执行`pm2 start index.js`，其中，index.js 为你的后端入口文件名+后缀

这步完成之后，控制台会返回你这个操作消耗的内存以及 cpu，一般不会很大，然后就可以去测试一下接口能否成功调用

> 还是提醒一下，一定一定要放开端口，后端端口一般是自定义的，要放开宝塔+服务器两处

但是这个时候网页端还是不能访问的，会报错，这是因为网站主体已经升级了 https，所以不允许有 http 的请求出现

**解决方案**

- 方案一：将请求也升级到 https，参见上文升级过程
- 方案二：使网站兼容 http 请求，参考下方代码

```html
<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>
```

### 3.4 数据流升级

把小游戏部分升级数据流方案至 valtio 统一管理

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
