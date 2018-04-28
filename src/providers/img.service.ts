/**
 * 图片上传封装
 */
import { Injectable } from "@angular/core";
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Crop } from '@ionic-native/crop';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UPLOAD_URL } from "../config/index";
import { retry } from "rxjs/operator/retry";

import { HaokurBasePage } from "../pages/default/haokur-base/haokur-base";
import { ApiService } from "./api.service";

@Injectable()
export class ImgService extends HaokurBasePage {

  /**
   * 默认图片选择配置
   */
  defaultChooseImageOptions = {
    maximumImagesCount: 1, // 选择图片的最大个数，默认1张
    quality: 25, // 默认图片质量为25%
    sourceType: ["album", "camera"] // 照片来源，默认有相册和相机两个来源
  }

  constructor(
    private imagePicker: ImagePicker,
    private fileTransfer: FileTransfer,
    public api: ApiService,
    public crop: Crop,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController
  ) {
    super()
  }

  /**
   * 选择图片
   */
  chooseImage(chooseImageOptions, cb = null, title = '') {
    let curChooseImageOptions = {
      ...this.defaultChooseImageOptions,
      ...chooseImageOptions
    }
    let that = this;
    if (curChooseImageOptions.sourceType.length == 2) {
      // 从相册和拍照选图片
      this.showActionSheet(title, function (isCamera) {
        if (isCamera) {
          that.openCamera().then((tempUrl) => {
            cb([tempUrl]);
          });
        } else {
          return that.openImgPicker(curChooseImageOptions).then((tempUrls) => {
            cb(tempUrls);
          })
        }
      })
    } else if (curChooseImageOptions.sourceType[0] == "album") {
      // 从相册选图片
      return that.openImgPicker(curChooseImageOptions).then((tempUrls) => {
        cb(tempUrls);
      })
    } else {
      // 拍照
      that.openCamera().then((tempUrl) => {
        cb([tempUrl]);
      });
    }
  }

  /**
   * 弹出照片来源选择框
   */
  showActionSheet(title, cb) {
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: '拍照',
          handler: () => {
            cb(true)
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            cb(false)
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * 拍照
   */
  openCamera() {
    let options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: 1,
      mediaType: this.camera.MediaType.PICTURE,
    }
    return this.camera.getPicture(options);
  }

  /**
   * 从相册选取照片
   */
  openImgPicker(options) {
    return this.imagePicker.getPictures(options)
  }

  /**
   * 裁剪图片
   * @param tempUrl 
   */
  cropImage(tempUrl, crop_width = 320, crop_height = 320) {
    return this.crop.crop(tempUrl, {
      targetWidth: crop_width,
      targetHeight: crop_height,
      quality: 25,
    })
  }

  /**
   * 上传单张图片
   */
  uploadFile(tempUrl, userOptions = {}) {
    // if (!tempUrl) { return false }
    let _fileExt = this.getFileExt(tempUrl)

    let fileTransfer: FileTransferObject = this.fileTransfer.create();
    let fileName = new Date().getTime()
    let fileUploadOptions: FileUploadOptions = {
      fileKey: userOptions['fileKey'] || 'file',
      fileName: userOptions['fileName'] || `${fileName}.${_fileExt}`,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' // 不加入 发生错误！！
      },
      params: userOptions['params'] || { token: this.api.getUserToken() || '1', path: 'img' }
    }

    Object.assign(fileUploadOptions, userOptions)
    return fileTransfer.upload(tempUrl, UPLOAD_URL, fileUploadOptions);
  }

  /**
   * 上传多张图片
   */
  uploadImgs(tempUrls, userOptions, cb) {
    if (!tempUrls) { return false }
    let _allResult = []
    let _urlsLen = tempUrls.length

    return new Promise((resolve, reject) => {
      // 记录返回结果条数
      tempUrls.forEach(tempUlr => {
        this.uploadFile(tempUlr, userOptions)
          .then((data) => {
            // console.log('上传成功')
            console.log(data)
            let _result = JSON.parse(data.response) || {}
            let _neededResult = {
              status: _result.status || 200,
              url: _result.data.path
            }
            _allResult.push(_neededResult)
            // 单词成功执行回调
            cb(_neededResult)
            // 全部提交完成,不管成功失败
            if (_allResult.length === _urlsLen) {
              resolve(_allResult)
            }
          })
          .catch((err) => {
            // console.log('上传失败')
            // console.log(err)
            let _neededResult = {
              status: 500,
              url: null,
              msg: err
            }
            _allResult.push(_neededResult)
            // 单词失败执行回调
            cb(_neededResult)
            if (_allResult.length === _urlsLen) {
              resolve(_allResult)
            }
          })
      });
    })
  }

  /**
   * 获取文件的后缀名
   */
  getFileExt(tempUrl) {
    // 默认为jpg格式
    let _fileExt = 'jpg';
    var fileExtData = tempUrl.match(/[^\.]\w*$/);
    if (fileExtData && fileExtData.length) {
      _fileExt = fileExtData[0];
    }
    // this.log('文件名' + _fileExt);
    return _fileExt
  }

}