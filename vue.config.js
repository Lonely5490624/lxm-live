module.exports = {
  devServer: {
    https: true
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: process.env.outputDir,
  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: '~@/styles/variable.styl'
      }
    }
  }
}