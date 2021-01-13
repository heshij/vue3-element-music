const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       // eslint-disable-next-line
  //       prependData: `@import '@/style/variables.scss';`
  //     }
  //   }
  // }
}
