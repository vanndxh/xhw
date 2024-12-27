## 环境准备

### node/npm

[官网](http://nodejs.cn)直接下载所需要的版本即可

### yarn

yarn === npm i

```bash
# 直接全局安装
npm i yarn -g

# 查看npm安装的所有包
npm list -g [--depth 0]
```

若为 mac，还需配置以下

```bash
# 这条代码为npm路径，若因为其他原因可新增/修改此行如下
export PATH=/ ... 找到对应npm的路径 ... /bin:$PATH
```

### pnpm

```bash
# 安装
npm i -g pnpm

# 配置国内镜像
pnpm config set registry https://registry.npmmirror.com
```

### git

win 可以直接下载包然后安装
mac 版 git 理论上需要安装 homebrew 等三方平台后才能下载，[homebrew 官网](https://brew.sh/)下载完 brew 后可直接安装 git

```bash
# 安装brew（这步会很麻烦，如果失败多试几次）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# 安装git
brew install git
```

brew 如果无法正常下载，也可以通过别的设备隔空投送，效果一样
又或者在终端直接输入 git，mac 会自动提示 git 安装，直接安装即可
在使用之前 git 还需要配置 ssh，参考下方详情

### nvm

nvm 是一个 node.js 版本管理工具，可以按需安装

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

若为 mac 系统，完成之后会导致 zsh 文件错乱，需要覆盖源文件
个人文件夹下找到隐藏文件.zshrc，用文本编辑器打开，第一行用以下代码覆盖

```bash
export PATH=/opt/homebrew/bin:$PATH
# 这条代码为npm路径，若因为其他原因可新增/修改此行如下
export PATH=/ ... 找到对应npm的路径 ... /bin:$PATH
```

### create-react-app

创建 react 项目所需

```bash
# 安装create-react-app
npm i -g create-react-app

# 使用create-react-app创建项目，其中[--template typescript]为是否tsx文件的选项
npx create-react-app project-name [--template typescript]
```

### [mac] .Ds_Store 的解决

```bash
# 列出所有文件
ls -a

# 删除
rm -rf .Ds_Store

# 删除之前电脑内所有的
sudo find / -name ".DS_Store" -depth -exec rm {} \

# 禁止之后再生成
defaults write com.apple.finder AppleShowAllFiles FALSE;killall Finder

# 重新允许生成
defaults write com.apple.finder AppleShowAllFiles TRUE
defaults delete com.apple.desktopservices DSDontWriteNetworkStores
```

## 开发工具配置 - VsCode

### 插件推荐

- `Auto Rename Tag`当修改左半 tag 时自动修改右半 tag，webstorm 自带功能
- `Code Runner`在线运行 js 等多种语言代码
- `Error Lens`把报错直接显示在行末，方便修改
- `Git History`展示 git 历史记录，对比历史文件等等功能
- `Git Lens`标注当前行的 git 信息
- `Material Icon Theme`改 icon 用的，能好看点
- `Path Intellisense`路径自动填充
- `Prettier - Code formatter`代码格式化
- `TODO Highlight`高亮`TODO:`方便定位修改
- `TONGYI Lingma`不用 copilot 怎么写代码啊

### 自动保存

搜索 autosave -- 修改选项如下

- auto save 时机：afterDelay
- auto save delay：500

### terminal 优化

#### mac

安装参考[oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) github 官网，或者直接运行下面这行代码

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**如何配置 zsh terminal 全局快捷键？**

找到个人文件夹，找到.zshrc 文件进行配置，-g 为全局可选项

如果发现 zsh 莫名其妙崩了，就是 zsh 自动更新刷新了配置文件，执行下面代码

```bash
# 把 ~/.npm-global/bin 加到 PATH
$ echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
$ source ~/.zshrc
```

#### windows

当使用 git bash 作为 terminal 时，可以在 c\user\username\下可以找到.bash_profile，编辑即可完成快捷键

```
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
```

若使用 powershell，则需要先解锁权限，否则 powershell 会因为默认为严格模式不能执行自定义命令

可以使用`get-executionpolicy`查看当前状态，随后以管理员身份打开，运行`set-executionpolicy remotesigned`

### 切分支后代码报错

用`ctrl + shift + p`组合键打开快捷操作，输入 reload window 搜索，并点击设置进行配置

然后就可以使用`command + r`进行刷新，不用重新加载整个项目或重启 vs

### 代码片段


左下角设置 - User Snippets，菜单里可以选择之前已经有的/新建新的代码片段文件

从上到下分别为`已有当前项目`、`已有全局`、`新建全局`、`新建当前项目`，打开/新建文件之后，可以在对象中进行编辑

```javascript
"灰边css": {
  "prefix": "moshou.grayborder",
  "body": ["border: 1px solid rgba(0, 0, 0, 0.1$0);"]
}
```

其中 prefix 为触发该片段的代码可自定义，body 为替换的代码，$0 为初始光标位置，若存在$1（2...数字依次递增），则可用 tab 键依次遍历这些光标位置，如上方代码所示，结束后光标处于 0.1 后面，方便快速修改透明度，这个功能通常用来修改模板之间不同的地方
下面是我个人使用的备份

```javascript
{
  "rfc": {
    "prefix": "moshou.rfc",
    "body": [
      "import React from 'react';",
      "import styles from './index.module.less';",
      "function $0() {",
      "return <div className={styles['']}></div>;",
      "}",
      "export default $0;"
    ]
  }
}
```

### 完整 json 配置

```json
{
  /**
   * 看的懂且觉得有必要
   */
  "workbench.startupEditor": "none", // 打开空项目时不展示任何东西
  "files.autoSave": "onFocusChange", // 自动保存
  "editor.formatOnSave": true, // 保存时格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 用prettier保存
  // 修改注释颜色
  "editor.tokenColorCustomizations": {
    "comments": {
      "fontStyle": "bold",
      "foreground": "#70c394"
    }
  },
  "editor.fontSize": 15, // code字号
  "workbench.iconTheme": "material-icon-theme", // 修改icon样式
  "editor.tabSize": 2, // tab占2格
  "editor.minimap.enabled": true, // 打开右侧小地图（虽然本来就打开
  // @路径提示
  "path-intellisense.mappings": {
    "@": "${workspaceRoot}/src"
  },
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true, // 函数前面加个空格
  "editor.fontFamily": "Monaco, 'Courier New', monospace, Meslo LG M for Powerline", // 改字体
  /**
   * 其他配置
   */
  "git.confirmSync": false, // git同步代码仓库时不需确认
  "git.enableSmartCommit": true, // 当没有stage时，gc自动提交所有change
  "explorer.confirmDelete": false,
  "typescript.updateImportsOnFileMove.enabled": "prompt", // 当文件路径改变时提示
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  }
}
```

```json
{
  /**
   * 看的懂且觉得有必要
   */
  "workbench.startupEditor": "none", // 打开空项目时不展示任何东西
  "files.autoSave": "onFocusChange", // 自动保存
  "editor.formatOnSave": true, // 保存时格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 用prettier保存
  // 修改注释颜色
  "editor.tokenColorCustomizations": {
    "comments": {
      "fontStyle": "bold",
      "foreground": "#70c394"
    }
  },
  "editor.fontSize": 15, // code字号
  "workbench.iconTheme": "material-icon-theme", // 修改icon样式
  "editor.tabSize": 2, // tab占2格
  "editor.minimap.enabled": true, // 打开右侧小地图（虽然本来就打开
  // @路径提示
  "path-intellisense.mappings": {
    "@": "${workspaceRoot}/src"
  },
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true, // 函数前面加个空格
  "editor.fontFamily": "Monaco, 'Courier New', monospace, Meslo LG M for Powerline", // 改字体
  /**
   * 其他配置
   */
  "git.confirmSync": false, // git同步代码仓库时不需确认
  "git.enableSmartCommit": true, // 当没有stage时，gc自动提交所有change
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  "extensions.ignoreRecommendations": false,
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  // 配置文件类型识别
  "files.associations": {
    "*.js": "javascript",
    "*.json": "jsonc",
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "files.exclude": {
    "**/.DS_Store": true,
    "**/.git": true,
    "**/.hg": true,
    "**/.svn": true,
    "**/CVS": true,
    "**/node_modules": false,
    "**/tmp": true
  },
  "typescript.updateImportsOnFileMove.enabled": "prompt", // 当文件路径改变时提示
  "debug.console.fontSize": 14,
  "vsicons.projectDetection.autoReload": true,
  "vsicons.dontShowNewVersionMessage": true,
  "editor.tabCompletion": "on",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "vetur.ignoreProjectWarning": true,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "javascript.format.semicolons": "insert",
  "prettier.bracketSameLine": true,
  "prettier.singleQuote": false,
  "emmet.extensionsPath": [""],
  "emmet.triggerExpansionOnTab": true,
  "emmet.showAbbreviationSuggestions": true,
  "emmet.includeLanguages": {
    // jsx的提示
    "javascript": "javascriptreact",
    "vue-html": "html",
    "vue": "html",
    "wxml": "html"
  },
  "security.workspace.trust.untrustedFiles": "open",
  "git.ignoreMissingGitWarning": true,
  "eslint.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true,
  "eslint.quiet": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "launch": {
    "configurations": [],
    "compounds": []
  },
  "diffEditor.ignoreTrimWhitespace": false,
  "tabnine.experimentalAutoImports": true,
  "json.schemas": []
}
```

## git 配置 ssh

### 检查现有的 ssh 密钥

Windows 打开 GitBash，Linux 下打开终端，输入：

```
$ ls -al ~/.ssh
```

如果你看到以下输出，那么说明你已经有 ssh 密钥（以 .pub 结尾的文件）：

```
$ ls -al ~/.ssh
total 26
drwxr-xr-x 1 197121    0 Mar 31 22:29 ./
drwxr-xr-x 1 197121    0 Apr 16 23:36 ../
-rw-r--r-- 1 197121 2610 Mar 31 22:27 id_rsa
-rw-r--r-- 1 197121  573 Mar 31 22:27 id_rsa.pub
-rw-r--r-- 1 197121  831 Apr  1 12:08 known_hosts
-rw-r--r-- 1 197121   92 Mar 31 22:26 known_hosts.old
```

如果你不想用原来的密钥或者没有密钥的话也不用着急，看下一步如何生成新的 ssh 密钥。

### 创建新的 ssh 密钥

#### 生成新的 ssh 密钥

在 Windows 的 GitBash 或 Linux 终端输入：

```
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# 你可以把引号里的替换为你自己的邮箱，不换的话问题不大
```

然后终端会让你输入一些东西，可以不用输入直接一路回车，看到：

```
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /root/.ssh/id_rsa
Your public key has been saved in /root/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:t3925EJgD4kcUp69dBv/nqkM85n0I5mFRW4BlZwaVeo your_email@example.com
The key's randomart image is:
+---[RSA 4096]----+
|             .=o=|
|          .  . B |
|         o +  * .|
|        . * =oo+ |
|        So.B +A+ |
|         .o.B.o.o|
|          .o o+o.|
|           .*+B.*|
|            .OoBo|
+----[SHA256]-----+
```

代表密钥生成成功。

#### 将 SSH 密钥添加到 ssh-agent

终端输入：

```
$ eval
$ ssh-agent -s
```

看到如下输出：

```
SSH_AUTH_SOCK=/tmp/ssh-xkZRdf3bu6fW/agent.1075848; export SSH_AUTH_SOCK;
SSH_AGENT_PID=1075849; export SSH_AGENT_PID;
echo Agent pid 1075849;
```

代表 ssh 正常运行。
执行以下两条命令：

```
$ ssh-agent bash
$ ssh-add ~/.ssh/id_rsa # 这里如果文件名被改过要写你自己定义的文件名
```

看到输出：

```
Identity added: id_rsa (your_email@example.com)
```

添加成功！

### 将密钥添加到 github 账户

#### 复制你的公钥

在终端使用(或者直接去目录下打开文件

```
$ cat ~/.ssh/id_rsa.pub
```

看到：

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDJ6c4cXmpyJr/anagkKz4K+RCFYSJlkFvdNY6JBmKeomrQYfChpDZFxjUkj72XfSAhGyJjPcn4pTHHLCHOS2jzstrvE0Cq19p/mbbvwsq5GGqmzsTYqOeqpTIeEKnXlv/PXkh/mXJVOWhui8esIQk4bU1Ss2wIEVMSRI+9n8RgyBcpbiq4m/SDrUy1HJNHO3pyjcf7k6XUjfxeTRWMVtj7IH3yQbgrZQo90VHsVhkmTeyvaCv8tJLi/j+t9E1/kOWPbpTFTmaAe190SuPVwpQjyRH/Z8UWVdCYxgeZ9l9JN3MTyHfRWz6FuDJdoQze94mU1NwEP8AftHNVTsMT2qvbAYK3Mcr6/j1R1vAeq4mbgn1dp79RGW0cKOSx336WuFsfebMV7QLZ1RnW5xF6VgghMd4x9Hk8kmLL6s8I7ZfbjNCgyAhL9d5N01lsz8hdMv1BHzaZp+yk0EXUy8fxFvaSYaUpQuKb8eL6DesBJJ8FH4GVb6+V7J7OsXhG8QiKdDsDbfGDJs/Aq0Ew14cuHlD9y/1A44b+Kt6WwmcISGG85SM+YUcPuay8gEFzNQ/Tzgw4bJznw0RHHVuvtpmjvlBUxXRTSICvrrAJ19/yXoHcZtiPncpDHVnyIy6IVAg23MCeUbrIPIPKQXVHG/5ouRk0YbkFbl6kSq/Yurb35N7tDQ== your_email@example.com
```

全给复制下来！

#### 将公钥添加到 github 账户

然后去 gihub：

- 右上角下拉面板选择 **Settings**；
- 左侧选择 **SSH and GPG keys**；
- 点击 **New SSH key**；
- 随便起一个 title；
- 把公钥粘贴到下面。

可能会输入密码，添加完成！

### 测试 ssh 连接

在终端中输入：

```
$ ssh -T git@github.com
```

可能看到如下警告：

```
The authenticity of host 'github.com (20.205.243.166)' can't be established.
ECDSA key fingerprint is SHA256:p2QAMXNIC1TJYWeIOttrVc98/R1BUFWu3/LiyKgUfQM.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

输入 yes：

```
Warning: Permanently added 'github.com,20.205.243.166' (ECDSA) to the list of known hosts.
Hi xxxxxx You've successfully authenticated, but GitHub does not provide shell access.
```

如果 xxxxxx 是你的 github 用户名，说明成功。
