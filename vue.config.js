// set current version upon build
process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        "devtool": "source-map"
    }
}
