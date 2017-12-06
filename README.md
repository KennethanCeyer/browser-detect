# browser-detect

> Simplify detecting your browser.

[![npm version](https://badge.fury.io/js/browser-detect.svg)](https://badge.fury.io/js/browser-detect)
[![Bower version](https://badge.fury.io/bo/browser-catch.svg)](https://badge.fury.io/bo/browser-catch)
[![npm](https://img.shields.io/npm/dm/browser-detect.svg)](https://www.npmjs.com/package/browser-detect)
[![Join the chat at https://gitter.im/KennethanCeyer/PIGNOSE](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/KennethanCeyer/PIGNOSE?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Build Status](https://travis-ci.org/KennethanCeyer/browser-detect.svg?branch=master)](https://travis-ci.org/KennethanCeyer/browser-detect)
[![Coverage Status](https://coveralls.io/repos/github/KennethanCeyer/browser-detect/badge.svg?branch=master)](https://coveralls.io/github/KennethanCeyer/browser-detect?branch=master)
[![codecov](https://codecov.io/gh/KennethanCeyer/browser-detect/branch/master/graph/badge.svg)](https://codecov.io/gh/KennethanCeyer/browser-detect)

[![GitHub forks](https://img.shields.io/github/forks/KennethanCeyer/browser-detect.svg?style=social&label=Stars)](https://github.com/KennethanCeyer/browser-detect)
[![Maintainability](https://api.codeclimate.com/v1/badges/328163587b12cf5cb3aa/maintainability)](https://codeclimate.com/github/KennethanCeyer/browser-detect/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/328163587b12cf5cb3aa/test_coverage)](https://codeclimate.com/github/KennethanCeyer/browser-detect/test_coverage)

[![dependencies Status](https://david-dm.org/KennethanCeyer/browser-detect/status.svg)](https://david-dm.org/KennethanCeyer/browser-detect)
[![devDependencies Status](https://david-dm.org/KennethanCeyer/browser-detect/dev-status.svg)](https://david-dm.org/KennethanCeyer/browser-detect?type=dev)

----

```plaintext
This library helps you detect user's browser and version.
And this project is focusing to support client and server(Node).
```

## Getting Started

### Installation

**\* NPM**

```bash
$ npm install browser-detect --save
```

**\* Bower**

```bash
$ bower install browser-catch --save
```

**\* Yarn**

```bash
$ yarn add browser-detect
```

**\* Download zip**

[Download zip file from this link](https://github.com/KennethanCeyer/browser-detect/archive/master.zip)

----

### How to use

**Client (browser)**

Add following code in your `head` tag.

```html
<script src="node_modules/browser-detect/dist/browser-detect.min.js"></script>
```

And follow this code to detect browser.

```javascript
var result = browser();
console.log(result);
```

```bash
> { name: 'chrome', version: '58.0.3029', versionNumber: 58.03029, mobile: false, os: 'Windows NT 10.0' } # Chrome v58.0.3029
```

**Server (node)**

Just simple :trollface:

```javascript
const browser = require('browser-detect');
const result = browser();
console.log(result);
```

```bash
> { name: 'node', version: '7.9.0', versionNumber: 7.9, mobile: false, os: 'win32' } # Node v7.9
```

**Server (node with express)**

Using `req.headers` like following code.

```javascript
const router = express.Router();
const browser = require('browser-detect');

router.get('/', function (req, res, next) {
    var result = browser(req.headers['user-agent']);
    console.log(result);
});

return router;
```

```bash
> { name: 'ie', version: '9.0', versionNumber: 9, mobile: false, os: 'Windows NT 10.0' } # IE 9
```

Or set a middleware and send to `res.locals`.

```javascript
// browserDetectMiddleware.js
const browser = require('browser-detect');

const MiddleWare = () => {
    return (req, res, next) => {
        res.locals.browser = browser(req.headers['user-agent']);
        next();
    };
};

module.exports = MiddleWare;
```

```javascript
// app.js

const express = require('express');
const browserDetectMiddleware = require('./browserDetectMiddleware');

let app = express();
app.use(browserDetectMiddleware())
```

View will can access `browser` variable.

```ejs
<!-- view.ejs -->

<%=JSON.stringify(browser)%>
```

```bash
> { name: 'firefox', version: '53.0.0', versionNumber: 53, mobile: false, os: 'Windows NT 10.0' } // Firefox v 53.0.0
```

----

### Values

- **name**

  Name of browser such as `ie`, `chrome`, `firefox`.

- **version**

  Version of browser with comma (string).
 
- **versionNumber**

  Version of browser of which format is only number.
 
- **mobile**

  If browser is based mobile device it will be `true`, and if is not `false`.
 
- **os**

  User OS type such as `Windows NT 10.0`.

----

### Try with an example

**Client**

- Open `examples/client.html` by your browser.

**Server**

- Open command or terminal.
- Move directory to `browser-detect` path that you download.
- Type following code.

```bash
$ node ./examples/server.js
```

----

## Features

- Detect browser both compatible client and server.
- Support AMD and CommonJS module feature.

### Completed

- Support typings.
- Support guideline and documentations for contributors.
- Support browser compatity to IE7.
- Support to detect mobile and OS.
- Support Webpack2.x. (Including build process with reactjs or angular4.x)

----

### Plan for near *near*, **very near** future.

- Support TDD. (UnitTest, e2e Test)
- Support CI. (TravisCI)
- Suport CDN. (JSDelivr)

----

## Compatibility

### Test completed

- IE 7+
- Chrome (Windows, MacOS)
- Edge
- Firefox
- Safari (Windows, MacOS)
- Opera
- Android
- Chromium Browsers (Will be named chrome)

### Expected

- IOS
- Window phone (Edge)
- IE 6

----

## Contribution

**Setting environment for contribute**

1. Install project from GitHub
```bash
$ git clone git@github.com:KennethanCeyer/browser-detect.git
```
2. Install all modules from NPM
```bash
$ cd browser-detect
$ npm install
```
3. Install npx
```bash
$ npm install npx -g
```
4. Build sources
```bash
$ npm run build
```

**Testing**

1. run npm scripts
```bash
$ npm run test
```

2. if you need coverage report try as follows
```bash
$ npm run coverage
```

**Linting**
1. browser-detect is used tslint
```bash
$ npm run lint
```

----

## Contributors

- [![vlewin](https://avatars3.githubusercontent.com/u/611466?s=30&v=4) **vlewin**](https://github.com/vlewin)
  - fix pattern issue [#2](https://github.com/KennethanCeyer/browser-detect/issues/2)
  - add unit test with mocha + chai
 
----

## License

`browser-detect` is under MIT license

of cource, You can use it, modify it and contribute it :trollface:
