
function getUserTpl(userName){
    return `const USER = ${userName} // here

module.exports = USER
`
}

module.exports = {
    getUserTpl
}