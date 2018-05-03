
// 初始化用户配置

var fs = require('fs')
var path = require("path");
var tool = require('./tool')
var readline = require('readline')

// let [program, dir, order, userName ] = process.argv
let ROOT_PATH = path.resolve(__dirname, "..")
var { getUserModuleTpl } = require('./templates/user-module.tpl')

function getUserConfigTpl(userName) {
    return `var path = require("path");

module.exports = {
  USER: '${userName}',
  ROOT_PATH: path.resolve(__dirname, "..")
};`
}

// 用户配置
function generateUserConfig(userName) {
    return new Promise((resolve, reject) => {
        // 创建用户配置信息
        fs.writeFile(`${ROOT_PATH}/g/config.js`, getUserConfigTpl(userName), function (err, res) {
            if (err) { reject() }
            else {
                // 创建用户module文件以及pages下的文件夹
                let userPageDir = `${ROOT_PATH}/src/pages/${userName}`
                tool.checkIsExit(userPageDir)
                    .then(() => {
                        fs.mkdir(userPageDir, '0777', function (err, data) {
                            fs.writeFile(`${userPageDir}/${userName}.module.ts`, getUserModuleTpl(userName), function (err, res) {
                                appModuleImport(userName)
                                resolve(`用户配置成功成功!`);
                            })
                        })
                    })
                    .catch(err => { console.log('用户文件夹已存在,直接跳过生成用户文件夹和用户module'); resolve('跳过创建用户文件夹') })
            }
        });
    })
}

// 用户module在app.module中导入
function appModuleImport(createName) {
    let appModuleFileDir = `${ROOT_PATH}/src/app/app.module.ts`
    tool.eachFileLine(appModuleFileDir, (lineStr) => {
        let writeStr = `${lineStr}\n`;
        if (/--import-user-module here--/.test(lineStr)) {
            writeStr += `import { ${tool.generateClassName(createName, 'module')} } from '../pages/${createName}/${createName}.module';\n`;
        }
        if (/--user-module here--/.test(lineStr)) {
            writeStr += `${tool.generateClassName(createName, 'module')},\n`;
        }
        return writeStr
    })
}

module.exports = {
    generateUserConfig
}




