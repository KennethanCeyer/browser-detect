(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.browserDetect = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    var browsers = [
        ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
        ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
        ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
        ['edge', /Edge\/([0-9\._]+)/],
        ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
        ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
        ['ie', /MSIE\s(7\.0)/],
        ['safari', /Version\/([0-9\._]+).*Safari/],
        ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
        ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
        ['android', /Android\s([0-9\.]+)/],
        ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
        ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
        ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/]
    ];
    var os = [
        'Windows Phone',
        'Android',
        'CentOS',
        { name: 'Chrome OS', pattern: 'CrOS' },
        'Debian',
        'Fedora',
        'FreeBSD',
        'Gentoo',
        'Haiku',
        'Kubuntu',
        'Linux Mint',
        'OpenBSD',
        'Red Hat',
        'SuSE',
        'Ubuntu',
        'Xubuntu',
        'Cygwin',
        'Symbian OS',
        'hpwOS',
        'webOS ',
        'webOS',
        'Tablet OS',
        'Tizen',
        'Linux',
        'Mac OS X',
        'Macintosh',
        'Mac',
        'Windows 98;',
        'Windows '
    ];
    var osVersions = {
        '10.0': '10',
        '6.4': '10 Technical Preview',
        '6.3': '8.1',
        '6.2': '8',
        '6.1': 'Server 2008 R2 / 7',
        '6.0': 'Server 2008 / Vista',
        '5.2': 'Server 2003 / XP 64-bit',
        '5.1': 'XP',
        '5.01': '2000 SP1',
        '5.0': '2000',
        '4.0': 'NT',
        '4.90': 'ME'
    };

    var mobileRegExp = new RegExp(['(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|',
        'compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|',
        'midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)',
        '\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|',
        'wap|windows ce|xda|xiino'].join(''), 'i');
    var mobilePrefixRegExp = new RegExp(['1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|',
        'ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|',
        'avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|',
        'cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|',
        'ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|',
        'g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|',
        'hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|',
        'i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|',
        'kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])',
        '|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|',
        'mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|',
        'n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|',
        'op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|',
        'po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|',
        'raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|',
        'se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|k\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|',
        'so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|',
        'tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|',
        'veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|',
        'w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-'].join(''), 'i');

    var Detector = /** @class */ (function () {
        function Detector(userAgent, navigator, process) {
            this.navigator = navigator;
            this.process = process;
            this.userAgent = userAgent
                ? userAgent
                : this.navigator ? (navigator.userAgent || navigator.vendor) : '';
        }
        Detector.prototype.detect = function () {
            if (this.process && !this.userAgent) {
                var version = this.process.version.slice(1).split('.').slice(0, 3);
                var versionTail = Array.prototype.slice.call(version, 1).join('') || '0';
                return {
                    name: 'node',
                    version: version.join('.'),
                    versionNumber: parseFloat(version[0] + "." + versionTail),
                    mobile: false,
                    os: this.process.platform
                };
            }
            if (!this.userAgent)
                this.handleMissingError();
            return __assign({}, this.checkBrowser(), this.checkMobile(), this.checkOs());
        };
        Detector.prototype.checkBrowser = function () {
            var _this = this;
            return browsers
                .filter(function (definition) { return definition[1].test(_this.userAgent); })
                .map(function (definition) {
                var match = definition[1].exec(_this.userAgent);
                var version = match && match[1].split(/[._]/).slice(0, 3);
                var versionTails = Array.prototype.slice.call(version, 1).join('') || '0';
                if (version && version.length < 3)
                    Array.prototype.push.apply(version, version.length === 1 ? [0, 0] : [0]);
                return {
                    name: String(definition[0]),
                    version: version.join('.'),
                    versionNumber: Number(version[0] + "." + versionTails)
                };
            })
                .shift();
        };
        Detector.prototype.checkMobile = function () {
            var agentPrefix = this.userAgent.substr(0, 4);
            var mobile = mobileRegExp.test(this.userAgent) || mobilePrefixRegExp.test(agentPrefix);
            return { mobile: mobile };
        };
        Detector.prototype.checkOs = function () {
            var _this = this;
            return os
                .map(function (definition) {
                var name = definition.name || definition;
                var pattern = _this.getOsPattern(definition);
                return {
                    name: name,
                    pattern: pattern,
                    value: RegExp("\\b" + pattern.replace(/([ -])(?!$)/g, '$1?') + "(?:x?[\\d._]+|[ \\w.]*)", 'i').exec(_this.userAgent)
                };
            })
                .filter(function (definition) { return definition.value; })
                .map(function (definition) {
                var os$$1 = definition.value[0] || '';
                var osSuffix;
                if (definition.pattern &&
                    definition.name &&
                    /^Win/i.test(os$$1) &&
                    !/^Windows Phone /i.test(os$$1) &&
                    (osSuffix = osVersions[os$$1.replace(/[^\d.]/g, '')]))
                    os$$1 = "Windows " + osSuffix;
                if (definition.pattern && definition.name)
                    os$$1 = os$$1.replace(RegExp(definition.pattern, 'i'), definition.name);
                os$$1 = os$$1
                    .replace(/ ce$/i, ' CE')
                    .replace(/\bhpw/i, 'web')
                    .replace(/\bMacintosh\b/, 'Mac OS')
                    .replace(/_PowerPC\b/i, ' OS')
                    .replace(/\b(OS X) [^ \d]+/i, '$1')
                    .replace(/\bMac (OS X)\b/, '$1')
                    .replace(/\/(\d)/, ' $1')
                    .replace(/_/g, '.')
                    .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
                    .replace(/\bx86\.64\b/gi, 'x86_64')
                    .replace(/\b(Windows Phone) OS\b/, '$1')
                    .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
                    .split(' on ')[0]
                    .trim();
                os$$1 = /^(?:webOS|i(?:OS|P))/.test(os$$1)
                    ? os$$1
                    : (os$$1.charAt(0).toUpperCase() + os$$1.slice(1));
                return { os: os$$1 };
            })
                .shift();
        };
        Detector.prototype.getOsPattern = function (definition) {
            var definitionInterface = definition;
            return (typeof definition === 'string'
                ? definition
                : undefined) ||
                definitionInterface.pattern ||
                definitionInterface.name;
        };
        Detector.prototype.handleMissingError = function () {
            throw new Error('Please give user-agent.\n> browser(navigator.userAgent or res.headers[\'user-agent\']).');
        };
        return Detector;
    }());

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var _global = createCommonjsModule(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math
      ? window : typeof self != 'undefined' && self.Math == Math ? self
      // eslint-disable-next-line no-new-func
      : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
    });

    var _global$1 = /*#__PURE__*/Object.freeze({
        default: _global,
        __moduleExports: _global
    });

    var _core = createCommonjsModule(function (module) {
    var core = module.exports = { version: '2.5.4' };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
    });
    var _core_1 = _core.version;

    var _core$1 = /*#__PURE__*/Object.freeze({
        default: _core,
        __moduleExports: _core,
        version: _core_1
    });

    var _isObject = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };

    var _isObject$1 = /*#__PURE__*/Object.freeze({
        default: _isObject,
        __moduleExports: _isObject
    });

    var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

    var _anObject = function (it) {
      if (!isObject(it)) throw TypeError(it + ' is not an object!');
      return it;
    };

    var _anObject$1 = /*#__PURE__*/Object.freeze({
        default: _anObject,
        __moduleExports: _anObject
    });

    var _fails = function (exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };

    var _fails$1 = /*#__PURE__*/Object.freeze({
        default: _fails,
        __moduleExports: _fails
    });

    var require$$1 = ( _fails$1 && _fails ) || _fails$1;

    // Thank's IE8 for his funny defineProperty
    var _descriptors = !require$$1(function () {
      return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
    });

    var _descriptors$1 = /*#__PURE__*/Object.freeze({
        default: _descriptors,
        __moduleExports: _descriptors
    });

    var global$1 = ( _global$1 && _global ) || _global$1;

    var document = global$1.document;
    // typeof document.createElement is 'object' in old IE
    var is = isObject(document) && isObject(document.createElement);
    var _domCreate = function (it) {
      return is ? document.createElement(it) : {};
    };

    var _domCreate$1 = /*#__PURE__*/Object.freeze({
        default: _domCreate,
        __moduleExports: _domCreate
    });

    var require$$0 = ( _descriptors$1 && _descriptors ) || _descriptors$1;

    var require$$2 = ( _domCreate$1 && _domCreate ) || _domCreate$1;

    var _ie8DomDefine = !require$$0 && !require$$1(function () {
      return Object.defineProperty(require$$2('div'), 'a', { get: function () { return 7; } }).a != 7;
    });

    var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
        default: _ie8DomDefine,
        __moduleExports: _ie8DomDefine
    });

    // 7.1.1 ToPrimitive(input [, PreferredType])

    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    var _toPrimitive = function (it, S) {
      if (!isObject(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };

    var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
        default: _toPrimitive,
        __moduleExports: _toPrimitive
    });

    var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

    var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

    var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

    var dP = Object.defineProperty;

    var f = require$$0 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (IE8_DOM_DEFINE) try {
        return dP(O, P, Attributes);
      } catch (e) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var _objectDp = {
    	f: f
    };

    var _objectDp$1 = /*#__PURE__*/Object.freeze({
        default: _objectDp,
        __moduleExports: _objectDp,
        f: f
    });

    var _propertyDesc = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
        default: _propertyDesc,
        __moduleExports: _propertyDesc
    });

    var dP$1 = ( _objectDp$1 && _objectDp ) || _objectDp$1;

    var createDesc = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

    var _hide = require$$0 ? function (object, key, value) {
      return dP$1.f(object, key, createDesc(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var _hide$1 = /*#__PURE__*/Object.freeze({
        default: _hide,
        __moduleExports: _hide
    });

    var hasOwnProperty = {}.hasOwnProperty;
    var _has = function (it, key) {
      return hasOwnProperty.call(it, key);
    };

    var _has$1 = /*#__PURE__*/Object.freeze({
        default: _has,
        __moduleExports: _has
    });

    var id = 0;
    var px = Math.random();
    var _uid = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };

    var _uid$1 = /*#__PURE__*/Object.freeze({
        default: _uid,
        __moduleExports: _uid
    });

    var hide = ( _hide$1 && _hide ) || _hide$1;

    var has = ( _has$1 && _has ) || _has$1;

    var uid = ( _uid$1 && _uid ) || _uid$1;

    var require$$1$1 = ( _core$1 && _core ) || _core$1;

    var _redefine = createCommonjsModule(function (module) {
    var SRC = uid('src');
    var TO_STRING = 'toString';
    var $toString = Function[TO_STRING];
    var TPL = ('' + $toString).split(TO_STRING);

    require$$1$1.inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) has(val, 'name') || hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if (O === global$1) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        hide(O, key, val);
      }
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
    });

    var _redefine$1 = /*#__PURE__*/Object.freeze({
        default: _redefine,
        __moduleExports: _redefine
    });

    var _aFunction = function (it) {
      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
      return it;
    };

    var _aFunction$1 = /*#__PURE__*/Object.freeze({
        default: _aFunction,
        __moduleExports: _aFunction
    });

    var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

    // optional / simple context binding

    var _ctx = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 1: return function (a) {
          return fn.call(that, a);
        };
        case 2: return function (a, b) {
          return fn.call(that, a, b);
        };
        case 3: return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
      }
      return function (/* ...args */) {
        return fn.apply(that, arguments);
      };
    };

    var _ctx$1 = /*#__PURE__*/Object.freeze({
        default: _ctx,
        __moduleExports: _ctx
    });

    var redefine = ( _redefine$1 && _redefine ) || _redefine$1;

    var ctx = ( _ctx$1 && _ctx ) || _ctx$1;

    var PROTOTYPE = 'prototype';

    var $export = function (type, name, source) {
      var IS_FORCED = type & $export.F;
      var IS_GLOBAL = type & $export.G;
      var IS_STATIC = type & $export.S;
      var IS_PROTO = type & $export.P;
      var IS_BIND = type & $export.B;
      var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE];
      var exports = IS_GLOBAL ? require$$1$1 : require$$1$1[name] || (require$$1$1[name] = {});
      var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
      var key, own, out, exp;
      if (IS_GLOBAL) source = name;
      for (key in source) {
        // contains in native
        own = !IS_FORCED && target && target[key] !== undefined;
        // export native or passed
        out = (own ? target : source)[key];
        // bind timers to global for call from export context
        exp = IS_BIND && own ? ctx(out, global$1) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
        // extend global
        if (target) redefine(target, key, out, type & $export.U);
        // export
        if (exports[key] != out) hide(exports, key, exp);
        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
      }
    };
    global$1.core = require$$1$1;
    // type bitmap
    $export.F = 1;   // forced
    $export.G = 2;   // global
    $export.S = 4;   // static
    $export.P = 8;   // proto
    $export.B = 16;  // bind
    $export.W = 32;  // wrap
    $export.U = 64;  // safe
    $export.R = 128; // real proto method for `library`
    var _export = $export;

    var _export$1 = /*#__PURE__*/Object.freeze({
        default: _export,
        __moduleExports: _export
    });

    var toString = {}.toString;

    var _cof = function (it) {
      return toString.call(it).slice(8, -1);
    };

    var _cof$1 = /*#__PURE__*/Object.freeze({
        default: _cof,
        __moduleExports: _cof
    });

    var cof = ( _cof$1 && _cof ) || _cof$1;

    // fallback for non-array-like ES3 and non-enumerable old V8 strings

    // eslint-disable-next-line no-prototype-builtins
    var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };

    var _iobject$1 = /*#__PURE__*/Object.freeze({
        default: _iobject,
        __moduleExports: _iobject
    });

    // 7.2.1 RequireObjectCoercible(argument)
    var _defined = function (it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it;
    };

    var _defined$1 = /*#__PURE__*/Object.freeze({
        default: _defined,
        __moduleExports: _defined
    });

    var defined = ( _defined$1 && _defined ) || _defined$1;

    // 7.1.13 ToObject(argument)

    var _toObject = function (it) {
      return Object(defined(it));
    };

    var _toObject$1 = /*#__PURE__*/Object.freeze({
        default: _toObject,
        __moduleExports: _toObject
    });

    // 7.1.4 ToInteger
    var ceil = Math.ceil;
    var floor = Math.floor;
    var _toInteger = function (it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };

    var _toInteger$1 = /*#__PURE__*/Object.freeze({
        default: _toInteger,
        __moduleExports: _toInteger
    });

    var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

    // 7.1.15 ToLength

    var min = Math.min;
    var _toLength = function (it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    };

    var _toLength$1 = /*#__PURE__*/Object.freeze({
        default: _toLength,
        __moduleExports: _toLength
    });

    // 7.2.2 IsArray(argument)

    var _isArray = Array.isArray || function isArray(arg) {
      return cof(arg) == 'Array';
    };

    var _isArray$1 = /*#__PURE__*/Object.freeze({
        default: _isArray,
        __moduleExports: _isArray
    });

    var SHARED = '__core-js_shared__';
    var store = global$1[SHARED] || (global$1[SHARED] = {});
    var _shared = function (key) {
      return store[key] || (store[key] = {});
    };

    var _shared$1 = /*#__PURE__*/Object.freeze({
        default: _shared,
        __moduleExports: _shared
    });

    var require$$0$1 = ( _shared$1 && _shared ) || _shared$1;

    var _wks = createCommonjsModule(function (module) {
    var store = require$$0$1('wks');

    var Symbol = global$1.Symbol;
    var USE_SYMBOL = typeof Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] =
        USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
    };

    $exports.store = store;
    });

    var _wks$1 = /*#__PURE__*/Object.freeze({
        default: _wks,
        __moduleExports: _wks
    });

    var isArray = ( _isArray$1 && _isArray ) || _isArray$1;

    var require$$0$2 = ( _wks$1 && _wks ) || _wks$1;

    var SPECIES = require$$0$2('species');

    var _arraySpeciesConstructor = function (original) {
      var C;
      if (isArray(original)) {
        C = original.constructor;
        // cross-realm fallback
        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
        if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) C = undefined;
        }
      } return C === undefined ? Array : C;
    };

    var _arraySpeciesConstructor$1 = /*#__PURE__*/Object.freeze({
        default: _arraySpeciesConstructor,
        __moduleExports: _arraySpeciesConstructor
    });

    var speciesConstructor = ( _arraySpeciesConstructor$1 && _arraySpeciesConstructor ) || _arraySpeciesConstructor$1;

    // 9.4.2.3 ArraySpeciesCreate(originalArray, length)


    var _arraySpeciesCreate = function (original, length) {
      return new (speciesConstructor(original))(length);
    };

    var _arraySpeciesCreate$1 = /*#__PURE__*/Object.freeze({
        default: _arraySpeciesCreate,
        __moduleExports: _arraySpeciesCreate
    });

    var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

    var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

    var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

    var asc = ( _arraySpeciesCreate$1 && _arraySpeciesCreate ) || _arraySpeciesCreate$1;

    // 0 -> Array#forEach
    // 1 -> Array#map
    // 2 -> Array#filter
    // 3 -> Array#some
    // 4 -> Array#every
    // 5 -> Array#find
    // 6 -> Array#findIndex





    var _arrayMethods = function (TYPE, $create) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      var create = $create || asc;
      return function ($this, callbackfn, that) {
        var O = toObject($this);
        var self = IObject(O);
        var f = ctx(callbackfn, that, 3);
        var length = toLength(self.length);
        var index = 0;
        var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
        var val, res;
        for (;length > index; index++) if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res;   // map
            else if (res) switch (TYPE) {
              case 3: return true;             // some
              case 5: return val;              // find
              case 6: return index;            // findIndex
              case 2: result.push(val);        // filter
            } else if (IS_EVERY) return false; // every
          }
        }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
      };
    };

    var _arrayMethods$1 = /*#__PURE__*/Object.freeze({
        default: _arrayMethods,
        __moduleExports: _arrayMethods
    });

    var _strictMethod = function (method, arg) {
      return !!method && require$$1(function () {
        // eslint-disable-next-line no-useless-call
        arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
      });
    };

    var _strictMethod$1 = /*#__PURE__*/Object.freeze({
        default: _strictMethod,
        __moduleExports: _strictMethod
    });

    var $export$1 = ( _export$1 && _export ) || _export$1;

    var require$$0$3 = ( _arrayMethods$1 && _arrayMethods ) || _arrayMethods$1;

    var require$$1$2 = ( _strictMethod$1 && _strictMethod ) || _strictMethod$1;

    var $filter = require$$0$3(2);

    $export$1($export$1.P + $export$1.F * !require$$1$2([].filter, true), 'Array', {
      // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(this, callbackfn, arguments[1]);
      }
    });

    var filter = require$$1$1.Array.filter;

    var $map = require$$0$3(1);

    $export$1($export$1.P + $export$1.F * !require$$1$2([].map, true), 'Array', {
      // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
      map: function map(callbackfn /* , thisArg */) {
        return $map(this, callbackfn, arguments[1]);
      }
    });

    var map = require$$1$1.Array.map;

    var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    var _stringWs$1 = /*#__PURE__*/Object.freeze({
        default: _stringWs,
        __moduleExports: _stringWs
    });

    var spaces = ( _stringWs$1 && _stringWs ) || _stringWs$1;

    var space = '[' + spaces + ']';
    var non = '\u200b\u0085';
    var ltrim = RegExp('^' + space + space + '*');
    var rtrim = RegExp(space + space + '*$');

    var exporter = function (KEY, exec, ALIAS) {
      var exp = {};
      var FORCE = require$$1(function () {
        return !!spaces[KEY]() || non[KEY]() != non;
      });
      var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
      if (ALIAS) exp[ALIAS] = fn;
      $export$1($export$1.P + $export$1.F * FORCE, 'String', exp);
    };

    // 1 -> String#trimLeft
    // 2 -> String#trimRight
    // 3 -> String#trim
    var trim = exporter.trim = function (string, TYPE) {
      string = String(defined(string));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };

    var _stringTrim = exporter;

    var _stringTrim$1 = /*#__PURE__*/Object.freeze({
        default: _stringTrim,
        __moduleExports: _stringTrim
    });

    var require$$0$4 = ( _stringTrim$1 && _stringTrim ) || _stringTrim$1;

    // 21.1.3.25 String.prototype.trim()
    require$$0$4('trim', function ($trim) {
      return function trim() {
        return $trim(this, 3);
      };
    });

    var trim$1 = require$$1$1.String.trim;

    var injectableNavigator = typeof window !== 'undefined'
        ? window.navigator
        : undefined;
    var injectableProcess = typeof process !== 'undefined'
        ? process
        : undefined;
    function browserDetect (userAgent) {
        var detector = new Detector(userAgent, injectableNavigator, injectableProcess);
        return detector.detect();
    }

    return browserDetect;

})));
//# sourceMappingURL=browser-detect.umd.js.map
