# browser-detect

> Simplify detecting your browser.

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
console.log(browser());
```

```bash
> { name: 'chrome', version: '58.0.3029' } # CHROME 58.0.3029
```

**Server (node)**

Just simple :trollface:

```javascript
var browser = require('browser-detect');
var result = browser();
console.log(result);
```

```bash
> { name: 'ie', version: '9.0' } # IE 9
```

----

### Features

- Detect browser both compatible client and server.
- Support AMD and CommonJS module feature.

----

### Plan for near *near*, **very near** future.

- Support Webpack2.x.
- Support typings.
- Support TDD.
- Support CI.
- Support browser compatity.
- Suport CDN.
- Support guideline and documentations for contributors.

----

### Contribution

**Setting environment for contribute**

1. Install project from GitHub.

```bash
$ git clone https://github.com/KennethanCeyer/browser-detect.git
```

2. Install all modules from NPM.

```bash
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
