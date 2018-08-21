/**
 * object.watch polyfill
 *
 * 2012-04-03
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 *
 * @author Eli Grey
 * @license MIT
 *
 * Copyright (c) 2011 Eli Grey
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * Edited by finwo:
 *   Added a handler response check, to not break the value non-returning calls
 *   Made the code pass JSHINT linting
 *   Allow it to be overwritten in debug mode, for tests like mocha & nyc
 */

module.exports = function (overwritable) {

  // object.watch
  if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
      enumerable   : false,
      configurable : true,
      writable     : overwritable,
      value        : function (prop, handler) {
        var oldval = this[prop],
            newval = oldval,
            getter = function () {
              return newval;
            },
            setter = function (val) {
              oldval     = newval;
              var result = handler.call(this, prop, oldval, val);
              if ('undefined' !== typeof result) {
                newval = result;
              }
              return newval;
            };
        if (delete this[prop]) { // can't watch constants
          Object.defineProperty(this, prop, {
            get          : getter,
            set          : setter,
            enumerable   : true,
            configurable : true
          });
        }
      }
    });
  }

  // object.unwatch
  if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
      enumerable   : false,
      configurable : true,
      writable     : overwritable,
      value        : function (prop) {
        var val = this[prop];
        delete this[prop]; // remove accessors
        this[prop] = val;
      }
    });
  }

};
