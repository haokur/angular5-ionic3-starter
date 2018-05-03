var fs = require('fs')
var readline = require('readline')

var config = require("../config");
var pageTpl = require("../templates/page.tpl");
var log = require('../log')
var { generateClassName, eachFileLine } = require('../tool')

function createPage(createName, moduleName) {
  let _pageText = pageTpl.getPageText(createName, moduleName);
  let _pageStyleText = pageTpl.getPageStyle(createName, moduleName)
  let _pageHtmlText = pageTpl.getPageHtml(createName, moduleName)
  let filePath = `${config.ROOT_PATH}/src/pages/${config.USER}/${createName}`;
  fs.writeFile(`${filePath}/${createName}.ts`, _pageText, function (err) {
    // console.log(`[page-${createName}]:`+"逻辑代码创建完成!");
  });
  fs.writeFile(`${filePath}/${createName}.scss`, _pageStyleText, function (err) {
    // console.log(`[page-${createName}]:` +"样式创建完成!");
  });
  fs.writeFile(`${filePath}/${createName}.html`, _pageHtmlText, function (err) {
    // console.log(`[page-${createName}]:` +"模板创建完成!");
  });
  // 自动更新用户module
  appendUserModule(createName)
}

// module自动添加页面
function appendUserModule(createName) {
  // var userModuleName = generateClassName(config.USER, 'module')
  var fileName = `${config.ROOT_PATH}/src/pages/${config.USER}/${config.USER}.module.ts`;
  eachFileLine(fileName, (lineStr) => {
    let writeStr = `${lineStr}\n`;
    if (/--import page--/.test(lineStr)) {
      writeStr += `import { ${generateClassName(createName, 'page')} } from './${createName}/${createName}';\n`;
    }
    else if (/--declaration page--/.test(lineStr) || /--entry page--/.test(lineStr)) {
      writeStr += `        ${generateClassName(createName, 'page')},\n`;
    }
    return writeStr
  })
}

module.exports = {
  createPage
};
