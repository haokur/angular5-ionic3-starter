import { ENV } from "./env";

// 请求超时时间,单位为毫秒
export const REQUEST_TIMEOUT = 15000;
// 请求header设置
export const REQUEST_HEADER = {
  "Content-Type": "application/x-www-form-urlencoded"
};

/**
 * 开发与生产环境区分配置
 */
let api_root = '' // api请求根路径

if (ENV === 'devlopment') {
  // api_root = "https://news-at.zhihu.com/api/";
  api_root = '/'
}
else if (ENV === 'production') {
  api_root = "https://news-at.zhihu.com/api/";
}

export const API_ROOT = api_root
// 图片上传地址
export const UPLOAD_URL = ''

// console.log 开关
export const LOG_STATUS = false

// mock 数据开关, 统一配置(这里)优于用户数据里的配置,便于统一控制
export const MOCK_ENABLE = true