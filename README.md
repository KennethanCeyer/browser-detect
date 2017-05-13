# browser-detect

> Simplify detecting your browser.

----

```plaintext
This library helps you detect user's browser and version.
And this project is focusing to support client and server(Node).
```

## Getting Started

### Installation

**Using NPM**

```bash
$ npm install browser-detect --save
```

**Using Bower**

```bash
$ bower install browser-detect --save
```

**Using Yarn**

```bash
$ yarn install browser-detect --save
```

----

### How to use

**Client (browser)**

1. Add following code in your `head` tag.

```html
<script src="node_modules/browser-detect/dist/browser-detect.min.js"></script>
```

2. And follow this code to detect browser.

```javascript
console.log(browser());
```

```bash
> { name: 'msie', version: 9 } # IE 9
```

**Server (node)**
