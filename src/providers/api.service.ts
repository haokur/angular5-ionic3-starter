import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/timeout";

import {
  AlertController,
  LoadingController,
  ModalController
} from "ionic-angular";

import jsonpService from 'jsonp';

import { API_ROOT, REQUEST_HEADER, REQUEST_TIMEOUT } from "../config/constants";
import { HaokurBasePage } from "../pages/default/haokur-base/haokur-base";

@Injectable()
export class ApiService extends HaokurBasePage {
  private apiUrl = API_ROOT;
  private headers: any;
  public navCtrl: any;

  // 请求体忽略参数
  private reqIgnore = ['act', '_withToken', '_withWait']

  constructor(
    public http: Http,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
  ) {
    super();
    this.headers = new Headers(REQUEST_HEADER);
  }

  /**
   * 登录验证
   * @param param0 {mustLogin:'是否强制登录默认为false'}
   */
  public auth({ mustLogin = false } = {}) {
    return new Promise((resolve, reject) => {
      let _token = this.getUserToken()
      if (!_token) {
        mustLogin && this.jumpLogin("noToken");
        reject("未登录");
      } else {
        resolve(true)
      }
    });
  }

  /**
   * 登录跳转,涉及跳转所以需在调用页,实例化一个navCtrl方法
   * ```js
   * constructor(
   *  public api : Api,
   *  public navCtrl:NavController
   * ){
   *  this.api.generateNavCtrl(navCtrl)
   * }
   * ```
   * @param reason 跳转登录页的理由,可选
   */
  public jumpLogin(reason = "tokenFail") {
    // TODO
    console.log('跳去登录')
  }

  /**
   * 获取用户token
   */
  public getUserToken() {
    // TODO
    return ''
  }

  /**
   * get请求
   * ```
   * {
   *  act:'product/list', // 请求的action,必选
   *  a:1,              // 其他参数
   *  _withToken:true, // 是否自动添加token,默认为true
   *  _withWait:false, // 默认为false
   * }
   * ```
   * @param reqData 请求参数
   */
  public get(reqData) {
    return this.request({ type: "get", data: reqData });
  }

  // 
  /**
   * post请求
   * ```
   * {
   *  act:'product/list', // 请求的action,必选
   *  a:1,              // 其他参数
   *  _withToken:true, // 是否自动添加token,默认为true
   *  _withWait:false, // 默认为false
   * }
   * ```
   * @param reqData 请求参数
   */
  public post(reqData) {
    return this.request({ type: "post", data: reqData });
  }

  /**
   * get和post请求核心
   * @param param0 {type:'方法类型',data:{}}
   */
  public request({ type, data }) {
    if (data['_withWait']) {
      this.showWait()
    }
    return this.formatReqData(data, type)
      .then(({ url, format_data, withWait }) => {
        let _header = (type === 'get') ? null : { headers: this.headers }
        return this.http[type](url, format_data, _header)
          .timeout(REQUEST_TIMEOUT)
          .toPromise()
          .then(res => this.handleSuccess(res, format_data, url))
          .catch(err => this.handleError(err, format_data, url));
      })
  }

