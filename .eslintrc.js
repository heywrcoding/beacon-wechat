module.exports = {
    "extends": ["eslint:recommended", "airbnb"],
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "commonjs": true
    },
    "globals": {
        "__DEV__": true,
        "__WECHAT__": true,
        "__ALIPAY__": true,
        "App": true,
        "Page": true,
        "Component": true,
        "Behavior": true,
        "wx": true,
        "getApp": true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "off",
        "no-plusplus": "off"
    }
};