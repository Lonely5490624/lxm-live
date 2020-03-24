module.exports = {
  "root": true,
  "env": {
      "browser": true,
      "node": true
  },
  "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
  ],
  "parserOptions": {
      "parser": "babel-eslint"
  },
  "rules": {
      // error
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "eol-last": ["error", "never"],
      eqeqeq: ["error", "always"],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      "comma-dangle": ["error", "never"],
      "no-multi-spaces": "error",
      "no-multi-str": "error"
      // warn
  },
  // 这里过滤不需要检查的全局变量
  "globals": {
      "TK": "readonly"
  }
}
