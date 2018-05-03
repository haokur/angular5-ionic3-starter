
// var colors = require('colors');

// colors.setTheme({
//     silly: 'rainbow',
//     input: 'grey',
//     verbose: 'cyan',
//     prompt: 'red',
//     info: 'green',
//     data: 'blue',
//     help: 'cyan',
//     warn: 'yellow',
//     debug: 'magenta',
//     error: 'red',
//     success:'green',
// });  

function error(str){
    // console.log(`${str}`.error)
    console.log(str)
}

function success(str){
    // console.log(`${str}`.success)
    console.log(str)
}

module.exports ={
    error,
    success
}