# condition-compile-plugin

condition compile support require module not bundle

## Install
```
npm i condition-compile-plugin --save-dev
```
```
yarn add -D condition-compile-plugin
```
## Usage
config

```js
const ConditionCompilePlugin = require('condition-compile-plugin')

new webpack.DefinePlugin({
  "process.env": {
    "RUN_ENV": JSON.stringify('development')
  }
}),
new ConditionCompilePlugin(),
```

use
```js
if (process.env.RUN_ENV == "development") { //true
  require("./a.js");
} else {
  require("./b.js"); //code remove and module not bundle
}

process.env.RUN_ENV == "development"/* true */ ? require("./a.js") : require("./b.js")/* code remove and module not bundle */;
```