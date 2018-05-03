var fs = require('fs')

var componentTpl = require("../templates/component.tpl");
var config = require("../config");
var tool = require('../tool')


function createComponent(createName, moduleName) {
  let _componentText = componentTpl.getComponentText(createName, moduleName)
  let filePath = `${config.ROOT_PATH}/src/components/${createName}`;
  fs.writeFile(`${filePath}/${createName}.ts`, _componentText, function (err) {
    console.log('组件创建完成!');
  })
  autoExportModule(createName)
}

// 自动导入module
function autoExportModule(createName){
  let componentModuleFileDir = `${config.ROOT_PATH}/src/components/components.module.ts`
  tool.eachFileLine(componentModuleFileDir, (lineStr) => {
    let writeStr = `${lineStr}\n`;
    if (/--component import here--/.test(lineStr)) {
      writeStr += `import { ${tool.generateClassName(createName, 'component')} } from './${createName}/${createName}';\n`;
    }
    if (/--component usage here--/.test(lineStr)) {
      writeStr += `\t\t${tool.generateClassName(createName, 'component')},\n`;
    }
    return writeStr
  })
}

module.exports = {
    createComponent
}