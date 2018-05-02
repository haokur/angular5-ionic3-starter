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

## 预览
![预览图1](https://raw.githubusercontent.com/haokur/static/master/angular5-ionic3-starter/screenshots/demo1.png)

<!-- https://raw.githubusercontent.com/haokur/static/master/angular5-ionic3-starter/css/main.css -->

## 测试api

- [知乎日报api](https://github.com/izzyleung/ZhihuDailyPurify/wiki/知乎日报-API-分析)
- [拿着api去玩](http://gank.io/api)

## 环境

- angular 5.0.0
- ionic 3.9.2
- cordova 7.1.0
