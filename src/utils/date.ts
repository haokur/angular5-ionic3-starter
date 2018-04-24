// 日期处理相关
export function format(date, fmt = "yyyy-MM-dd hh:mm:ss") {
  var _time;
  if (date instanceof Date) {
    _time = date
  }
  else if (typeof date === 'string') {
    _time = new Date(date.replace(/-/g, '/'));
  }
  var o = {
    "M+": _time.getMonth() + 1, //月份
    "d+": _time.getDate(), //日
    "h+": _time.getHours(), //小时
    "m+": _time.getMinutes(), //分
    "s+": _time.getSeconds(), //秒
    "q+": Math.floor((_time.getMonth() + 3) / 3), //季度
    S: _time.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (_time.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
