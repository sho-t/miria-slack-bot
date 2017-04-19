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
    }
};
