#coding:utf-8
#ionic项目打包app自动化程序

import sys
import os
import time

# 自动输入密码交互
import pexpect

app_name = 'MyApp'
apk_name = 'MyApp'
android_key_name = 'haokur-ionic.keystore' # keystore 的名字
jarsigner_password = 'haokur'  # 生成 keystore 时输入的密码
project_dir = '~/code/ng5-ionic3-starter'

# 打印信息
def printStep(str):
    print "\033[1;37;43m '%s' \033[0m!" % str

#源代码webpack打包(web版)
def buildWeb():
    build_commond = 'npm run build --prod'
    # print sys.argv
    # print sys.argv[2]
    # 如果第三个参数等于--skipweb,则跳过webpack打包
    if len(sys.argv)>2 and sys.argv[2]=='--skipweb':
        printStep('直接跳过webpack打包')
    else:
        if os.system(build_commond)==0:
            printStep('webpack打包源代码成功')

#打包安卓
def buildAndroid():
    cordova_build_commond = 'cordova build android --release'
    zipalign_commond = './zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk '+apk_name+'.apk'
    rm_origin_commond = 'rm '+apk_name+'.apk'

    if os.system(cordova_build_commond)==0:
        printStep('安卓打包成功')
    os.system(zipalign_commond)
    os.system(rm_origin_commond)

    child = pexpect.spawn('jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore '+android_key_name+' platforms/android/build/outputs/apk/android-release-unsigned.apk '+apk_name)

    child.expect('输入密钥库的密码短语:')
    child.sendline (jarsigner_password)
    child.interact()

    # 等待签名完成
    time.sleep(4)
    printStep('签名完毕开始接着执行')
    if os.system(rm_origin_commond)==0:
        printStep('----------------------------------删除原打包文件完成!!----------------------------------')
    if os.system(zipalign_commond)==0:
        printStep('----------------------------------app打包完成!!----------------------------------')

    notify_commond = "osascript -e 'display notification \"安卓打包成功\" with title \"cordova\"'"
    os.system(notify_commond)


#打包ios
def buildIos():
    ios_build_commond = 'cordova build ios'
    ios_open_xcode = 'open '+project_dir+'/platforms/ios/'+app_name+'.xcodeproj'
    print ios_open_xcode
    if os.system(ios_build_commond) == 0:
        printStep('打开xcode打包ios')
        if os.system(ios_open_xcode) == 0:
            printStep('打开xcode成功')

# 打包平台,默认为两个平台都打包
platform = 'all'

#不管何种打包,至少打包web版
buildWeb()

# 第二个参数为打包平台
if len(sys.argv)>1:
    platform = sys.argv[1]

if platform=='android':
    buildAndroid()
elif platform=='ios':
    buildIos()
else:
    buildAndroid()
    buildIos()

