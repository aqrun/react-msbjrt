const path = require('path')

//const config = require('./config')
const paths = require('./paths')

exports.assetsPath = function(_path) {
    return path.posix.join(paths.appSrc, _path)
}

exports.dirResolve = function(dir) {
    return path.join(__dirname, './../', dir)
}