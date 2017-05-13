# browser-detect

> Simplify detecting your browser.

[![npm version](https://badge.fury.io/js/browser-detect.svg)](https://badge.fury.io/js/browser-detect) [![Bower version](https://badge.fury.io/bo/browser-catch.svg)](https://badge.fury.io/bo/browser-catch) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![ghit.me](https://ghit.me/badge.svg?repo=KennethanCeyer/browser-detect)](https://ghit.me/repo/KennethanCeyer/browser-detect) [![Join the chat at https://gitter.im/KennethanCeyer/PIGNOSE](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/KennethanCeyer/PIGNOSE?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![GitHub stars](https://githubbadges.com/star.svg?user=KennethanCeyer&repo=browser-detect&background=007ecg&color=ffffff&style=flat)](https://github.com/KennethanCeyer/browser-detect)

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
$ yarn install browser-detect --save
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
var browser = require('browser-detect');
var result = browser();
console.log(result);
```

```bash
> { name: 'node', version: '7.9.0', versionNumber: 7.9, mobile: false, os: 'win32' } # Node v7.9
```

**Server (node with express)**

Using `req.headers` like following code.

```javascript
var router = express.Router();
var browser = require('browser-detect');

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
var browser = require('browser-detect');

var MiddleWare = function() {
    return function (req, res, next) {
        res.locals.browser = browser(req.headers['user-agent']);
        next();
    };
};

module.exports = MiddleWare;
```

```javascript
// app.js

var express = require('express');
var browserDetectMiddleware = require('./browserDetectMiddleware');

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

----

### Plan for near *near*, **very near** future.

- Support Webpack2.x.
- Support TDD.
- Support CI.
- Suport CDN.
- Support to detect mobile and OS.

----

## Compatibility

### Test completed

- IE 7+
- Chrome (Windows, MacOS)
- Edge
- Firefox
- Safari (Windows, MacOS)
- Opera

### Expected

- Android
- IOS
- Window phone (Edge)
- Chromium Browsers (Will be named chrome)
- IE 6

----

## Contribution

**Setting environment for contribute**

1. Install project from GitHub.

```bash
$ git clone https://github.com/KennethanCeyer/browser-detect.git
```

2. Install all modules from NPM.

```bash
$ cd browser-detect
$ npm install
```

3. Install gulp.

```bash
$ npm install gulp -g
```

4. Build sources

```bash
$ gulp
```
