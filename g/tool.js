var fs = require("fs");
var readline = require('readline')

module.exports = {
  // 检测文件是否已存在
  checkIsExit(dir) {
    return new Promise((resolve, reject) => {
      fs.exists(dir, result => {
        if (result) {
          reject("文件已经存在");
        } else {
          resolve(true);
        }
      });
    });
  },
  // 获取类名
  generateClassName(createName, order) {
    var pageModuleName = createName.replace('-/g', '')
    var pageNameArr = createName.split('-')
    pageNameArr = pageNameArr.map(item => {
      return item.substring(0, 1).toUpperCase() + item.substring(1, item.length)
    })
    var pageModuleName = pageNameArr.join('') + 'Page'
    var componentModuleName = pageNameArr.join('') + 'Component'
    var moduleName = pageNameArr.join('') + 'Module'
    if (order === 'page') {
      return pageModuleName
    }
    else if (order === 'component') {
      return componentModuleName
    }
    else if (order === 'module') { // 用户模块
      return moduleName
    }
  },
  /**
   * 逐行读取文本,每行可以回调改变内容
   * @param {*string} fileDir 要修改的文件路径
   * @param {*string} eachLineCb 每行的回调
   */
  eachFileLine(fileDir, eachLineCb) {
    var fReadStream = fs.createReadStream(fileDir);
    var objReadLine = readline.createInterface({
      input: fReadStream,
    })
    var lineIndex = 1
    var writeStr = ''
    objReadLine.on('line', (lineStr) => {
      // 接收回调改变回来的值
      let _transformLine = eachLineCb(lineStr) || lineStr
      writeStr += `${_transformLine}`;
      // if (/--import page--/.test(lineStr)) {
      //   writeStr += `import { ${generateClassName(createName, 'page')} } from './${createName}/${createName}';\n`;
      // }
      // else if (/--declaration page--/.test(lineStr) || /--entry page--/.test(lineStr)) {
      //   writeStr += `        ${generateClassName(createName, 'page')},\n`;
      // }
      lineIndex++
    })
    objReadLine.on('close', () => {
      fs.writeFile(fileDir, writeStr, function (err) {
        console.log('索引添加成功！')
      });
    });
  }
}
