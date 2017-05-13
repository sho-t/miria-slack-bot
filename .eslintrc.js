module.exports = {
  "extends": "google",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [ "googleappsscript" ],
  "env": {
    "googleappsscript/googleappsscript": true,
    "browser": true,
    "node": true,
    "es6": true
  },
  "settings": {
    "ecmascript": 6
  },
  "rules": {
    "max-len": [
      2,
      {
        "code": 120,
        "tabWidth": 4,
        "ignoreUrls": true
      }
    ]
  }
};
