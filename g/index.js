#!/usr/local/bin node
const fs = require("fs");
const path = require("path");
const readline = require('readline')
var rl = readline.createInterface(process.stdin, process.stdout);
// 项目根目录
const ROOT_PATH = path.resolve(__dirname, "..")
const tool = require('./tool')
const log = require('./log')
const { generateUserConfig } = require('./init')


var config = {}
var creater = {}
// var USER = ''

// let order = process.argv[2];
// let createName = process.argv[3];
// console.log(process.argv)
let [program, dir, order, ...createNames] = process.argv
// console.log(order)
// console.log(createNames)
// return false

// 先检测用户配置文件是否存在
tool.checkIsExit(`${ROOT_PATH}/g/config.js`)
    .then(noExist => {
        rl.question('你的用户名是? ', function (answer) {
            generateUserConfig(answer)
                .then(() => {
                    console.log('生成配置文件成功')
                    rl.close();
                    generateMain()
                })
                .catch(err => {
                })
        });
    })
    .catch(hasExist => {
        rl.close();
        generateMain()
    })
    .catch(err => {
    })

// 根据参数添加页面
// 参数是否正确
if (!(order && createNames.length > 0)) {
    showHelp();
    return false;
}

// ---main----检测文件是否存在,不存在则创建文件和文件夹
function generateMain() {
    config = require('./config.js')
    creater = require('./creater')
    createNames.forEach(createName => {
        let _willCreateDir = getWillCreateDir(createName)
        tool.checkIsExit(_willCreateDir)
            .then(res => {
                console.log(`[${order}-${createName}]:` + '不存在' + _willCreateDir)
                console.log(`[${order}-${createName}]:` + '开始创建' + _willCreateDir)
                createNow(createName)
            })
            .catch(err => {
                log.error(`[${order}-${createName}]:创建失败,文件夹已存在`)
            })
    })
}


// 根据第二个参数判断是创建何种页面
function createNow(createName) {
    if (order === 'page' || order === 'component') {
        makeDirAndFile(createName)
    }
    else if (order === 'user') { // 创建用户
        userConfigGenerate()
    }
    else {
        showHelp()
    }
}

// 发生错误展示正确配置示例
function showHelp() {
    console.log("目前仅支持自动生成 page和component");
    console.log(`格式错误,正确示范如下:
          生成页面:node g page login 
          生成组件:node g component hello-wrold
      `);
}

// 将要生成的文件存放路径
function getWillCreateDir(createName) {
    var _dir = '';
    if (order === 'page') {
        _dir = `${ROOT_PATH}/src/${order}s/${config.USER}/${createName}`;
    }
    else {
        _dir = `${ROOT_PATH}/src/${order}s/${createName}`;
    }
    return _dir;
}

// 生成文件夹,并生成相应文件
function makeDirAndFile(createName) {
    let _willCreateDir = getWillCreateDir(createName)
    fs.mkdir(_willCreateDir, '0777', function (err, data) {
        if (err) { console.log(err) }
        else {
            console.log(`[${order}-${createName}]:` + '创建文件夹成功')
            switch (order) {
                case "page":
                    pageGenerate(createName)
                    break;
                case "component":
                    componentGenerate(createName);
                    break;
                default:
                    showHelp();
                    break;
            }
        }
    })
}

// 获取到模块名称,数组形式
function getModuleNamePrefix(createName) {
    var pageModuleName = createName.replace('-/g', '')
    var pageNameArr = createName.split('-')
    pageNameArr = pageNameArr.map(item => {
        return item.substring(0, 1).toUpperCase() + item.substring(1, item.length)
    })
    return pageNameArr.join('')
}

// page页面生成器
function pageGenerate(createName) {
    var moduleName = getModuleNamePrefix(createName) + 'Page';
    creater.pageCreater.createPage(createName, moduleName)
}

// component生成器
function componentGenerate(createName) {
    var moduleName = getModuleNamePrefix(createName) + 'Component';
    creater.componentCreate.createComponent(createName, moduleName);
}

// 用户文件生成器 : 改变用户配置信息
function userConfigGenerate(createName) {
    creater.userCreater.createUser(createName)
}
