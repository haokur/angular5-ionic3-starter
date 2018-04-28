// 社会化第三方: (微信,qq,微博)分享+登录

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiService } from './api.service';
declare var QQSDK, Wechat, WeixinJSBridge, cordova, WeiboSDK;

@Injectable()
export class SocialService {

  /**
   * 分享统一配置
   * {
   *  url: 'http://qunen.kuaimacode.com/wap/', // 必选
   *  title: '这个是 Cordova QQ 新闻分享的标题', // 必选
   *  description: '这个是 Cordova QQ 新闻分享的描述', // 必选
   *  image: 'https://cordova.apache.org/static/img/cordova_bot.png' // 必选
   *  scene = 1, // 微信可选 0=>好友(默认),1=>朋友圈
   *  media_type:Wechat.Type.LINK, // 微信可选
   * }
   * 
   */

  constructor(
    private api: ApiService,
  ) {
  }

  // 登陆
  public login(type) {
    if (type === 'qq') {
      return this.loginByQQ();
    }
    else if (type === 'wechat') {
      return this.loginByWechat();
    }
    else if (type === 'weibo') {
      return this.loginByWeibo();
    }
    else {
      return new Promise((resolve, reject) => { })
    }
  }

  // 分享
  public share(type, shareConfig = {}) {
    if (type === 'qq') {
      return this.shareByQQ(shareConfig);
    }
    else if (type === 'wechat') {
      return this.shareByWechat(shareConfig);
    }
    else if (type === 'weibo') {
      return this.shareByWeibo(shareConfig);
    }
    else {
      return new Promise((resolve, reject) => { })
    }
  }

  // qq登陆
  public loginByQQ(args = {}) {
    // qq登录默认配置
    let qqClientOptions = {
      client: QQSDK.ClientType.QQ,
    };
    let _qqLoginOptions = this.api.copy(qqClientOptions)
    Object.assign(_qqLoginOptions, args)
    return new Promise((resolve, reject) => {
      QQSDK.ssoLogin(function (result) {
        resolve(result);
      }, function (failReason) {
        reject(failReason);
      }, _qqLoginOptions);
    })
  }

  // 微信登陆
  public loginByWechat() {
    let scope = "snsapi_userinfo";
    let state = "_" + (+new Date());
    return new Promise((resolve, reject) => {
      Wechat.auth(scope, state, function (response) {
        resolve(response)
      }, function (reason) {
        reject(reason)
      })
    })
  }

  // 微博登录
  public loginByWeibo() {
    return new Promise((resolve, reject) => {
      WeiboSDK.ssoLogin(function (result) {
        resolve(result);
      }, function (failReason) {
        reject(failReason);
      });
    })
  }

  // 获取分享配置信息
  private formatShareConfig(type, config) {
    let {
      url = 'http://qunen.kuaimacode.com/wap/',
      title = '这个是 Cordova QQ 新闻分享的标题',
      description = '这个是 Cordova QQ 新闻分享的描述',
      image = 'https://cordova.apache.org/static/img/pluggy.png',
      scene = 0, // 微信场景标识,0=>朋友,1=>朋友圈
      media_type,
    } = config
    if (!media_type && window['Wechat']) {
      media_type = Wechat.Type.LINK
    }
    let shareConfig = null

    // 如果是平台的图片,取image的缩略图
    if (image.indexOf('.com/uploads/') !== -1) {
      let imgUrlSplitArr = image.split('.')
      let fileExt = imgUrlSplitArr.pop()
      image = imgUrlSplitArr.join('.') + '_thumb' + '.' + fileExt
    }
    switch (type) {
      case 'qq':
      case 'weibo':
        shareConfig = { url, title, description, image }
        break;
      case 'wechat':
        shareConfig = {
          scene,
          message: {
            title,
            description,
            thumb: image,
            media: {
              type: media_type,
              webpageUrl: url
            }
          }
        }
        break;
      default:
        break;
    }
    return shareConfig
  }

  // qq分享
  public shareByQQ(shareConfig = {}) {
    let qqShareOptions = this.formatShareConfig('qq', shareConfig)
    if (window['QQSDK']) {
      Object.assign(qqShareOptions, {
        client: QQSDK.ClientType.QQ,
        scene: QQSDK.Scene.QQ,
      })
    }
    return new Promise((resolve, reject) => {
      QQSDK.shareNews(function () {
        resolve(true);
      }, function (failReason) {
        reject(failReason);
      }, qqShareOptions);
    })
  }

  // 微信分享
  public shareByWechat(shareConfig) {
    let _formatConfig = this.formatShareConfig('wechat', shareConfig)
    return new Promise((resolve, reject) => {
      Wechat.share(_formatConfig, function () {
        resolve(true);
      }, function (reson) {
        reject(reson);
      })
    })
  }

  // 微博分享
  public shareByWeibo(shareConfig) {
    let _formatConfig = this.formatShareConfig('weibo', shareConfig)
    return new Promise((resolve, reject) => {
      WeiboSDK.shareToWeibo(function () {
        resolve(true);
      }, function (failReason) {
        reject(failReason);
      }, _formatConfig);
    })
  }

  /**
   * 支付宝支付
   * @param {[type]} payconfig [description]
   */
  public payByAlipay(payconfig) {
    return new Promise((resolve, reject) => {
      cordova.plugins.AliPay.pay(payconfig, function (result) {
        resolve(result)
      }, function (reason) {
        reject(reason)
      })
    })
  }

  /**
   * 微信支付
   * @param {[type]} payconfig [description]
   */
  public payByWechat(payconfig) {
    return new Promise((resolve, reject) => {
      Wechat.sendPaymentRequest(payconfig, result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    })
  }

  /**
   * 微信公众号支付
   * @param {[type]} jsApiParameters [description]
   */
  public payByWechatWap(jsApiParameters) {
    return new Promise((resolve, reject) => {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        JSON.parse(jsApiParameters),
        (res) => {
          WeixinJSBridge.log(res.err_msg)
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            resolve(true)
          } else {
            reject(res)
          }
        }
      )
    })
  }

}
