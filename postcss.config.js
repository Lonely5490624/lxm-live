module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-plugin-px2rem': {
      rootValue: 100,
      exclude: /node_modules/
    }
  }
}