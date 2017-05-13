if (typeof String.prototype.trim === 'undefined') {
    String.prototype.trim = function() {
        return String(this).replace(/^ +| +$/g, '')
    };
}

if (typeof Array.prototype.map === 'undefined') {
  Array.prototype.map = function(fn) {
    var rv = [];
    
    for(var i=0, l=this.length; i<l; i++)
      rv.push(fn(this[i]));

    return rv;
  };
}

if (typeof Array.prototype.filter === 'undefined') {
  Array.prototype.filter = function(fn) {
    var rv = [];
    
    for(var i=0, l=this.length; i<l; i++)
      if (fn(this[i])) rv.push(this[i]);

    return rv;
  };
}

if (typeof Object.prototype.assign === 'undefined') {
    Object.prototype.assign = function(target, source) {
        var from;
        var to = !target? Object(target) : {};
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
    };
}