<p align="center" style="margin-bottom: 2em;"><img width="280px" src="https://www.pigno.se/static/assets/images/browser-detect-logo.svg"></p>

<p align="center"><a href="https://nodei.co/npm/browser-detect/"><img src="https://nodei.co/npm/browser-detect.png" alt="NPM"></a></p>

<p align="center">
    <a href="https://badge.fury.io/js/browser-detect"><img src="https://badge.fury.io/js/browser-detect.svg" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/browser-detect"><img src="https://img.shields.io/npm/dm/browser-detect.svg" alt="npm"></a>
    <a href="https://gitter.im/KennethanCeyer/PIGNOSE?utm_source=badge&amp;utm_medium=badge&amp;utm_campaign=pr-badge&amp;utm_content=badge"><img src="https://badges.gitter.im/Join%20Chat.svg" alt="Join the chat at https://gitter.im/KennethanCeyer/PIGNOSE"></a>
    <a href="https://github.com/KennethanCeyer/browser-detect"><img src="https://img.shields.io/github/stars/KennethanCeyer/browser-detect.svg?style=social&amp;label=Stars" alt="GitHub stars"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>

<p align="center">
    <a href="https://travis-ci.org/KennethanCeyer/browser-detect"><img src="https://travis-ci.org/KennethanCeyer/browser-detect.svg?branch=master" alt="Build Status"></a>
    <a href="https://coveralls.io/github/KennethanCeyer/browser-detect?branch=master"><img src="https://coveralls.io/repos/github/KennethanCeyer/browser-detect/badge.svg?branch=master" alt="Coverage Status"></a>
    <a href="https://codecov.io/gh/KennethanCeyer/browser-detect"><img src="https://codecov.io/gh/KennethanCeyer/browser-detect/branch/master/graph/badge.svg" alt="codecov"></a>
</p>

<p align="center">
    <a href="https://www.codefactor.io/repository/github/kennethanceyer/browser-detect"><img src="https://www.codefactor.io/repository/github/kennethanceyer/browser-detect/badge" alt="CodeFactor"></a>
    <a href="https://codeclimate.com/github/KennethanCeyer/browser-detect/maintainability"><img src="https://api.codeclimate.com/v1/badges/328163587b12cf5cb3aa/maintainability" alt="Maintainability"></a>
    <a href="https://codeclimate.com/github/KennethanCeyer/browser-detect/test_coverage"><img src="https://api.codeclimate.com/v1/badges/328163587b12cf5cb3aa/test_coverage" alt="Test Coverage"></a>
</p>

## :package: Installation

#### npm

```bash
$ npm install browser-detect
```

#### yarn

```bash
$ yarn add browser-detect
```

## :page_with_curl: Example

### Web

```html
<script src="node_modules/browser-detect/dist/browser-detect.umd.js"></script>
```

```javascript
const result = browserDetect();
console.log(result);
```

**output**

```javascript
{
    name: 'chrome',
    version: '58.0.3029',
    versionNumber: 58.03029,
    mobile: false,
    os: 'Windows NT 10.0'
}
```

### Web with module

```javascript
import browser from 'browser-detect';

const result = browser();
console.log(result);
```

**output**

```javascript
{
    name: 'chrome',
    version: '58.0.3029',
    versionNumber: 58.03029,
    mobile: false,
    os: 'Windows NT 10.0'
}
```

### NodeJS

Just simple :trollface:

```javascript
const browser = require('browser-detect');
const result = browser();

console.log(result);
```

**output**

```javascript
{
    name: 'node',
    version: '9.9.0',
    versionNumber: 9.9,
    mobile: false,
    os: 'win32'
}
```

### NodeJS with Express

```javascript
const router = express.Router();
const browser = require('browser-detect');

router.get('/', req => {
    const result = browser(req.headers['user-agent']);
    console.log(result);
});

return router;
```

**output**

```javascript
{
    name: 'ie',
    version: '9.0',
    versionNumber: 9,
    mobile: false,
    os: 'Windows NT 10.0'
}
```

Or set a middleware and send to `res.locals`.

```javascript
// browserDetectMiddleware.js
const browser = require('browser-detect');

const MiddleWare = () => req => {
    res.locals.browser = browser(req.headers['user-agent']);
    next();
};

module.exports = MiddleWare;
```

```javascript
// app.js

const express = require('express');
const browserDetectMiddleware = require('./browserDetectMiddleware');

const app = express();
app.use(browserDetectMiddleware())
```

View will can access `browser` variable.

```ejs
<!-- view.ejs -->

<%=JSON.stringify(browser)%>
```

**output**

```javascript
"{ name: 'firefox', version: '53.0.0', versionNumber: 53, mobile: false, os: 'Windows NT 10.0' }"
```

## :page_with_curl: Demo

#### Web

- open `examples/client.html` by your browser.

#### NodeJS

- open command or terminal
- move directory to `browser-detect` path that you download
- type following code

```bash
$ node ./examples/server.js
```

## :zap: Type

| name | type | description | example |
| ---- | ---- | ----------- | ------- |
| name | string | a browser name | ie, chrome, firefox |
| version | string | browser or node version | 59.2.22 |
| versionNumber | number | browser or node number casted to number | 59.222 |
| mobile | boolean | if browser is in mobile environment, it will be true | true |
| os | string | os type name | Windows NT 10.0 |

## :triangular_flag_on_post: Roadmap

- [x] detect browser both compatible client and server
- [x] support AMD and CommonJS module feature
- [x] support typings
- [x] support guideline and documentations for contributors
- [x] support browser compatity to IE7
- [x] support to detect mobile and OS
- [x] support CI (TravisCI)
- [x] support unit tests
- [ ] support e2e tests
- [ ] suport cdn

## :mag_right: Compatibility

- [x] IE 7+
- [x] Chrome (Windows, MacOS)
- [x] Edge
- [x] Firefox
- [x] Safari (Windows, MacOS)
- [x] Opera
- [x] Android
- [x] Chromium Browsers (Will be named chrome)

## :octocat: Contribution

### environment

1. clone project from Github

```bash
$ git clone git@github.com:KennethanCeyer/browser-detect.git
```

2. install npm packages

```bash
$ cd browser-detect
$ npm install
```

3. build sources

```bash
$ npm run build
```

### test

```bash
$ npm run test
```

## :yellow_heart: Contributors

- [**yarkeev**](https://github.com/yarkeev)
- [**vlewin**](https://github.com/vlewin)

## :mag_right: License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FKennethanCeyer%2Fbrowser-detect.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FKennethanCeyer%2Fbrowser-detect?ref=badge_large)
