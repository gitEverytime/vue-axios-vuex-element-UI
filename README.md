# 1

>

## Build Setup

``` bash
# 技术栈（vue2+webpack2+axios+Element UI+node）:运营管理系统
# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev=>pm2 start build/dev-server.js

# build for production with minification
npm run build=>node build/build.js

# build for production and view the bundle analyzer report

# node.js 前端代码部署

npm run build --report
# 官方提供的vue-cli
# axios设置拦截
# vue router前端登录拦截
# nodejs 服务端前端页面端口监听，接口地址代理设置 ，应用pm2 node进程管理不死监控
运行方法：
#clone代码后 ，npm install ，下载node包，本地运行 npm run dev , 生产运行，先本地npm run build生成dist文件，
#本地的server.js文件配置线上监听的端口号，以及接口地址的代理配置，端口号服务的项目代理到dist文件名即可
#然后在服务器上安装node包，配置node环境，分别下载项目node环境依赖的三个包：pm2，express, webpack-hot-middleware,然后运行
#node命令：pm2 start server.js,就可以线上启动前端的项目了。
#
#  ******     ***                   ***      ***********
#  *             *                   *       *         *
#  *              *                 *        *         *
#  *               *      ***      *         ***********
#  *******          *    *   *    *                    *
#  *                 *   *   *   *                     *
#  *                  *  *   *  *                      *
#  *                   * *   * *                       *
#  *                    *     *                        *

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



