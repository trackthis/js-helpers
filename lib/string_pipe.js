Object.defineProperty(String.prototype, 'pipe', {
  value: function (dest) {
    switch(typeof dest) {
      case 'function':
        dest(''+this);
        break;
      case 'object':
        if (dest.writable) dest.end(''+this);
        break;
    }
    return dest;
  }
});
