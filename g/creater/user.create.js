var fs = require('fs')
var config = require("../config");
var userTpl = require("../templates/user.tpl");

function createUser(createName){
    let filePath = `${config.ROOT_PATH}/g`;
    let _userConfigTpl = userTpl.getUserTpl(createName)
    fs.writeFile(`${filePath}/user.js`, _userConfigTpl, function (err) {
        console.log(`创建${createName}用户成功!`);
    });
}

module.exports = {
    createUser
}