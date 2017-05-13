if (Array.prototype.map === undefined) {
  Array.prototype.map = function(fn) {
    var rv = [];
    
    for(var i=0, l=this.length; i<l; i++)
      rv.push(fn(this[i]));

    return rv;
  };
}

if (Array.prototype.filter === undefined) {
  Array.prototype.filter = function(fn) {
    var rv = [];
    
    for(var i=0, l=this.length; i<l; i++)
      if (fn(this[i])) rv.push(this[i]);

    return rv;
  };
}
