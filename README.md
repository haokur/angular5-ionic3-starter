
> 有时候,你不必等到准备好一切才出发.

## 开始

- 安装依赖环境

```
npm install -g ionic
npm install -g cordova
```

- 本地运行

```
git clone https://github.com/haokur/ng5-ionic3-starter
npm install 
npm start
```

- 打包android

```
# 1.打包源代码
npm run build --prod

# 2.添加安卓平台
ionic cordova platform add android

# 3.生成 keystore 文件
# keytool -genkey -v -keystore [要生成的 keystore 名字] -alias [别名] -keyalg RSA -keysize 2048 -validity 10000

keytool -genkey -v -keystore haokur-ionic.keystore -alias haokur-ionic -keyalg RSA -keysize 2048 -validity 10000

# 一直下一步直到生成 haokur-ionic.keystore , 记住其中输入的密码(示例密码为: haokur )

# 4.打包安卓 app
cordova build android --release

# 5.用生成的 keystore 进行签名
# jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore [生成的 keystore 名字] [--release 打包后的 android 包的目录] [生成 keystore 时用到的别名]

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore haokur-ionic.keystore ./platforms/android/build/outputs/apk/android-release-unsigned.apk haokur-ionic

# 6.zipalign 压缩和优化 APK (zipalign 文件已经放到根目录)
# ./zipalign -v 4 [签名后的 apk 文件] [要生成的 app 名字]

zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk MyApp.apk

```

