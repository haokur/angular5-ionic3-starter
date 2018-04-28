declare var process;

process.env.NODE_ENV = 'devlopment'

const ENV = process.env.NODE_ENV

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
export const UPLOAD_URL = ''