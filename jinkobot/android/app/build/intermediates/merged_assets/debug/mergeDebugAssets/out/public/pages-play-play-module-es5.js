(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-play-play-module"], {
  /***/
  "./node_modules/cbor-js/cbor.js":
  /*!**************************************!*\
    !*** ./node_modules/cbor-js/cbor.js ***!
    \**************************************/

  /*! no static exports found */

  /***/
  function node_modulesCborJsCborJs(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
    /*
    * The MIT License (MIT)
    *
    * Copyright (c) 2014 Patrick Gansterer <paroga@paroga.com>
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
    */


    (function (global, undefined) {
      "use strict";

      var POW_2_24 = Math.pow(2, -24),
          POW_2_32 = Math.pow(2, 32),
          POW_2_53 = Math.pow(2, 53);

      function encode(value) {
        var data = new ArrayBuffer(256);
        var dataView = new DataView(data);
        var lastLength;
        var offset = 0;

        function ensureSpace(length) {
          var newByteLength = data.byteLength;
          var requiredLength = offset + length;

          while (newByteLength < requiredLength) newByteLength *= 2;

          if (newByteLength !== data.byteLength) {
            var oldDataView = dataView;
            data = new ArrayBuffer(newByteLength);
            dataView = new DataView(data);
            var uint32count = offset + 3 >> 2;

            for (var i = 0; i < uint32count; ++i) dataView.setUint32(i * 4, oldDataView.getUint32(i * 4));
          }

          lastLength = length;
          return dataView;
        }

        function write() {
          offset += lastLength;
        }

        function writeFloat64(value) {
          write(ensureSpace(8).setFloat64(offset, value));
        }

        function writeUint8(value) {
          write(ensureSpace(1).setUint8(offset, value));
        }

        function writeUint8Array(value) {
          var dataView = ensureSpace(value.length);

          for (var i = 0; i < value.length; ++i) dataView.setUint8(offset + i, value[i]);

          write();
        }

        function writeUint16(value) {
          write(ensureSpace(2).setUint16(offset, value));
        }

        function writeUint32(value) {
          write(ensureSpace(4).setUint32(offset, value));
        }

        function writeUint64(value) {
          var low = value % POW_2_32;
          var high = (value - low) / POW_2_32;
          var dataView = ensureSpace(8);
          dataView.setUint32(offset, high);
          dataView.setUint32(offset + 4, low);
          write();
        }

        function writeTypeAndLength(type, length) {
          if (length < 24) {
            writeUint8(type << 5 | length);
          } else if (length < 0x100) {
            writeUint8(type << 5 | 24);
            writeUint8(length);
          } else if (length < 0x10000) {
            writeUint8(type << 5 | 25);
            writeUint16(length);
          } else if (length < 0x100000000) {
            writeUint8(type << 5 | 26);
            writeUint32(length);
          } else {
            writeUint8(type << 5 | 27);
            writeUint64(length);
          }
        }

        function encodeItem(value) {
          var i;
          if (value === false) return writeUint8(0xf4);
          if (value === true) return writeUint8(0xf5);
          if (value === null) return writeUint8(0xf6);
          if (value === undefined) return writeUint8(0xf7);

          switch (typeof value) {
            case "number":
              if (Math.floor(value) === value) {
                if (0 <= value && value <= POW_2_53) return writeTypeAndLength(0, value);
                if (-POW_2_53 <= value && value < 0) return writeTypeAndLength(1, -(value + 1));
              }

              writeUint8(0xfb);
              return writeFloat64(value);

            case "string":
              var utf8data = [];

              for (i = 0; i < value.length; ++i) {
                var charCode = value.charCodeAt(i);

                if (charCode < 0x80) {
                  utf8data.push(charCode);
                } else if (charCode < 0x800) {
                  utf8data.push(0xc0 | charCode >> 6);
                  utf8data.push(0x80 | charCode & 0x3f);
                } else if (charCode < 0xd800) {
                  utf8data.push(0xe0 | charCode >> 12);
                  utf8data.push(0x80 | charCode >> 6 & 0x3f);
                  utf8data.push(0x80 | charCode & 0x3f);
                } else {
                  charCode = (charCode & 0x3ff) << 10;
                  charCode |= value.charCodeAt(++i) & 0x3ff;
                  charCode += 0x10000;
                  utf8data.push(0xf0 | charCode >> 18);
                  utf8data.push(0x80 | charCode >> 12 & 0x3f);
                  utf8data.push(0x80 | charCode >> 6 & 0x3f);
                  utf8data.push(0x80 | charCode & 0x3f);
                }
              }

              writeTypeAndLength(3, utf8data.length);
              return writeUint8Array(utf8data);

            default:
              var length;

              if (Array.isArray(value)) {
                length = value.length;
                writeTypeAndLength(4, length);

                for (i = 0; i < length; ++i) encodeItem(value[i]);
              } else if (value instanceof Uint8Array) {
                writeTypeAndLength(2, value.length);
                writeUint8Array(value);
              } else {
                var keys = Object.keys(value);
                length = keys.length;
                writeTypeAndLength(5, length);

                for (i = 0; i < length; ++i) {
                  var key = keys[i];
                  encodeItem(key);
                  encodeItem(value[key]);
                }
              }

          }
        }

        encodeItem(value);
        if ("slice" in data) return data.slice(0, offset);
        var ret = new ArrayBuffer(offset);
        var retView = new DataView(ret);

        for (var i = 0; i < offset; ++i) retView.setUint8(i, dataView.getUint8(i));

        return ret;
      }

      function decode(data, tagger, simpleValue) {
        var dataView = new DataView(data);
        var offset = 0;
        if (typeof tagger !== "function") tagger = function tagger(value) {
          return value;
        };
        if (typeof simpleValue !== "function") simpleValue = function simpleValue() {
          return undefined;
        };

        function read(value, length) {
          offset += length;
          return value;
        }

        function readArrayBuffer(length) {
          return read(new Uint8Array(data, offset, length), length);
        }

        function readFloat16() {
          var tempArrayBuffer = new ArrayBuffer(4);
          var tempDataView = new DataView(tempArrayBuffer);
          var value = readUint16();
          var sign = value & 0x8000;
          var exponent = value & 0x7c00;
          var fraction = value & 0x03ff;
          if (exponent === 0x7c00) exponent = 0xff << 10;else if (exponent !== 0) exponent += 127 - 15 << 10;else if (fraction !== 0) return fraction * POW_2_24;
          tempDataView.setUint32(0, sign << 16 | exponent << 13 | fraction << 13);
          return tempDataView.getFloat32(0);
        }

        function readFloat32() {
          return read(dataView.getFloat32(offset), 4);
        }

        function readFloat64() {
          return read(dataView.getFloat64(offset), 8);
        }

        function readUint8() {
          return read(dataView.getUint8(offset), 1);
        }

        function readUint16() {
          return read(dataView.getUint16(offset), 2);
        }

        function readUint32() {
          return read(dataView.getUint32(offset), 4);
        }

        function readUint64() {
          return readUint32() * POW_2_32 + readUint32();
        }

        function readBreak() {
          if (dataView.getUint8(offset) !== 0xff) return false;
          offset += 1;
          return true;
        }

        function readLength(additionalInformation) {
          if (additionalInformation < 24) return additionalInformation;
          if (additionalInformation === 24) return readUint8();
          if (additionalInformation === 25) return readUint16();
          if (additionalInformation === 26) return readUint32();
          if (additionalInformation === 27) return readUint64();
          if (additionalInformation === 31) return -1;
          throw "Invalid length encoding";
        }

        function readIndefiniteStringLength(majorType) {
          var initialByte = readUint8();
          if (initialByte === 0xff) return -1;
          var length = readLength(initialByte & 0x1f);
          if (length < 0 || initialByte >> 5 !== majorType) throw "Invalid indefinite length element";
          return length;
        }

        function appendUtf16data(utf16data, length) {
          for (var i = 0; i < length; ++i) {
            var value = readUint8();

            if (value & 0x80) {
              if (value < 0xe0) {
                value = (value & 0x1f) << 6 | readUint8() & 0x3f;
                length -= 1;
              } else if (value < 0xf0) {
                value = (value & 0x0f) << 12 | (readUint8() & 0x3f) << 6 | readUint8() & 0x3f;
                length -= 2;
              } else {
                value = (value & 0x0f) << 18 | (readUint8() & 0x3f) << 12 | (readUint8() & 0x3f) << 6 | readUint8() & 0x3f;
                length -= 3;
              }
            }

            if (value < 0x10000) {
              utf16data.push(value);
            } else {
              value -= 0x10000;
              utf16data.push(0xd800 | value >> 10);
              utf16data.push(0xdc00 | value & 0x3ff);
            }
          }
        }

        function decodeItem() {
          var initialByte = readUint8();
          var majorType = initialByte >> 5;
          var additionalInformation = initialByte & 0x1f;
          var i;
          var length;

          if (majorType === 7) {
            switch (additionalInformation) {
              case 25:
                return readFloat16();

              case 26:
                return readFloat32();

              case 27:
                return readFloat64();
            }
          }

          length = readLength(additionalInformation);
          if (length < 0 && (majorType < 2 || 6 < majorType)) throw "Invalid length";

          switch (majorType) {
            case 0:
              return length;

            case 1:
              return -1 - length;

            case 2:
              if (length < 0) {
                var elements = [];
                var fullArrayLength = 0;

                while ((length = readIndefiniteStringLength(majorType)) >= 0) {
                  fullArrayLength += length;
                  elements.push(readArrayBuffer(length));
                }

                var fullArray = new Uint8Array(fullArrayLength);
                var fullArrayOffset = 0;

                for (i = 0; i < elements.length; ++i) {
                  fullArray.set(elements[i], fullArrayOffset);
                  fullArrayOffset += elements[i].length;
                }

                return fullArray;
              }

              return readArrayBuffer(length);

            case 3:
              var utf16data = [];

              if (length < 0) {
                while ((length = readIndefiniteStringLength(majorType)) >= 0) appendUtf16data(utf16data, length);
              } else appendUtf16data(utf16data, length);

              return String.fromCharCode.apply(null, utf16data);

            case 4:
              var retArray;

              if (length < 0) {
                retArray = [];

                while (!readBreak()) retArray.push(decodeItem());
              } else {
                retArray = new Array(length);

                for (i = 0; i < length; ++i) retArray[i] = decodeItem();
              }

              return retArray;

            case 5:
              var retObject = {};

              for (i = 0; i < length || length < 0 && !readBreak(); ++i) {
                var key = decodeItem();
                retObject[key] = decodeItem();
              }

              return retObject;

            case 6:
              return tagger(decodeItem(), length);

            case 7:
              switch (length) {
                case 20:
                  return false;

                case 21:
                  return true;

                case 22:
                  return null;

                case 23:
                  return undefined;

                default:
                  return simpleValue(length);
              }

          }
        }

        var ret = decodeItem();
        if (offset !== data.byteLength) throw "Remaining bytes";
        return ret;
      }

      var obj = {
        encode: encode,
        decode: decode
      };
      if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = obj, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
    })(this);
    /***/

  },

  /***/
  "./node_modules/eventemitter2/lib/eventemitter2.js":
  /*!*********************************************************!*\
    !*** ./node_modules/eventemitter2/lib/eventemitter2.js ***!
    \*********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesEventemitter2LibEventemitter2Js(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    /*!
    * EventEmitter2
    * https://github.com/hij1nx/EventEmitter2
    *
    * Copyright (c) 2013 hij1nx
    * Licensed under the MIT license.
    */


    ;
    !function (undefined) {
      var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
      var defaultMaxListeners = 10;

      function init() {
        this._events = {};

        if (this._conf) {
          configure.call(this, this._conf);
        }
      }

      function configure(conf) {
        if (conf) {
          this._conf = conf;
          conf.delimiter && (this.delimiter = conf.delimiter);
          this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;
          conf.wildcard && (this.wildcard = conf.wildcard);
          conf.newListener && (this.newListener = conf.newListener);
          conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

          if (this.wildcard) {
            this.listenerTree = {};
          }
        } else {
          this._maxListeners = defaultMaxListeners;
        }
      }

      function logPossibleMemoryLeak(count, eventName) {
        var errorMsg = '(node) warning: possible EventEmitter memory ' + 'leak detected. ' + count + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.';

        if (this.verboseMemoryLeak) {
          errorMsg += ' Event name: ' + eventName + '.';
        }

        if (typeof process !== 'undefined' && process.emitWarning) {
          var e = new Error(errorMsg);
          e.name = 'MaxListenersExceededWarning';
          e.emitter = this;
          e.count = count;
          process.emitWarning(e);
        } else {
          console.error(errorMsg);

          if (console.trace) {
            console.trace();
          }
        }
      }

      function EventEmitter(conf) {
        this._events = {};
        this.newListener = false;
        this.verboseMemoryLeak = false;
        configure.call(this, conf);
      }

      EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property
      //
      // Attention, function return type now is array, always !
      // It has zero elements if no any matches found and one or more
      // elements (leafs) if there are matches
      //

      function searchListenerTree(handlers, type, tree, i) {
        if (!tree) {
          return [];
        }

        var listeners = [],
            leaf,
            len,
            branch,
            xTree,
            xxTree,
            isolatedBranch,
            endReached,
            typeLength = type.length,
            currentType = type[i],
            nextType = type[i + 1];

        if (i === typeLength && tree._listeners) {
          //
          // If at the end of the event(s) list and the tree has listeners
          // invoke those listeners.
          //
          if (typeof tree._listeners === 'function') {
            handlers && handlers.push(tree._listeners);
            return [tree];
          } else {
            for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
              handlers && handlers.push(tree._listeners[leaf]);
            }

            return [tree];
          }
        }

        if (currentType === '*' || currentType === '**' || tree[currentType]) {
          //
          // If the event emitted is '*' at this part
          // or there is a concrete match at this patch
          //
          if (currentType === '*') {
            for (branch in tree) {
              if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1));
              }
            }

            return listeners;
          } else if (currentType === '**') {
            endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === '*';

            if (endReached && tree._listeners) {
              // The next element has a _listeners, add it to the handlers.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
            }

            for (branch in tree) {
              if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
                if (branch === '*' || branch === '**') {
                  if (tree[branch]._listeners && !endReached) {
                    listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
                  }

                  listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
                } else if (branch === nextType) {
                  listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2));
                } else {
                  // No match on this one, shift into the tree but not in the type array.
                  listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
                }
              }
            }

            return listeners;
          }

          listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1));
        }

        xTree = tree['*'];

        if (xTree) {
          //
          // If the listener tree will allow any match for this part,
          // then recursively explore all branches of the tree
          //
          searchListenerTree(handlers, type, xTree, i + 1);
        }

        xxTree = tree['**'];

        if (xxTree) {
          if (i < typeLength) {
            if (xxTree._listeners) {
              // If we have a listener on a '**', it will catch all, so add its handler.
              searchListenerTree(handlers, type, xxTree, typeLength);
            } // Build arrays of matching next branches and others.


            for (branch in xxTree) {
              if (branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
                if (branch === nextType) {
                  // We know the next element will match, so jump twice.
                  searchListenerTree(handlers, type, xxTree[branch], i + 2);
                } else if (branch === currentType) {
                  // Current node matches, move into the tree.
                  searchListenerTree(handlers, type, xxTree[branch], i + 1);
                } else {
                  isolatedBranch = {};
                  isolatedBranch[branch] = xxTree[branch];
                  searchListenerTree(handlers, type, {
                    '**': isolatedBranch
                  }, i + 1);
                }
              }
            }
          } else if (xxTree._listeners) {
            // We have reached the end and still on a '**'
            searchListenerTree(handlers, type, xxTree, typeLength);
          } else if (xxTree['*'] && xxTree['*']._listeners) {
            searchListenerTree(handlers, type, xxTree['*'], typeLength);
          }
        }

        return listeners;
      }

      function growListenerTree(type, listener) {
        type = typeof type === 'string' ? type.split(this.delimiter) : type.slice(); //
        // Looks for two consecutive '**', if so, don't add the event at all.
        //

        for (var i = 0, len = type.length; i + 1 < len; i++) {
          if (type[i] === '**' && type[i + 1] === '**') {
            return;
          }
        }

        var tree = this.listenerTree;
        var name = type.shift();

        while (name !== undefined) {
          if (!tree[name]) {
            tree[name] = {};
          }

          tree = tree[name];

          if (type.length === 0) {
            if (!tree._listeners) {
              tree._listeners = listener;
            } else {
              if (typeof tree._listeners === 'function') {
                tree._listeners = [tree._listeners];
              }

              tree._listeners.push(listener);

              if (!tree._listeners.warned && this._maxListeners > 0 && tree._listeners.length > this._maxListeners) {
                tree._listeners.warned = true;
                logPossibleMemoryLeak.call(this, tree._listeners.length, name);
              }
            }

            return true;
          }

          name = type.shift();
        }

        return true;
      } // By default EventEmitters will print a warning if more than
      // 10 listeners are added to it. This is a useful default which
      // helps finding memory leaks.
      //
      // Obviously not all Emitters should be limited to 10. This function allows
      // that to be increased. Set to zero for unlimited.


      EventEmitter.prototype.delimiter = '.';

      EventEmitter.prototype.setMaxListeners = function (n) {
        if (n !== undefined) {
          this._maxListeners = n;
          if (!this._conf) this._conf = {};
          this._conf.maxListeners = n;
        }
      };

      EventEmitter.prototype.event = '';

      EventEmitter.prototype.once = function (event, fn) {
        return this._once(event, fn, false);
      };

      EventEmitter.prototype.prependOnceListener = function (event, fn) {
        return this._once(event, fn, true);
      };

      EventEmitter.prototype._once = function (event, fn, prepend) {
        this._many(event, 1, fn, prepend);

        return this;
      };

      EventEmitter.prototype.many = function (event, ttl, fn) {
        return this._many(event, ttl, fn, false);
      };

      EventEmitter.prototype.prependMany = function (event, ttl, fn) {
        return this._many(event, ttl, fn, true);
      };

      EventEmitter.prototype._many = function (event, ttl, fn, prepend) {
        var self = this;

        if (typeof fn !== 'function') {
          throw new Error('many only accepts instances of Function');
        }

        function listener() {
          if (--ttl === 0) {
            self.off(event, listener);
          }

          return fn.apply(this, arguments);
        }

        listener._origin = fn;

        this._on(event, listener, prepend);

        return self;
      };

      EventEmitter.prototype.emit = function () {
        this._events || init.call(this);
        var type = arguments[0];

        if (type === 'newListener' && !this.newListener) {
          if (!this._events.newListener) {
            return false;
          }
        }

        var al = arguments.length;
        var args, l, i, j;
        var handler;

        if (this._all && this._all.length) {
          handler = this._all.slice();

          if (al > 3) {
            args = new Array(al);

            for (j = 0; j < al; j++) args[j] = arguments[j];
          }

          for (i = 0, l = handler.length; i < l; i++) {
            this.event = type;

            switch (al) {
              case 1:
                handler[i].call(this, type);
                break;

              case 2:
                handler[i].call(this, type, arguments[1]);
                break;

              case 3:
                handler[i].call(this, type, arguments[1], arguments[2]);
                break;

              default:
                handler[i].apply(this, args);
            }
          }
        }

        if (this.wildcard) {
          handler = [];
          var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
          searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
        } else {
          handler = this._events[type];

          if (typeof handler === 'function') {
            this.event = type;

            switch (al) {
              case 1:
                handler.call(this);
                break;

              case 2:
                handler.call(this, arguments[1]);
                break;

              case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;

              default:
                args = new Array(al - 1);

                for (j = 1; j < al; j++) args[j - 1] = arguments[j];

                handler.apply(this, args);
            }

            return true;
          } else if (handler) {
            // need to make copy of handlers because list can change in the middle
            // of emit call
            handler = handler.slice();
          }
        }

        if (handler && handler.length) {
          if (al > 3) {
            args = new Array(al - 1);

            for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          }

          for (i = 0, l = handler.length; i < l; i++) {
            this.event = type;

            switch (al) {
              case 1:
                handler[i].call(this);
                break;

              case 2:
                handler[i].call(this, arguments[1]);
                break;

              case 3:
                handler[i].call(this, arguments[1], arguments[2]);
                break;

              default:
                handler[i].apply(this, args);
            }
          }

          return true;
        } else if (!this._all && type === 'error') {
          if (arguments[1] instanceof Error) {
            throw arguments[1]; // Unhandled 'error' event
          } else {
            throw new Error("Uncaught, unspecified 'error' event.");
          }

          return false;
        }

        return !!this._all;
      };

      EventEmitter.prototype.emitAsync = function () {
        this._events || init.call(this);
        var type = arguments[0];

        if (type === 'newListener' && !this.newListener) {
          if (!this._events.newListener) {
            return Promise.resolve([false]);
          }
        }

        var promises = [];
        var al = arguments.length;
        var args, l, i, j;
        var handler;

        if (this._all) {
          if (al > 3) {
            args = new Array(al);

            for (j = 1; j < al; j++) args[j] = arguments[j];
          }

          for (i = 0, l = this._all.length; i < l; i++) {
            this.event = type;

            switch (al) {
              case 1:
                promises.push(this._all[i].call(this, type));
                break;

              case 2:
                promises.push(this._all[i].call(this, type, arguments[1]));
                break;

              case 3:
                promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
                break;

              default:
                promises.push(this._all[i].apply(this, args));
            }
          }
        }

        if (this.wildcard) {
          handler = [];
          var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
          searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
        } else {
          handler = this._events[type];
        }

        if (typeof handler === 'function') {
          this.event = type;

          switch (al) {
            case 1:
              promises.push(handler.call(this));
              break;

            case 2:
              promises.push(handler.call(this, arguments[1]));
              break;

            case 3:
              promises.push(handler.call(this, arguments[1], arguments[2]));
              break;

            default:
              args = new Array(al - 1);

              for (j = 1; j < al; j++) args[j - 1] = arguments[j];

              promises.push(handler.apply(this, args));
          }
        } else if (handler && handler.length) {
          handler = handler.slice();

          if (al > 3) {
            args = new Array(al - 1);

            for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          }

          for (i = 0, l = handler.length; i < l; i++) {
            this.event = type;

            switch (al) {
              case 1:
                promises.push(handler[i].call(this));
                break;

              case 2:
                promises.push(handler[i].call(this, arguments[1]));
                break;

              case 3:
                promises.push(handler[i].call(this, arguments[1], arguments[2]));
                break;

              default:
                promises.push(handler[i].apply(this, args));
            }
          }
        } else if (!this._all && type === 'error') {
          if (arguments[1] instanceof Error) {
            return Promise.reject(arguments[1]); // Unhandled 'error' event
          } else {
            return Promise.reject("Uncaught, unspecified 'error' event.");
          }
        }

        return Promise.all(promises);
      };

      EventEmitter.prototype.on = function (type, listener) {
        return this._on(type, listener, false);
      };

      EventEmitter.prototype.prependListener = function (type, listener) {
        return this._on(type, listener, true);
      };

      EventEmitter.prototype.onAny = function (fn) {
        return this._onAny(fn, false);
      };

      EventEmitter.prototype.prependAny = function (fn) {
        return this._onAny(fn, true);
      };

      EventEmitter.prototype.addListener = EventEmitter.prototype.on;

      EventEmitter.prototype._onAny = function (fn, prepend) {
        if (typeof fn !== 'function') {
          throw new Error('onAny only accepts instances of Function');
        }

        if (!this._all) {
          this._all = [];
        } // Add the function to the event listener collection.


        if (prepend) {
          this._all.unshift(fn);
        } else {
          this._all.push(fn);
        }

        return this;
      };

      EventEmitter.prototype._on = function (type, listener, prepend) {
        if (typeof type === 'function') {
          this._onAny(type, listener);

          return this;
        }

        if (typeof listener !== 'function') {
          throw new Error('on only accepts instances of Function');
        }

        this._events || init.call(this); // To avoid recursion in the case that type == "newListeners"! Before
        // adding it to the listeners, first emit "newListeners".

        this.emit('newListener', type, listener);

        if (this.wildcard) {
          growListenerTree.call(this, type, listener);
          return this;
        }

        if (!this._events[type]) {
          // Optimize the case of one listener. Don't need the extra array object.
          this._events[type] = listener;
        } else {
          if (typeof this._events[type] === 'function') {
            // Change to array.
            this._events[type] = [this._events[type]];
          } // If we've already got an array, just add


          if (prepend) {
            this._events[type].unshift(listener);
          } else {
            this._events[type].push(listener);
          } // Check for listener leak


          if (!this._events[type].warned && this._maxListeners > 0 && this._events[type].length > this._maxListeners) {
            this._events[type].warned = true;
            logPossibleMemoryLeak.call(this, this._events[type].length, type);
          }
        }

        return this;
      };

      EventEmitter.prototype.off = function (type, listener) {
        if (typeof listener !== 'function') {
          throw new Error('removeListener only takes instances of Function');
        }

        var handlers,
            leafs = [];

        if (this.wildcard) {
          var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
          leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
        } else {
          // does not use listeners(), so no side effect of creating _events[type]
          if (!this._events[type]) return this;
          handlers = this._events[type];
          leafs.push({
            _listeners: handlers
          });
        }

        for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
          var leaf = leafs[iLeaf];
          handlers = leaf._listeners;

          if (isArray(handlers)) {
            var position = -1;

            for (var i = 0, length = handlers.length; i < length; i++) {
              if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
                position = i;
                break;
              }
            }

            if (position < 0) {
              continue;
            }

            if (this.wildcard) {
              leaf._listeners.splice(position, 1);
            } else {
              this._events[type].splice(position, 1);
            }

            if (handlers.length === 0) {
              if (this.wildcard) {
                delete leaf._listeners;
              } else {
                delete this._events[type];
              }
            }

            this.emit("removeListener", type, listener);
            return this;
          } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
            if (this.wildcard) {
              delete leaf._listeners;
            } else {
              delete this._events[type];
            }

            this.emit("removeListener", type, listener);
          }
        }

        function recursivelyGarbageCollect(root) {
          if (root === undefined) {
            return;
          }

          var keys = Object.keys(root);

          for (var i in keys) {
            var key = keys[i];
            var obj = root[key];
            if (obj instanceof Function || typeof obj !== "object" || obj === null) continue;

            if (Object.keys(obj).length > 0) {
              recursivelyGarbageCollect(root[key]);
            }

            if (Object.keys(obj).length === 0) {
              delete root[key];
            }
          }
        }

        recursivelyGarbageCollect(this.listenerTree);
        return this;
      };

      EventEmitter.prototype.offAny = function (fn) {
        var i = 0,
            l = 0,
            fns;

        if (fn && this._all && this._all.length > 0) {
          fns = this._all;

          for (i = 0, l = fns.length; i < l; i++) {
            if (fn === fns[i]) {
              fns.splice(i, 1);
              this.emit("removeListenerAny", fn);
              return this;
            }
          }
        } else {
          fns = this._all;

          for (i = 0, l = fns.length; i < l; i++) this.emit("removeListenerAny", fns[i]);

          this._all = [];
        }

        return this;
      };

      EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

      EventEmitter.prototype.removeAllListeners = function (type) {
        if (arguments.length === 0) {
          !this._events || init.call(this);
          return this;
        }

        if (this.wildcard) {
          var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
          var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

          for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
            var leaf = leafs[iLeaf];
            leaf._listeners = null;
          }
        } else if (this._events) {
          this._events[type] = null;
        }

        return this;
      };

      EventEmitter.prototype.listeners = function (type) {
        if (this.wildcard) {
          var handlers = [];
          var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
          searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
          return handlers;
        }

        this._events || init.call(this);
        if (!this._events[type]) this._events[type] = [];

        if (!isArray(this._events[type])) {
          this._events[type] = [this._events[type]];
        }

        return this._events[type];
      };

      EventEmitter.prototype.eventNames = function () {
        return Object.keys(this._events);
      };

      EventEmitter.prototype.listenerCount = function (type) {
        return this.listeners(type).length;
      };

      EventEmitter.prototype.listenersAny = function () {
        if (this._all) {
          return this._all;
        } else {
          return [];
        }
      };

      if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
          return EventEmitter;
        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      } else {}
    }();
    /***/
  },

  /***/
  "./node_modules/object-assign/index.js":
  /*!*********************************************!*\
    !*** ./node_modules/object-assign/index.js ***!
    \*********************************************/

  /*! no static exports found */

  /***/
  function node_modulesObjectAssignIndexJs(module, exports, __webpack_require__) {
    "use strict";
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */

    /* eslint-disable no-unused-vars */

    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
      if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
      }

      return Object(val);
    }

    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        } // Detect buggy property enumeration order in older V8 versions.
        // https://bugs.chromium.org/p/v8/issues/detail?id=4118


        var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

        test1[5] = 'de';

        if (Object.getOwnPropertyNames(test1)[0] === '5') {
          return false;
        } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


        var test2 = {};

        for (var i = 0; i < 10; i++) {
          test2['_' + String.fromCharCode(i)] = i;
        }

        var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
          return test2[n];
        });

        if (order2.join('') !== '0123456789') {
          return false;
        } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


        var test3 = {};
        'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
          test3[letter] = letter;
        });

        if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
          return false;
        }

        return true;
      } catch (err) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
      }
    }

    module.exports = shouldUseNative() ? Object.assign : function (target, source) {
      var from;
      var to = toObject(target);
      var symbols;

      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);

        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }

        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);

          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }

      return to;
    };
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/joystick/joystick.component.html":
  /*!***************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/joystick/joystick.component.html ***!
    \***************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsJoystickJoystickComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "  <ion-fab vertical=\"bottom\" horizontal=\"start\" slot=\"fixed\">\n\n    <ion-button (click)=\"navigationService.move('U')\" style=\"padding-left:34%;\">\n      <ion-icon name=\"arrow-up\"></ion-icon>\n    </ion-button>\n    \n    <div style=\"display:flex\">\n      <ion-button (click)=\"navigationService.move('L')\">\n        <ion-icon name=\"arrow-back\"></ion-icon>\n      </ion-button>\n\n      <ion-button (click)=\"navigationService.move('S')\">\n        <ion-icon name=\"square\"></ion-icon>\n      </ion-button>\n      \n      <ion-button (click)=\"navigationService.move('R')\">\n        <ion-icon name=\"arrow-forward\"></ion-icon>\n      </ion-button>\n    </div>\n\n    <ion-button (click)=\"navigationService.move('D')\" style=\"padding-left:34%;\">\n      <ion-icon name=\"arrow-down\"></ion-icon>\n    </ion-button>\n\n  </ion-fab>\n\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/map/map.component.html":
  /*!*****************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/map/map.component.html ***!
    \*****************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsMapMapComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"form\">\n  <section style=\"display:flex;justify-content: center;\">\n      <p style=\"text-align: center;padding-top:1.5rem;\">Where do you wanna Jinko goes?<BR /> Jinko is going to:\n          {{ navigationService.goalString }} </p>\n  </section>\n\n\n<section class=\"map\">\n  <div class=\"blue\" (click)=\"start(2)\" *ngIf=\"loading || !connected  || service_busy\">\n      <p> STUDY </p>\n  </div>\n  <div class=\"orange\" (click)=\"start(3)\" *ngIf=\"loading || !connected  || service_busy\">\n      <p> GAMES </p>\n  </div>\n\n</section>\n<section class=\"map\">\n  <div class=\"green\" (click)=\"start(1)\" *ngIf=\"loading || !connected  || service_busy\">\n      <p> DOOR </p>\n  </div>\n  <div class=\"red\" (click)=\"start(4)\" *ngIf=\"loading || !connected  || service_busy\">\n      <P>TOUR </P>\n  </div> \n </section>  ";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/streaming/streaming.component.html":
  /*!*****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/streaming/streaming.component.html ***!
    \*****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsStreamingStreamingComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div id=\"divCamera\"></div>\n<joystick [streaming] = \"streaming\"></joystick>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/play/play.page.html":
  /*!*********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/play/play.page.html ***!
    \*********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesPlayPlayPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-toolbar  \n    *ngIf=\"!streaming\">\n    <ion-segment \n        [(ngModel)]=\"view\" \n        (ionChange)=\"show()\">\n        <ion-segment-button \n            value=\"map\">\n            <ion-icon \n                name=\"map-outline\">\n            </ion-icon>\n        </ion-segment-button>\n        <ion-segment-button \n            value=\"camera\">\n                <ion-icon \n                    name=\"camera-outline\">\n                </ion-icon>\n        </ion-segment-button>\n    </ion-segment>\n</ion-toolbar>\n\n<ion-content>\n\n<map \n    *ngIf=\"!streaming\"  \n    [streaming]=\"streaming\">\n</map>\n\n<streaming \n    *ngIf=\"streaming\" \n    [streaming]=\"streaming\">\n</streaming>\n\n<ion-fab \n    vertical=\"start\" \n    horizontal=\"end\" \n    slot=\"fixed\" \n    style=\"padding-top:10px;\"  \n    *ngIf=\"streaming\"> \n\n    <ion-fab-button \n        color=\"light\">\n        <ion-icon \n            name=\"close\" \n            (click)=\"closeStreaming()\">\n        </ion-icon>\n    </ion-fab-button>\n\n</ion-fab>\n\n\n";
    /***/
  },

  /***/
  "./node_modules/roslib/src/RosLib.js":
  /*!*******************************************!*\
    !*** ./node_modules/roslib/src/RosLib.js ***!
    \*******************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcRosLibJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview
     * @author Russell Toris - rctoris@wpi.edu
     */

    /**
     * If you use roslib in a browser, all the classes will be exported to a global variable called ROSLIB.
     *
     * If you use nodejs, this is the variable you get when you require('roslib')
     */
    var ROSLIB = this.ROSLIB || {
      REVISION: '1.1.0'
    };

    var assign = __webpack_require__(
    /*! object-assign */
    "./node_modules/object-assign/index.js"); // Add core components


    assign(ROSLIB, __webpack_require__(
    /*! ./core */
    "./node_modules/roslib/src/core/index.js"));
    assign(ROSLIB, __webpack_require__(
    /*! ./actionlib */
    "./node_modules/roslib/src/actionlib/index.js"));
    assign(ROSLIB, __webpack_require__(
    /*! ./math */
    "./node_modules/roslib/src/math/index.js"));
    assign(ROSLIB, __webpack_require__(
    /*! ./tf */
    "./node_modules/roslib/src/tf/index.js"));
    assign(ROSLIB, __webpack_require__(
    /*! ./urdf */
    "./node_modules/roslib/src/urdf/index.js"));
    module.exports = ROSLIB;
    /***/
  },

  /***/
  "./node_modules/roslib/src/actionlib/ActionClient.js":
  /*!***********************************************************!*\
    !*** ./node_modules/roslib/src/actionlib/ActionClient.js ***!
    \***********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcActionlibActionClientJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview
     * @author Russell Toris - rctoris@wpi.edu
     */
    var Topic = __webpack_require__(
    /*! ../core/Topic */
    "./node_modules/roslib/src/core/Topic.js");

    var Message = __webpack_require__(
    /*! ../core/Message */
    "./node_modules/roslib/src/core/Message.js");

    var EventEmitter2 = __webpack_require__(
    /*! eventemitter2 */
    "./node_modules/eventemitter2/lib/eventemitter2.js").EventEmitter2;
    /**
     * An actionlib action client.
     *
     * Emits the following events:
     *  * 'timeout' - if a timeout occurred while sending a goal
     *  * 'status' - the status messages received from the action server
     *  * 'feedback' -  the feedback messages received from the action server
     *  * 'result' - the result returned from the action server
     *
     *  @constructor
     *  @param options - object with following keys:
     *   * ros - the ROSLIB.Ros connection handle
     *   * serverName - the action server name, like /fibonacci
     *   * actionName - the action message name, like 'actionlib_tutorials/FibonacciAction'
     *   * timeout - the timeout length when connecting to the action server
     */


    function ActionClient(options) {
      var that = this;
      options = options || {};
      this.ros = options.ros;
      this.serverName = options.serverName;
      this.actionName = options.actionName;
      this.timeout = options.timeout;
      this.omitFeedback = options.omitFeedback;
      this.omitStatus = options.omitStatus;
      this.omitResult = options.omitResult;
      this.goals = {}; // flag to check if a status has been received

      var receivedStatus = false; // create the topics associated with actionlib

      this.feedbackListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/feedback',
        messageType: this.actionName + 'Feedback'
      });
      this.statusListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/status',
        messageType: 'actionlib_msgs/GoalStatusArray'
      });
      this.resultListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/result',
        messageType: this.actionName + 'Result'
      });
      this.goalTopic = new Topic({
        ros: this.ros,
        name: this.serverName + '/goal',
        messageType: this.actionName + 'Goal'
      });
      this.cancelTopic = new Topic({
        ros: this.ros,
        name: this.serverName + '/cancel',
        messageType: 'actionlib_msgs/GoalID'
      }); // advertise the goal and cancel topics

      this.goalTopic.advertise();
      this.cancelTopic.advertise(); // subscribe to the status topic

      if (!this.omitStatus) {
        this.statusListener.subscribe(function (statusMessage) {
          receivedStatus = true;
          statusMessage.status_list.forEach(function (status) {
            var goal = that.goals[status.goal_id.id];

            if (goal) {
              goal.emit('status', status);
            }
          });
        });
      } // subscribe the the feedback topic


      if (!this.omitFeedback) {
        this.feedbackListener.subscribe(function (feedbackMessage) {
          var goal = that.goals[feedbackMessage.status.goal_id.id];

          if (goal) {
            goal.emit('status', feedbackMessage.status);
            goal.emit('feedback', feedbackMessage.feedback);
          }
        });
      } // subscribe to the result topic


      if (!this.omitResult) {
        this.resultListener.subscribe(function (resultMessage) {
          var goal = that.goals[resultMessage.status.goal_id.id];

          if (goal) {
            goal.emit('status', resultMessage.status);
            goal.emit('result', resultMessage.result);
          }
        });
      } // If timeout specified, emit a 'timeout' event if the action server does not respond


      if (this.timeout) {
        setTimeout(function () {
          if (!receivedStatus) {
            that.emit('timeout');
          }
        }, this.timeout);
      }
    }

    ActionClient.prototype.__proto__ = EventEmitter2.prototype;
    /**
     * Cancel all goals associated with this ActionClient.
     */

    ActionClient.prototype.cancel = function () {
      var cancelMessage = new Message();
      this.cancelTopic.publish(cancelMessage);
    };
    /**
     * Unsubscribe and unadvertise all topics associated with this ActionClient.
     */


    ActionClient.prototype.dispose = function () {
      this.goalTopic.unadvertise();
      this.cancelTopic.unadvertise();

      if (!this.omitStatus) {
        this.statusListener.unsubscribe();
      }

      if (!this.omitFeedback) {
        this.feedbackListener.unsubscribe();
      }

      if (!this.omitResult) {
        this.resultListener.unsubscribe();
      }
    };

    module.exports = ActionClient;
    /***/
  },

  /***/
  "./node_modules/roslib/src/actionlib/ActionListener.js":
  /*!*************************************************************!*\
    !*** ./node_modules/roslib/src/actionlib/ActionListener.js ***!
    \*************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcActionlibActionListenerJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview
     * @author Justin Young - justin@oodar.com.au
     * @author Russell Toris - rctoris@wpi.edu
     */
    var Topic = __webpack_require__(
    /*! ../core/Topic */
    "./node_modules/roslib/src/core/Topic.js");

    var Message = __webpack_require__(
    /*! ../core/Message */
    "./node_modules/roslib/src/core/Message.js");

    var EventEmitter2 = __webpack_require__(
    /*! eventemitter2 */
    "./node_modules/eventemitter2/lib/eventemitter2.js").EventEmitter2;
    /**
     * An actionlib action listener
     *
     * Emits the following events:
     *  * 'status' - the status messages received from the action server
     *  * 'feedback' -  the feedback messages received from the action server
     *  * 'result' - the result returned from the action server
     *
     *  @constructor
     *  @param options - object with following keys:
     *   * ros - the ROSLIB.Ros connection handle
     *   * serverName - the action server name, like /fibonacci
     *   * actionName - the action message name, like 'actionlib_tutorials/FibonacciAction'
     */


    function ActionListener(options) {
      var that = this;
      options = options || {};
      this.ros = options.ros;
      this.serverName = options.serverName;
      this.actionName = options.actionName;
      this.timeout = options.timeout;
      this.omitFeedback = options.omitFeedback;
      this.omitStatus = options.omitStatus;
      this.omitResult = options.omitResult; // create the topics associated with actionlib

      var goalListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/goal',
        messageType: this.actionName + 'Goal'
      });
      var feedbackListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/feedback',
        messageType: this.actionName + 'Feedback'
      });
      var statusListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/status',
        messageType: 'actionlib_msgs/GoalStatusArray'
      });
      var resultListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/result',
        messageType: this.actionName + 'Result'
      });
      goalListener.subscribe(function (goalMessage) {
        that.emit('goal', goalMessage);
      });
      statusListener.subscribe(function (statusMessage) {
        statusMessage.status_list.forEach(function (status) {
          that.emit('status', status);
        });
      });
      feedbackListener.subscribe(function (feedbackMessage) {
        that.emit('status', feedbackMessage.status);
        that.emit('feedback', feedbackMessage.feedback);
      }); // subscribe to the result topic

      resultListener.subscribe(function (resultMessage) {
        that.emit('status', resultMessage.status);
        that.emit('result', resultMessage.result);
      });
    }

    ActionListener.prototype.__proto__ = EventEmitter2.prototype;
    module.exports = ActionListener;
    /***/
  },

  /***/
  "./node_modules/roslib/src/actionlib/Goal.js":
  /*!***************************************************!*\
    !*** ./node_modules/roslib/src/actionlib/Goal.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcActionlibGoalJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview
     * @author Russell Toris - rctoris@wpi.edu
     */
    var Message = __webpack_require__(
    /*! ../core/Message */
    "./node_modules/roslib/src/core/Message.js");

    var EventEmitter2 = __webpack_require__(
    /*! eventemitter2 */
    "./node_modules/eventemitter2/lib/eventemitter2.js").EventEmitter2;
    /**
     * An actionlib goal goal is associated with an action server.
     *
     * Emits the following events:
     *  * 'timeout' - if a timeout occurred while sending a goal
     *
     *  @constructor
     *  @param object with following keys:
     *   * actionClient - the ROSLIB.ActionClient to use with this goal
     *   * goalMessage - The JSON object containing the goal for the action server
     */


    function Goal(options) {
      var that = this;
      this.actionClient = options.actionClient;
      this.goalMessage = options.goalMessage;
      this.isFinished = false; // Used to create random IDs

      var date = new Date(); // Create a random ID

      this.goalID = 'goal_' + Math.random() + '_' + date.getTime(); // Fill in the goal message

      this.goalMessage = new Message({
        goal_id: {
          stamp: {
            secs: 0,
            nsecs: 0
          },
          id: this.goalID
        },
        goal: this.goalMessage
      });
      this.on('status', function (status) {
        that.status = status;
      });
      this.on('result', function (result) {
        that.isFinished = true;
        that.result = result;
      });
      this.on('feedback', function (feedback) {
        that.feedback = feedback;
      }); // Add the goal

      this.actionClient.goals[this.goalID] = this;
    }

    Goal.prototype.__proto__ = EventEmitter2.prototype;
    /**
     * Send the goal to the action server.
     *
     * @param timeout (optional) - a timeout length for the goal's result
     */

    Goal.prototype.send = function (timeout) {
      var that = this;
      that.actionClient.goalTopic.publish(that.goalMessage);

      if (timeout) {
        setTimeout(function () {
          if (!that.isFinished) {
            that.emit('timeout');
          }
        }, timeout);
      }
    };
    /**
     * Cancel the current goal.
     */


    Goal.prototype.cancel = function () {
      var cancelMessage = new Message({
        id: this.goalID
      });
      this.actionClient.cancelTopic.publish(cancelMessage);
    };

    module.exports = Goal;
    /***/
  },

  /***/
  "./node_modules/roslib/src/actionlib/SimpleActionServer.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/roslib/src/actionlib/SimpleActionServer.js ***!
    \*****************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcActionlibSimpleActionServerJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview
     * @author Laura Lindzey - lindzey@gmail.com
     */
    var Topic = __webpack_require__(
    /*! ../core/Topic */
    "./node_modules/roslib/src/core/Topic.js");

    var Message = __webpack_require__(
    /*! ../core/Message */
    "./node_modules/roslib/src/core/Message.js");

    var EventEmitter2 = __webpack_require__(
    /*! eventemitter2 */
    "./node_modules/eventemitter2/lib/eventemitter2.js").EventEmitter2;
    /**
     * An actionlib action server client.
     *
     * Emits the following events:
     *  * 'goal' - goal sent by action client
     *  * 'cancel' - action client has canceled the request
     *
     *  @constructor
     *  @param options - object with following keys:
     *   * ros - the ROSLIB.Ros connection handle
     *   * serverName - the action server name, like /fibonacci
     *   * actionName - the action message name, like 'actionlib_tutorials/FibonacciAction'
     */


    function SimpleActionServer(options) {
      var that = this;
      options = options || {};
      this.ros = options.ros;
      this.serverName = options.serverName;
      this.actionName = options.actionName; // create and advertise publishers

      this.feedbackPublisher = new Topic({
        ros: this.ros,
        name: this.serverName + '/feedback',
        messageType: this.actionName + 'Feedback'
      });
      this.feedbackPublisher.advertise();
      var statusPublisher = new Topic({
        ros: this.ros,
        name: this.serverName + '/status',
        messageType: 'actionlib_msgs/GoalStatusArray'
      });
      statusPublisher.advertise();
      this.resultPublisher = new Topic({
        ros: this.ros,
        name: this.serverName + '/result',
        messageType: this.actionName + 'Result'
      });
      this.resultPublisher.advertise(); // create and subscribe to listeners

      var goalListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/goal',
        messageType: this.actionName + 'Goal'
      });
      var cancelListener = new Topic({
        ros: this.ros,
        name: this.serverName + '/cancel',
        messageType: 'actionlib_msgs/GoalID'
      }); // Track the goals and their status in order to publish status...

      this.statusMessage = new Message({
        header: {
          stamp: {
            secs: 0,
            nsecs: 100
          },
          frame_id: ''
        },
        status_list: []
      }); // needed for handling preemption prompted by a new goal being received

      this.currentGoal = null; // currently tracked goal

      this.nextGoal = null; // the one that'll be preempting

      goalListener.subscribe(function (goalMessage) {
        if (that.currentGoal) {
          that.nextGoal = goalMessage; // needs to happen AFTER rest is set up

          that.emit('cancel');
        } else {
          that.statusMessage.status_list = [{
            goal_id: goalMessage.goal_id,
            status: 1
          }];
          that.currentGoal = goalMessage;
          that.emit('goal', goalMessage.goal);
        }
      }); // helper function for determing ordering of timestamps
      // returns t1 < t2

      var isEarlier = function isEarlier(t1, t2) {
        if (t1.secs > t2.secs) {
          return false;
        } else if (t1.secs < t2.secs) {
          return true;
        } else if (t1.nsecs < t2.nsecs) {
          return true;
        } else {
          return false;
        }
      }; // TODO: this may be more complicated than necessary, since I'm
      // not sure if the callbacks can ever wind up with a scenario
      // where we've been preempted by a next goal, it hasn't finished
      // processing, and then we get a cancel message


      cancelListener.subscribe(function (cancelMessage) {
        // cancel ALL goals if both empty
        if (cancelMessage.stamp.secs === 0 && cancelMessage.stamp.secs === 0 && cancelMessage.id === '') {
          that.nextGoal = null;

          if (that.currentGoal) {
            that.emit('cancel');
          }
        } else {
          // treat id and stamp independently
          if (that.currentGoal && cancelMessage.id === that.currentGoal.goal_id.id) {
            that.emit('cancel');
          } else if (that.nextGoal && cancelMessage.id === that.nextGoal.goal_id.id) {
            that.nextGoal = null;
          }

          if (that.nextGoal && isEarlier(that.nextGoal.goal_id.stamp, cancelMessage.stamp)) {
            that.nextGoal = null;
          }

          if (that.currentGoal && isEarlier(that.currentGoal.goal_id.stamp, cancelMessage.stamp)) {
            that.emit('cancel');
          }
        }
      }); // publish status at pseudo-fixed rate; required for clients to know they've connected

      var statusInterval = setInterval(function () {
        var currentTime = new Date();
        var secs = Math.floor(currentTime.getTime() / 1000);
        var nsecs = Math.round(1000000000 * (currentTime.getTime() / 1000 - secs));
        that.statusMessage.header.stamp.secs = secs;
        that.statusMessage.header.stamp.nsecs = nsecs;
        statusPublisher.publish(that.statusMessage);
      }, 500); // publish every 500ms
    }

    SimpleActionServer.prototype.__proto__ = EventEmitter2.prototype;
    /**
    *  Set action state to succeeded and return to client
    */

    SimpleActionServer.prototype.setSucceeded = function (result2) {
      var resultMessage = new Message({
        status: {
          goal_id: this.currentGoal.goal_id,
          status: 3
        },
        result: result2
      });
      this.resultPublisher.publish(resultMessage);
      this.statusMessage.status_list = [];

      if (this.nextGoal) {
        this.currentGoal = this.nextGoal;
        this.nextGoal = null;
        this.emit('goal', this.currentGoal.goal);
      } else {
        this.currentGoal = null;
      }
    };
    /**
    *  Function to send feedback
    */


    SimpleActionServer.prototype.sendFeedback = function (feedback2) {
      var feedbackMessage = new Message({
        status: {
          goal_id: this.currentGoal.goal_id,
          status: 1
        },
        feedback: feedback2
      });
      this.feedbackPublisher.publish(feedbackMessage);
    };
    /**
    *  Handle case where client requests preemption
    */


    SimpleActionServer.prototype.setPreempted = function () {
      this.statusMessage.status_list = [];
      var resultMessage = new Message({
        status: {
          goal_id: this.currentGoal.goal_id,
          status: 2
        }
      });
      this.resultPublisher.publish(resultMessage);

      if (this.nextGoal) {
        this.currentGoal = this.nextGoal;
        this.nextGoal = null;
        this.emit('goal', this.currentGoal.goal);
      } else {
        this.currentGoal = null;
      }
    };

    module.exports = SimpleActionServer;
    /***/
  },

  /***/
  "./node_modules/roslib/src/actionlib/index.js":
  /*!****************************************************!*\
    !*** ./node_modules/roslib/src/actionlib/index.js ***!
    \****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcActionlibIndexJs(module, exports, __webpack_require__) {
    var Ros = __webpack_require__(
    /*! ../core/Ros */
    "./node_modules/roslib/src/core/Ros.js");

    var mixin = __webpack_require__(
    /*! ../mixin */
    "./node_modules/roslib/src/mixin.js");

    var action = module.exports = {
      ActionClient: __webpack_require__(
      /*! ./ActionClient */
      "./node_modules/roslib/src/actionlib/ActionClient.js"),
      ActionListener: __webpack_require__(
      /*! ./ActionListener */
      "./node_modules/roslib/src/actionlib/ActionListener.js"),
      Goal: __webpack_require__(
      /*! ./Goal */
      "./node_modules/roslib/src/actionlib/Goal.js"),
      SimpleActionServer: __webpack_require__(
      /*! ./SimpleActionServer */
      "./node_modules/roslib/src/actionlib/SimpleActionServer.js")
    };
    mixin(Ros, ['ActionClient', 'SimpleActionServer'], action);
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/Message.js":
  /*!*************************************************!*\
    !*** ./node_modules/roslib/src/core/Message.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreMessageJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author Brandon Alexander - baalexander@gmail.com
     */
    var assign = __webpack_require__(
    /*! object-assign */
    "./node_modules/object-assign/index.js");
    /**
     * Message objects are used for publishing and subscribing to and from topics.
     *
     * @constructor
     * @param values - object matching the fields defined in the .msg definition file
     */


    function Message(values) {
      assign(this, values);
    }

    module.exports = Message;
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/Param.js":
  /*!***********************************************!*\
    !*** ./node_modules/roslib/src/core/Param.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreParamJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author Brandon Alexander - baalexander@gmail.com
     */
    var Service = __webpack_require__(
    /*! ./Service */
    "./node_modules/roslib/src/core/Service.js");

    var ServiceRequest = __webpack_require__(
    /*! ./ServiceRequest */
    "./node_modules/roslib/src/core/ServiceRequest.js");
    /**
     * A ROS parameter.
     *
     * @constructor
     * @param options - possible keys include:
     *   * ros - the ROSLIB.Ros connection handle
     *   * name - the param name, like max_vel_x
     */


    function Param(options) {
      options = options || {};
      this.ros = options.ros;
      this.name = options.name;
    }
    /**
     * Fetches the value of the param.
     *
     * @param callback - function with the following params:
     *  * value - the value of the param from ROS.
     */


    Param.prototype.get = function (callback) {
      var paramClient = new Service({
        ros: this.ros,
        name: '/rosapi/get_param',
        serviceType: 'rosapi/GetParam'
      });
      var request = new ServiceRequest({
        name: this.name
      });
      paramClient.callService(request, function (result) {
        var value = JSON.parse(result.value);
        callback(value);
      });
    };
    /**
     * Sets the value of the param in ROS.
     *
     * @param value - value to set param to.
     */


    Param.prototype.set = function (value, callback) {
      var paramClient = new Service({
        ros: this.ros,
        name: '/rosapi/set_param',
        serviceType: 'rosapi/SetParam'
      });
      var request = new ServiceRequest({
        name: this.name,
        value: JSON.stringify(value)
      });
      paramClient.callService(request, callback);
    };
    /**
     * Delete this parameter on the ROS server.
     */


    Param.prototype.delete = function (callback) {
      var paramClient = new Service({
        ros: this.ros,
        name: '/rosapi/delete_param',
        serviceType: 'rosapi/DeleteParam'
      });
      var request = new ServiceRequest({
        name: this.name
      });
      paramClient.callService(request, callback);
    };

    module.exports = Param;
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/Ros.js":
  /*!*********************************************!*\
    !*** ./node_modules/roslib/src/core/Ros.js ***!
    \*********************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreRosJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author Brandon Alexander - baalexander@gmail.com
     */
    var WebSocket = __webpack_require__(
    /*! ws */
    "./node_modules/roslib/src/util/shim/WebSocket.js");

    var WorkerSocket = __webpack_require__(
    /*! ../util/workerSocket */
    "./node_modules/roslib/src/util/workerSocket.js");

    var socketAdapter = __webpack_require__(
    /*! ./SocketAdapter.js */
    "./node_modules/roslib/src/core/SocketAdapter.js");

    var Service = __webpack_require__(
    /*! ./Service */
    "./node_modules/roslib/src/core/Service.js");

    var ServiceRequest = __webpack_require__(
    /*! ./ServiceRequest */
    "./node_modules/roslib/src/core/ServiceRequest.js");

    var assign = __webpack_require__(
    /*! object-assign */
    "./node_modules/object-assign/index.js");

    var EventEmitter2 = __webpack_require__(
    /*! eventemitter2 */
    "./node_modules/eventemitter2/lib/eventemitter2.js").EventEmitter2;
    /**
     * Manages connection to the server and all interactions with ROS.
     *
     * Emits the following events:
     *  * 'error' - there was an error with ROS
     *  * 'connection' - connected to the WebSocket server
     *  * 'close' - disconnected to the WebSocket server
     *  * <topicName> - a message came from rosbridge with the given topic name
     *  * <serviceID> - a service response came from rosbridge with the given ID
     *
     * @constructor
     * @param options - possible keys include: <br>
     *   * url (optional) - (can be specified later with `connect`) the WebSocket URL for rosbridge or the node server url to connect using socket.io (if socket.io exists in the page) <br>
     *   * groovyCompatibility - don't use interfaces that changed after the last groovy release or rosbridge_suite and related tools (defaults to true)
     *   * transportLibrary (optional) - one of 'websocket', 'workersocket' (default), 'socket.io' or RTCPeerConnection instance controlling how the connection is created in `connect`.
     *   * transportOptions (optional) - the options to use use when creating a connection. Currently only used if `transportLibrary` is RTCPeerConnection.
     */


    function Ros(options) {
      options = options || {};
      this.socket = null;
      this.idCounter = 0;
      this.isConnected = false;
      this.transportLibrary = options.transportLibrary || 'websocket';
      this.transportOptions = options.transportOptions || {};

      if (typeof options.groovyCompatibility === 'undefined') {
        this.groovyCompatibility = true;
      } else {
        this.groovyCompatibility = options.groovyCompatibility;
      } // Sets unlimited event listeners.


      this.setMaxListeners(0); // begin by checking if a URL was given

      if (options.url) {
        this.connect(options.url);
      }
    }

    Ros.prototype.__proto__ = EventEmitter2.prototype;
    /**
     * Connect to the specified WebSocket.
     *
     * @param url - WebSocket URL or RTCDataChannel label for Rosbridge
     */

    Ros.prototype.connect = function (url) {
      if (this.transportLibrary === 'socket.io') {
        this.socket = assign(io(url, {
          'force new connection': true
        }), socketAdapter(this));
        this.socket.on('connect', this.socket.onopen);
        this.socket.on('data', this.socket.onmessage);
        this.socket.on('close', this.socket.onclose);
        this.socket.on('error', this.socket.onerror);
      } else if (this.transportLibrary.constructor.name === 'RTCPeerConnection') {
        this.socket = assign(this.transportLibrary.createDataChannel(url, this.transportOptions), socketAdapter(this));
      } else if (this.transportLibrary === 'websocket') {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
          var sock = new WebSocket(url);
          sock.binaryType = 'arraybuffer';
          this.socket = assign(sock, socketAdapter(this));
        }
      } else if (this.transportLibrary === 'workersocket') {
        this.socket = assign(new WorkerSocket(url), socketAdapter(this));
      } else {
        throw 'Unknown transportLibrary: ' + this.transportLibrary.toString();
      }
    };
    /**
     * Disconnect from the WebSocket server.
     */


    Ros.prototype.close = function () {
      if (this.socket) {
        this.socket.close();
      }
    };
    /**
     * Sends an authorization request to the server.
     *
     * @param mac - MAC (hash) string given by the trusted source.
     * @param client - IP of the client.
     * @param dest - IP of the destination.
     * @param rand - Random string given by the trusted source.
     * @param t - Time of the authorization request.
     * @param level - User level as a string given by the client.
     * @param end - End time of the client's session.
     */


    Ros.prototype.authenticate = function (mac, client, dest, rand, t, level, end) {
      // create the request
      var auth = {
        op: 'auth',
        mac: mac,
        client: client,
        dest: dest,
        rand: rand,
        t: t,
        level: level,
        end: end
      }; // send the request

      this.callOnConnection(auth);
    };
    /**
     * Sends the message over the WebSocket, but queues the message up if not yet
     * connected.
     */


    Ros.prototype.callOnConnection = function (message) {
      var that = this;
      var messageJson = JSON.stringify(message);
      var emitter = null;

      if (this.transportLibrary === 'socket.io') {
        emitter = function emitter(msg) {
          that.socket.emit('operation', msg);
        };
      } else {
        emitter = function emitter(msg) {
          that.socket.send(msg);
        };
      }

      if (!this.isConnected) {
        that.once('connection', function () {
          emitter(messageJson);
        });
      } else {
        emitter(messageJson);
      }
    };
    /**
     * Sends a set_level request to the server
     *
     * @param level - Status level (none, error, warning, info)
     * @param id - Optional: Operation ID to change status level on
     */


    Ros.prototype.setStatusLevel = function (level, id) {
      var levelMsg = {
        op: 'set_level',
        level: level,
        id: id
      };
      this.callOnConnection(levelMsg);
    };
    /**
     * Retrieves Action Servers in ROS as an array of string
     *
     * @param callback function with params:
     *   * actionservers - Array of action server names
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getActionServers = function (callback, failedCallback) {
      var getActionServers = new Service({
        ros: this,
        name: '/rosapi/action_servers',
        serviceType: 'rosapi/GetActionServers'
      });
      var request = new ServiceRequest({});

      if (typeof failedCallback === 'function') {
        getActionServers.callService(request, function (result) {
          callback(result.action_servers);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        getActionServers.callService(request, function (result) {
          callback(result.action_servers);
        });
      }
    };
    /**
     * Retrieves list of topics in ROS as an array.
     *
     * @param callback function with params:
     *   * topics - Array of topic names
     *   * types - Array of message type names
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getTopics = function (callback, failedCallback) {
      var topicsClient = new Service({
        ros: this,
        name: '/rosapi/topics',
        serviceType: 'rosapi/Topics'
      });
      var request = new ServiceRequest();

      if (typeof failedCallback === 'function') {
        topicsClient.callService(request, function (result) {
          callback(result);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        topicsClient.callService(request, function (result) {
          callback(result);
        });
      }
    };
    /**
     * Retrieves Topics in ROS as an array as specific type
     *
     * @param topicType topic type to find
     * @param callback function with params:
     *   * topics - Array of topic names
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getTopicsForType = function (topicType, callback, failedCallback) {
      var topicsForTypeClient = new Service({
        ros: this,
        name: '/rosapi/topics_for_type',
        serviceType: 'rosapi/TopicsForType'
      });
      var request = new ServiceRequest({
        type: topicType
      });

      if (typeof failedCallback === 'function') {
        topicsForTypeClient.callService(request, function (result) {
          callback(result.topics);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        topicsForTypeClient.callService(request, function (result) {
          callback(result.topics);
        });
      }
    };
    /**
     * Retrieves list of active service names in ROS.
     *
     * @param callback - function with the following params:
     *   * services - array of service names
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getServices = function (callback, failedCallback) {
      var servicesClient = new Service({
        ros: this,
        name: '/rosapi/services',
        serviceType: 'rosapi/Services'
      });
      var request = new ServiceRequest();

      if (typeof failedCallback === 'function') {
        servicesClient.callService(request, function (result) {
          callback(result.services);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        servicesClient.callService(request, function (result) {
          callback(result.services);
        });
      }
    };
    /**
     * Retrieves list of services in ROS as an array as specific type
     *
     * @param serviceType service type to find
     * @param callback function with params:
     *   * topics - Array of service names
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getServicesForType = function (serviceType, callback, failedCallback) {
      var servicesForTypeClient = new Service({
        ros: this,
        name: '/rosapi/services_for_type',
        serviceType: 'rosapi/ServicesForType'
      });
      var request = new ServiceRequest({
        type: serviceType
      });

      if (typeof failedCallback === 'function') {
        servicesForTypeClient.callService(request, function (result) {
          callback(result.services);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        servicesForTypeClient.callService(request, function (result) {
          callback(result.services);
        });
      }
    };
    /**
     * Retrieves a detail of ROS service request.
     *
     * @param service name of service:
     * @param callback - function with params:
     *   * type - String of the service type
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getServiceRequestDetails = function (type, callback, failedCallback) {
      var serviceTypeClient = new Service({
        ros: this,
        name: '/rosapi/service_request_details',
        serviceType: 'rosapi/ServiceRequestDetails'
      });
      var request = new ServiceRequest({
        type: type
      });

      if (typeof failedCallback === 'function') {
        serviceTypeClient.callService(request, function (result) {
          callback(result);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        serviceTypeClient.callService(request, function (result) {
          callback(result);
        });
      }
    };
    /**
     * Retrieves a detail of ROS service request.
     *
     * @param service name of service
     * @param callback - function with params:
     *   * type - String of the service type
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getServiceResponseDetails = function (type, callback, failedCallback) {
      var serviceTypeClient = new Service({
        ros: this,
        name: '/rosapi/service_response_details',
        serviceType: 'rosapi/ServiceResponseDetails'
      });
      var request = new ServiceRequest({
        type: type
      });

      if (typeof failedCallback === 'function') {
        serviceTypeClient.callService(request, function (result) {
          callback(result);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        serviceTypeClient.callService(request, function (result) {
          callback(result);
        });
      }
    };
    /**
     * Retrieves list of active node names in ROS.
     *
     * @param callback - function with the following params:
     *   * nodes - array of node names
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getNodes = function (callback, failedCallback) {
      var nodesClient = new Service({
        ros: this,
        name: '/rosapi/nodes',
        serviceType: 'rosapi/Nodes'
      });
      var request = new ServiceRequest();

      if (typeof failedCallback === 'function') {
        nodesClient.callService(request, function (result) {
          callback(result.nodes);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        nodesClient.callService(request, function (result) {
          callback(result.nodes);
        });
      }
    };
    /**
      * Retrieves list subscribed topics, publishing topics and services of a specific node
      *
      * @param node name of the node:
      * @param callback - function with params:
      *   * publications - array of published topic names
      *   * subscriptions - array of subscribed topic names
      *   * services - array of service names hosted
      * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
      */


    Ros.prototype.getNodeDetails = function (node, callback, failedCallback) {
      var nodesClient = new Service({
        ros: this,
        name: '/rosapi/node_details',
        serviceType: 'rosapi/NodeDetails'
      });
      var request = new ServiceRequest({
        node: node
      });

      if (typeof failedCallback === 'function') {
        nodesClient.callService(request, function (result) {
          callback(result.subscribing, result.publishing, result.services);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        nodesClient.callService(request, function (result) {
          callback(result);
        });
      }
    };
    /**
     * Retrieves list of param names from the ROS Parameter Server.
     *
     * @param callback function with params:
     *  * params - array of param names.
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getParams = function (callback, failedCallback) {
      var paramsClient = new Service({
        ros: this,
        name: '/rosapi/get_param_names',
        serviceType: 'rosapi/GetParamNames'
      });
      var request = new ServiceRequest();

      if (typeof failedCallback === 'function') {
        paramsClient.callService(request, function (result) {
          callback(result.names);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        paramsClient.callService(request, function (result) {
          callback(result.names);
        });
      }
    };
    /**
     * Retrieves a type of ROS topic.
     *
     * @param topic name of the topic:
     * @param callback - function with params:
     *   * type - String of the topic type
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getTopicType = function (topic, callback, failedCallback) {
      var topicTypeClient = new Service({
        ros: this,
        name: '/rosapi/topic_type',
        serviceType: 'rosapi/TopicType'
      });
      var request = new ServiceRequest({
        topic: topic
      });

      if (typeof failedCallback === 'function') {
        topicTypeClient.callService(request, function (result) {
          callback(result.type);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        topicTypeClient.callService(request, function (result) {
          callback(result.type);
        });
      }
    };
    /**
     * Retrieves a type of ROS service.
     *
     * @param service name of service:
     * @param callback - function with params:
     *   * type - String of the service type
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getServiceType = function (service, callback, failedCallback) {
      var serviceTypeClient = new Service({
        ros: this,
        name: '/rosapi/service_type',
        serviceType: 'rosapi/ServiceType'
      });
      var request = new ServiceRequest({
        service: service
      });

      if (typeof failedCallback === 'function') {
        serviceTypeClient.callService(request, function (result) {
          callback(result.type);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        serviceTypeClient.callService(request, function (result) {
          callback(result.type);
        });
      }
    };
    /**
     * Retrieves a detail of ROS message.
     *
     * @param message - String of a topic type
     * @param callback - function with params:
     *   * details - Array of the message detail
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */


    Ros.prototype.getMessageDetails = function (message, callback, failedCallback) {
      var messageDetailClient = new Service({
        ros: this,
        name: '/rosapi/message_details',
        serviceType: 'rosapi/MessageDetails'
      });
      var request = new ServiceRequest({
        type: message
      });

      if (typeof failedCallback === 'function') {
        messageDetailClient.callService(request, function (result) {
          callback(result.typedefs);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        messageDetailClient.callService(request, function (result) {
          callback(result.typedefs);
        });
      }
    };
    /**
     * Decode a typedefs into a dictionary like `rosmsg show foo/bar`
     *
     * @param defs - array of type_def dictionary
     */


    Ros.prototype.decodeTypeDefs = function (defs) {
      var that = this; // calls itself recursively to resolve type definition using hints.

      var decodeTypeDefsRec = function decodeTypeDefsRec(theType, hints) {
        var typeDefDict = {};

        for (var i = 0; i < theType.fieldnames.length; i++) {
          var arrayLen = theType.fieldarraylen[i];
          var fieldName = theType.fieldnames[i];
          var fieldType = theType.fieldtypes[i];

          if (fieldType.indexOf('/') === -1) {
            // check the fieldType includes '/' or not
            if (arrayLen === -1) {
              typeDefDict[fieldName] = fieldType;
            } else {
              typeDefDict[fieldName] = [fieldType];
            }
          } else {
            // lookup the name
            var sub = false;

            for (var j = 0; j < hints.length; j++) {
              if (hints[j].type.toString() === fieldType.toString()) {
                sub = hints[j];
                break;
              }
            }

            if (sub) {
              var subResult = decodeTypeDefsRec(sub, hints);

              if (arrayLen === -1) {} else {
                typeDefDict[fieldName] = [subResult];
              }
            } else {
              that.emit('error', 'Cannot find ' + fieldType + ' in decodeTypeDefs');
            }
          }
        }

        return typeDefDict;
      };

      return decodeTypeDefsRec(defs[0], defs);
    };
    /**
     * Retrieves list of topics and their associated type definitions.
     *
     * @param callback function with params:
     *   * topics - Array of topic names
     *   * types - Array of message type names
     *   * typedefs_full_text - Array of full definitions of message types, similar to `gendeps --cat`
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     *
     */


    Ros.prototype.getTopicsAndRawTypes = function (callback, failedCallback) {
      var topicsAndRawTypesClient = new Service({
        ros: this,
        name: '/rosapi/topics_and_raw_types',
        serviceType: 'rosapi/TopicsAndRawTypes'
      });
      var request = new ServiceRequest();

      if (typeof failedCallback === 'function') {
        topicsAndRawTypesClient.callService(request, function (result) {
          callback(result);
        }, function (message) {
          failedCallback(message);
        });
      } else {
        topicsAndRawTypesClient.callService(request, function (result) {
          callback(result);
        });
      }
    };

    module.exports = Ros;
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/Service.js":
  /*!*************************************************!*\
    !*** ./node_modules/roslib/src/core/Service.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreServiceJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author Brandon Alexander - baalexander@gmail.com
     */
    var ServiceResponse = __webpack_require__(
    /*! ./ServiceResponse */
    "./node_modules/roslib/src/core/ServiceResponse.js");

    var ServiceRequest = __webpack_require__(
    /*! ./ServiceRequest */
    "./node_modules/roslib/src/core/ServiceRequest.js");

    var EventEmitter2 = __webpack_require__(
    /*! eventemitter2 */
    "./node_modules/eventemitter2/lib/eventemitter2.js").EventEmitter2;
    /**
     * A ROS service client.
     *
     * @constructor
     * @params options - possible keys include:
     *   * ros - the ROSLIB.Ros connection handle
     *   * name - the service name, like /add_two_ints
     *   * serviceType - the service type, like 'rospy_tutorials/AddTwoInts'
     */


    function Service(options) {
      options = options || {};
      this.ros = options.ros;
      this.name = options.name;
      this.serviceType = options.serviceType;
      this.isAdvertised = false;
      this._serviceCallback = null;
    }

    Service.prototype.__proto__ = EventEmitter2.prototype;
    /**
     * Calls the service. Returns the service response in the
     * callback. Does nothing if this service is currently advertised.
     *
     * @param request - the ROSLIB.ServiceRequest to send
     * @param callback - function with params:
     *   * response - the response from the service request
     * @param failedCallback - the callback function when the service call failed (optional). Params:
     *   * error - the error message reported by ROS
     */

    Service.prototype.callService = function (request, callback, failedCallback) {
      if (this.isAdvertised) {
        return;
      }

      var serviceCallId = 'call_service:' + this.name + ':' + ++this.ros.idCounter;

      if (callback || failedCallback) {
        this.ros.once(serviceCallId, function (message) {
          if (message.result !== undefined && message.result === false) {
            if (typeof failedCallback === 'function') {
              failedCallback(message.values);
            }
          } else if (typeof callback === 'function') {
            callback(new ServiceResponse(message.values));
          }
        });
      }

      var call = {
        op: 'call_service',
        id: serviceCallId,
        service: this.name,
        type: this.serviceType,
        args: request
      };
      this.ros.callOnConnection(call);
    };
    /**
     * Advertise the service. This turns the Service object from a client
     * into a server. The callback will be called with every request
     * that's made on this service.
     *
     * @param callback - This works similarly to the callback for a C++ service and should take the following params:
     *   * request - the service request
     *   * response - an empty dictionary. Take care not to overwrite this. Instead, only modify the values within.
     *   It should return true if the service has finished successfully,
     *   i.e. without any fatal errors.
     */


    Service.prototype.advertise = function (callback) {
      if (this.isAdvertised || typeof callback !== 'function') {
        return;
      }

      this._serviceCallback = callback;
      this.ros.on(this.name, this._serviceResponse.bind(this));
      this.ros.callOnConnection({
        op: 'advertise_service',
        type: this.serviceType,
        service: this.name
      });
      this.isAdvertised = true;
    };

    Service.prototype.unadvertise = function () {
      if (!this.isAdvertised) {
        return;
      }

      this.ros.callOnConnection({
        op: 'unadvertise_service',
        service: this.name
      });
      this.isAdvertised = false;
    };

    Service.prototype._serviceResponse = function (rosbridgeRequest) {
      var response = {};

      var success = this._serviceCallback(rosbridgeRequest.args, response);

      var call = {
        op: 'service_response',
        service: this.name,
        values: new ServiceResponse(response),
        result: success
      };

      if (rosbridgeRequest.id) {
        call.id = rosbridgeRequest.id;
      }

      this.ros.callOnConnection(call);
    };

    module.exports = Service;
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/ServiceRequest.js":
  /*!********************************************************!*\
    !*** ./node_modules/roslib/src/core/ServiceRequest.js ***!
    \********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreServiceRequestJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author Brandon Alexander - balexander@willowgarage.com
     */
    var assign = __webpack_require__(
    /*! object-assign */
    "./node_modules/object-assign/index.js");
    /**
     * A ServiceRequest is passed into the service call.
     *
     * @constructor
     * @param values - object matching the fields defined in the .srv definition file
     */


    function ServiceRequest(values) {
      assign(this, values);
    }

    module.exports = ServiceRequest;
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/ServiceResponse.js":
  /*!*********************************************************!*\
    !*** ./node_modules/roslib/src/core/ServiceResponse.js ***!
    \*********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreServiceResponseJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author Brandon Alexander - balexander@willowgarage.com
     */
    var assign = __webpack_require__(
    /*! object-assign */
    "./node_modules/object-assign/index.js");
    /**
     * A ServiceResponse is returned from the service call.
     *
     * @constructor
     * @param values - object matching the fields defined in the .srv definition file
     */


    function ServiceResponse(values) {
      assign(this, values);
    }

    module.exports = ServiceResponse;
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/SocketAdapter.js":
  /*!*******************************************************!*\
    !*** ./node_modules/roslib/src/core/SocketAdapter.js ***!
    \*******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreSocketAdapterJs(module, exports, __webpack_require__) {
    "use strict";
    /**
     * Socket event handling utilities for handling events on either
     * WebSocket and TCP sockets
     *
     * Note to anyone reviewing this code: these functions are called
     * in the context of their parent object, unless bound
     * @fileOverview
     */

    var decompressPng = __webpack_require__(
    /*! ../util/decompressPng */
    "./node_modules/roslib/src/util/shim/decompressPng.js");

    var CBOR = __webpack_require__(
    /*! cbor-js */
    "./node_modules/cbor-js/cbor.js");

    var typedArrayTagger = __webpack_require__(
    /*! ../util/cborTypedArrayTags */
    "./node_modules/roslib/src/util/cborTypedArrayTags.js");

    var BSON = null;

    if (typeof bson !== 'undefined') {
      BSON = bson().BSON;
    }
    /**
     * Events listeners for a WebSocket or TCP socket to a JavaScript
     * ROS Client. Sets up Messages for a given topic to trigger an
     * event on the ROS client.
     *
     * @namespace SocketAdapter
     * @private
     */


    function SocketAdapter(client) {
      function handleMessage(message) {
        if (message.op === 'publish') {
          client.emit(message.topic, message.msg);
        } else if (message.op === 'service_response') {
          client.emit(message.id, message);
        } else if (message.op === 'call_service') {
          client.emit(message.service, message);
        } else if (message.op === 'status') {
          if (message.id) {
            client.emit('status:' + message.id, message);
          } else {
            client.emit('status', message);
          }
        }
      }

      function handlePng(message, callback) {
        if (message.op === 'png') {
          decompressPng(message.data, callback);
        } else {
          callback(message);
        }
      }

      function decodeBSON(data, callback) {
        if (!BSON) {
          throw 'Cannot process BSON encoded message without BSON header.';
        }

        var reader = new FileReader();

        reader.onload = function () {
          var uint8Array = new Uint8Array(this.result);
          var msg = BSON.deserialize(uint8Array);
          callback(msg);
        };

        reader.readAsArrayBuffer(data);
      }

      return {
        /**
         * Emits a 'connection' event on WebSocket connection.
         *
         * @param event - the argument to emit with the event.
         * @memberof SocketAdapter
         */
        onopen: function onOpen(event) {
          client.isConnected = true;
          client.emit('connection', event);
        },

        /**
         * Emits a 'close' event on WebSocket disconnection.
         *
         * @param event - the argument to emit with the event.
         * @memberof SocketAdapter
         */
        onclose: function onClose(event) {
          client.isConnected = false;
          client.emit('close', event);
        },

        /**
         * Emits an 'error' event whenever there was an error.
         *
         * @param event - the argument to emit with the event.
         * @memberof SocketAdapter
         */
        onerror: function onError(event) {
          client.emit('error', event);
        },

        /**
         * Parses message responses from rosbridge and sends to the appropriate
         * topic, service, or param.
         *
         * @param message - the raw JSON message from rosbridge.
         * @memberof SocketAdapter
         */
        onmessage: function onMessage(data) {
          if (typeof Blob !== 'undefined' && data.data instanceof Blob) {
            decodeBSON(data.data, function (message) {
              handlePng(message, handleMessage);
            });
          } else if (data.data instanceof ArrayBuffer) {
            var decoded = CBOR.decode(data.data, typedArrayTagger);
            handleMessage(decoded);
          } else {
            var message = JSON.parse(typeof data === 'string' ? data : data.data);
            handlePng(message, handleMessage);
          }
        }
      };
    }

    module.exports = SocketAdapter;
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/Topic.js":
  /*!***********************************************!*\
    !*** ./node_modules/roslib/src/core/Topic.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreTopicJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author Brandon Alexander - baalexander@gmail.com
     */
    var EventEmitter2 = __webpack_require__(
    /*! eventemitter2 */
    "./node_modules/eventemitter2/lib/eventemitter2.js").EventEmitter2;

    var Message = __webpack_require__(
    /*! ./Message */
    "./node_modules/roslib/src/core/Message.js");
    /**
     * Publish and/or subscribe to a topic in ROS.
     *
     * Emits the following events:
     *  * 'warning' - if there are any warning during the Topic creation
     *  * 'message' - the message data from rosbridge
     *
     * @constructor
     * @param options - object with following keys:
     *   * ros - the ROSLIB.Ros connection handle
     *   * name - the topic name, like /cmd_vel
     *   * messageType - the message type, like 'std_msgs/String'
     *   * compression - the type of compression to use, like 'png', 'cbor', or 'cbor-raw'
     *   * throttle_rate - the rate (in ms in between messages) at which to throttle the topics
     *   * queue_size - the queue created at bridge side for re-publishing webtopics (defaults to 100)
     *   * latch - latch the topic when publishing
     *   * queue_length - the queue length at bridge side used when subscribing (defaults to 0, no queueing).
     *   * reconnect_on_close - the flag to enable resubscription and readvertisement on close event(defaults to true).
     */


    function Topic(options) {
      options = options || {};
      this.ros = options.ros;
      this.name = options.name;
      this.messageType = options.messageType;
      this.isAdvertised = false;
      this.compression = options.compression || 'none';
      this.throttle_rate = options.throttle_rate || 0;
      this.latch = options.latch || false;
      this.queue_size = options.queue_size || 100;
      this.queue_length = options.queue_length || 0;
      this.reconnect_on_close = options.reconnect_on_close !== undefined ? options.reconnect_on_close : true; // Check for valid compression types

      if (this.compression && this.compression !== 'png' && this.compression !== 'cbor' && this.compression !== 'cbor-raw' && this.compression !== 'none') {
        this.emit('warning', this.compression + ' compression is not supported. No compression will be used.');
        this.compression = 'none';
      } // Check if throttle rate is negative


      if (this.throttle_rate < 0) {
        this.emit('warning', this.throttle_rate + ' is not allowed. Set to 0');
        this.throttle_rate = 0;
      }

      var that = this;

      if (this.reconnect_on_close) {
        this.callForSubscribeAndAdvertise = function (message) {
          that.ros.callOnConnection(message);
          that.waitForReconnect = false;

          that.reconnectFunc = function () {
            if (!that.waitForReconnect) {
              that.waitForReconnect = true;
              that.ros.callOnConnection(message);
              that.ros.once('connection', function () {
                that.waitForReconnect = false;
              });
            }
          };

          that.ros.on('close', that.reconnectFunc);
        };
      } else {
        this.callForSubscribeAndAdvertise = this.ros.callOnConnection;
      }

      this._messageCallback = function (data) {
        that.emit('message', new Message(data));
      };
    }

    Topic.prototype.__proto__ = EventEmitter2.prototype;
    /**
     * Every time a message is published for the given topic, the callback
     * will be called with the message object.
     *
     * @param callback - function with the following params:
     *   * message - the published message
     */

    Topic.prototype.subscribe = function (callback) {
      if (typeof callback === 'function') {
        this.on('message', callback);
      }

      if (this.subscribeId) {
        return;
      }

      this.ros.on(this.name, this._messageCallback);
      this.subscribeId = 'subscribe:' + this.name + ':' + ++this.ros.idCounter;
      this.callForSubscribeAndAdvertise({
        op: 'subscribe',
        id: this.subscribeId,
        type: this.messageType,
        topic: this.name,
        compression: this.compression,
        throttle_rate: this.throttle_rate,
        queue_length: this.queue_length
      });
    };
    /**
     * Unregisters as a subscriber for the topic. Unsubscribing stop remove
     * all subscribe callbacks. To remove a call back, you must explicitly
     * pass the callback function in.
     *
     * @param callback - the optional callback to unregister, if
     *     * provided and other listeners are registered the topic won't
     *     * unsubscribe, just stop emitting to the passed listener
     */


    Topic.prototype.unsubscribe = function (callback) {
      if (callback) {
        this.off('message', callback); // If there is any other callbacks still subscribed don't unsubscribe

        if (this.listeners('message').length) {
          return;
        }
      }

      if (!this.subscribeId) {
        return;
      } // Note: Don't call this.removeAllListeners, allow client to handle that themselves


      this.ros.off(this.name, this._messageCallback);

      if (this.reconnect_on_close) {
        this.ros.off('close', this.reconnectFunc);
      }

      this.emit('unsubscribe');
      this.ros.callOnConnection({
        op: 'unsubscribe',
        id: this.subscribeId,
        topic: this.name
      });
      this.subscribeId = null;
    };
    /**
     * Registers as a publisher for the topic.
     */


    Topic.prototype.advertise = function () {
      if (this.isAdvertised) {
        return;
      }

      this.advertiseId = 'advertise:' + this.name + ':' + ++this.ros.idCounter;
      this.callForSubscribeAndAdvertise({
        op: 'advertise',
        id: this.advertiseId,
        type: this.messageType,
        topic: this.name,
        latch: this.latch,
        queue_size: this.queue_size
      });
      this.isAdvertised = true;

      if (!this.reconnect_on_close) {
        var that = this;
        this.ros.on('close', function () {
          that.isAdvertised = false;
        });
      }
    };
    /**
     * Unregisters as a publisher for the topic.
     */


    Topic.prototype.unadvertise = function () {
      if (!this.isAdvertised) {
        return;
      }

      if (this.reconnect_on_close) {
        this.ros.off('close', this.reconnectFunc);
      }

      this.emit('unadvertise');
      this.ros.callOnConnection({
        op: 'unadvertise',
        id: this.advertiseId,
        topic: this.name
      });
      this.isAdvertised = false;
    };
    /**
     * Publish the message.
     *
     * @param message - A ROSLIB.Message object.
     */


    Topic.prototype.publish = function (message) {
      if (!this.isAdvertised) {
        this.advertise();
      }

      this.ros.idCounter++;
      var call = {
        op: 'publish',
        id: 'publish:' + this.name + ':' + this.ros.idCounter,
        topic: this.name,
        msg: message,
        latch: this.latch
      };
      this.ros.callOnConnection(call);
    };

    module.exports = Topic;
    /***/
  },

  /***/
  "./node_modules/roslib/src/core/index.js":
  /*!***********************************************!*\
    !*** ./node_modules/roslib/src/core/index.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcCoreIndexJs(module, exports, __webpack_require__) {
    var mixin = __webpack_require__(
    /*! ../mixin */
    "./node_modules/roslib/src/mixin.js");

    var core = module.exports = {
      Ros: __webpack_require__(
      /*! ./Ros */
      "./node_modules/roslib/src/core/Ros.js"),
      Topic: __webpack_require__(
      /*! ./Topic */
      "./node_modules/roslib/src/core/Topic.js"),
      Message: __webpack_require__(
      /*! ./Message */
      "./node_modules/roslib/src/core/Message.js"),
      Param: __webpack_require__(
      /*! ./Param */
      "./node_modules/roslib/src/core/Param.js"),
      Service: __webpack_require__(
      /*! ./Service */
      "./node_modules/roslib/src/core/Service.js"),
      ServiceRequest: __webpack_require__(
      /*! ./ServiceRequest */
      "./node_modules/roslib/src/core/ServiceRequest.js"),
      ServiceResponse: __webpack_require__(
      /*! ./ServiceResponse */
      "./node_modules/roslib/src/core/ServiceResponse.js")
    };
    mixin(core.Ros, ['Param', 'Service', 'Topic'], core);
    /***/
  },

  /***/
  "./node_modules/roslib/src/math/Pose.js":
  /*!**********************************************!*\
    !*** ./node_modules/roslib/src/math/Pose.js ***!
    \**********************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcMathPoseJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author David Gossow - dgossow@willowgarage.com
     */
    var Vector3 = __webpack_require__(
    /*! ./Vector3 */
    "./node_modules/roslib/src/math/Vector3.js");

    var Quaternion = __webpack_require__(
    /*! ./Quaternion */
    "./node_modules/roslib/src/math/Quaternion.js");
    /**
     * A Pose in 3D space. Values are copied into this object.
     *
     *  @constructor
     *  @param options - object with following keys:
     *   * position - the Vector3 describing the position
     *   * orientation - the ROSLIB.Quaternion describing the orientation
     */


    function Pose(options) {
      options = options || {}; // copy the values into this object if they exist

      this.position = new Vector3(options.position);
      this.orientation = new Quaternion(options.orientation);
    }
    /**
     * Apply a transform against this pose.
     *
     * @param tf the transform
     */


    Pose.prototype.applyTransform = function (tf) {
      this.position.multiplyQuaternion(tf.rotation);
      this.position.add(tf.translation);
      var tmp = tf.rotation.clone();
      tmp.multiply(this.orientation);
      this.orientation = tmp;
    };
    /**
     * Clone a copy of this pose.
     *
     * @returns the cloned pose
     */


    Pose.prototype.clone = function () {
      return new Pose(this);
    };
    /**
     * Multiplies this pose with another pose without altering this pose.
     *
     * @returns Result of multiplication.
     */


    Pose.prototype.multiply = function (pose) {
      var p = pose.clone();
      p.applyTransform({
        rotation: this.orientation,
        translation: this.position
      });
      return p;
    };
    /**
     * Computes the inverse of this pose.
     *
     * @returns Inverse of pose.
     */


    Pose.prototype.getInverse = function () {
      var inverse = this.clone();
      inverse.orientation.invert();
      inverse.position.multiplyQuaternion(inverse.orientation);
      inverse.position.x *= -1;
      inverse.position.y *= -1;
      inverse.position.z *= -1;
      return inverse;
    };

    module.exports = Pose;
    /***/
  },

  /***/
  "./node_modules/roslib/src/math/Quaternion.js":
  /*!****************************************************!*\
    !*** ./node_modules/roslib/src/math/Quaternion.js ***!
    \****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcMathQuaternionJs(module, exports) {
    /**
     * @fileoverview
     * @author David Gossow - dgossow@willowgarage.com
     */

    /**
     * A Quaternion.
     *
     *  @constructor
     *  @param options - object with following keys:
     *   * x - the x value
     *   * y - the y value
     *   * z - the z value
     *   * w - the w value
     */
    function Quaternion(options) {
      options = options || {};
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.z = options.z || 0;
      this.w = typeof options.w === 'number' ? options.w : 1;
    }
    /**
     * Perform a conjugation on this quaternion.
     */


    Quaternion.prototype.conjugate = function () {
      this.x *= -1;
      this.y *= -1;
      this.z *= -1;
    };
    /**
     * Return the norm of this quaternion.
     */


    Quaternion.prototype.norm = function () {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    };
    /**
     * Perform a normalization on this quaternion.
     */


    Quaternion.prototype.normalize = function () {
      var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

      if (l === 0) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
      } else {
        l = 1 / l;
        this.x = this.x * l;
        this.y = this.y * l;
        this.z = this.z * l;
        this.w = this.w * l;
      }
    };
    /**
     * Convert this quaternion into its inverse.
     */


    Quaternion.prototype.invert = function () {
      this.conjugate();
      this.normalize();
    };
    /**
     * Set the values of this quaternion to the product of itself and the given quaternion.
     *
     * @param q the quaternion to multiply with
     */


    Quaternion.prototype.multiply = function (q) {
      var newX = this.x * q.w + this.y * q.z - this.z * q.y + this.w * q.x;
      var newY = -this.x * q.z + this.y * q.w + this.z * q.x + this.w * q.y;
      var newZ = this.x * q.y - this.y * q.x + this.z * q.w + this.w * q.z;
      var newW = -this.x * q.x - this.y * q.y - this.z * q.z + this.w * q.w;
      this.x = newX;
      this.y = newY;
      this.z = newZ;
      this.w = newW;
    };
    /**
     * Clone a copy of this quaternion.
     *
     * @returns the cloned quaternion
     */


    Quaternion.prototype.clone = function () {
      return new Quaternion(this);
    };

    module.exports = Quaternion;
    /***/
  },

  /***/
  "./node_modules/roslib/src/math/Transform.js":
  /*!***************************************************!*\
    !*** ./node_modules/roslib/src/math/Transform.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcMathTransformJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author David Gossow - dgossow@willowgarage.com
     */
    var Vector3 = __webpack_require__(
    /*! ./Vector3 */
    "./node_modules/roslib/src/math/Vector3.js");

    var Quaternion = __webpack_require__(
    /*! ./Quaternion */
    "./node_modules/roslib/src/math/Quaternion.js");
    /**
     * A Transform in 3-space. Values are copied into this object.
     *
     *  @constructor
     *  @param options - object with following keys:
     *   * translation - the Vector3 describing the translation
     *   * rotation - the ROSLIB.Quaternion describing the rotation
     */


    function Transform(options) {
      options = options || {}; // Copy the values into this object if they exist

      this.translation = new Vector3(options.translation);
      this.rotation = new Quaternion(options.rotation);
    }
    /**
     * Clone a copy of this transform.
     *
     * @returns the cloned transform
     */


    Transform.prototype.clone = function () {
      return new Transform(this);
    };

    module.exports = Transform;
    /***/
  },

  /***/
  "./node_modules/roslib/src/math/Vector3.js":
  /*!*************************************************!*\
    !*** ./node_modules/roslib/src/math/Vector3.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcMathVector3Js(module, exports) {
    /**
     * @fileoverview
     * @author David Gossow - dgossow@willowgarage.com
     */

    /**
     * A 3D vector.
     *
     *  @constructor
     *  @param options - object with following keys:
     *   * x - the x value
     *   * y - the y value
     *   * z - the z value
     */
    function Vector3(options) {
      options = options || {};
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.z = options.z || 0;
    }
    /**
     * Set the values of this vector to the sum of itself and the given vector.
     *
     * @param v the vector to add with
     */


    Vector3.prototype.add = function (v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
    };
    /**
     * Set the values of this vector to the difference of itself and the given vector.
     *
     * @param v the vector to subtract with
     */


    Vector3.prototype.subtract = function (v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
    };
    /**
     * Multiply the given Quaternion with this vector.
     *
     * @param q - the quaternion to multiply with
     */


    Vector3.prototype.multiplyQuaternion = function (q) {
      var ix = q.w * this.x + q.y * this.z - q.z * this.y;
      var iy = q.w * this.y + q.z * this.x - q.x * this.z;
      var iz = q.w * this.z + q.x * this.y - q.y * this.x;
      var iw = -q.x * this.x - q.y * this.y - q.z * this.z;
      this.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
      this.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
      this.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
    };
    /**
     * Clone a copy of this vector.
     *
     * @returns the cloned vector
     */


    Vector3.prototype.clone = function () {
      return new Vector3(this);
    };

    module.exports = Vector3;
    /***/
  },

  /***/
  "./node_modules/roslib/src/math/index.js":
  /*!***********************************************!*\
    !*** ./node_modules/roslib/src/math/index.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcMathIndexJs(module, exports, __webpack_require__) {
    module.exports = {
      Pose: __webpack_require__(
      /*! ./Pose */
      "./node_modules/roslib/src/math/Pose.js"),
      Quaternion: __webpack_require__(
      /*! ./Quaternion */
      "./node_modules/roslib/src/math/Quaternion.js"),
      Transform: __webpack_require__(
      /*! ./Transform */
      "./node_modules/roslib/src/math/Transform.js"),
      Vector3: __webpack_require__(
      /*! ./Vector3 */
      "./node_modules/roslib/src/math/Vector3.js")
    };
    /***/
  },

  /***/
  "./node_modules/roslib/src/mixin.js":
  /*!******************************************!*\
    !*** ./node_modules/roslib/src/mixin.js ***!
    \******************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcMixinJs(module, exports) {
    /**
     * Mixin a feature to the core/Ros prototype.
     * For example, mixin(Ros, ['Topic'], {Topic: <Topic>})
     * will add a topic bound to any Ros instances so a user
     * can call `var topic = ros.Topic({name: '/foo'});`
     *
     * @author Graeme Yeates - github.com/megawac
     */
    module.exports = function (Ros, classes, features) {
      classes.forEach(function (className) {
        var Class = features[className];

        Ros.prototype[className] = function (options) {
          options.ros = this;
          return new Class(options);
        };
      });
    };
    /***/

  },

  /***/
  "./node_modules/roslib/src/tf/TFClient.js":
  /*!************************************************!*\
    !*** ./node_modules/roslib/src/tf/TFClient.js ***!
    \************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcTfTFClientJs(module, exports, __webpack_require__) {
    /**
     * @fileoverview
     * @author David Gossow - dgossow@willowgarage.com
     */
    var ActionClient = __webpack_require__(
    /*! ../actionlib/ActionClient */
    "./node_modules/roslib/src/actionlib/ActionClient.js");

    var Goal = __webpack_require__(
    /*! ../actionlib/Goal */
    "./node_modules/roslib/src/actionlib/Goal.js");

    var Service = __webpack_require__(
    /*! ../core/Service.js */
    "./node_modules/roslib/src/core/Service.js");

    var ServiceRequest = __webpack_require__(
    /*! ../core/ServiceRequest.js */
    "./node_modules/roslib/src/core/ServiceRequest.js");

    var Topic = __webpack_require__(
    /*! ../core/Topic.js */
    "./node_modules/roslib/src/core/Topic.js");

    var Transform = __webpack_require__(
    /*! ../math/Transform */
    "./node_modules/roslib/src/math/Transform.js");
    /**
     * A TF Client that listens to TFs from tf2_web_republisher.
     *
     *  @constructor
     *  @param options - object with following keys:
     *   * ros - the ROSLIB.Ros connection handle
     *   * fixedFrame - the fixed frame, like /base_link
     *   * angularThres - the angular threshold for the TF republisher
     *   * transThres - the translation threshold for the TF republisher
     *   * rate - the rate for the TF republisher
     *   * updateDelay - the time (in ms) to wait after a new subscription
     *                   to update the TF republisher's list of TFs
     *   * topicTimeout - the timeout parameter for the TF republisher
     *   * serverName (optional) - the name of the tf2_web_republisher server
     *   * repubServiceName (optional) - the name of the republish_tfs service (non groovy compatibility mode only)
     *   																 default: '/republish_tfs'
     */


    function TFClient(options) {
      options = options || {};
      this.ros = options.ros;
      this.fixedFrame = options.fixedFrame || '/base_link';
      this.angularThres = options.angularThres || 2.0;
      this.transThres = options.transThres || 0.01;
      this.rate = options.rate || 10.0;
      this.updateDelay = options.updateDelay || 50;
      var seconds = options.topicTimeout || 2.0;
      var secs = Math.floor(seconds);
      var nsecs = Math.floor((seconds - secs) * 1000000000);
      this.topicTimeout = {
        secs: secs,
        nsecs: nsecs
      };
      this.serverName = options.serverName || '/tf2_web_republisher';
      this.repubServiceName = options.repubServiceName || '/republish_tfs';
      this.currentGoal = false;
      this.currentTopic = false;
      this.frameInfos = {};
      this.republisherUpdateRequested = false; // Create an Action client

      this.actionClient = new ActionClient({
        ros: options.ros,
        serverName: this.serverName,
        actionName: 'tf2_web_republisher/TFSubscriptionAction',
        omitStatus: true,
        omitResult: true
      }); // Create a Service client

      this.serviceClient = new Service({
        ros: options.ros,
        name: this.repubServiceName,
        serviceType: 'tf2_web_republisher/RepublishTFs'
      });
    }
    /**
     * Process the incoming TF message and send them out using the callback
     * functions.
     *
     * @param tf - the TF message from the server
     */


    TFClient.prototype.processTFArray = function (tf) {
      var that = this;
      tf.transforms.forEach(function (transform) {
        var frameID = transform.child_frame_id;

        if (frameID[0] === '/') {
          frameID = frameID.substring(1);
        }

        var info = this.frameInfos[frameID];

        if (info) {
          info.transform = new Transform({
            translation: transform.transform.translation,
            rotation: transform.transform.rotation
          });
          info.cbs.forEach(function (cb) {
            cb(info.transform);
          });
        }
      }, this);
    };
    /**
     * Create and send a new goal (or service request) to the tf2_web_republisher
     * based on the current list of TFs.
     */


    TFClient.prototype.updateGoal = function () {
      var goalMessage = {
        source_frames: Object.keys(this.frameInfos),
        target_frame: this.fixedFrame,
        angular_thres: this.angularThres,
        trans_thres: this.transThres,
        rate: this.rate
      }; // if we're running in groovy compatibility mode (the default)
      // then use the action interface to tf2_web_republisher

      if (this.ros.groovyCompatibility) {
        if (this.currentGoal) {
          this.currentGoal.cancel();
        }

        this.currentGoal = new Goal({
          actionClient: this.actionClient,
          goalMessage: goalMessage
        });
        this.currentGoal.on('feedback', this.processTFArray.bind(this));
        this.currentGoal.send();
      } else {
        // otherwise, use the service interface
        // The service interface has the same parameters as the action,
        // plus the timeout
        goalMessage.timeout = this.topicTimeout;
        var request = new ServiceRequest(goalMessage);
        this.serviceClient.callService(request, this.processResponse.bind(this));
      }

      this.republisherUpdateRequested = false;
    };
    /**
     * Process the service response and subscribe to the tf republisher
     * topic
     *
     * @param response the service response containing the topic name
     */


    TFClient.prototype.processResponse = function (response) {
      // if we subscribed to a topic before, unsubscribe so
      // the republisher stops publishing it
      if (this.currentTopic) {
        this.currentTopic.unsubscribe();
      }

      this.currentTopic = new Topic({
        ros: this.ros,
        name: response.topic_name,
        messageType: 'tf2_web_republisher/TFArray'
      });
      this.currentTopic.subscribe(this.processTFArray.bind(this));
    };
    /**
     * Subscribe to the given TF frame.
     *
     * @param frameID - the TF frame to subscribe to
     * @param callback - function with params:
     *   * transform - the transform data
     */


    TFClient.prototype.subscribe = function (frameID, callback) {
      // remove leading slash, if it's there
      if (frameID[0] === '/') {
        frameID = frameID.substring(1);
      } // if there is no callback registered for the given frame, create emtpy callback list


      if (!this.frameInfos[frameID]) {
        this.frameInfos[frameID] = {
          cbs: []
        };

        if (!this.republisherUpdateRequested) {
          setTimeout(this.updateGoal.bind(this), this.updateDelay);
          this.republisherUpdateRequested = true;
        }
      } // if we already have a transform, call back immediately
      else if (this.frameInfos[frameID].transform) {
          callback(this.frameInfos[frameID].transform);
        }

      this.frameInfos[frameID].cbs.push(callback);
    };
    /**
     * Unsubscribe from the given TF frame.
     *
     * @param frameID - the TF frame to unsubscribe from
     * @param callback - the callback function to remove
     */


    TFClient.prototype.unsubscribe = function (frameID, callback) {
      // remove leading slash, if it's there
      if (frameID[0] === '/') {
        frameID = frameID.substring(1);
      }

      var info = this.frameInfos[frameID];

      for (var cbs = info && info.cbs || [], idx = cbs.length; idx--;) {
        if (cbs[idx] === callback) {
          cbs.splice(idx, 1);
        }
      }

      if (!callback || cbs.length === 0) {
        delete this.frameInfos[frameID];
      }
    };
    /**
     * Unsubscribe and unadvertise all topics associated with this TFClient.
     */


    TFClient.prototype.dispose = function () {
      this.actionClient.dispose();

      if (this.currentTopic) {
        this.currentTopic.unsubscribe();
      }
    };

    module.exports = TFClient;
    /***/
  },

  /***/
  "./node_modules/roslib/src/tf/index.js":
  /*!*********************************************!*\
    !*** ./node_modules/roslib/src/tf/index.js ***!
    \*********************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcTfIndexJs(module, exports, __webpack_require__) {
    var Ros = __webpack_require__(
    /*! ../core/Ros */
    "./node_modules/roslib/src/core/Ros.js");

    var mixin = __webpack_require__(
    /*! ../mixin */
    "./node_modules/roslib/src/mixin.js");

    var tf = module.exports = {
      TFClient: __webpack_require__(
      /*! ./TFClient */
      "./node_modules/roslib/src/tf/TFClient.js")
    };
    mixin(Ros, ['TFClient'], tf);
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfBox.js":
  /*!*************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfBox.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfBoxJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */
    var Vector3 = __webpack_require__(
    /*! ../math/Vector3 */
    "./node_modules/roslib/src/math/Vector3.js");

    var UrdfTypes = __webpack_require__(
    /*! ./UrdfTypes */
    "./node_modules/roslib/src/urdf/UrdfTypes.js");
    /**
     * A Box element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */


    function UrdfBox(options) {
      this.dimension = null;
      this.type = UrdfTypes.URDF_BOX; // Parse the xml string

      var xyz = options.xml.getAttribute('size').split(' ');
      this.dimension = new Vector3({
        x: parseFloat(xyz[0]),
        y: parseFloat(xyz[1]),
        z: parseFloat(xyz[2])
      });
    }

    module.exports = UrdfBox;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfColor.js":
  /*!***************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfColor.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfColorJs(module, exports) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */

    /**
     * A Color element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */
    function UrdfColor(options) {
      // Parse the xml string
      var rgba = options.xml.getAttribute('rgba').split(' ');
      this.r = parseFloat(rgba[0]);
      this.g = parseFloat(rgba[1]);
      this.b = parseFloat(rgba[2]);
      this.a = parseFloat(rgba[3]);
    }

    module.exports = UrdfColor;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfCylinder.js":
  /*!******************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfCylinder.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfCylinderJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */
    var UrdfTypes = __webpack_require__(
    /*! ./UrdfTypes */
    "./node_modules/roslib/src/urdf/UrdfTypes.js");
    /**
     * A Cylinder element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */


    function UrdfCylinder(options) {
      this.type = UrdfTypes.URDF_CYLINDER;
      this.length = parseFloat(options.xml.getAttribute('length'));
      this.radius = parseFloat(options.xml.getAttribute('radius'));
    }

    module.exports = UrdfCylinder;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfJoint.js":
  /*!***************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfJoint.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfJointJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview
     * @author David V. Lu!!  davidvlu@gmail.com
     */
    var Pose = __webpack_require__(
    /*! ../math/Pose */
    "./node_modules/roslib/src/math/Pose.js");

    var Vector3 = __webpack_require__(
    /*! ../math/Vector3 */
    "./node_modules/roslib/src/math/Vector3.js");

    var Quaternion = __webpack_require__(
    /*! ../math/Quaternion */
    "./node_modules/roslib/src/math/Quaternion.js");
    /**
     * A Joint element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */


    function UrdfJoint(options) {
      this.name = options.xml.getAttribute('name');
      this.type = options.xml.getAttribute('type');
      var parents = options.xml.getElementsByTagName('parent');

      if (parents.length > 0) {
        this.parent = parents[0].getAttribute('link');
      }

      var children = options.xml.getElementsByTagName('child');

      if (children.length > 0) {
        this.child = children[0].getAttribute('link');
      }

      var limits = options.xml.getElementsByTagName('limit');

      if (limits.length > 0) {
        this.minval = parseFloat(limits[0].getAttribute('lower'));
        this.maxval = parseFloat(limits[0].getAttribute('upper'));
      } // Origin


      var origins = options.xml.getElementsByTagName('origin');

      if (origins.length === 0) {
        // use the identity as the default
        this.origin = new Pose();
      } else {
        // Check the XYZ
        var xyz = origins[0].getAttribute('xyz');
        var position = new Vector3();

        if (xyz) {
          xyz = xyz.split(' ');
          position = new Vector3({
            x: parseFloat(xyz[0]),
            y: parseFloat(xyz[1]),
            z: parseFloat(xyz[2])
          });
        } // Check the RPY


        var rpy = origins[0].getAttribute('rpy');
        var orientation = new Quaternion();

        if (rpy) {
          rpy = rpy.split(' '); // Convert from RPY

          var roll = parseFloat(rpy[0]);
          var pitch = parseFloat(rpy[1]);
          var yaw = parseFloat(rpy[2]);
          var phi = roll / 2.0;
          var the = pitch / 2.0;
          var psi = yaw / 2.0;
          var x = Math.sin(phi) * Math.cos(the) * Math.cos(psi) - Math.cos(phi) * Math.sin(the) * Math.sin(psi);
          var y = Math.cos(phi) * Math.sin(the) * Math.cos(psi) + Math.sin(phi) * Math.cos(the) * Math.sin(psi);
          var z = Math.cos(phi) * Math.cos(the) * Math.sin(psi) - Math.sin(phi) * Math.sin(the) * Math.cos(psi);
          var w = Math.cos(phi) * Math.cos(the) * Math.cos(psi) + Math.sin(phi) * Math.sin(the) * Math.sin(psi);
          orientation = new Quaternion({
            x: x,
            y: y,
            z: z,
            w: w
          });
          orientation.normalize();
        }

        this.origin = new Pose({
          position: position,
          orientation: orientation
        });
      }
    }

    module.exports = UrdfJoint;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfLink.js":
  /*!**************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfLink.js ***!
    \**************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfLinkJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */
    var UrdfVisual = __webpack_require__(
    /*! ./UrdfVisual */
    "./node_modules/roslib/src/urdf/UrdfVisual.js");
    /**
     * A Link element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */


    function UrdfLink(options) {
      this.name = options.xml.getAttribute('name');
      this.visuals = [];
      var visuals = options.xml.getElementsByTagName('visual');

      for (var i = 0; i < visuals.length; i++) {
        this.visuals.push(new UrdfVisual({
          xml: visuals[i]
        }));
      }
    }

    module.exports = UrdfLink;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfMaterial.js":
  /*!******************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfMaterial.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfMaterialJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */
    var UrdfColor = __webpack_require__(
    /*! ./UrdfColor */
    "./node_modules/roslib/src/urdf/UrdfColor.js");
    /**
     * A Material element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */


    function UrdfMaterial(options) {
      this.textureFilename = null;
      this.color = null;
      this.name = options.xml.getAttribute('name'); // Texture

      var textures = options.xml.getElementsByTagName('texture');

      if (textures.length > 0) {
        this.textureFilename = textures[0].getAttribute('filename');
      } // Color


      var colors = options.xml.getElementsByTagName('color');

      if (colors.length > 0) {
        // Parse the RBGA string
        this.color = new UrdfColor({
          xml: colors[0]
        });
      }
    }

    UrdfMaterial.prototype.isLink = function () {
      return this.color === null && this.textureFilename === null;
    };

    var assign = __webpack_require__(
    /*! object-assign */
    "./node_modules/object-assign/index.js");

    UrdfMaterial.prototype.assign = function (obj) {
      return assign(this, obj);
    };

    module.exports = UrdfMaterial;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfMesh.js":
  /*!**************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfMesh.js ***!
    \**************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfMeshJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */
    var Vector3 = __webpack_require__(
    /*! ../math/Vector3 */
    "./node_modules/roslib/src/math/Vector3.js");

    var UrdfTypes = __webpack_require__(
    /*! ./UrdfTypes */
    "./node_modules/roslib/src/urdf/UrdfTypes.js");
    /**
     * A Mesh element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */


    function UrdfMesh(options) {
      this.scale = null;
      this.type = UrdfTypes.URDF_MESH;
      this.filename = options.xml.getAttribute('filename'); // Check for a scale

      var scale = options.xml.getAttribute('scale');

      if (scale) {
        // Get the XYZ
        var xyz = scale.split(' ');
        this.scale = new Vector3({
          x: parseFloat(xyz[0]),
          y: parseFloat(xyz[1]),
          z: parseFloat(xyz[2])
        });
      }
    }

    module.exports = UrdfMesh;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfModel.js":
  /*!***************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfModel.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfModelJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */
    var UrdfMaterial = __webpack_require__(
    /*! ./UrdfMaterial */
    "./node_modules/roslib/src/urdf/UrdfMaterial.js");

    var UrdfLink = __webpack_require__(
    /*! ./UrdfLink */
    "./node_modules/roslib/src/urdf/UrdfLink.js");

    var UrdfJoint = __webpack_require__(
    /*! ./UrdfJoint */
    "./node_modules/roslib/src/urdf/UrdfJoint.js");

    var DOMParser = __webpack_require__(
    /*! xmldom */
    "./node_modules/roslib/src/util/shim/xmldom.js").DOMParser; // See https://developer.mozilla.org/docs/XPathResult#Constants


    var XPATH_FIRST_ORDERED_NODE_TYPE = 9;
    /**
     * A URDF Model can be used to parse a given URDF into the appropriate elements.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     *  * string - the XML element to parse as a string
     */

    function UrdfModel(options) {
      options = options || {};
      var xmlDoc = options.xml;
      var string = options.string;
      this.materials = {};
      this.links = {};
      this.joints = {}; // Check if we are using a string or an XML element

      if (string) {
        // Parse the string
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(string, 'text/xml');
      } // Initialize the model with the given XML node.
      // Get the robot tag


      var robotXml = xmlDoc.documentElement; // Get the robot name

      this.name = robotXml.getAttribute('name'); // Parse all the visual elements we need

      for (var nodes = robotXml.childNodes, i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        if (node.tagName === 'material') {
          var material = new UrdfMaterial({
            xml: node
          }); // Make sure this is unique

          if (this.materials[material.name] !== void 0) {
            if (this.materials[material.name].isLink()) {
              this.materials[material.name].assign(material);
            } else {
              console.warn('Material ' + material.name + 'is not unique.');
            }
          } else {
            this.materials[material.name] = material;
          }
        } else if (node.tagName === 'link') {
          var link = new UrdfLink({
            xml: node
          }); // Make sure this is unique

          if (this.links[link.name] !== void 0) {
            console.warn('Link ' + link.name + ' is not unique.');
          } else {
            // Check for a material
            for (var j = 0; j < link.visuals.length; j++) {
              var mat = link.visuals[j].material;

              if (mat !== null) {
                if (this.materials[mat.name] !== void 0) {
                  link.visuals[j].material = this.materials[mat.name];
                } else {
                  this.materials[mat.name] = mat;
                }
              }
            } // Add the link


            this.links[link.name] = link;
          }
        } else if (node.tagName === 'joint') {
          var joint = new UrdfJoint({
            xml: node
          });
          this.joints[joint.name] = joint;
        }
      }
    }

    module.exports = UrdfModel;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfSphere.js":
  /*!****************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfSphere.js ***!
    \****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfSphereJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */
    var UrdfTypes = __webpack_require__(
    /*! ./UrdfTypes */
    "./node_modules/roslib/src/urdf/UrdfTypes.js");
    /**
     * A Sphere element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */


    function UrdfSphere(options) {
      this.type = UrdfTypes.URDF_SPHERE;
      this.radius = parseFloat(options.xml.getAttribute('radius'));
    }

    module.exports = UrdfSphere;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfTypes.js":
  /*!***************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfTypes.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfTypesJs(module, exports) {
    module.exports = {
      URDF_SPHERE: 0,
      URDF_BOX: 1,
      URDF_CYLINDER: 2,
      URDF_MESH: 3
    };
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/UrdfVisual.js":
  /*!****************************************************!*\
    !*** ./node_modules/roslib/src/urdf/UrdfVisual.js ***!
    \****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfUrdfVisualJs(module, exports, __webpack_require__) {
    /**
     * @fileOverview 
     * @author Benjamin Pitzer - ben.pitzer@gmail.com
     * @author Russell Toris - rctoris@wpi.edu
     */
    var Pose = __webpack_require__(
    /*! ../math/Pose */
    "./node_modules/roslib/src/math/Pose.js");

    var Vector3 = __webpack_require__(
    /*! ../math/Vector3 */
    "./node_modules/roslib/src/math/Vector3.js");

    var Quaternion = __webpack_require__(
    /*! ../math/Quaternion */
    "./node_modules/roslib/src/math/Quaternion.js");

    var UrdfCylinder = __webpack_require__(
    /*! ./UrdfCylinder */
    "./node_modules/roslib/src/urdf/UrdfCylinder.js");

    var UrdfBox = __webpack_require__(
    /*! ./UrdfBox */
    "./node_modules/roslib/src/urdf/UrdfBox.js");

    var UrdfMaterial = __webpack_require__(
    /*! ./UrdfMaterial */
    "./node_modules/roslib/src/urdf/UrdfMaterial.js");

    var UrdfMesh = __webpack_require__(
    /*! ./UrdfMesh */
    "./node_modules/roslib/src/urdf/UrdfMesh.js");

    var UrdfSphere = __webpack_require__(
    /*! ./UrdfSphere */
    "./node_modules/roslib/src/urdf/UrdfSphere.js");
    /**
     * A Visual element in a URDF.
     *
     * @constructor
     * @param options - object with following keys:
     *  * xml - the XML element to parse
     */


    function UrdfVisual(options) {
      var xml = options.xml;
      this.origin = null;
      this.geometry = null;
      this.material = null;
      this.name = options.xml.getAttribute('name'); // Origin

      var origins = xml.getElementsByTagName('origin');

      if (origins.length === 0) {
        // use the identity as the default
        this.origin = new Pose();
      } else {
        // Check the XYZ
        var xyz = origins[0].getAttribute('xyz');
        var position = new Vector3();

        if (xyz) {
          xyz = xyz.split(' ');
          position = new Vector3({
            x: parseFloat(xyz[0]),
            y: parseFloat(xyz[1]),
            z: parseFloat(xyz[2])
          });
        } // Check the RPY


        var rpy = origins[0].getAttribute('rpy');
        var orientation = new Quaternion();

        if (rpy) {
          rpy = rpy.split(' '); // Convert from RPY

          var roll = parseFloat(rpy[0]);
          var pitch = parseFloat(rpy[1]);
          var yaw = parseFloat(rpy[2]);
          var phi = roll / 2.0;
          var the = pitch / 2.0;
          var psi = yaw / 2.0;
          var x = Math.sin(phi) * Math.cos(the) * Math.cos(psi) - Math.cos(phi) * Math.sin(the) * Math.sin(psi);
          var y = Math.cos(phi) * Math.sin(the) * Math.cos(psi) + Math.sin(phi) * Math.cos(the) * Math.sin(psi);
          var z = Math.cos(phi) * Math.cos(the) * Math.sin(psi) - Math.sin(phi) * Math.sin(the) * Math.cos(psi);
          var w = Math.cos(phi) * Math.cos(the) * Math.cos(psi) + Math.sin(phi) * Math.sin(the) * Math.sin(psi);
          orientation = new Quaternion({
            x: x,
            y: y,
            z: z,
            w: w
          });
          orientation.normalize();
        }

        this.origin = new Pose({
          position: position,
          orientation: orientation
        });
      } // Geometry


      var geoms = xml.getElementsByTagName('geometry');

      if (geoms.length > 0) {
        var geom = geoms[0];
        var shape = null; // Check for the shape

        for (var i = 0; i < geom.childNodes.length; i++) {
          var node = geom.childNodes[i];

          if (node.nodeType === 1) {
            shape = node;
            break;
          }
        } // Check the type


        var type = shape.nodeName;

        if (type === 'sphere') {
          this.geometry = new UrdfSphere({
            xml: shape
          });
        } else if (type === 'box') {
          this.geometry = new UrdfBox({
            xml: shape
          });
        } else if (type === 'cylinder') {
          this.geometry = new UrdfCylinder({
            xml: shape
          });
        } else if (type === 'mesh') {
          this.geometry = new UrdfMesh({
            xml: shape
          });
        } else {
          console.warn('Unknown geometry type ' + type);
        }
      } // Material


      var materials = xml.getElementsByTagName('material');

      if (materials.length > 0) {
        this.material = new UrdfMaterial({
          xml: materials[0]
        });
      }
    }

    module.exports = UrdfVisual;
    /***/
  },

  /***/
  "./node_modules/roslib/src/urdf/index.js":
  /*!***********************************************!*\
    !*** ./node_modules/roslib/src/urdf/index.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUrdfIndexJs(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! object-assign */
    "./node_modules/object-assign/index.js")({
      UrdfBox: __webpack_require__(
      /*! ./UrdfBox */
      "./node_modules/roslib/src/urdf/UrdfBox.js"),
      UrdfColor: __webpack_require__(
      /*! ./UrdfColor */
      "./node_modules/roslib/src/urdf/UrdfColor.js"),
      UrdfCylinder: __webpack_require__(
      /*! ./UrdfCylinder */
      "./node_modules/roslib/src/urdf/UrdfCylinder.js"),
      UrdfLink: __webpack_require__(
      /*! ./UrdfLink */
      "./node_modules/roslib/src/urdf/UrdfLink.js"),
      UrdfMaterial: __webpack_require__(
      /*! ./UrdfMaterial */
      "./node_modules/roslib/src/urdf/UrdfMaterial.js"),
      UrdfMesh: __webpack_require__(
      /*! ./UrdfMesh */
      "./node_modules/roslib/src/urdf/UrdfMesh.js"),
      UrdfModel: __webpack_require__(
      /*! ./UrdfModel */
      "./node_modules/roslib/src/urdf/UrdfModel.js"),
      UrdfSphere: __webpack_require__(
      /*! ./UrdfSphere */
      "./node_modules/roslib/src/urdf/UrdfSphere.js"),
      UrdfVisual: __webpack_require__(
      /*! ./UrdfVisual */
      "./node_modules/roslib/src/urdf/UrdfVisual.js")
    }, __webpack_require__(
    /*! ./UrdfTypes */
    "./node_modules/roslib/src/urdf/UrdfTypes.js"));
    /***/
  },

  /***/
  "./node_modules/roslib/src/util/cborTypedArrayTags.js":
  /*!************************************************************!*\
    !*** ./node_modules/roslib/src/util/cborTypedArrayTags.js ***!
    \************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUtilCborTypedArrayTagsJs(module, exports, __webpack_require__) {
    "use strict";

    var UPPER32 = Math.pow(2, 32);
    var warnedPrecision = false;

    function warnPrecision() {
      if (!warnedPrecision) {
        warnedPrecision = true;
        console.warn('CBOR 64-bit integer array values may lose precision. No further warnings.');
      }
    }
    /**
     * Unpacks 64-bit unsigned integer from byte array.
     * @param {Uint8Array} bytes
    */


    function decodeUint64LE(bytes) {
      warnPrecision();
      var byteLen = bytes.byteLength;
      var offset = bytes.byteOffset;
      var arrLen = byteLen / 8;
      var buffer = bytes.buffer.slice(offset, offset + byteLen);
      var uint32View = new Uint32Array(buffer);
      var arr = new Array(arrLen);

      for (var i = 0; i < arrLen; i++) {
        var si = i * 2;
        var lo = uint32View[si];
        var hi = uint32View[si + 1];
        arr[i] = lo + UPPER32 * hi;
      }

      return arr;
    }
    /**
     * Unpacks 64-bit signed integer from byte array.
     * @param {Uint8Array} bytes
    */


    function decodeInt64LE(bytes) {
      warnPrecision();
      var byteLen = bytes.byteLength;
      var offset = bytes.byteOffset;
      var arrLen = byteLen / 8;
      var buffer = bytes.buffer.slice(offset, offset + byteLen);
      var uint32View = new Uint32Array(buffer);
      var int32View = new Int32Array(buffer);
      var arr = new Array(arrLen);

      for (var i = 0; i < arrLen; i++) {
        var si = i * 2;
        var lo = uint32View[si];
        var hi = int32View[si + 1];
        arr[i] = lo + UPPER32 * hi;
      }

      return arr;
    }
    /**
     * Unpacks typed array from byte array.
     * @param {Uint8Array} bytes
     * @param {type} ArrayType - desired output array type
    */


    function decodeNativeArray(bytes, ArrayType) {
      var byteLen = bytes.byteLength;
      var offset = bytes.byteOffset;
      var buffer = bytes.buffer.slice(offset, offset + byteLen);
      return new ArrayType(buffer);
    }
    /**
     * Support a subset of draft CBOR typed array tags:
     *   <https://tools.ietf.org/html/draft-ietf-cbor-array-tags-00>
     * Only support little-endian tags for now.
     */


    var nativeArrayTypes = {
      64: Uint8Array,
      69: Uint16Array,
      70: Uint32Array,
      72: Int8Array,
      77: Int16Array,
      78: Int32Array,
      85: Float32Array,
      86: Float64Array
    };
    /**
     * We can also decode 64-bit integer arrays, since ROS has these types.
     */

    var conversionArrayTypes = {
      71: decodeUint64LE,
      79: decodeInt64LE
    };
    /**
     * Handles CBOR typed array tags during decoding.
     * @param {Uint8Array} data
     * @param {Number} tag
     */

    function cborTypedArrayTagger(data, tag) {
      if (tag in nativeArrayTypes) {
        var arrayType = nativeArrayTypes[tag];
        return decodeNativeArray(data, arrayType);
      }

      if (tag in conversionArrayTypes) {
        return conversionArrayTypes[tag](data);
      }

      return data;
    }

    if (true && module.exports) {
      module.exports = cborTypedArrayTagger;
    }
    /***/

  },

  /***/
  "./node_modules/roslib/src/util/shim/WebSocket.js":
  /*!********************************************************!*\
    !*** ./node_modules/roslib/src/util/shim/WebSocket.js ***!
    \********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUtilShimWebSocketJs(module, exports) {
    module.exports = typeof window !== 'undefined' ? window.WebSocket : WebSocket;
    /***/
  },

  /***/
  "./node_modules/roslib/src/util/shim/canvas.js":
  /*!*****************************************************!*\
    !*** ./node_modules/roslib/src/util/shim/canvas.js ***!
    \*****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUtilShimCanvasJs(module, exports) {
    /* global document */
    module.exports = function Canvas() {
      return document.createElement('canvas');
    };
    /***/

  },

  /***/
  "./node_modules/roslib/src/util/shim/decompressPng.js":
  /*!************************************************************!*\
    !*** ./node_modules/roslib/src/util/shim/decompressPng.js ***!
    \************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUtilShimDecompressPngJs(module, exports, __webpack_require__) {
    "use strict";
    /**
     * @fileOverview
     * @author Graeme Yeates - github.com/megawac
     */

    var Canvas = __webpack_require__(
    /*! canvas */
    "./node_modules/roslib/src/util/shim/canvas.js");

    var Image = Canvas.Image || window.Image;
    /**
     * If a message was compressed as a PNG image (a compression hack since
     * gzipping over WebSockets * is not supported yet), this function places the
     * "image" in a canvas element then decodes the * "image" as a Base64 string.
     *
     * @private
     * @param data - object containing the PNG data.
     * @param callback - function with params:
     *   * data - the uncompressed data
     */

    function decompressPng(data, callback) {
      // Uncompresses the data before sending it through (use image/canvas to do so).
      var image = new Image(); // When the image loads, extracts the raw data (JSON message).

      image.onload = function () {
        // Creates a local canvas to draw on.
        var canvas = new Canvas();
        var context = canvas.getContext('2d'); // Sets width and height.

        canvas.width = image.width;
        canvas.height = image.height; // Prevents anti-aliasing and loosing data

        context.imageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false; // Puts the data into the image.

        context.drawImage(image, 0, 0); // Grabs the raw, uncompressed data.

        var imageData = context.getImageData(0, 0, image.width, image.height).data; // Constructs the JSON.

        var jsonData = '';

        for (var i = 0; i < imageData.length; i += 4) {
          // RGB
          jsonData += String.fromCharCode(imageData[i], imageData[i + 1], imageData[i + 2]);
        }

        callback(JSON.parse(jsonData));
      }; // Sends the image data to load.


      image.src = 'data:image/png;base64,' + data;
    }

    module.exports = decompressPng;
    /***/
  },

  /***/
  "./node_modules/roslib/src/util/shim/xmldom.js":
  /*!*****************************************************!*\
    !*** ./node_modules/roslib/src/util/shim/xmldom.js ***!
    \*****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUtilShimXmldomJs(module, exports) {
    exports.DOMImplementation = window.DOMImplementation;
    exports.XMLSerializer = window.XMLSerializer;
    exports.DOMParser = window.DOMParser;
    /***/
  },

  /***/
  "./node_modules/roslib/src/util/workerSocket.js":
  /*!******************************************************!*\
    !*** ./node_modules/roslib/src/util/workerSocket.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUtilWorkerSocketJs(module, exports, __webpack_require__) {
    var work = __webpack_require__(
    /*! webworkify */
    "./node_modules/webworkify/index.js");

    var workerSocketImpl = __webpack_require__(
    /*! ./workerSocketImpl */
    "./node_modules/roslib/src/util/workerSocketImpl.js");

    function WorkerSocket(uri) {
      this.socket_ = work(workerSocketImpl);
      this.socket_.addEventListener('message', this.handleWorkerMessage_.bind(this));
      this.socket_.postMessage({
        uri: uri
      });
    }

    WorkerSocket.prototype.handleWorkerMessage_ = function (ev) {
      var data = ev.data;

      if (data instanceof ArrayBuffer || typeof data === 'string') {
        // binary or JSON message from rosbridge
        this.onmessage(ev);
      } else {
        // control message from the wrapped WebSocket
        var type = data.type;

        if (type === 'close') {
          this.onclose(null);
        } else if (type === 'open') {
          this.onopen(null);
        } else if (type === 'error') {
          this.onerror(null);
        } else {
          throw 'Unknown message from workersocket';
        }
      }
    };

    WorkerSocket.prototype.send = function (data) {
      this.socket_.postMessage(data);
    };

    WorkerSocket.prototype.close = function () {
      this.socket_.postMessage({
        close: true
      });
    };

    module.exports = WorkerSocket;
    /***/
  },

  /***/
  "./node_modules/roslib/src/util/workerSocketImpl.js":
  /*!**********************************************************!*\
    !*** ./node_modules/roslib/src/util/workerSocketImpl.js ***!
    \**********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesRoslibSrcUtilWorkerSocketImplJs(module, exports, __webpack_require__) {
    var WebSocket = WebSocket || __webpack_require__(
    /*! ws */
    "./node_modules/roslib/src/util/shim/WebSocket.js");

    module.exports = function (self) {
      var socket = null;

      function handleSocketMessage(ev) {
        var data = ev.data;

        if (data instanceof ArrayBuffer) {
          // binary message, transfer for speed
          self.postMessage(data, [data]);
        } else {
          // JSON message, copy string
          self.postMessage(data);
        }
      }

      function handleSocketControl(ev) {
        self.postMessage({
          type: ev.type
        });
      }

      self.addEventListener('message', function (ev) {
        var data = ev.data;

        if (typeof data === 'string') {
          // JSON message from ROSLIB
          socket.send(data);
        } else {
          // control message
          if (data.hasOwnProperty('close')) {
            socket.close();
            socket = null;
          } else if (data.hasOwnProperty('uri')) {
            var uri = data.uri;
            socket = new WebSocket(uri);
            socket.binaryType = 'arraybuffer';
            socket.onmessage = handleSocketMessage;
            socket.onclose = handleSocketControl;
            socket.onopen = handleSocketControl;
            socket.onerror = handleSocketControl;
          } else {
            throw 'Unknown message to WorkerSocket';
          }
        }
      });
    };
    /***/

  },

  /***/
  "./node_modules/webworkify/index.js":
  /*!******************************************!*\
    !*** ./node_modules/webworkify/index.js ***!
    \******************************************/

  /*! no static exports found */

  /***/
  function node_modulesWebworkifyIndexJs(module, exports) {
    var bundleFn = arguments[3];
    var sources = arguments[4];
    var cache = arguments[5];
    var stringify = JSON.stringify;

    module.exports = function (fn, options) {
      var wkey;
      var cacheKeys = Object.keys(cache);

      for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports; // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both

        if (exp === fn || exp && exp.default === fn) {
          wkey = key;
          break;
        }
      }

      if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};

        for (var i = 0, l = cacheKeys.length; i < l; i++) {
          var key = cacheKeys[i];
          wcache[key] = key;
        }

        sources[wkey] = ['function(require,module,exports){' + fn + '(self); }', wcache];
      }

      var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
      var scache = {};
      scache[wkey] = wkey;
      sources[skey] = ['function(require,module,exports){' + // try to call default if defined to also support babel esmodule exports
      'var f = require(' + stringify(wkey) + ');' + '(f.default ? f.default : f)(self);' + '}', scache];
      var workerSources = {};
      resolveSources(skey);

      function resolveSources(key) {
        workerSources[key] = true;

        for (var depPath in sources[key][1]) {
          var depKey = sources[key][1][depPath];

          if (!workerSources[depKey]) {
            resolveSources(depKey);
          }
        }
      }

      var src = '(' + bundleFn + ')({' + Object.keys(workerSources).map(function (key) {
        return stringify(key) + ':[' + sources[key][0] + ',' + stringify(sources[key][1]) + ']';
      }).join(',') + '},{},[' + stringify(skey) + '])';
      var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
      var blob = new Blob([src], {
        type: 'text/javascript'
      });

      if (options && options.bare) {
        return blob;
      }

      var workerUrl = URL.createObjectURL(blob);
      var worker = new Worker(workerUrl);
      worker.objectURL = workerUrl;
      return worker;
    };
    /***/

  },

  /***/
  "./src/app/components/joystick/joystick.component.ts":
  /*!***********************************************************!*\
    !*** ./src/app/components/joystick/joystick.component.ts ***!
    \***********************************************************/

  /*! exports provided: JoystickComponent */

  /***/
  function srcAppComponentsJoystickJoystickComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "JoystickComponent", function () {
      return JoystickComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    let JoystickComponent = class JoystickComponent {
      constructor() {}

    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)], JoystickComponent.prototype, "streaming", void 0);
    JoystickComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'joystick',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./joystick.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/joystick/joystick.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], JoystickComponent);
    /***/
  },

  /***/
  "./src/app/components/map/map.component.scss":
  /*!***************************************************!*\
    !*** ./src/app/components/map/map.component.scss ***!
    \***************************************************/

  /*! exports provided: default */

  /***/
  function srcAppComponentsMapMapComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".green {\n  background-color: green;\n}\n\n.blue {\n  background-color: blue;\n}\n\n.red {\n  background-color: red;\n}\n\n.orange {\n  background-color: orange;\n}\n\n.form {\n  min-width: 70%;\n  max-width: 80%;\n  align-self: center;\n  margin: 0 auto;\n  /* border: 1px solid grey; */\n}\n\np {\n  padding: 0 !important;\n}\n\n/* MAP */\n\n.map {\n  width: 100%;\n  display: -webkit-box;\n  display: flex;\n  margin: 0 auto;\n}\n\n.map div {\n  width: 50%;\n  margin: 0 auto;\n  border: 2px solid grey;\n  cursor: hand !important;\n  color: white;\n  font-weight: bold;\n  text-align: center;\n  height: 150px;\n  opacity: 0.5;\n}\n\n.map div:hover {\n  opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RpYW5hL0RvY3VtZW50b3MvUm9ib3RpY2EvSmlua29Sb2JvdGljcy9qaW5rb2JvdC9zcmMvYXBwL2NvbXBvbmVudHMvbWFwL21hcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9tYXAvbWFwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQVMsdUJBQUE7QUNFVDs7QUREQTtFQUFRLHNCQUFBO0FDS1I7O0FESkE7RUFBTyxxQkFBQTtBQ1FQOztBRFBBO0VBQVUsd0JBQUE7QUNXVjs7QURUQTtFQUNJLGNBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0QsNEJBQUE7QUNZSDs7QURUQTtFQUNJLHFCQUFBO0FDWUo7O0FEVEEsUUFBQTs7QUFDQTtFQUNJLFdBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxjQUFBO0FDWUo7O0FEVEE7RUFDSSxVQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FDWUo7O0FEVEE7RUFDSSxVQUFBO0FDWUoiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL21hcC9tYXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3JlZW4geyBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjt9XG4uYmx1ZSB7IGJhY2tncm91bmQtY29sb3I6IGJsdWU7fVxuLnJlZCB7IGJhY2tncm91bmQtY29sb3I6IHJlZDt9XG4ub3JhbmdlIHsgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO31cblxuLmZvcm0ge1xuICAgIG1pbi13aWR0aDo3MCU7XG4gICAgbWF4LXdpZHRoOjgwJTtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7IFxuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgLyogYm9yZGVyOiAxcHggc29saWQgZ3JleTsgKi8gICBcbn1cblxucCB7XG4gICAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xufVxuXG4vKiBNQVAgKi9cbi5tYXAge1xuICAgIHdpZHRoOjEwMCU7XG4gICAgZGlzcGxheTpmbGV4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ubWFwIGRpdiB7XG4gICAgd2lkdGg6NTAlO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIGJvcmRlcjoycHggc29saWQgZ3JleTtcbiAgICBjdXJzb3I6aGFuZCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAxNTBweDtcbiAgICBvcGFjaXR5OiAwLjU7XG59XG5cbi5tYXAgZGl2OmhvdmVyIHtcbiAgICBvcGFjaXR5OiAxO1xufSIsIi5ncmVlbiB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xufVxuXG4uYmx1ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG5cbi5yZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5vcmFuZ2Uge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XG59XG5cbi5mb3JtIHtcbiAgbWluLXdpZHRoOiA3MCU7XG4gIG1heC13aWR0aDogODAlO1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIG1hcmdpbjogMCBhdXRvO1xuICAvKiBib3JkZXI6IDFweCBzb2xpZCBncmV5OyAqL1xufVxuXG5wIHtcbiAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xufVxuXG4vKiBNQVAgKi9cbi5tYXAge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5tYXAgZGl2IHtcbiAgd2lkdGg6IDUwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZXk7XG4gIGN1cnNvcjogaGFuZCAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGhlaWdodDogMTUwcHg7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLm1hcCBkaXY6aG92ZXIge1xuICBvcGFjaXR5OiAxO1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/components/map/map.component.ts":
  /*!*************************************************!*\
    !*** ./src/app/components/map/map.component.ts ***!
    \*************************************************/

  /*! exports provided: MapComponent */

  /***/
  function srcAppComponentsMapMapComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MapComponent", function () {
      return MapComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _services_ros_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./../../services/ros/navigation.service */
    "./src/app/services/ros/navigation.service.ts");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    let MapComponent = class MapComponent {
      constructor(navigationService) {
        this.navigationService = navigationService;
      }

      start(destination_id) {
        this.navigationService.startSM(destination_id);
        this.goalString = this.navigationService.setGoalString(destination_id);
      }

    };

    MapComponent.ctorParameters = () => [{
      type: _services_ros_navigation_service__WEBPACK_IMPORTED_MODULE_1__["NavigationService"]
    }];

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)], MapComponent.prototype, "streaming", void 0);
    MapComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
      selector: 'map',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./map.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/map/map.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./map.component.scss */
      "./src/app/components/map/map.component.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_ros_navigation_service__WEBPACK_IMPORTED_MODULE_1__["NavigationService"]])], MapComponent);
    /***/
  },

  /***/
  "./src/app/components/streaming/streaming.component.scss":
  /*!***************************************************************!*\
    !*** ./src/app/components/streaming/streaming.component.scss ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppComponentsStreamingStreamingComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ":host {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RpYW5hL0RvY3VtZW50b3MvUm9ib3RpY2EvSmlua29Sb2JvdGljcy9qaW5rb2JvdC9zcmMvYXBwL2NvbXBvbmVudHMvc3RyZWFtaW5nL3N0cmVhbWluZy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zdHJlYW1pbmcvc3RyZWFtaW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc3RyZWFtaW5nL3N0cmVhbWluZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0e1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6MDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICB9IiwiOmhvc3Qge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/components/streaming/streaming.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/components/streaming/streaming.component.ts ***!
    \*************************************************************/

  /*! exports provided: StreamingComponent */

  /***/
  function srcAppComponentsStreamingStreamingComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StreamingComponent", function () {
      return StreamingComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var src_app_services_ros_streaming_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! src/app/services/ros/streaming.service */
    "./src/app/services/ros/streaming.service.ts");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    let StreamingComponent = class StreamingComponent {
      constructor(streamingService) {
        this.streamingService = streamingService;
      }

      ngOnInit() {
        if (this.streaming) this.streamingService.setCamera();
      }

      closeStreaming() {
        this.streamingService.setStreaming(false);
      }

    };

    StreamingComponent.ctorParameters = () => [{
      type: src_app_services_ros_streaming_service__WEBPACK_IMPORTED_MODULE_1__["StreamingService"]
    }];

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)], StreamingComponent.prototype, "streaming", void 0);
    StreamingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
      selector: 'streaming',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./streaming.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/streaming/streaming.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./streaming.component.scss */
      "./src/app/components/streaming/streaming.component.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_ros_streaming_service__WEBPACK_IMPORTED_MODULE_1__["StreamingService"]])], StreamingComponent);
    /***/
  },

  /***/
  "./src/app/pages/play/play.module.ts":
  /*!*******************************************!*\
    !*** ./src/app/pages/play/play.module.ts ***!
    \*******************************************/

  /*! exports provided: PlayPageModule */

  /***/
  function srcAppPagesPlayPlayModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PlayPageModule", function () {
      return PlayPageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _components_streaming_streaming_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./../../components/streaming/streaming.component */
    "./src/app/components/streaming/streaming.component.ts");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _play_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./play.page */
    "./src/app/pages/play/play.page.ts");
    /* harmony import */


    var src_app_components_map_map_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! src/app/components/map/map.component */
    "./src/app/components/map/map.component.ts");
    /* harmony import */


    var src_app_components_joystick_joystick_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! src/app/components/joystick/joystick.component */
    "./src/app/components/joystick/joystick.component.ts");

    let PlayPageModule = class PlayPageModule {};
    PlayPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
      imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild([{
        path: "",
        component: _play_page__WEBPACK_IMPORTED_MODULE_7__["PlayPage"]
      }])],
      declarations: [_play_page__WEBPACK_IMPORTED_MODULE_7__["PlayPage"], src_app_components_map_map_component__WEBPACK_IMPORTED_MODULE_8__["MapComponent"], src_app_components_joystick_joystick_component__WEBPACK_IMPORTED_MODULE_9__["JoystickComponent"], _components_streaming_streaming_component__WEBPACK_IMPORTED_MODULE_1__["StreamingComponent"]]
    })], PlayPageModule);
    /***/
  },

  /***/
  "./src/app/pages/play/play.page.ts":
  /*!*****************************************!*\
    !*** ./src/app/pages/play/play.page.ts ***!
    \*****************************************/

  /*! exports provided: PlayPage */

  /***/
  function srcAppPagesPlayPlayPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PlayPage", function () {
      return PlayPage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./../../components/tabs/tabs.component */
    "./src/app/components/tabs/tabs.component.ts");
    /* harmony import */


    var src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/services/ros/ros.service */
    "./src/app/services/ros/ros.service.ts");
    /* harmony import */


    var src_app_services_ros_streaming_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/services/ros/streaming.service */
    "./src/app/services/ros/streaming.service.ts");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");

    let PlayPage = class PlayPage {
      constructor(rosService, streamingService, plt, tabs) {
        this.rosService = rosService;
        this.streamingService = streamingService;
        this.plt = plt;
        this.tabs = tabs;
        this.view = "map";
        this.camera = true;
      }

      ngOnInit() {
        this.rosService.connect();
      }

      show() {
        if (this.view == 'camera') {
          // Ponemos el streaming a true
          this.streaming = this.streamingService.setStreaming(true); // Ocultamos el header y las tabs para pantalla completa

          this.tabs.hide(); // Cambiamos a la pestaña Mapa para que no se quede activa la pestaña cámara al volver a la página Play

          this.view = 'map';
        }
      }

      closeStreaming() {
        // Si es movil desbloquemos el giro de pantalla
        if (!this.plt.testUserAgent("desktop")) screen.orientation.unlock(); // Ponemos el streaming a false

        this.streaming = this.streamingService.setStreaming(false); // Mostramos el header y las tabs

        this.tabs.show();
      }

    };

    PlayPage.ctorParameters = () => [{
      type: src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_2__["RosConnectionService"]
    }, {
      type: src_app_services_ros_streaming_service__WEBPACK_IMPORTED_MODULE_3__["StreamingService"]
    }, {
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"]
    }, {
      type: _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__["TabsComponent"]
    }];

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)], PlayPage.prototype, "streaming", void 0);
    PlayPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
      selector: "app-tab2",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./play.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/play/play.page.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_2__["RosConnectionService"], src_app_services_ros_streaming_service__WEBPACK_IMPORTED_MODULE_3__["StreamingService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__["TabsComponent"]])], PlayPage);
    /***/
  },

  /***/
  "./src/app/services/ros/navigation.service.ts":
  /*!****************************************************!*\
    !*** ./src/app/services/ros/navigation.service.ts ***!
    \****************************************************/

  /*! exports provided: NavigationService */

  /***/
  function srcAppServicesRosNavigationServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NavigationService", function () {
      return NavigationService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/services/ros/ros.service */
    "./src/app/services/ros/ros.service.ts");
    /*********************************************************************
    @name navigation.service.ts
    @description Servicio para navegación del robot
    @author Diana Hernández Soler
    @date 06/04/2020
    @license GPLv3
    *********************************************************************/


    let NavigationService = class NavigationService {
      constructor(rosService) {
        this.rosService = rosService;
        this.speed = 0.5;
      }

      startSM(goal) {
        this.goalString = this.setGoalString(goal);
        this.service_busy = true;
        this.service_response = '';
        let nameService = '/jinko_navigation';
        let typeMessage = 'jinko_service_msg/jinko_service_msg';
        let data = {
          destino: parseInt(goal),
          coordenadaX: 0.0,
          coordenadaY: 0.0
        };
        this.rosService.callService(nameService, typeMessage, data);
      }

      setGoalString(goal) {
        switch (goal) {
          case 0:
            break;

          case 1:
            this.goalString = 'DOOR';
            break;

          case 2:
            this.goalString = 'STUDY';
            break;

          case 3:
            this.goalString = 'GAMES';
            break;

          case 4:
            this.goalString = 'TOUR';
            break;

          default:
            this.goalString = 'no destination yet';
        }

        return this.goalString;
      }

      move(direction) {
        let topicName = '/cmd_vel';
        let typeMessage = 'geometry_msgs/Twist';
        let message = this.setDirection(direction, this.speed);
        this.rosService.publishTopic(topicName, typeMessage, message);
      }

      setDirection(direction, speed) {
        let coords;

        switch (direction) {
          case 'U':
            coords = this.getPositionSquema();
            coords.linear.x = speed;
            break;

          case 'D':
            coords = this.getPositionSquema();
            coords.linear.x = -speed;
            break;

          case 'L':
            coords = this.getPositionSquema();
            coords.angular.z = speed;
            break;

          case 'R':
            coords = this.getPositionSquema();
            coords.angular.z = -speed;
        }

        return coords;
      }

      getPositionSquema() {
        return {
          linear: {
            x: 0,
            y: 0,
            z: 0
          },
          angular: {
            x: 0,
            y: 0,
            z: 0
          }
        };
      }

    };

    NavigationService.ctorParameters = () => [{
      type: src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_2__["RosConnectionService"]
    }];

    NavigationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_2__["RosConnectionService"]])], NavigationService);
    /***/
  },

  /***/
  "./src/app/services/ros/ros.service.ts":
  /*!*********************************************!*\
    !*** ./src/app/services/ros/ros.service.ts ***!
    \*********************************************/

  /*! exports provided: RosConnectionService */

  /***/
  function srcAppServicesRosRosServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RosConnectionService", function () {
      return RosConnectionService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var roslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! roslib */
    "./node_modules/roslib/src/RosLib.js");
    /* harmony import */


    var roslib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(roslib__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /*********************************************************************
    @name ros.service.ts
    @description Servicio para comunicación con ROS
    @author Diana Hernández Soler
    @date 06/04/2020
    @license GPLv3
    *********************************************************************/


    let RosConnectionService = class RosConnectionService {
      constructor(plt) {
        this.plt = plt;
        /* PARA PROBAR EN EL MOVIL:
        Hay que añadir
           android:usesCleartextTraffic="true"
        dentro de <application> en el AndroidManifest.xml
        CAMBIAR POR LA IP DE TU ORDEANDOR, el movil tiene que estar conectado a la misma red wifi */

        this.url = '192.168.1.111';
        this.connected = false;
        this.loading = false;
        this.service_busy = false;
      }

      connect() {
        if (this.plt.testUserAgent('desktop')) this.url = 'localhost' + ':' + this.port;
        this.ros = new roslib__WEBPACK_IMPORTED_MODULE_2__["Ros"]({
          url: 'ws://192.168.1.111:9090'
        });
        this.ros.on('connection', () => {
          this.connected = true;
          this.loading = false;
          console.log('Connection to ROSBridge established!');
        });
        this.ros.on('error', error => {
          console.log(new Date().toTimeString() + " - Error: ".concat(error));
        });
        this.ros.on('close', () => {
          console.log(new Date().toTimeString() + ' - Disconnected!');
          this.connected = false;
          this.loading = false;
        });
      }

      getUrl() {
        return this.url;
      }
      /***************************************************************************************
      callService()
      @author Diana Hernández
      @description Función genérica para comunicarse con ros mediante Servicios
      @params nameService: Servicio que será llamado
      @params typeMessage: Tipo de mensaje que necesita el servicio (1º parámetro)
      @params data: información que se quiere pasar a ros
      @params callback: Función para manejar la respuesta del servicio
      Por defecto hace un console.log del resultado del servicio
      @date 23/04/2020
      ****************************************************************************************/


      callService(nameSerivce, typeMessage, data, callback = response => {
        console.log(response);
      }) {
        let service = new roslib__WEBPACK_IMPORTED_MODULE_2__["Service"]({
          ros: this.ros,
          name: nameSerivce,
          serviceType: typeMessage
        });
        let request = new roslib__WEBPACK_IMPORTED_MODULE_2__["ServiceRequest"](data);
        service.callService(request, result => {
          this.service_busy = false;
          callback(result);
        }, error => {
          this.service_busy = false;
          console.error(error);
        });
      }

      /***************************************************************************************
      publishTopic()
      @author Diana Hernández
      @description Función genérica para publicar en un topic
      @params topicName: nombre del topic en que se quiere publicar.
      @params typeMessage: typo de mensaje que requiere el Topic.
      @params data?: información que se quiere publicar
      @date 23/04/2020
      ****************************************************************************************/
      publishTopic(topicName, typeMessage, data = {}) {
        let topic = new roslib__WEBPACK_IMPORTED_MODULE_2__["Topic"]({
          ros: this.ros,
          name: topicName,
          messageType: typeMessage
        });
        topic.publish(new roslib__WEBPACK_IMPORTED_MODULE_2__["Message"](data));
      }

      disconnect() {
        if (this.connected) this.ros.close();
      }

    };

    RosConnectionService.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"]
    }];

    RosConnectionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"]])], RosConnectionService);
    /***/
  },

  /***/
  "./src/app/services/ros/streaming.service.ts":
  /*!***************************************************!*\
    !*** ./src/app/services/ros/streaming.service.ts ***!
    \***************************************************/

  /*! exports provided: StreamingService */

  /***/
  function srcAppServicesRosStreamingServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StreamingService", function () {
      return StreamingService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! src/app/services/ros/ros.service */
    "./src/app/services/ros/ros.service.ts");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /*********************************************************************
    @name streaming.service.ts
    @description Servicio para iniciar el streaming
    @author Diana Hernández Soler
    @date 06/04/2020
    @license GPLv3
    *********************************************************************/


    let StreamingService = class StreamingService {
      constructor(plt, rosService) {
        this.plt = plt;
        this.rosService = rosService;
        this.streaming = false; // Tamaño de la pantalla

        this.screenSize = {
          w: window.innerWidth,
          h: window.innerHeight
        };
      }

      setCamera() {
        // Si es dispositivo movil bloquear en posición landscape
        if (!this.plt.testUserAgent("desktop")) {
          screen.orientation.lock("landscape-primary");
          this.screenSize.w = window.innerHeight;
          this.screenSize.h = window.innerWidth;
        }

        new MJPEGCANVAS.Viewer({
          divID: "divCamera",
          host: '192.168.1.111',
          width: this.screenSize.w,
          height: this.screenSize.h,
          topic: '/turtlebot3/camera/image_raw',
          ssl: false
        }) || {};
      }

      setStreaming(bol) {
        this.streaming = bol;
        return bol;
      }

      isStreamingSync() {
        return this.streaming;
      }

    };

    StreamingService.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"]
    }, {
      type: src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_1__["RosConnectionService"]
    }];

    StreamingService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
      providedIn: "root"
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"], src_app_services_ros_ros_service__WEBPACK_IMPORTED_MODULE_1__["RosConnectionService"]])], StreamingService);
    /***/
  }
}]);
//# sourceMappingURL=pages-play-play-module-es5.js.map