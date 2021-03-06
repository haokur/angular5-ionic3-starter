import { LoadingController, Loading, AlertController, ToastController, ActionSheetController } from "ionic-angular";
import { LOG_STATUS } from "../../../config";

/**
 * page component 基类
 * 代理 ionic 的部分生命周期 , 类似 AOP 切面
 */
export interface PageLoad {
  pageLoad: Function;
}

export interface PageEnter {
  pageLoad: Function;
}

export interface PageUnload {
  pageUnload: Function;
}

export class HaokurBasePage {

  loadingCtrl: LoadingController | any;
  loadingEntity: Loading;
  loadingActive: Boolean = false

  alertCtrl: AlertController | any;
  alertEntity: AlertController;

  toastCtrl: ToastController | any;
  toastActive: Boolean = false;

  actionSheetCtrl: ActionSheetController | any;

  constructor() { }

  /**
   * ioinc 原始主要生命周期钩子
   */
  ionViewDidLoad() {
    this.pageLoad()
  }

  ionViewDidEnter() {
    this.pageEnter()
  }

  // 离开页面前,
  ionViewWillLeave() {

  }

  ionViewWillUnload() {
    this.pageWillUnload()
  }

  // 只需加载一次的数据 => 需缓存数据
  pageLoad() { }

  // 页面每次进入可视区域 => 需要实时数据
  pageEnter() { }

  // 页面将被销毁 => 清理工作
  pageWillUnload() { }

  /**
   * 其他工具方法
   */
  // 开始加载 => 数据加载等待
  loadingStart(content = "请稍候...") {
    this.loadingCtrl = this.initLoadingCtrl()
    this.loadingActive = true;
    this.loadingEntity = this.loadingCtrl.create({
      content
    });
    this.loadingEntity.present();
  }

  // 结束加载 => 操作完成
  loadingEnd() {
    try {
      this.loadingEntity && this.loadingEntity.dismiss();
      this.loadingEntity = null;
      this.loadingActive = false;
    }
    catch (e) {
      console.log(e)
    }
  }

  initLoadingCtrl() {
    if (this.loadingCtrl) { return this.loadingCtrl }
    throw '请在实例中实现 initLoadingCtrl 方法并返回一个 loadingController 实例;或者在 constructor 里实例化 loadingCtrl'
  }

  /**
   * 普通弹窗
   * ```
   * @param message 弹窗内容
   * @param title 弹窗标题
   * @param btn 弹窗按钮文字
   */
  alert(subTitle = "内容", title = "", btnText = '确定') {
    return new Promise((resolve, reject) => {
      this.alertCtrl = this.initAlertCtrl();
      let _alertEntity = this.alertCtrl.create({
        title,
        subTitle,
        buttons: [{
          text: btnText,
        }],
      });
      _alertEntity.present();
      _alertEntity.onDidDismiss(() => {
        resolve('dismiss')
      })
    })
  }

  initAlertCtrl() {
    if (this.alertCtrl) return this.alertCtrl;
    throw '请在实例中实现 initAlertCtrl() 方法并返回一个 AlertController 实例;或者在 constructor 里实例化 alertCtrl';
  }

  /**
 * 确认弹窗
 * ```
 * @param title  弹窗标题,
 * @param message 弹窗内容
 */
  confirm(message = "内容", title = "") {
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        title,
        message,
        buttons: [
          {
            text: "取消",
            handler: () => {
              reject("cancel");
            }
          },
          {
            text: "确定",
            handler: () => {
              resolve("ok");
            }
          }
        ]
      }).present();
    });
  }


  /**
   * 提示气泡
   * ```
   * @param message 提起气泡内容
   * @param showTimes 气泡持续时间,默认1.5s
   * @param cssClass 气泡自定义class
   */
  toast(message, duration = 1500, cssClass = '') {
    if (this.toastActive || typeof message !== "string") return;
    this.toastCtrl = this.initToastCtrl();
    this.toastActive = true;
    let _toastEntity = this.toastCtrl.create({
      position: cssClass ? "middle" : "top",
      duration,
      message,
      cssClass,
    });
    _toastEntity.present();
    _toastEntity.onDidDismiss(() => {
      this.toastActive = false;
    });
  }

  initToastCtrl() {
    if (this.toastCtrl) return this.toastCtrl;
    throw '请在实例中实现 initToastCtrl() 方法并返回一个 ToastController 实例;或者在 constructor 里实例化 toastCtrl';
  }

  /**
   * log打印信息,替代console.log,方便全局开关打印信息
   */
  log(...args) {
    // console.log.apply(window, args);
    if (LOG_STATUS) {
      console.log.call(window, args);
    }
  }

  /**
   * actionSheet 自动补上 cancel
   */
  action(title, btnsConfig) {
    this.actionSheetCtrl = this.initActionSheet()
    let _actionSheet = this.actionSheetCtrl.create({
      title,
      buttons: [
        ...btnsConfig,
        {
          text: '取消',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    _actionSheet.present();
  }

  /**
   * 选择图片通用 action
   */
  photoAction(callback, title = "上传图片") {
    this.action(title, [
      {
        text: '拍照',
        role: 'carame',
        handler: () => { callback('carame') }
      },
      {
        text: '从相册中选择',
        role: 'album',
        handler: () => { callback('album') }
      }
    ])
  }

  initActionSheet() {
    if (this.actionSheetCtrl) {
      return this.actionSheetCtrl
    }
    throw '请在实例中实现 initActionSheet() 方法并返回一个 ActionSheetController 实例;或者在 constructor 里实例化 actionSheetCtrl'
  }

}