[android app 示例下载地址](https://www.pgyer.com/JrSn)

- 打包 ios
```
cordova platform add ios

cordova build ios

# xcode 打开 platforms/ios/MyApp.xcodeproj
# archive ......(略
```

## 预览
![预览图1](https://raw.githubusercontent.com/haokur/static/master/angular5-ionic3-starter/screenshots/demo1.png)

<!-- https://raw.githubusercontent.com/haokur/static/master/angular5-ionic3-starter/css/main.css -->

## 项目概览

- 目录结构
```
.
├── docs
├── platforms
├── plugins
├── resources
├── src
│   ├── app                              
│   ├── assets                            # 静态资源目录  
│   ├── components                        # 公用组件      
│   ├── config                            # 全局配置,ionic 表现全局配置,http 请求配置等
│   ├── directives                        # 公用指令
│   ├── mock                              # 数据模拟服务
│   ├── pages                             # 主要工作目录
│   │   ├── haokur                        # 按用户分模块文件夹(用户1)
│   │   │    ├── test
│   │   │    │     ├── test.html          # 模板
│   │   │    │     ├── test.scss          # 样式
│   │   │    │     └── test.ts            # 逻辑
│   │   │    └── haokur.module.ts         # 用户1所有模块集合 
│   │   │  
│   │   ├── someone                       # 用户2
│   │   │    ├── home
│   │   │    │     ├── home.html          # 模板
│   │   │    │     ├── home.scss          # 样式
│   │   │    │     └── home.ts            # 逻辑
│   │   │    └── haokur.module.ts         # 用户2所有模块集合    
│   ├── pipes                             # 公用过滤器
│   ├── providers                         # 公用服务   
│   ├── store                             # 全局状态管理
│   ├── theme
│   ├── utils                             # 工具方法
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── www                                    
├── appbuild.py                           # 部分可用
├── config.xml                            # cordova 打包配置文件
├── haokur-ionic.keystore                 # android 打包使用 keystore
├── ionic.config.json                     # ionic 配置,可以配置代理等
└── zipalign                              # zipalign 压缩和优化 android 打包
```

## 码代码

- 命令行工具使用

```
node g page test   # 在 src/pages/[用户] 下生成一个 test 页面,首次使用会需要输入用户名(English)初始化配置
```

- 继承 HaokurBasePage 的基本使用
> 基于 ionic 上层扩展,代理 ionic 部分生命周期,方便不同页面切换同样操作的统一切入

```javascript

// 视图首次载入执行(仅执行一次)
pageLoad(){}

// 视图每次 Active 时执行
pageEnter(){}

// 视图卸载前执行(定时器清理等)
pageUnload(){}

/**
 * 其他工具方法
 */
// 普通弹窗,仅确认按钮
this.alert('弹窗内容')

// 确认弹窗, 取消+确认
this.confirm()
  .then(()=>{console.log('确认')})
  .catch(()=>{console.log('取消')})

// 气泡提示信息
this.toast('气泡提示内容');

// 底部 actionSheet
this.action('可选项',[
  {
    text:'可选项1',
    handler:()=>{console.log('可选项1被点击')}
  }
])
```

- http 请求使用
> **src/providers/api.services.ts** 引入 Apiservice,  依赖 **src/config/constants.ts** 定义的请求的基本地址和 **/ionic.config.json** 的代理配置
  - 引入 ApiService
```javascript
import { ApiService } from '../../../providers/api.service';
constructor(
  private api:ApiService
){

}
```
  - 请求根地址配置 (constants.ts)
```javascript
if (ENV === 'devlopment') {
  api_root = "https://dev.com";
}
else if (ENV === 'production') {
  api_root = "https://prod.com";
}
export const API_ROOT = api_root
```

  - 代理配置 (ionic.config.json)
```javascript
"proxies": [
  {
    "path": "/zhi",
    "proxyUrl": "https://xxx.com/api/"
  }
],
```
```javascript
// get 请求,根据配置信息拼接请求地址
this.api.get({
  act:'test',
  page:1, // 其他参数
})
.then(res=>{
  console.log('成功返回',res)
})
.catch(err=>{
  console.log('请求失败')
})
// 以上完整的 get 请求地址为 https://dev.com/test?page=1

// 或传入完整地址
this.api.get({
  act:'https://something.com/test',
  page:1, // 其他参数
})
.then(res=>{
  console.log('成功返回',res)
})
.catch(err=>{
  console.log('请求失败')
})
// 以上完整的 get 请求地址为 https://something.com/test?page=1

// post 同上
this.api.post({act:'test'})
```

- 图片选择裁剪上传服务 (src/providers/img.service.ts)
```ts
// 一条龙(action 选择图片类型 + 裁剪 + 上传)
this.imgService.packAllProcess({
  maximumImagesCount: 1,
  quality: 25,
}, (tempUrl, type) => {
  // 选择图片,裁剪图片都会有回调
  console.log(tempUrl, type)
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// 自由拆开组装
// 如: 选择多张 + 提交
this.imgService.pick('album',{
  maximumImagesCount: 5,
})
  .then(tempUrls=>{
    return this.imgService.uploadImgs(tempUrls,{},res=>{
      console.log('单张图片上传完成回调');
    })
  })
  .then(res=>{
    console.log('全部上传完成');
  })
```

- qq,微博,微信登录和分享 (src/providers/social.service.ts)
```ts
// 三端分享统一配置,略微差别
var shareConfig = {
  url: 'http://qunen.kuaimacode.com/wap/', // 必选 分享的链接地址
  title: '这个是 Cordova QQ 新闻分享的标题', // 必选 分享的标题 
  description: '这个是 Cordova QQ 新闻分享的描述', // 必选 分享的描述
  image: 'https://cordova.apache.org/static/img/cordova_bot.png', // 必选 分享的图片
  scene = 1, // 微信可选 0=>好友(默认),1=>朋友圈
  media_type:Wechat.Type.LINK, // 微信可选
}
// type 为平台: qq, wechat,weibo , shareConfig 为分享配置
this.socialService.share(type, shareConfig)
  .then(res => {
    this.successCallback()
  })
  .catch(err => {
    this.failCallback(err)
  })

// 三端的登录
this.socialService.loginByWeibo().then(res=>{});
this.socialService.loginByQQ().then(res=>{});
this.socialService.loginByWechat().then(res=>{});
```

- 页面级(pages 目录下)基本知识

  - 基本结构
```ts
@Component({
  selector:'page-example',     //  扩展的 html 的标签名字,页面只是相对较大的组件
  templateUrl: 'example.html', // 引入的 html 模板
})

export class ExamplePage {

}
```

  - html 中常用
```html
<!-- 循环 -->
<ul>
  <li *ngFor="let item of list;let i = index;">索引{{index}}-内容{{item}}</li>
</ul>

<!-- 判断 -->
<!-- ts中 this.showFlag=true -->
<div *ngIf="showFlag">showFlag为true才显示的内容</div>

<!-- 事件绑定 -->
<button (click)="doSomething()">点击事件</button>

<!-- 属性传递 -->
<!-- ts中 this.imgUrl='http://img.com/2.jpg'; this.helloWorldInfo={'name':'xx'} -->
<img [src]="'http://img.com/1.jpg'">
<img [src]="imgUrl">
<hello-world [info]="helloWorldInfo"></hello-world>
<div [ngClass]="{'active':true}"></div>

```

- 等等等


## 测试api

- [知乎日报api](https://github.com/izzyleung/ZhihuDailyPurify/wiki/知乎日报-API-分析)
- [拿着api去玩](http://gank.io/api)

## 环境

- angular 5.0.0
- ionic 3.9.2
- cordova 7.1.0