  /**
   * jsonp请求
   * @param url 完整的请求地址
   */
  public jsonp(url) {
    return new Promise((resolve, reject) => {
      jsonpService(url, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * FormData()方式提交,多用于文件上传
   * @param data 请求数据
   */
  public formPost(data) {
    let formData: FormData = new FormData();
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    let _postUrl = this.getRealReqUrl(data);

    // 是否带token还有是否显示等待
    let { _withToken = true, _withWait = false } = data;
    if (_withToken) {
      Object.assign(data, {
        token: (typeof _withToken === "string") ? _withToken : this.getUserToken()
      });
    }
    if (_withWait) {
      this.showWait();
    }

    for (let key in data) {
      let isNeededData: boolean = this.reqIgnore.indexOf(key) === -1 && (data[key] || data[key] === 0)
      if (isNeededData) {
        formData.append(key, data[key]);
      }
    }
    xhr.open("POST", _postUrl, true);
    xhr.send(formData);
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let res = JSON.parse(xhr.responseText);
            resolve(res);
            this.hideWait();
          } else {
            reject("请求出错")
          }
        }
      }
    });
  }

  // 拼接真实的请求地址
  private getRealReqUrl(reqData) {
    let _action = reqData.ext || reqData.act;
    var isFullUrl =
      _action.indexOf("http://") !== -1 || _action.indexOf("https://") !== -1;
    let _reqUrl = isFullUrl ? _action : `${this.apiUrl}${_action}`;
    return _reqUrl;
  }

  // 拼接get请求数据
  private glueData(reqData) {
    let reqObj: any = [];
    // 如果需要带token
    if (reqData['_withToken'] !== false) {
      Object.assign(reqData, {
        token: this.getUserToken()
      })
    }
    for (let key in reqData) {
      let isNeededData: boolean = this.reqIgnore.indexOf(key) === -1 && (reqData[key] || reqData[key] === 0)
      if (isNeededData) {
        var _str = key + "=" + encodeURIComponent(reqData[key]);
        reqObj.push(_str);
      }
    }
    reqObj = reqObj.join("&");
    return reqObj;
  }

  // 格式化请求参数
  private formatReqData(reqData, type) {
    return new Promise((resolve, reject) => {
      let url = this.getRealReqUrl(reqData)
      let format_data = this.glueData(reqData)
      // 如果是get请求,将数据拼在地址后面,清空data
      if (type === 'get') {
        url = `${url}?${format_data}`
        format_data = null
      }
      resolve({ url, format_data })
    })
  }

  // 展示等待弹窗
  private showWait(waitMsg = "请稍候...") {
    this.loadingStart(waitMsg);
  }

  // 关闭等待弹窗
  public hideWait() {
    this.loadingEnd();
  }

  // 请求成功
  private handleSuccess(result, data, url) {
    this.hideWait();
    try {
      var responseResult;
      if (typeof result.json == "function") {
        responseResult = result.json();
      } else {
        responseResult = JSON.parse(result);
      }
      // 统一加上接口是否真正成功标志
      if (responseResult.ret === 0) {
        Object.assign(responseResult, { ok: true })
      }
      // 日志
      this.reqLog(responseResult, data, 'ok', url)
      // 登录过期,重新登录
      if (responseResult.ret === -999) {
        return Promise.reject("请重新登录");
      } else {
        return responseResult;
      }
    } catch (err) {
      return result["_body"];
    }
  }

  // 请求错误回调
  private handleError(error, data, url) {
    this.hideWait();
    // 日志
    this.reqLog(error, data, 'error', url)
    // 自定义重新登录错误
    if (error == "请重新登录") {
      return Promise.reject(error);
    } else {
      return Promise.reject("请求出错");
    }
  }

  // 请求日志
  private reqLog(response, data, status, url) {
    if (status === 'ok') {
      let reqType = data ? 'post' : 'get'
      this.log(`${reqType} ok`, url, `${data}`, JSON.stringify(response), response)
    }
    else if (status === 'error') {
      this.log('请求失败', url, data, response)
    }
  }

  // 本地存储
  public local(key, value = null, expireTime = null) {
    // TODO
  }

  // 获取地址中的请求参数,如?t=123&page=1213此类
  public getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  }

  // 解析hash值中的请求参数 如#/detail?page=1&id=2 
  public getHashQueryValue(key = null, hashStr = window.location.hash) {
    var queryIndex = hashStr.indexOf('?')
    var searchStr = hashStr.substr(queryIndex)
    if (searchStr.trim() === '') {
      return key ? null : {}
    }
    searchStr = searchStr.substr(1)
    var searchArr = searchStr.split('&')
    var searchJson = {}
    searchArr.forEach(item => {
      var oItem = item.split('=')
      let key = oItem[0]
      let value = oItem[1]
      searchJson[key] = value
    })
    return key ? searchJson[key] : searchJson
  }

  // 对象简单深拷贝
  public copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
