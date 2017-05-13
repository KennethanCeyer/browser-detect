define(() => {
    (method => {
        if (typeof method === 'undefined') {
            var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
            var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
            var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

            const TypeError = TypeError || ((message) => {
                return message
            });

            Object.defineProperty = function (object, property, descriptor) {
                // Where native support exists, assume it
                if (method && ((typeof window !== 'undefined' && object === window) || (typeof document !== 'undefined' && object === document) || (typeof Element !== 'undefined' && (object === Element.prototype || object instanceof Element)))) {
                    return method(object, property, descriptor);
                }

                if (object === null || !(object instanceof Object || typeof object === 'object')) {
                    throw new TypeError('Object.defineProperty called on non-object');
                }

                if (!(descriptor instanceof Object)) {
                    throw new TypeError('Property description must be an object');
                }

                var propertyString = String(property);
                var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
                var getterType = 'get' in descriptor && typeof descriptor.get;
                var setterType = 'set' in descriptor && typeof descriptor.set;

                // handle descriptor.get
                if (getterType) {
                    if (getterType !== 'function') {
                        throw new TypeError('Getter must be a function');
                    }
                    if (!supportsAccessors) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (hasValueOrWritable) {
                        throw new TypeError(ERR_VALUE_ACCESSORS);
                    }
                    object.__defineGetter__(propertyString, descriptor.get);
                } else {
                    object[propertyString] = descriptor.value;
                }

                // handle descriptor.set
                if (setterType) {
                    if (setterType !== 'function') {
                        throw new TypeError('Setter must be a function');
                    }
                    if (!supportsAccessors) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (hasValueOrWritable) {
                        throw new TypeError(ERR_VALUE_ACCESSORS);
                    }
                    object.__defineSetter__(propertyString, descriptor.set);
                }

                // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above
                if ('value' in descriptor) {
                    object[propertyString] = descriptor.value;
                }

                return object;
            };
        };
    })(Object.defineProperty);

    (method => {
        if (typeof method === 'undefined') {
            Object.defineProperty(Object, 'assign', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function(target, source) {
                    var from;
                    var to = target || {};
                    var symbols;
                    for (var s = 1; s < arguments.length; s++) {
                        from = Object(arguments[s]);
                        for (var key in from) {
                            if (Object.prototype.hasOwnProperty.call(from, key)) {
                                to[key] = from[key];
                            }
                        }
                        if (Object.getOwnPropertySymbols) {
                            symbols = Object.getOwnPropertySymbols(from);
                            for (var i = 0; i < symbols.length; i++) {
                                if (Object.prototype.propertyIsEnumerable.call(from, symbols[i])) {
                                    to[symbols[i]] = from[symbols[i]];
                                }
                            }
                        }
                    }
                    return to;
                }
            });
        }
    })(Object.assign);

    (method => {
        if (typeof method === 'undefined') {
            Object.defineProperty(String, 'trim', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function() {
                    return String(this).replace(/^ +| +$/g, '')
                }
            });
        }
    })(String.prototype.trim);

    (method => {
        if (typeof method === 'undefined') {
            Object.defineProperty(Array, 'map', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function(fn) {
                    var rv = [];                
                    for(var i=0, l=this.length; i<l; i++)
                    rv.push(fn(this[i]));
                    return rv;
                }
            });
        }
    })(Array.prototype.map);

    (method => {
        if (typeof method === 'undefined') {
            Object.defineProperty(Array, 'filter', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function(fn) {
                    var rv = [];            
                    for(var i=0, l=this.length; i<l; i++)
                    if (fn(this[i])) rv.push(this[i]);
                    return rv;
                }
            });
        }
    })(Array.prototype.filter);
});