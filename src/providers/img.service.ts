/**
 * 图片上传封装
 * 整个套装流程 : actionSheet 弹出选择何种形式(拍照和相册) => 选择图片 => 裁剪图片 => 上传图片
 */
import { Injectable } from "@angular/core";
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UPLOAD_URL } from "../config/index";
// import { retry } from "rxjs/operator/retry";

import { HaokurBasePage } from "../pages/default/haokur-base/haokur-base";
import { ApiService } from "./api.service";
import { ActionSheetController } from "ionic-angular";

// 配置项
export interface imgOptions {

  maximumImagesCount?: number, // 选择图片的最大个数，默认1张
  quality?: number, // 默认图片质量为25%

  cropWidth?: number, // 要裁剪的目标宽度
  cropHeight?: number, // 要裁剪的目标高度
}

@Injectable()
export class ImgService extends HaokurBasePage {

  /**
   * 默认相册图片选择配置
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

  // 打包整个流程,选择到上传, 因为集成了裁剪所以最大选择数是1
  packAllProcess(options: imgOptions = {}, tempUrlCb = null) {
    return new Promise((resolve, reject) => {

      // actionSheet 选择选取图片方式
      this.photoAction((type) => {
        // debugger

        // 选取图片
        this.pick(type, options)
          .then((tempUrls) => {
            let _usageTempUrl = tempUrls[0]
            tempUrlCb && tempUrlCb(_usageTempUrl, 'pick')

            // 裁剪图片
            let { cropWidth, cropHeight } = options
            return this.cropImage(_usageTempUrl, cropWidth, cropHeight)
          })
          .then(cropTempUrl => {

            tempUrlCb && tempUrlCb(cropTempUrl, 'crop')
            // 上传图片
            return this.uploadFile(cropTempUrl)
          })
          .then(uploadRes => {

            // 整个流程完成,返回上传到服务器后的结果
            resolve(uploadRes);
          })
          .catch(err => {
            throw err;
          })
      }, '上传图片')
    })
  }

  pick(type, options = {}) {
    if (type === 'carame') {
      return this.openCamera(options);
    }
    else if (type === 'album') {
      return this.pickAlbumImg(options);
    }
  }

  /**
   * 从图库中选择, 返回的 promise 的参数为选择后的图片数组
   */
  pickAlbumImg(options = {}) {
    let _curChooseImageOptions = {
      ...this.defaultChooseImageOptions,
      ...options
    }
    return this.openImgPicker(_curChooseImageOptions)
  }

  /**
   * 拍照
   * 返回的 promise 的参数为拍照后的地址并组装成数组和 pickAlbumImg 保持统一返回格式
   */
  openCamera(options = {}) {
    let _carameOptions: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: 1,
      mediaType: this.camera.MediaType.PICTURE,
      ...options,
    }
    return this.camera.getPicture(_carameOptions)
      .then((tempUrl: String) => Promise.resolve([tempUrl]));
  }

  /**
   * 从相册选取照片
   */
  openImgPicker(options) {
    console.log('从相册选取图片')
    return this.imagePicker.getPictures(options)
  }

  /**
   * 裁剪图片
   * @param tempUrl 
   */
  cropImage(tempUrl, cropWidth = 320, cropHeight = 320) {
    return this.crop.crop(tempUrl, {
      targetWidth: cropWidth,
      targetHeight: cropHeight,
      quality: 25,
    })
  }

  /**
   * 上传单张图片
   */
  uploadFile(tempUrl, userOptions = {}) {
    console.log('上传图片的地址为:', tempUrl)
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
    console.log('上传参数为:', JSON.stringify(fileUploadOptions))
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
          .catch((err = '上传失败') => {
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
    // console.log('文件名' + _fileExt);
    return _fileExt
  }

}