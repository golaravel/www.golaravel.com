# Laravel中文网网站源码

Laravel中文网：[www.golaravel.com](www.golaravel.com)

# 搭建本地开发/运行环境

## 下载并安装nodejs

下载地址： [Node.js](http://nodejs.org)

## 安装Grunt

从开始菜单启动 `Node.js command prompt`，输入如下命令安装Grunt：

```
npm install -g grunt-cli
```

## 下载源码

使用git命令行或图形界面工具clone源码到本地开发环境。

在命令行中输入如下指令：

```
git clone https://github.com/golaravel/www.golaravel.com
git submodule update --init
```

## 完成环境部署

在命令行中使用`cd` 指令进入源码所在目录，然后执行如下命令完成环境部署：

```
npm install
```

## 编译静态网站

在命令行中执行如下指令：

```
grunt
```

Grunt会根据脚本自动完成网站编译，编译好的静态网站存放在 `_site/` 目录内。

## 浏览本地网站

在命令行中执行如下指令：

```
grunt connect
```

将会启动一个简易的http服务器并监听 `9000` 端口。现在就可以打开你的浏览器并输入以下网站：

```
localhost:9000
```

是否看到网站首页？
