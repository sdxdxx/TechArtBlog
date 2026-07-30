"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key3, value) => key3 in obj ? __defProp(obj, key3, { enumerable: true, configurable: true, writable: true, value }) : obj[key3] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key3 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key3) && key3 !== except)
        __defProp(to, key3, { get: () => from[key3], enumerable: !(desc = __getOwnPropDesc(from, key3)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key3, value) => __defNormalProp(obj, typeof key3 !== "symbol" ? key3 + "" : key3, value);

// node_modules/.pnpm/dexie@4.4.4/node_modules/dexie/dist/dexie.js
var require_dexie = __commonJS({
  "node_modules/.pnpm/dexie@4.4.4/node_modules/dexie/dist/dexie.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Dexie = factory());
    })(exports, function() {
      "use strict";
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      }
      typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message2) {
        var e = new Error(message2);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
      var keys = Object.keys;
      var isArray = Array.isArray;
      if (typeof Promise !== "undefined" && !_global.Promise) {
        _global.Promise = Promise;
      }
      function extend(obj, extension2) {
        if (typeof extension2 !== "object")
          return obj;
        keys(extension2).forEach(function(key3) {
          obj[key3] = extension2[key3];
        });
        return obj;
      }
      var getProto = Object.getPrototypeOf;
      var _hasOwn = {}.hasOwnProperty;
      function hasOwn(obj, prop) {
        return _hasOwn.call(obj, prop);
      }
      function props(proto, extension2) {
        if (typeof extension2 === "function")
          extension2 = extension2(getProto(proto));
        (typeof Reflect === "undefined" ? keys : Reflect.ownKeys)(extension2).forEach(function(key3) {
          setProp(proto, key3, extension2[key3]);
        });
      }
      var defineProperty = Object.defineProperty;
      function setProp(obj, prop, functionOrGetSet, options) {
        defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === "function" ? {
          get: functionOrGetSet.get,
          set: functionOrGetSet.set,
          configurable: true
        } : { value: functionOrGetSet, configurable: true, writable: true }, options));
      }
      function derive(Child) {
        return {
          from: function(Parent) {
            Child.prototype = Object.create(Parent.prototype);
            setProp(Child.prototype, "constructor", Child);
            return {
              extend: props.bind(null, Child.prototype)
            };
          }
        };
      }
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      function getPropertyDescriptor(obj, prop) {
        var pd = getOwnPropertyDescriptor(obj, prop);
        var proto;
        return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
      }
      var _slice = [].slice;
      function slice(args, start, end) {
        return _slice.call(args, start, end);
      }
      function override(origFunc, overridedFactory) {
        return overridedFactory(origFunc);
      }
      function assert(b) {
        if (!b)
          throw new Error("Assertion Failed");
      }
      function asap$1(fn) {
        if (_global.setImmediate)
          setImmediate(fn);
        else
          setTimeout(fn, 0);
      }
      function arrayToObject(array, extractor) {
        return array.reduce(function(result, item, i) {
          var nameAndValue = extractor(item, i);
          if (nameAndValue)
            result[nameAndValue[0]] = nameAndValue[1];
          return result;
        }, {});
      }
      function getByKeyPath(obj, keyPath) {
        if (typeof keyPath === "string" && hasOwn(obj, keyPath))
          return obj[keyPath];
        if (!keyPath)
          return obj;
        if (typeof keyPath !== "string") {
          var rv = [];
          for (var i = 0, l = keyPath.length; i < l; ++i) {
            var val = getByKeyPath(obj, keyPath[i]);
            rv.push(val);
          }
          return rv;
        }
        var period = keyPath.indexOf(".");
        if (period !== -1) {
          var innerObj = obj[keyPath.substr(0, period)];
          return innerObj == null ? void 0 : getByKeyPath(innerObj, keyPath.substr(period + 1));
        }
        return void 0;
      }
      function setByKeyPath(obj, keyPath, value) {
        if (!obj || keyPath === void 0)
          return;
        if ("isFrozen" in Object && Object.isFrozen(obj))
          return;
        if (typeof keyPath !== "string" && "length" in keyPath) {
          assert(typeof value !== "string" && "length" in value);
          for (var i = 0, l = keyPath.length; i < l; ++i) {
            setByKeyPath(obj, keyPath[i], value[i]);
          }
        } else {
          var period = keyPath.indexOf(".");
          if (period !== -1) {
            var currentKeyPath = keyPath.substr(0, period);
            var remainingKeyPath = keyPath.substr(period + 1);
            if (remainingKeyPath === "")
              if (value === void 0) {
                if (isArray(obj) && !isNaN(parseInt(currentKeyPath)))
                  obj.splice(currentKeyPath, 1);
                else
                  delete obj[currentKeyPath];
              } else
                obj[currentKeyPath] = value;
            else {
              var innerObj = obj[currentKeyPath];
              if (!innerObj || !hasOwn(obj, currentKeyPath)) {
                if (value === void 0)
                  return;
                innerObj = obj[currentKeyPath] = {};
              }
              setByKeyPath(innerObj, remainingKeyPath, value);
            }
          } else {
            if (value === void 0) {
              if (isArray(obj) && !isNaN(parseInt(keyPath)))
                obj.splice(keyPath, 1);
              else
                delete obj[keyPath];
            } else
              obj[keyPath] = value;
          }
        }
      }
      function delByKeyPath(obj, keyPath) {
        if (typeof keyPath === "string")
          setByKeyPath(obj, keyPath, void 0);
        else if ("length" in keyPath)
          [].map.call(keyPath, function(kp) {
            setByKeyPath(obj, kp, void 0);
          });
      }
      function shallowClone(obj) {
        var rv = {};
        for (var m in obj) {
          if (hasOwn(obj, m))
            rv[m] = obj[m];
        }
        return rv;
      }
      var concat = [].concat;
      function flatten(a) {
        return concat.apply([], a);
      }
      var intrinsicTypeNames = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(flatten([8, 16, 32, 64].map(function(num) {
        return ["Int", "Uint", "Float"].map(function(t) {
          return t + num + "Array";
        });
      }))).filter(function(t) {
        return _global[t];
      });
      var intrinsicTypes = new Set(intrinsicTypeNames.map(function(t) {
        return _global[t];
      }));
      function cloneSimpleObjectTree(o) {
        var rv = {};
        for (var k in o)
          if (hasOwn(o, k)) {
            var v = o[k];
            rv[k] = !v || typeof v !== "object" || intrinsicTypes.has(v.constructor) ? v : cloneSimpleObjectTree(v);
          }
        return rv;
      }
      var circularRefs = null;
      function deepClone(any) {
        circularRefs = /* @__PURE__ */ new WeakMap();
        var rv = innerDeepClone(any);
        circularRefs = null;
        return rv;
      }
      function innerDeepClone(x) {
        if (!x || typeof x !== "object")
          return x;
        var rv = circularRefs.get(x);
        if (rv)
          return rv;
        if (isArray(x)) {
          rv = [];
          circularRefs.set(x, rv);
          for (var i = 0, l = x.length; i < l; ++i) {
            rv.push(innerDeepClone(x[i]));
          }
        } else if (intrinsicTypes.has(x.constructor)) {
          rv = x;
        } else {
          var proto = getProto(x);
          rv = proto === Object.prototype ? {} : Object.create(proto);
          circularRefs.set(x, rv);
          for (var prop in x) {
            if (hasOwn(x, prop)) {
              rv[prop] = innerDeepClone(x[prop]);
            }
          }
        }
        return rv;
      }
      var toString = {}.toString;
      function toStringTag(o) {
        return toString.call(o).slice(8, -1);
      }
      var iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
      var getIteratorOf = typeof iteratorSymbol === "symbol" ? function(x) {
        var i;
        return x != null && (i = x[iteratorSymbol]) && i.apply(x);
      } : function() {
        return null;
      };
      function delArrayItem(a, x) {
        var i = a.indexOf(x);
        if (i >= 0)
          a.splice(i, 1);
        return i >= 0;
      }
      var NO_CHAR_ARRAY = {};
      function getArrayOf(arrayLike) {
        var i, a, x, it;
        if (arguments.length === 1) {
          if (isArray(arrayLike))
            return arrayLike.slice();
          if (this === NO_CHAR_ARRAY && typeof arrayLike === "string")
            return [arrayLike];
          if (it = getIteratorOf(arrayLike)) {
            a = [];
            while (x = it.next(), !x.done)
              a.push(x.value);
            return a;
          }
          if (arrayLike == null)
            return [arrayLike];
          i = arrayLike.length;
          if (typeof i === "number") {
            a = new Array(i);
            while (i--)
              a[i] = arrayLike[i];
            return a;
          }
          return [arrayLike];
        }
        i = arguments.length;
        a = new Array(i);
        while (i--)
          a[i] = arguments[i];
        return a;
      }
      var isAsyncFunction = typeof Symbol !== "undefined" ? function(fn) {
        return fn[Symbol.toStringTag] === "AsyncFunction";
      } : function() {
        return false;
      };
      var dexieErrorNames = [
        "Modify",
        "Bulk",
        "OpenFailed",
        "VersionChange",
        "Schema",
        "Upgrade",
        "InvalidTable",
        "MissingAPI",
        "NoSuchDatabase",
        "InvalidArgument",
        "SubTransaction",
        "Unsupported",
        "Internal",
        "DatabaseClosed",
        "PrematureCommit",
        "ForeignAwait"
      ];
      var idbDomErrorNames = [
        "Unknown",
        "Constraint",
        "Data",
        "TransactionInactive",
        "ReadOnly",
        "Version",
        "NotFound",
        "InvalidState",
        "InvalidAccess",
        "Abort",
        "Timeout",
        "QuotaExceeded",
        "Syntax",
        "DataClone"
      ];
      var errorList = dexieErrorNames.concat(idbDomErrorNames);
      var defaultTexts = {
        VersionChanged: "Database version changed by other database connection",
        DatabaseClosed: "Database has been closed",
        Abort: "Transaction aborted",
        TransactionInactive: "Transaction has already completed or failed",
        MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
      };
      function DexieError(name, msg) {
        this.name = name;
        this.message = msg;
      }
      derive(DexieError).from(Error).extend({
        toString: function() {
          return this.name + ": " + this.message;
        }
      });
      function getMultiErrorMessage(msg, failures) {
        return msg + ". Errors: " + Object.keys(failures).map(function(key3) {
          return failures[key3].toString();
        }).filter(function(v, i, s) {
          return s.indexOf(v) === i;
        }).join("\n");
      }
      function ModifyError(msg, failures, successCount, failedKeys) {
        this.failures = failures;
        this.failedKeys = failedKeys;
        this.successCount = successCount;
        this.message = getMultiErrorMessage(msg, failures);
      }
      derive(ModifyError).from(DexieError);
      function BulkError(msg, failures) {
        this.name = "BulkError";
        this.failures = Object.keys(failures).map(function(pos) {
          return failures[pos];
        });
        this.failuresByPos = failures;
        this.message = getMultiErrorMessage(msg, this.failures);
      }
      derive(BulkError).from(DexieError);
      var errnames = errorList.reduce(function(obj, name) {
        return obj[name] = name + "Error", obj;
      }, {});
      var BaseException = DexieError;
      var exceptions = errorList.reduce(function(obj, name) {
        var fullName = name + "Error";
        function DexieError2(msgOrInner, inner) {
          this.name = fullName;
          if (!msgOrInner) {
            this.message = defaultTexts[name] || fullName;
            this.inner = null;
          } else if (typeof msgOrInner === "string") {
            this.message = "".concat(msgOrInner).concat(!inner ? "" : "\n " + inner);
            this.inner = inner || null;
          } else if (typeof msgOrInner === "object") {
            this.message = "".concat(msgOrInner.name, " ").concat(msgOrInner.message);
            this.inner = msgOrInner;
          }
        }
        derive(DexieError2).from(BaseException);
        obj[name] = DexieError2;
        return obj;
      }, {});
      exceptions.Syntax = SyntaxError;
      exceptions.Type = TypeError;
      exceptions.Range = RangeError;
      var exceptionMap = idbDomErrorNames.reduce(function(obj, name) {
        obj[name + "Error"] = exceptions[name];
        return obj;
      }, {});
      function mapError(domError, message2) {
        if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
          return domError;
        var rv = new exceptionMap[domError.name](message2 || domError.message, domError);
        if ("stack" in domError) {
          setProp(rv, "stack", {
            get: function() {
              return this.inner.stack;
            }
          });
        }
        return rv;
      }
      var fullNameExceptions = errorList.reduce(function(obj, name) {
        if (["Syntax", "Type", "Range"].indexOf(name) === -1)
          obj[name + "Error"] = exceptions[name];
        return obj;
      }, {});
      fullNameExceptions.ModifyError = ModifyError;
      fullNameExceptions.DexieError = DexieError;
      fullNameExceptions.BulkError = BulkError;
      function nop() {
      }
      function mirror(val) {
        return val;
      }
      function pureFunctionChain(f1, f2) {
        if (f1 == null || f1 === mirror)
          return f2;
        return function(val) {
          return f2(f1(val));
        };
      }
      function callBoth(on1, on2) {
        return function() {
          on1.apply(this, arguments);
          on2.apply(this, arguments);
        };
      }
      function hookCreatingChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function() {
          var res = f1.apply(this, arguments);
          if (res !== void 0)
            arguments[0] = res;
          var onsuccess = this.onsuccess, onerror = this.onerror;
          this.onsuccess = null;
          this.onerror = null;
          var res2 = f2.apply(this, arguments);
          if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
          if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
          return res2 !== void 0 ? res2 : res;
        };
      }
      function hookDeletingChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function() {
          f1.apply(this, arguments);
          var onsuccess = this.onsuccess, onerror = this.onerror;
          this.onsuccess = this.onerror = null;
          f2.apply(this, arguments);
          if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
          if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        };
      }
      function hookUpdatingChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function(modifications) {
          var res = f1.apply(this, arguments);
          extend(modifications, res);
          var onsuccess = this.onsuccess, onerror = this.onerror;
          this.onsuccess = null;
          this.onerror = null;
          var res2 = f2.apply(this, arguments);
          if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
          if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
          return res === void 0 ? res2 === void 0 ? void 0 : res2 : extend(res, res2);
        };
      }
      function reverseStoppableEventChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function() {
          if (f2.apply(this, arguments) === false)
            return false;
          return f1.apply(this, arguments);
        };
      }
      function promisableChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function() {
          var res = f1.apply(this, arguments);
          if (res && typeof res.then === "function") {
            var thiz = this, i = arguments.length, args = new Array(i);
            while (i--)
              args[i] = arguments[i];
            return res.then(function() {
              return f2.apply(thiz, args);
            });
          }
          return f2.apply(this, arguments);
        };
      }
      var debug = typeof location !== "undefined" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
      function setDebug(value, filter) {
        debug = value;
      }
      var INTERNAL = {};
      var ZONE_ECHO_LIMIT = 100, _a$1 = typeof Promise === "undefined" ? [] : function() {
        var globalP = Promise.resolve();
        if (typeof crypto === "undefined" || !crypto.subtle)
          return [globalP, getProto(globalP), globalP];
        var nativeP = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
        return [nativeP, getProto(nativeP), globalP];
      }(), resolvedNativePromise = _a$1[0], nativePromiseProto = _a$1[1], resolvedGlobalPromise = _a$1[2], nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
      var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
      var patchGlobalPromise = !!resolvedGlobalPromise;
      function schedulePhysicalTick() {
        queueMicrotask(physicalTick);
      }
      var asap = function(callback, args) {
        microtickQueue.push([callback, args]);
        if (needsNewPhysicalTick) {
          schedulePhysicalTick();
          needsNewPhysicalTick = false;
        }
      };
      var isOutsideMicroTick = true, needsNewPhysicalTick = true, unhandledErrors = [], rejectingErrors = [], rejectionMapper = mirror;
      var globalPSD = {
        id: "global",
        global: true,
        ref: 0,
        unhandleds: [],
        onunhandled: nop,
        pgp: false,
        env: {},
        finalize: nop
      };
      var PSD = globalPSD;
      var microtickQueue = [];
      var numScheduledCalls = 0;
      var tickFinalizers = [];
      function DexiePromise(fn) {
        if (typeof this !== "object")
          throw new TypeError("Promises must be constructed via new");
        this._listeners = [];
        this._lib = false;
        var psd = this._PSD = PSD;
        if (typeof fn !== "function") {
          if (fn !== INTERNAL)
            throw new TypeError("Not a function");
          this._state = arguments[1];
          this._value = arguments[2];
          if (this._state === false)
            handleRejection(this, this._value);
          return;
        }
        this._state = null;
        this._value = null;
        ++psd.ref;
        executePromiseTask(this, fn);
      }
      var thenProp = {
        get: function() {
          var psd = PSD, microTaskId = totalEchoes;
          function then(onFulfilled, onRejected) {
            var _this = this;
            var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
            var cleanup = possibleAwait && !decrementExpectedAwaits();
            var rv = new DexiePromise(function(resolve, reject) {
              propagateToListener(_this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait, cleanup), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait, cleanup), resolve, reject, psd));
            });
            if (this._consoleTask)
              rv._consoleTask = this._consoleTask;
            return rv;
          }
          then.prototype = INTERNAL;
          return then;
        },
        set: function(value) {
          setProp(this, "then", value && value.prototype === INTERNAL ? thenProp : {
            get: function() {
              return value;
            },
            set: thenProp.set
          });
        }
      };
      props(DexiePromise.prototype, {
        then: thenProp,
        _then: function(onFulfilled, onRejected) {
          propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
        },
        catch: function(onRejected) {
          if (arguments.length === 1)
            return this.then(null, onRejected);
          var type2 = arguments[0], handler = arguments[1];
          return typeof type2 === "function" ? this.then(null, function(err) {
            return err instanceof type2 ? handler(err) : PromiseReject(err);
          }) : this.then(null, function(err) {
            return err && err.name === type2 ? handler(err) : PromiseReject(err);
          });
        },
        finally: function(onFinally) {
          return this.then(function(value) {
            return DexiePromise.resolve(onFinally()).then(function() {
              return value;
            });
          }, function(err) {
            return DexiePromise.resolve(onFinally()).then(function() {
              return PromiseReject(err);
            });
          });
        },
        timeout: function(ms, msg) {
          var _this = this;
          return ms < Infinity ? new DexiePromise(function(resolve, reject) {
            var handle = setTimeout(function() {
              return reject(new exceptions.Timeout(msg));
            }, ms);
            _this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
          }) : this;
        }
      });
      if (typeof Symbol !== "undefined" && Symbol.toStringTag)
        setProp(DexiePromise.prototype, Symbol.toStringTag, "Dexie.Promise");
      globalPSD.env = snapShot();
      function Listener(onFulfilled, onRejected, resolve, reject, zone) {
        this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
        this.onRejected = typeof onRejected === "function" ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
        this.psd = zone;
      }
      props(DexiePromise, {
        all: function() {
          var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
          return new DexiePromise(function(resolve, reject) {
            if (values.length === 0)
              resolve([]);
            var remaining = values.length;
            values.forEach(function(a, i) {
              return DexiePromise.resolve(a).then(function(x) {
                values[i] = x;
                if (!--remaining)
                  resolve(values);
              }, reject);
            });
          });
        },
        resolve: function(value) {
          if (value instanceof DexiePromise)
            return value;
          if (value && typeof value.then === "function")
            return new DexiePromise(function(resolve, reject) {
              value.then(resolve, reject);
            });
          var rv = new DexiePromise(INTERNAL, true, value);
          return rv;
        },
        reject: PromiseReject,
        race: function() {
          var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
          return new DexiePromise(function(resolve, reject) {
            values.map(function(value) {
              return DexiePromise.resolve(value).then(resolve, reject);
            });
          });
        },
        PSD: {
          get: function() {
            return PSD;
          },
          set: function(value) {
            return PSD = value;
          }
        },
        totalEchoes: { get: function() {
          return totalEchoes;
        } },
        newPSD: newScope,
        usePSD,
        scheduler: {
          get: function() {
            return asap;
          },
          set: function(value) {
            asap = value;
          }
        },
        rejectionMapper: {
          get: function() {
            return rejectionMapper;
          },
          set: function(value) {
            rejectionMapper = value;
          }
        },
        follow: function(fn, zoneProps) {
          return new DexiePromise(function(resolve, reject) {
            return newScope(function(resolve2, reject2) {
              var psd = PSD;
              psd.unhandleds = [];
              psd.onunhandled = reject2;
              psd.finalize = callBoth(function() {
                var _this = this;
                run_at_end_of_this_or_next_physical_tick(function() {
                  _this.unhandleds.length === 0 ? resolve2() : reject2(_this.unhandleds[0]);
                });
              }, psd.finalize);
              fn();
            }, zoneProps, resolve, reject);
          });
        }
      });
      if (NativePromise) {
        if (NativePromise.allSettled)
          setProp(DexiePromise, "allSettled", function() {
            var possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise(function(resolve) {
              if (possiblePromises.length === 0)
                resolve([]);
              var remaining = possiblePromises.length;
              var results = new Array(remaining);
              possiblePromises.forEach(function(p, i) {
                return DexiePromise.resolve(p).then(function(value) {
                  return results[i] = { status: "fulfilled", value };
                }, function(reason) {
                  return results[i] = { status: "rejected", reason };
                }).then(function() {
                  return --remaining || resolve(results);
                });
              });
            });
          });
        if (NativePromise.any && typeof AggregateError !== "undefined")
          setProp(DexiePromise, "any", function() {
            var possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise(function(resolve, reject) {
              if (possiblePromises.length === 0)
                reject(new AggregateError([]));
              var remaining = possiblePromises.length;
              var failures = new Array(remaining);
              possiblePromises.forEach(function(p, i) {
                return DexiePromise.resolve(p).then(function(value) {
                  return resolve(value);
                }, function(failure) {
                  failures[i] = failure;
                  if (!--remaining)
                    reject(new AggregateError(failures));
                });
              });
            });
          });
        if (NativePromise.withResolvers)
          DexiePromise.withResolvers = NativePromise.withResolvers;
      }
      function executePromiseTask(promise, fn) {
        try {
          fn(function(value) {
            if (promise._state !== null)
              return;
            if (value === promise)
              throw new TypeError("A promise cannot be resolved with itself.");
            var shouldExecuteTick = promise._lib && beginMicroTickScope();
            if (value && typeof value.then === "function") {
              executePromiseTask(promise, function(resolve, reject) {
                value instanceof DexiePromise ? value._then(resolve, reject) : value.then(resolve, reject);
              });
            } else {
              promise._state = true;
              promise._value = value;
              propagateAllListeners(promise);
            }
            if (shouldExecuteTick)
              endMicroTickScope();
          }, handleRejection.bind(null, promise));
        } catch (ex) {
          handleRejection(promise, ex);
        }
      }
      function handleRejection(promise, reason) {
        rejectingErrors.push(reason);
        if (promise._state !== null)
          return;
        var shouldExecuteTick = promise._lib && beginMicroTickScope();
        reason = rejectionMapper(reason);
        promise._state = false;
        promise._value = reason;
        addPossiblyUnhandledError(promise);
        propagateAllListeners(promise);
        if (shouldExecuteTick)
          endMicroTickScope();
      }
      function propagateAllListeners(promise) {
        var listeners = promise._listeners;
        promise._listeners = [];
        for (var i = 0, len = listeners.length; i < len; ++i) {
          propagateToListener(promise, listeners[i]);
        }
        var psd = promise._PSD;
        --psd.ref || psd.finalize();
        if (numScheduledCalls === 0) {
          ++numScheduledCalls;
          asap(function() {
            if (--numScheduledCalls === 0)
              finalizePhysicalTick();
          }, []);
        }
      }
      function propagateToListener(promise, listener) {
        if (promise._state === null) {
          promise._listeners.push(listener);
          return;
        }
        var cb = promise._state ? listener.onFulfilled : listener.onRejected;
        if (cb === null) {
          return (promise._state ? listener.resolve : listener.reject)(promise._value);
        }
        ++listener.psd.ref;
        ++numScheduledCalls;
        asap(callListener, [cb, promise, listener]);
      }
      function callListener(cb, promise, listener) {
        try {
          var ret, value = promise._value;
          if (!promise._state && rejectingErrors.length)
            rejectingErrors = [];
          ret = debug && promise._consoleTask ? promise._consoleTask.run(function() {
            return cb(value);
          }) : cb(value);
          if (!promise._state && rejectingErrors.indexOf(value) === -1) {
            markErrorAsHandled(promise);
          }
          listener.resolve(ret);
        } catch (e) {
          listener.reject(e);
        } finally {
          if (--numScheduledCalls === 0)
            finalizePhysicalTick();
          --listener.psd.ref || listener.psd.finalize();
        }
      }
      function physicalTick() {
        usePSD(globalPSD, function() {
          beginMicroTickScope() && endMicroTickScope();
        });
      }
      function beginMicroTickScope() {
        var wasRootExec = isOutsideMicroTick;
        isOutsideMicroTick = false;
        needsNewPhysicalTick = false;
        return wasRootExec;
      }
      function endMicroTickScope() {
        var callbacks, i, l;
        do {
          while (microtickQueue.length > 0) {
            callbacks = microtickQueue;
            microtickQueue = [];
            l = callbacks.length;
            for (i = 0; i < l; ++i) {
              var item = callbacks[i];
              item[0].apply(null, item[1]);
            }
          }
        } while (microtickQueue.length > 0);
        isOutsideMicroTick = true;
        needsNewPhysicalTick = true;
      }
      function finalizePhysicalTick() {
        var unhandledErrs = unhandledErrors;
        unhandledErrors = [];
        unhandledErrs.forEach(function(p) {
          p._PSD.onunhandled.call(null, p._value, p);
        });
        var finalizers = tickFinalizers.slice(0);
        var i = finalizers.length;
        while (i)
          finalizers[--i]();
      }
      function run_at_end_of_this_or_next_physical_tick(fn) {
        function finalizer() {
          fn();
          tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
        }
        tickFinalizers.push(finalizer);
        ++numScheduledCalls;
        asap(function() {
          if (--numScheduledCalls === 0)
            finalizePhysicalTick();
        }, []);
      }
      function addPossiblyUnhandledError(promise) {
        if (!unhandledErrors.some(function(p) {
          return p._value === promise._value;
        }))
          unhandledErrors.push(promise);
      }
      function markErrorAsHandled(promise) {
        var i = unhandledErrors.length;
        while (i)
          if (unhandledErrors[--i]._value === promise._value) {
            unhandledErrors.splice(i, 1);
            return;
          }
      }
      function PromiseReject(reason) {
        return new DexiePromise(INTERNAL, false, reason);
      }
      function wrap(fn, errorCatcher) {
        var psd = PSD;
        return function() {
          var wasRootExec = beginMicroTickScope(), outerScope = PSD;
          try {
            switchToZone(psd, true);
            return fn.apply(this, arguments);
          } catch (e) {
            errorCatcher && errorCatcher(e);
          } finally {
            switchToZone(outerScope, false);
            if (wasRootExec)
              endMicroTickScope();
          }
        };
      }
      var task = { awaits: 0, echoes: 0, id: 0 };
      var taskCounter = 0;
      var zoneStack = [];
      var zoneEchoes = 0;
      var totalEchoes = 0;
      var zone_id_counter = 0;
      function newScope(fn, props2, a1, a2) {
        var parent = PSD, psd = Object.create(parent);
        psd.parent = parent;
        psd.ref = 0;
        psd.global = false;
        psd.id = ++zone_id_counter;
        globalPSD.env;
        psd.env = patchGlobalPromise ? {
          Promise: DexiePromise,
          PromiseProp: {
            value: DexiePromise,
            configurable: true,
            writable: true
          },
          all: DexiePromise.all,
          race: DexiePromise.race,
          allSettled: DexiePromise.allSettled,
          any: DexiePromise.any,
          resolve: DexiePromise.resolve,
          reject: DexiePromise.reject
        } : {};
        if (props2)
          extend(psd, props2);
        ++parent.ref;
        psd.finalize = function() {
          --this.parent.ref || this.parent.finalize();
        };
        var rv = usePSD(psd, fn, a1, a2);
        if (psd.ref === 0)
          psd.finalize();
        return rv;
      }
      function incrementExpectedAwaits() {
        if (!task.id)
          task.id = ++taskCounter;
        ++task.awaits;
        task.echoes += ZONE_ECHO_LIMIT;
        return task.id;
      }
      function decrementExpectedAwaits() {
        if (!task.awaits)
          return false;
        if (--task.awaits === 0)
          task.id = 0;
        task.echoes = task.awaits * ZONE_ECHO_LIMIT;
        return true;
      }
      if (("" + nativePromiseThen).indexOf("[native code]") === -1) {
        incrementExpectedAwaits = decrementExpectedAwaits = nop;
      }
      function onPossibleParallellAsync(possiblePromise) {
        if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
          incrementExpectedAwaits();
          return possiblePromise.then(function(x) {
            decrementExpectedAwaits();
            return x;
          }, function(e) {
            decrementExpectedAwaits();
            return rejection(e);
          });
        }
        return possiblePromise;
      }
      function zoneEnterEcho(targetZone) {
        ++totalEchoes;
        if (!task.echoes || --task.echoes === 0) {
          task.echoes = task.awaits = task.id = 0;
        }
        zoneStack.push(PSD);
        switchToZone(targetZone, true);
      }
      function zoneLeaveEcho() {
        var zone = zoneStack[zoneStack.length - 1];
        zoneStack.pop();
        switchToZone(zone, false);
      }
      function switchToZone(targetZone, bEnteringZone) {
        var currentZone = PSD;
        if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
          queueMicrotask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
        }
        if (targetZone === PSD)
          return;
        PSD = targetZone;
        if (currentZone === globalPSD)
          globalPSD.env = snapShot();
        if (patchGlobalPromise) {
          var GlobalPromise = globalPSD.env.Promise;
          var targetEnv = targetZone.env;
          if (currentZone.global || targetZone.global) {
            Object.defineProperty(_global, "Promise", targetEnv.PromiseProp);
            GlobalPromise.all = targetEnv.all;
            GlobalPromise.race = targetEnv.race;
            GlobalPromise.resolve = targetEnv.resolve;
            GlobalPromise.reject = targetEnv.reject;
            if (targetEnv.allSettled)
              GlobalPromise.allSettled = targetEnv.allSettled;
            if (targetEnv.any)
              GlobalPromise.any = targetEnv.any;
          }
        }
      }
      function snapShot() {
        var GlobalPromise = _global.Promise;
        return patchGlobalPromise ? {
          Promise: GlobalPromise,
          PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
          all: GlobalPromise.all,
          race: GlobalPromise.race,
          allSettled: GlobalPromise.allSettled,
          any: GlobalPromise.any,
          resolve: GlobalPromise.resolve,
          reject: GlobalPromise.reject
        } : {};
      }
      function usePSD(psd, fn, a1, a2, a3) {
        var outerScope = PSD;
        try {
          switchToZone(psd, true);
          return fn(a1, a2, a3);
        } finally {
          switchToZone(outerScope, false);
        }
      }
      function nativeAwaitCompatibleWrap(fn, zone, possibleAwait, cleanup) {
        return typeof fn !== "function" ? fn : function() {
          var outerZone = PSD;
          if (possibleAwait)
            incrementExpectedAwaits();
          switchToZone(zone, true);
          try {
            return fn.apply(this, arguments);
          } finally {
            switchToZone(outerZone, false);
            if (cleanup)
              queueMicrotask(decrementExpectedAwaits);
          }
        };
      }
      function execInGlobalContext(cb) {
        if (Promise === NativePromise && task.echoes === 0) {
          if (zoneEchoes === 0) {
            cb();
          } else {
            enqueueNativeMicroTask(cb);
          }
        } else {
          setTimeout(cb, 0);
        }
      }
      var rejection = DexiePromise.reject;
      function tempTransaction(db, mode, storeNames, fn) {
        if (!db.idbdb || !db._state.openComplete && !PSD.letThrough && !db._vip) {
          if (db._state.openComplete) {
            return rejection(new exceptions.DatabaseClosed(db._state.dbOpenError));
          }
          if (!db._state.isBeingOpened) {
            if (!db._state.autoOpen)
              return rejection(new exceptions.DatabaseClosed());
            db.open().catch(nop);
          }
          return db._state.dbReadyPromise.then(function() {
            return tempTransaction(db, mode, storeNames, fn);
          });
        } else {
          var trans = db._createTransaction(mode, storeNames, db._dbSchema);
          try {
            trans.create();
            db._state.PR1398_maxLoop = 3;
          } catch (ex) {
            if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
              console.warn("Dexie: Need to reopen db");
              db.close({ disableAutoOpen: false });
              return db.open().then(function() {
                return tempTransaction(db, mode, storeNames, fn);
              });
            }
            return rejection(ex);
          }
          return trans._promise(mode, function(resolve, reject) {
            return newScope(function() {
              PSD.trans = trans;
              return fn(resolve, reject, trans);
            });
          }).then(function(result) {
            if (mode === "readwrite")
              try {
                trans.idbtrans.commit();
              } catch (_a2) {
              }
            return mode === "readonly" ? result : trans._completion.then(function() {
              return result;
            });
          });
        }
      }
      var DEXIE_VERSION = "4.4.4";
      var maxString = String.fromCharCode(65535);
      var minKey = -Infinity;
      var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
      var STRING_EXPECTED = "String expected.";
      var DEFAULT_MAX_CONNECTIONS = 1e3;
      var DBNAMES_DB = "__dbnames";
      var READONLY = "readonly";
      var READWRITE = "readwrite";
      function combine(filter1, filter2) {
        return filter1 ? filter2 ? function() {
          return filter1.apply(this, arguments) && filter2.apply(this, arguments);
        } : filter1 : filter2;
      }
      var AnyRange = {
        type: 3,
        lower: -Infinity,
        lowerOpen: false,
        upper: [[]],
        upperOpen: false
      };
      function workaroundForUndefinedPrimKey(keyPath) {
        return typeof keyPath === "string" && !/\./.test(keyPath) ? function(obj) {
          if (obj[keyPath] === void 0 && keyPath in obj) {
            obj = deepClone(obj);
            delete obj[keyPath];
          }
          return obj;
        } : function(obj) {
          return obj;
        };
      }
      function Entity2() {
        throw exceptions.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.");
      }
      function cmp2(a, b) {
        try {
          var ta = type(a);
          var tb = type(b);
          if (ta !== tb) {
            if (ta === "Array")
              return 1;
            if (tb === "Array")
              return -1;
            if (ta === "binary")
              return 1;
            if (tb === "binary")
              return -1;
            if (ta === "string")
              return 1;
            if (tb === "string")
              return -1;
            if (ta === "Date")
              return 1;
            if (tb !== "Date")
              return NaN;
            return -1;
          }
          switch (ta) {
            case "number":
            case "Date":
            case "string":
              return a > b ? 1 : a < b ? -1 : 0;
            case "binary": {
              return compareUint8Arrays(getUint8Array(a), getUint8Array(b));
            }
            case "Array":
              return compareArrays(a, b);
          }
        } catch (_a2) {
        }
        return NaN;
      }
      function compareArrays(a, b) {
        var al = a.length;
        var bl = b.length;
        var l = al < bl ? al : bl;
        for (var i = 0; i < l; ++i) {
          var res = cmp2(a[i], b[i]);
          if (res !== 0)
            return res;
        }
        return al === bl ? 0 : al < bl ? -1 : 1;
      }
      function compareUint8Arrays(a, b) {
        var al = a.length;
        var bl = b.length;
        var l = al < bl ? al : bl;
        for (var i = 0; i < l; ++i) {
          if (a[i] !== b[i])
            return a[i] < b[i] ? -1 : 1;
        }
        return al === bl ? 0 : al < bl ? -1 : 1;
      }
      function type(x) {
        var t = typeof x;
        if (t !== "object")
          return t;
        if (ArrayBuffer.isView(x))
          return "binary";
        var tsTag = toStringTag(x);
        return tsTag === "ArrayBuffer" ? "binary" : tsTag;
      }
      function getUint8Array(a) {
        if (a instanceof Uint8Array)
          return a;
        if (ArrayBuffer.isView(a))
          return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
        return new Uint8Array(a);
      }
      function builtInDeletionTrigger(table, keys2, res) {
        var yProps = table.schema.yProps;
        if (!yProps)
          return res;
        if (keys2 && res.numFailures > 0)
          keys2 = keys2.filter(function(_, i) {
            return !res.failures[i];
          });
        return Promise.all(yProps.map(function(_a2) {
          var updatesTable = _a2.updatesTable;
          return keys2 ? table.db.table(updatesTable).where("k").anyOf(keys2).delete() : table.db.table(updatesTable).clear();
        })).then(function() {
          return res;
        });
      }
      var PropModification2 = function() {
        function PropModification3(spec) {
          this["@@propmod"] = spec;
        }
        PropModification3.prototype.execute = function(value) {
          var _a2;
          var spec = this["@@propmod"];
          if (spec.add !== void 0) {
            var term = spec.add;
            if (isArray(term)) {
              return __spreadArray(__spreadArray([], isArray(value) ? value : [], true), term, true).sort();
            }
            if (typeof term === "number")
              return (Number(value) || 0) + term;
            if (typeof term === "bigint") {
              try {
                return BigInt(value) + term;
              } catch (_b) {
                return BigInt(0) + term;
              }
            }
            throw new TypeError("Invalid term ".concat(term));
          }
          if (spec.remove !== void 0) {
            var subtrahend_1 = spec.remove;
            if (isArray(subtrahend_1)) {
              return isArray(value) ? value.filter(function(item) {
                return !subtrahend_1.includes(item);
              }).sort() : [];
            }
            if (typeof subtrahend_1 === "number")
              return Number(value) - subtrahend_1;
            if (typeof subtrahend_1 === "bigint") {
              try {
                return BigInt(value) - subtrahend_1;
              } catch (_c) {
                return BigInt(0) - subtrahend_1;
              }
            }
            throw new TypeError("Invalid subtrahend ".concat(subtrahend_1));
          }
          var prefixToReplace = (_a2 = spec.replacePrefix) === null || _a2 === void 0 ? void 0 : _a2[0];
          if (prefixToReplace && typeof value === "string" && value.startsWith(prefixToReplace)) {
            return spec.replacePrefix[1] + value.substring(prefixToReplace.length);
          }
          return value;
        };
        return PropModification3;
      }();
      function applyUpdateSpec(obj, changes) {
        var keyPaths = keys(changes);
        var numKeys = keyPaths.length;
        var anythingModified = false;
        for (var i = 0; i < numKeys; ++i) {
          var keyPath = keyPaths[i];
          var value = changes[keyPath];
          var origValue = getByKeyPath(obj, keyPath);
          if (value instanceof PropModification2) {
            setByKeyPath(obj, keyPath, value.execute(origValue));
            anythingModified = true;
          } else if (origValue !== value) {
            setByKeyPath(obj, keyPath, value);
            anythingModified = true;
          }
        }
        return anythingModified;
      }
      var Table = function() {
        function Table2() {
        }
        Table2.prototype._trans = function(mode, fn, writeLocked) {
          var trans = this._tx || PSD.trans;
          var tableName = this.name;
          var task2 = debug && typeof console !== "undefined" && console.createTask && console.createTask("Dexie: ".concat(mode === "readonly" ? "read" : "write", " ").concat(this.name));
          function checkTableInTransaction(resolve, reject, trans2) {
            if (!trans2.schema[tableName])
              throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
            return fn(trans2.idbtrans, trans2);
          }
          var wasRootExec = beginMicroTickScope();
          try {
            var p = trans && trans.db._novip === this.db._novip ? trans === PSD.trans ? trans._promise(mode, checkTableInTransaction, writeLocked) : newScope(function() {
              return trans._promise(mode, checkTableInTransaction, writeLocked);
            }, { trans, transless: PSD.transless || PSD }) : tempTransaction(this.db, mode, [this.name], checkTableInTransaction);
            if (task2) {
              p._consoleTask = task2;
              p = p.catch(function(err) {
                console.trace(err);
                return rejection(err);
              });
            }
            return p;
          } finally {
            if (wasRootExec)
              endMicroTickScope();
          }
        };
        Table2.prototype.get = function(keyOrCrit, cb) {
          var _this = this;
          if (keyOrCrit && keyOrCrit.constructor === Object)
            return this.where(keyOrCrit).first(cb);
          if (keyOrCrit == null)
            return rejection(new exceptions.Type("Invalid argument to Table.get()"));
          return this._trans("readonly", function(trans) {
            return _this.core.get({ trans, key: keyOrCrit }).then(function(res) {
              return _this.hook.reading.fire(res);
            });
          }).then(cb);
        };
        Table2.prototype.where = function(indexOrCrit) {
          if (typeof indexOrCrit === "string")
            return new this.db.WhereClause(this, indexOrCrit);
          if (isArray(indexOrCrit))
            return new this.db.WhereClause(this, "[".concat(indexOrCrit.join("+"), "]"));
          var keyPaths = keys(indexOrCrit);
          if (keyPaths.length === 1)
            return this.where(keyPaths[0]).equals(indexOrCrit[keyPaths[0]]);
          var compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(function(ix) {
            if (ix.compound && keyPaths.every(function(keyPath) {
              return ix.keyPath.indexOf(keyPath) >= 0;
            })) {
              for (var i = 0; i < keyPaths.length; ++i) {
                if (keyPaths.indexOf(ix.keyPath[i]) === -1)
                  return false;
              }
              return true;
            }
            return false;
          }).sort(function(a, b) {
            return a.keyPath.length - b.keyPath.length;
          })[0];
          if (compoundIndex && this.db._maxKey !== maxString) {
            var keyPathsInValidOrder = compoundIndex.keyPath.slice(0, keyPaths.length);
            return this.where(keyPathsInValidOrder).equals(keyPathsInValidOrder.map(function(kp) {
              return indexOrCrit[kp];
            }));
          }
          if (!compoundIndex && debug)
            console.warn("The query ".concat(JSON.stringify(indexOrCrit), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(keyPaths.join("+"), "]"));
          var idxByName = this.schema.idxByName;
          function equals(a, b) {
            return cmp2(a, b) === 0;
          }
          var _a2 = keyPaths.reduce(function(_a3, keyPath) {
            var prevIndex = _a3[0], prevFilterFn = _a3[1];
            var index = idxByName[keyPath];
            var value = indexOrCrit[keyPath];
            return [
              prevIndex || index,
              prevIndex || !index ? combine(prevFilterFn, index && index.multi ? function(x) {
                var prop = getByKeyPath(x, keyPath);
                return isArray(prop) && prop.some(function(item) {
                  return equals(value, item);
                });
              } : function(x) {
                return equals(value, getByKeyPath(x, keyPath));
              }) : prevFilterFn
            ];
          }, [null, null]), idx = _a2[0], filterFunction = _a2[1];
          return idx ? this.where(idx.name).equals(indexOrCrit[idx.keyPath]).filter(filterFunction) : compoundIndex ? this.filter(filterFunction) : this.where(keyPaths).equals("");
        };
        Table2.prototype.filter = function(filterFunction) {
          return this.toCollection().and(filterFunction);
        };
        Table2.prototype.count = function(thenShortcut) {
          return this.toCollection().count(thenShortcut);
        };
        Table2.prototype.offset = function(offset) {
          return this.toCollection().offset(offset);
        };
        Table2.prototype.limit = function(numRows) {
          return this.toCollection().limit(numRows);
        };
        Table2.prototype.each = function(callback) {
          return this.toCollection().each(callback);
        };
        Table2.prototype.toArray = function(thenShortcut) {
          return this.toCollection().toArray(thenShortcut);
        };
        Table2.prototype.toCollection = function() {
          return new this.db.Collection(new this.db.WhereClause(this));
        };
        Table2.prototype.orderBy = function(index) {
          return new this.db.Collection(new this.db.WhereClause(this, isArray(index) ? "[".concat(index.join("+"), "]") : index));
        };
        Table2.prototype.reverse = function() {
          return this.toCollection().reverse();
        };
        Table2.prototype.mapToClass = function(constructor) {
          var _a2 = this, db = _a2.db, tableName = _a2.name;
          this.schema.mappedClass = constructor;
          if (constructor.prototype instanceof Entity2) {
            constructor = function(_super) {
              __extends(class_1, _super);
              function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
              }
              Object.defineProperty(class_1.prototype, "db", {
                get: function() {
                  return db;
                },
                enumerable: false,
                configurable: true
              });
              class_1.prototype.table = function() {
                return tableName;
              };
              return class_1;
            }(constructor);
          }
          var inheritedProps = /* @__PURE__ */ new Set();
          for (var proto = constructor.prototype; proto; proto = getProto(proto)) {
            Object.getOwnPropertyNames(proto).forEach(function(propName) {
              return inheritedProps.add(propName);
            });
          }
          var readHook = function(obj) {
            if (!obj)
              return obj;
            var res = Object.create(constructor.prototype);
            for (var m in obj)
              if (!inheritedProps.has(m))
                try {
                  res[m] = obj[m];
                } catch (_) {
                }
            return res;
          };
          if (this.schema.readHook) {
            this.hook.reading.unsubscribe(this.schema.readHook);
          }
          this.schema.readHook = readHook;
          this.hook("reading", readHook);
          return constructor;
        };
        Table2.prototype.defineClass = function() {
          function Class(content) {
            extend(this, content);
          }
          return this.mapToClass(Class);
        };
        Table2.prototype.add = function(obj, key3) {
          var _this = this;
          var _a2 = this.schema.primKey, auto = _a2.auto, keyPath = _a2.keyPath;
          var objToAdd = obj;
          if (keyPath && auto) {
            objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
          }
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({
              trans,
              type: "add",
              keys: key3 != null ? [key3] : null,
              values: [objToAdd]
            });
          }).then(function(res) {
            return res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult;
          }).then(function(lastResult) {
            if (keyPath) {
              try {
                setByKeyPath(obj, keyPath, lastResult);
              } catch (_) {
              }
            }
            return lastResult;
          });
        };
        Table2.prototype.upsert = function(key3, modifications) {
          var _this = this;
          var keyPath = this.schema.primKey.keyPath;
          return this._trans("readwrite", function(trans) {
            return _this.core.get({ trans, key: key3 }).then(function(existing) {
              var obj = existing !== null && existing !== void 0 ? existing : {};
              applyUpdateSpec(obj, modifications);
              if (keyPath)
                setByKeyPath(obj, keyPath, key3);
              return _this.core.mutate({
                trans,
                type: "put",
                values: [obj],
                keys: [key3],
                upsert: true,
                updates: { keys: [key3], changeSpecs: [modifications] }
              }).then(function(res) {
                return res.numFailures ? DexiePromise.reject(res.failures[0]) : !!existing;
              });
            });
          });
        };
        Table2.prototype.update = function(keyOrObject, modifications) {
          if (typeof keyOrObject === "object" && !isArray(keyOrObject)) {
            var key3 = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
            if (key3 === void 0)
              return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
            return this.where(":id").equals(key3).modify(modifications);
          } else {
            return this.where(":id").equals(keyOrObject).modify(modifications);
          }
        };
        Table2.prototype.put = function(obj, key3) {
          var _this = this;
          var _a2 = this.schema.primKey, auto = _a2.auto, keyPath = _a2.keyPath;
          var objToAdd = obj;
          if (keyPath && auto) {
            objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
          }
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({
              trans,
              type: "put",
              values: [objToAdd],
              keys: key3 != null ? [key3] : null
            });
          }).then(function(res) {
            return res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult;
          }).then(function(lastResult) {
            if (keyPath) {
              try {
                setByKeyPath(obj, keyPath, lastResult);
              } catch (_) {
              }
            }
            return lastResult;
          });
        };
        Table2.prototype.delete = function(key3) {
          var _this = this;
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({ trans, type: "delete", keys: [key3] }).then(function(res) {
              return builtInDeletionTrigger(_this, [key3], res);
            }).then(function(res) {
              return res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0;
            });
          });
        };
        Table2.prototype.clear = function() {
          var _this = this;
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({ trans, type: "deleteRange", range: AnyRange }).then(function(res) {
              return builtInDeletionTrigger(_this, null, res);
            });
          }).then(function(res) {
            return res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0;
          });
        };
        Table2.prototype.bulkGet = function(keys2) {
          var _this = this;
          return this._trans("readonly", function(trans) {
            return _this.core.getMany({
              keys: keys2,
              trans
            }).then(function(result) {
              return result.map(function(res) {
                return _this.hook.reading.fire(res);
              });
            });
          });
        };
        Table2.prototype.bulkAdd = function(objects, keysOrOptions, options) {
          var _this = this;
          var keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
          options = options || (keys2 ? void 0 : keysOrOptions);
          var wantResults = options ? options.allKeys : void 0;
          return this._trans("readwrite", function(trans) {
            var _a2 = _this.schema.primKey, auto = _a2.auto, keyPath = _a2.keyPath;
            if (keyPath && keys2)
              throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
            if (keys2 && keys2.length !== objects.length)
              throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
            var numObjects = objects.length;
            var objectsToAdd = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
            return _this.core.mutate({
              trans,
              type: "add",
              keys: keys2,
              values: objectsToAdd,
              wantResults
            }).then(function(_a3) {
              var numFailures = _a3.numFailures, results = _a3.results, lastResult = _a3.lastResult, failures = _a3.failures;
              var result = wantResults ? results : lastResult;
              if (numFailures === 0)
                return result;
              throw new BulkError("".concat(_this.name, ".bulkAdd(): ").concat(numFailures, " of ").concat(numObjects, " operations failed"), failures);
            });
          });
        };
        Table2.prototype.bulkPut = function(objects, keysOrOptions, options) {
          var _this = this;
          var keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
          options = options || (keys2 ? void 0 : keysOrOptions);
          var wantResults = options ? options.allKeys : void 0;
          return this._trans("readwrite", function(trans) {
            var _a2 = _this.schema.primKey, auto = _a2.auto, keyPath = _a2.keyPath;
            if (keyPath && keys2)
              throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
            if (keys2 && keys2.length !== objects.length)
              throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
            var numObjects = objects.length;
            var objectsToPut = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
            return _this.core.mutate({
              trans,
              type: "put",
              keys: keys2,
              values: objectsToPut,
              wantResults
            }).then(function(_a3) {
              var numFailures = _a3.numFailures, results = _a3.results, lastResult = _a3.lastResult, failures = _a3.failures;
              var result = wantResults ? results : lastResult;
              if (numFailures === 0)
                return result;
              throw new BulkError("".concat(_this.name, ".bulkPut(): ").concat(numFailures, " of ").concat(numObjects, " operations failed"), failures);
            });
          });
        };
        Table2.prototype.bulkUpdate = function(keysAndChanges) {
          var _this = this;
          var coreTable = this.core;
          var keys2 = keysAndChanges.map(function(entry) {
            return entry.key;
          });
          var changeSpecs = keysAndChanges.map(function(entry) {
            return entry.changes;
          });
          var offsetMap = [];
          return this._trans("readwrite", function(trans) {
            return coreTable.getMany({ trans, keys: keys2, cache: "clone" }).then(function(objs) {
              var resultKeys = [];
              var resultObjs = [];
              keysAndChanges.forEach(function(_a2, idx) {
                var key3 = _a2.key, changes = _a2.changes;
                var obj = objs[idx];
                if (obj) {
                  for (var _i = 0, _b = Object.keys(changes); _i < _b.length; _i++) {
                    var keyPath = _b[_i];
                    var value = changes[keyPath];
                    if (keyPath === _this.schema.primKey.keyPath) {
                      if (cmp2(value, key3) !== 0) {
                        throw new exceptions.Constraint("Cannot update primary key in bulkUpdate()");
                      }
                    } else {
                      setByKeyPath(obj, keyPath, value);
                    }
                  }
                  offsetMap.push(idx);
                  resultKeys.push(key3);
                  resultObjs.push(obj);
                }
              });
              var numEntries = resultKeys.length;
              return coreTable.mutate({
                trans,
                type: "put",
                keys: resultKeys,
                values: resultObjs,
                updates: {
                  keys: keys2,
                  changeSpecs
                }
              }).then(function(_a2) {
                var numFailures = _a2.numFailures, failures = _a2.failures;
                if (numFailures === 0)
                  return numEntries;
                for (var _i = 0, _b = Object.keys(failures); _i < _b.length; _i++) {
                  var offset = _b[_i];
                  var mappedOffset = offsetMap[Number(offset)];
                  if (mappedOffset != null) {
                    var failure = failures[offset];
                    delete failures[offset];
                    failures[mappedOffset] = failure;
                  }
                }
                throw new BulkError("".concat(_this.name, ".bulkUpdate(): ").concat(numFailures, " of ").concat(numEntries, " operations failed"), failures);
              });
            });
          });
        };
        Table2.prototype.bulkDelete = function(keys2) {
          var _this = this;
          var numKeys = keys2.length;
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({ trans, type: "delete", keys: keys2 }).then(function(res) {
              return builtInDeletionTrigger(_this, keys2, res);
            });
          }).then(function(_a2) {
            var numFailures = _a2.numFailures, lastResult = _a2.lastResult, failures = _a2.failures;
            if (numFailures === 0)
              return lastResult;
            throw new BulkError("".concat(_this.name, ".bulkDelete(): ").concat(numFailures, " of ").concat(numKeys, " operations failed"), failures);
          });
        };
        return Table2;
      }();
      function Events(ctx) {
        var evs = {};
        var rv = function(eventName, subscriber) {
          if (subscriber) {
            var i2 = arguments.length, args = new Array(i2 - 1);
            while (--i2)
              args[i2 - 1] = arguments[i2];
            evs[eventName].subscribe.apply(null, args);
            return ctx;
          } else if (typeof eventName === "string") {
            return evs[eventName];
          }
        };
        rv.addEventType = add3;
        for (var i = 1, l = arguments.length; i < l; ++i) {
          add3(arguments[i]);
        }
        return rv;
        function add3(eventName, chainFunction, defaultFunction) {
          if (typeof eventName === "object")
            return addConfiguredEvents(eventName);
          if (!chainFunction)
            chainFunction = reverseStoppableEventChain;
          if (!defaultFunction)
            defaultFunction = nop;
          var context = {
            subscribers: [],
            fire: defaultFunction,
            subscribe: function(cb) {
              if (context.subscribers.indexOf(cb) === -1) {
                context.subscribers.push(cb);
                context.fire = chainFunction(context.fire, cb);
              }
            },
            unsubscribe: function(cb) {
              context.subscribers = context.subscribers.filter(function(fn) {
                return fn !== cb;
              });
              context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
            }
          };
          evs[eventName] = rv[eventName] = context;
          return context;
        }
        function addConfiguredEvents(cfg) {
          keys(cfg).forEach(function(eventName) {
            var args = cfg[eventName];
            if (isArray(args)) {
              add3(eventName, cfg[eventName][0], cfg[eventName][1]);
            } else if (args === "asap") {
              var context = add3(eventName, mirror, function fire() {
                var i2 = arguments.length, args2 = new Array(i2);
                while (i2--)
                  args2[i2] = arguments[i2];
                context.subscribers.forEach(function(fn) {
                  asap$1(function fireEvent() {
                    fn.apply(null, args2);
                  });
                });
              });
            } else
              throw new exceptions.InvalidArgument("Invalid event config");
          });
        }
      }
      function makeClassConstructor(prototype, constructor) {
        derive(constructor).from({ prototype });
        return constructor;
      }
      function createTableConstructor(db) {
        return makeClassConstructor(Table.prototype, function Table2(name, tableSchema, trans) {
          this.db = db;
          this._tx = trans;
          this.name = name;
          this.schema = tableSchema;
          this.hook = db._allTables[name] ? db._allTables[name].hook : Events(null, {
            creating: [hookCreatingChain, nop],
            reading: [pureFunctionChain, mirror],
            updating: [hookUpdatingChain, nop],
            deleting: [hookDeletingChain, nop]
          });
        });
      }
      function isPlainKeyRange(ctx, ignoreLimitFilter) {
        return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
      }
      function addFilter(ctx, fn) {
        ctx.filter = combine(ctx.filter, fn);
      }
      function addReplayFilter(ctx, factory, isLimitFilter) {
        var curr = ctx.replayFilter;
        ctx.replayFilter = curr ? function() {
          return combine(curr(), factory());
        } : factory;
        ctx.justLimit = isLimitFilter && !curr;
      }
      function addMatchFilter(ctx, fn) {
        ctx.isMatch = combine(ctx.isMatch, fn);
      }
      function getIndexOrStore(ctx, coreSchema) {
        if (ctx.isPrimKey)
          return coreSchema.primaryKey;
        var index = coreSchema.getIndexByKeyPath(ctx.index);
        if (!index)
          throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + coreSchema.name + " is not indexed");
        return index;
      }
      function openCursor(ctx, coreTable, trans) {
        var index = getIndexOrStore(ctx, coreTable.schema);
        return coreTable.openCursor({
          trans,
          values: !ctx.keysOnly,
          reverse: ctx.dir === "prev",
          unique: !!ctx.unique,
          query: {
            index,
            range: ctx.range
          }
        });
      }
      function iter(ctx, fn, coreTrans, coreTable) {
        var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
        if (!ctx.or) {
          return iterate(openCursor(ctx, coreTable, coreTrans), combine(ctx.algorithm, filter), fn, !ctx.keysOnly && ctx.valueMapper);
        } else {
          var set_1 = {};
          var union = function(item, cursor, advance) {
            if (!filter || filter(cursor, advance, function(result) {
              return cursor.stop(result);
            }, function(err) {
              return cursor.fail(err);
            })) {
              var primaryKey = cursor.primaryKey;
              var key3 = "" + primaryKey;
              if (key3 === "[object ArrayBuffer]")
                key3 = "" + new Uint8Array(primaryKey);
              if (!hasOwn(set_1, key3)) {
                set_1[key3] = true;
                fn(item, cursor, advance);
              }
            }
          };
          return Promise.all([
            ctx.or._iterate(union, coreTrans),
            iterate(openCursor(ctx, coreTable, coreTrans), ctx.algorithm, union, !ctx.keysOnly && ctx.valueMapper)
          ]);
        }
      }
      function iterate(cursorPromise, filter, fn, valueMapper) {
        var mappedFn = valueMapper ? function(x, c, a) {
          return fn(valueMapper(x), c, a);
        } : fn;
        var wrappedFn = wrap(mappedFn);
        return cursorPromise.then(function(cursor) {
          if (cursor) {
            return cursor.start(function() {
              var c = function() {
                return cursor.continue();
              };
              if (!filter || filter(cursor, function(advancer) {
                return c = advancer;
              }, function(val) {
                cursor.stop(val);
                c = nop;
              }, function(e) {
                cursor.fail(e);
                c = nop;
              }))
                wrappedFn(cursor.value, cursor, function(advancer) {
                  return c = advancer;
                });
              c();
            });
          }
        });
      }
      var Collection = function() {
        function Collection2() {
        }
        Collection2.prototype._read = function(fn, cb) {
          var ctx = this._ctx;
          return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readonly", fn).then(cb);
        };
        Collection2.prototype._write = function(fn) {
          var ctx = this._ctx;
          return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readwrite", fn, "locked");
        };
        Collection2.prototype._addAlgorithm = function(fn) {
          var ctx = this._ctx;
          ctx.algorithm = combine(ctx.algorithm, fn);
        };
        Collection2.prototype._iterate = function(fn, coreTrans) {
          return iter(this._ctx, fn, coreTrans, this._ctx.table.core);
        };
        Collection2.prototype.clone = function(props2) {
          var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
          if (props2)
            extend(ctx, props2);
          rv._ctx = ctx;
          return rv;
        };
        Collection2.prototype.raw = function() {
          this._ctx.valueMapper = null;
          return this;
        };
        Collection2.prototype.each = function(fn) {
          var ctx = this._ctx;
          return this._read(function(trans) {
            return iter(ctx, fn, trans, ctx.table.core);
          });
        };
        Collection2.prototype.count = function(cb) {
          var _this = this;
          return this._read(function(trans) {
            var ctx = _this._ctx;
            var coreTable = ctx.table.core;
            if (isPlainKeyRange(ctx, true)) {
              return coreTable.count({
                trans,
                query: {
                  index: getIndexOrStore(ctx, coreTable.schema),
                  range: ctx.range
                }
              }).then(function(count2) {
                return Math.min(count2, ctx.limit);
              });
            } else {
              var count = 0;
              return iter(ctx, function() {
                ++count;
                return false;
              }, trans, coreTable).then(function() {
                return count;
              });
            }
          }).then(cb);
        };
        Collection2.prototype.sortBy = function(keyPath, cb) {
          var parts = keyPath.split(".").reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
          function getval(obj, i) {
            if (i)
              return getval(obj[parts[i]], i - 1);
            return obj[lastPart];
          }
          var order = this._ctx.dir === "next" ? 1 : -1;
          function sorter(a, b) {
            var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
            return cmp2(aVal, bVal) * order;
          }
          return this.toArray(function(a) {
            return a.slice().sort(sorter);
          }).then(cb);
        };
        Collection2.prototype.toArray = function(cb) {
          var _this = this;
          return this._read(function(trans) {
            var ctx = _this._ctx;
            if (isPlainKeyRange(ctx, true) && ctx.limit > 0) {
              var valueMapper_1 = ctx.valueMapper;
              var index = getIndexOrStore(ctx, ctx.table.core.schema);
              return ctx.table.core.query({
                trans,
                limit: ctx.limit,
                values: true,
                direction: ctx.dir === "prev" ? "prev" : void 0,
                query: {
                  index,
                  range: ctx.range
                }
              }).then(function(_a2) {
                var result = _a2.result;
                return valueMapper_1 ? result.map(valueMapper_1) : result;
              });
            } else {
              var a_1 = [];
              return iter(ctx, function(item) {
                return a_1.push(item);
              }, trans, ctx.table.core).then(function() {
                return a_1;
              });
            }
          }, cb);
        };
        Collection2.prototype.offset = function(offset) {
          var ctx = this._ctx;
          if (offset <= 0)
            return this;
          ctx.offset += offset;
          if (isPlainKeyRange(ctx)) {
            addReplayFilter(ctx, function() {
              var offsetLeft = offset;
              return function(cursor, advance) {
                if (offsetLeft === 0)
                  return true;
                if (offsetLeft === 1) {
                  --offsetLeft;
                  return false;
                }
                advance(function() {
                  cursor.advance(offsetLeft);
                  offsetLeft = 0;
                });
                return false;
              };
            });
          } else {
            addReplayFilter(ctx, function() {
              var offsetLeft = offset;
              return function() {
                return --offsetLeft < 0;
              };
            });
          }
          return this;
        };
        Collection2.prototype.limit = function(numRows) {
          this._ctx.limit = Math.min(this._ctx.limit, numRows);
          addReplayFilter(this._ctx, function() {
            var rowsLeft = numRows;
            return function(cursor, advance, resolve) {
              if (--rowsLeft <= 0)
                advance(resolve);
              return rowsLeft >= 0;
            };
          }, true);
          return this;
        };
        Collection2.prototype.until = function(filterFunction, bIncludeStopEntry) {
          addFilter(this._ctx, function(cursor, advance, resolve) {
            if (filterFunction(cursor.value)) {
              advance(resolve);
              return bIncludeStopEntry;
            } else {
              return true;
            }
          });
          return this;
        };
        Collection2.prototype.first = function(cb) {
          return this.limit(1).toArray(function(a) {
            return a[0];
          }).then(cb);
        };
        Collection2.prototype.last = function(cb) {
          return this.reverse().first(cb);
        };
        Collection2.prototype.filter = function(filterFunction) {
          addFilter(this._ctx, function(cursor) {
            return filterFunction(cursor.value);
          });
          addMatchFilter(this._ctx, filterFunction);
          return this;
        };
        Collection2.prototype.and = function(filter) {
          return this.filter(filter);
        };
        Collection2.prototype.or = function(indexName) {
          return new this.db.WhereClause(this._ctx.table, indexName, this);
        };
        Collection2.prototype.reverse = function() {
          this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
          if (this._ondirectionchange)
            this._ondirectionchange(this._ctx.dir);
          return this;
        };
        Collection2.prototype.desc = function() {
          return this.reverse();
        };
        Collection2.prototype.eachKey = function(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          return this.each(function(val, cursor) {
            cb(cursor.key, cursor);
          });
        };
        Collection2.prototype.eachUniqueKey = function(cb) {
          this._ctx.unique = "unique";
          return this.eachKey(cb);
        };
        Collection2.prototype.eachPrimaryKey = function(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          return this.each(function(val, cursor) {
            cb(cursor.primaryKey, cursor);
          });
        };
        Collection2.prototype.keys = function(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          var a = [];
          return this.each(function(item, cursor) {
            a.push(cursor.key);
          }).then(function() {
            return a;
          }).then(cb);
        };
        Collection2.prototype.primaryKeys = function(cb) {
          var ctx = this._ctx;
          if (isPlainKeyRange(ctx, true) && ctx.limit > 0) {
            return this._read(function(trans) {
              var index = getIndexOrStore(ctx, ctx.table.core.schema);
              return ctx.table.core.query({
                trans,
                values: false,
                limit: ctx.limit,
                direction: ctx.dir === "prev" ? "prev" : void 0,
                query: {
                  index,
                  range: ctx.range
                }
              });
            }).then(function(_a2) {
              var result = _a2.result;
              return result;
            }).then(cb);
          }
          ctx.keysOnly = !ctx.isMatch;
          var a = [];
          return this.each(function(item, cursor) {
            a.push(cursor.primaryKey);
          }).then(function() {
            return a;
          }).then(cb);
        };
        Collection2.prototype.uniqueKeys = function(cb) {
          this._ctx.unique = "unique";
          return this.keys(cb);
        };
        Collection2.prototype.firstKey = function(cb) {
          return this.limit(1).keys(function(a) {
            return a[0];
          }).then(cb);
        };
        Collection2.prototype.lastKey = function(cb) {
          return this.reverse().firstKey(cb);
        };
        Collection2.prototype.distinct = function() {
          var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
          if (!idx || !idx.multi)
            return this;
          var set = {};
          addFilter(this._ctx, function(cursor) {
            var strKey = cursor.primaryKey.toString();
            var found = hasOwn(set, strKey);
            set[strKey] = true;
            return !found;
          });
          return this;
        };
        Collection2.prototype.modify = function(changes) {
          var _this = this;
          var ctx = this._ctx;
          return this._write(function(trans) {
            var modifyer;
            if (typeof changes === "function") {
              modifyer = changes;
            } else {
              modifyer = function(item) {
                return applyUpdateSpec(item, changes);
              };
            }
            var coreTable = ctx.table.core;
            var _a2 = coreTable.schema.primaryKey, outbound = _a2.outbound, extractKey = _a2.extractKey;
            var limit = 200;
            var modifyChunkSize = _this.db._options.modifyChunkSize;
            if (modifyChunkSize) {
              if (typeof modifyChunkSize == "object") {
                limit = modifyChunkSize[coreTable.name] || modifyChunkSize["*"] || 200;
              } else {
                limit = modifyChunkSize;
              }
            }
            var totalFailures = [];
            var successCount = 0;
            var failedKeys = [];
            var applyMutateResult = function(expectedCount, res) {
              var failures = res.failures, numFailures = res.numFailures;
              successCount += expectedCount - numFailures;
              for (var _i = 0, _a3 = keys(failures); _i < _a3.length; _i++) {
                var pos = _a3[_i];
                totalFailures.push(failures[pos]);
              }
            };
            var isUnconditionalDelete = changes === deleteCallback;
            return _this.clone().primaryKeys().then(function(keys2) {
              var criteria = isPlainKeyRange(ctx) && ctx.limit === Infinity && (typeof changes !== "function" || isUnconditionalDelete) && {
                index: ctx.index,
                range: ctx.range
              };
              var nextChunk = function(offset) {
                var count = Math.min(limit, keys2.length - offset);
                var keysInChunk = keys2.slice(offset, offset + count);
                return (isUnconditionalDelete ? Promise.resolve([]) : coreTable.getMany({
                  trans,
                  keys: keysInChunk,
                  cache: "immutable"
                })).then(function(values) {
                  var addValues = [];
                  var putValues = [];
                  var putKeys = outbound ? [] : null;
                  var deleteKeys = isUnconditionalDelete ? keysInChunk : [];
                  if (!isUnconditionalDelete)
                    for (var i = 0; i < count; ++i) {
                      var origValue = values[i];
                      var ctx_1 = {
                        value: deepClone(origValue),
                        primKey: keys2[offset + i]
                      };
                      if (modifyer.call(ctx_1, ctx_1.value, ctx_1) !== false) {
                        if (ctx_1.value == null) {
                          deleteKeys.push(keys2[offset + i]);
                        } else if (!outbound && cmp2(extractKey(origValue), extractKey(ctx_1.value)) !== 0) {
                          deleteKeys.push(keys2[offset + i]);
                          addValues.push(ctx_1.value);
                        } else {
                          putValues.push(ctx_1.value);
                          if (outbound)
                            putKeys.push(keys2[offset + i]);
                        }
                      }
                    }
                  return Promise.resolve(addValues.length > 0 && coreTable.mutate({ trans, type: "add", values: addValues }).then(function(res) {
                    for (var pos in res.failures) {
                      deleteKeys.splice(parseInt(pos), 1);
                    }
                    applyMutateResult(addValues.length, res);
                  })).then(function() {
                    return (putValues.length > 0 || criteria && typeof changes === "object") && coreTable.mutate({
                      trans,
                      type: "put",
                      keys: putKeys,
                      values: putValues,
                      criteria,
                      changeSpec: typeof changes !== "function" && changes,
                      isAdditionalChunk: offset > 0
                    }).then(function(res) {
                      return applyMutateResult(putValues.length, res);
                    });
                  }).then(function() {
                    return (deleteKeys.length > 0 || criteria && isUnconditionalDelete) && coreTable.mutate({
                      trans,
                      type: "delete",
                      keys: deleteKeys,
                      criteria,
                      isAdditionalChunk: offset > 0
                    }).then(function(res) {
                      return builtInDeletionTrigger(ctx.table, deleteKeys, res);
                    }).then(function(res) {
                      return applyMutateResult(deleteKeys.length, res);
                    });
                  }).then(function() {
                    return keys2.length > offset + count && nextChunk(offset + limit);
                  });
                });
              };
              return nextChunk(0).then(function() {
                if (totalFailures.length > 0)
                  throw new ModifyError("Error modifying one or more objects", totalFailures, successCount, failedKeys);
                return keys2.length;
              });
            });
          });
        };
        Collection2.prototype.delete = function() {
          var ctx = this._ctx, range = ctx.range;
          if (isPlainKeyRange(ctx) && !ctx.table.schema.yProps && (ctx.isPrimKey || range.type === 3)) {
            return this._write(function(trans) {
              var primaryKey = ctx.table.core.schema.primaryKey;
              var coreRange = range;
              return ctx.table.core.count({ trans, query: { index: primaryKey, range: coreRange } }).then(function(count) {
                return ctx.table.core.mutate({ trans, type: "deleteRange", range: coreRange }).then(function(_a2) {
                  var failures = _a2.failures, numFailures = _a2.numFailures;
                  if (numFailures)
                    throw new ModifyError("Could not delete some values", Object.keys(failures).map(function(pos) {
                      return failures[pos];
                    }), count - numFailures);
                  return count - numFailures;
                });
              });
            });
          }
          return this.modify(deleteCallback);
        };
        return Collection2;
      }();
      var deleteCallback = function(value, ctx) {
        return ctx.value = null;
      };
      function createCollectionConstructor(db) {
        return makeClassConstructor(Collection.prototype, function Collection2(whereClause, keyRangeGenerator) {
          this.db = db;
          var keyRange = AnyRange, error = null;
          if (keyRangeGenerator)
            try {
              keyRange = keyRangeGenerator();
            } catch (ex) {
              error = ex;
            }
          var whereCtx = whereClause._ctx;
          var table = whereCtx.table;
          var readingHook = table.hook.reading.fire;
          this._ctx = {
            table,
            index: whereCtx.index,
            isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
            range: keyRange,
            keysOnly: false,
            dir: "next",
            unique: "",
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: true,
            isMatch: null,
            offset: 0,
            limit: Infinity,
            error,
            or: whereCtx.or,
            valueMapper: readingHook !== mirror ? readingHook : null
          };
        });
      }
      function simpleCompare(a, b) {
        return a < b ? -1 : a === b ? 0 : 1;
      }
      function simpleCompareReverse(a, b) {
        return a > b ? -1 : a === b ? 0 : 1;
      }
      function fail(collectionOrWhereClause, err, T) {
        var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause.Collection(collectionOrWhereClause) : collectionOrWhereClause;
        collection._ctx.error = T ? new T(err) : new TypeError(err);
        return collection;
      }
      function emptyCollection(whereClause) {
        return new whereClause.Collection(whereClause, function() {
          return rangeEqual("");
        }).limit(0);
      }
      function upperFactory(dir) {
        return dir === "next" ? function(s) {
          return s.toUpperCase();
        } : function(s) {
          return s.toLowerCase();
        };
      }
      function lowerFactory(dir) {
        return dir === "next" ? function(s) {
          return s.toLowerCase();
        } : function(s) {
          return s.toUpperCase();
        };
      }
      function nextCasing(key3, lowerKey, upperNeedle, lowerNeedle, cmp3, dir) {
        var length = Math.min(key3.length, lowerNeedle.length);
        var llp = -1;
        for (var i = 0; i < length; ++i) {
          var lwrKeyChar = lowerKey[i];
          if (lwrKeyChar !== lowerNeedle[i]) {
            if (cmp3(key3[i], upperNeedle[i]) < 0)
              return key3.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
            if (cmp3(key3[i], lowerNeedle[i]) < 0)
              return key3.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
            if (llp >= 0)
              return key3.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
            return null;
          }
          if (cmp3(key3[i], lwrKeyChar) < 0)
            llp = i;
        }
        if (length < lowerNeedle.length && dir === "next")
          return key3 + upperNeedle.substr(key3.length);
        if (length < key3.length && dir === "prev")
          return key3.substr(0, upperNeedle.length);
        return llp < 0 ? null : key3.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
      }
      function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
        var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
        if (!needles.every(function(s) {
          return typeof s === "string";
        })) {
          return fail(whereClause, STRING_EXPECTED);
        }
        function initDirection(dir) {
          upper = upperFactory(dir);
          lower = lowerFactory(dir);
          compare = dir === "next" ? simpleCompare : simpleCompareReverse;
          var needleBounds = needles.map(function(needle) {
            return { lower: lower(needle), upper: upper(needle) };
          }).sort(function(a, b) {
            return compare(a.lower, b.lower);
          });
          upperNeedles = needleBounds.map(function(nb) {
            return nb.upper;
          });
          lowerNeedles = needleBounds.map(function(nb) {
            return nb.lower;
          });
          direction = dir;
          nextKeySuffix = dir === "next" ? "" : suffix;
        }
        initDirection("next");
        var c = new whereClause.Collection(whereClause, function() {
          return createRange(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
        });
        c._ondirectionchange = function(direction2) {
          initDirection(direction2);
        };
        var firstPossibleNeedle = 0;
        c._addAlgorithm(function(cursor, advance, resolve) {
          var key3 = cursor.key;
          if (typeof key3 !== "string")
            return false;
          var lowerKey = lower(key3);
          if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
            return true;
          } else {
            var lowestPossibleCasing = null;
            for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
              var casing = nextCasing(key3, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
              if (casing === null && lowestPossibleCasing === null)
                firstPossibleNeedle = i + 1;
              else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                lowestPossibleCasing = casing;
              }
            }
            if (lowestPossibleCasing !== null) {
              advance(function() {
                cursor.continue(lowestPossibleCasing + nextKeySuffix);
              });
            } else {
              advance(resolve);
            }
            return false;
          }
        });
        return c;
      }
      function createRange(lower, upper, lowerOpen, upperOpen) {
        return {
          type: 2,
          lower,
          upper,
          lowerOpen,
          upperOpen
        };
      }
      function rangeEqual(value) {
        return {
          type: 1,
          lower: value,
          upper: value
        };
      }
      var WhereClause = function() {
        function WhereClause2() {
        }
        Object.defineProperty(WhereClause2.prototype, "Collection", {
          get: function() {
            return this._ctx.table.db.Collection;
          },
          enumerable: false,
          configurable: true
        });
        WhereClause2.prototype.between = function(lower, upper, includeLower, includeUpper) {
          includeLower = includeLower !== false;
          includeUpper = includeUpper === true;
          try {
            if (this._cmp(lower, upper) > 0 || this._cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper))
              return emptyCollection(this);
            return new this.Collection(this, function() {
              return createRange(lower, upper, !includeLower, !includeUpper);
            });
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
        };
        WhereClause2.prototype.equals = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return rangeEqual(value);
          });
        };
        WhereClause2.prototype.above = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return createRange(value, void 0, true);
          });
        };
        WhereClause2.prototype.aboveOrEqual = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return createRange(value, void 0, false);
          });
        };
        WhereClause2.prototype.below = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return createRange(void 0, value, false, true);
          });
        };
        WhereClause2.prototype.belowOrEqual = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return createRange(void 0, value);
          });
        };
        WhereClause2.prototype.startsWith = function(str) {
          if (typeof str !== "string")
            return fail(this, STRING_EXPECTED);
          return this.between(str, str + maxString, true, true);
        };
        WhereClause2.prototype.startsWithIgnoreCase = function(str) {
          if (str === "")
            return this.startsWith(str);
          return addIgnoreCaseAlgorithm(this, function(x, a) {
            return x.indexOf(a[0]) === 0;
          }, [str], maxString);
        };
        WhereClause2.prototype.equalsIgnoreCase = function(str) {
          return addIgnoreCaseAlgorithm(this, function(x, a) {
            return x === a[0];
          }, [str], "");
        };
        WhereClause2.prototype.anyOfIgnoreCase = function() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return emptyCollection(this);
          return addIgnoreCaseAlgorithm(this, function(x, a) {
            return a.indexOf(x) !== -1;
          }, set, "");
        };
        WhereClause2.prototype.startsWithAnyOfIgnoreCase = function() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return emptyCollection(this);
          return addIgnoreCaseAlgorithm(this, function(x, a) {
            return a.some(function(n) {
              return x.indexOf(n) === 0;
            });
          }, set, maxString);
        };
        WhereClause2.prototype.anyOf = function() {
          var _this = this;
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          var compare = this._cmp;
          try {
            set.sort(compare);
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          if (set.length === 0)
            return emptyCollection(this);
          var c = new this.Collection(this, function() {
            return createRange(set[0], set[set.length - 1]);
          });
          c._ondirectionchange = function(direction) {
            compare = direction === "next" ? _this._ascending : _this._descending;
            set.sort(compare);
          };
          var i = 0;
          c._addAlgorithm(function(cursor, advance, resolve) {
            var key3 = cursor.key;
            while (compare(key3, set[i]) > 0) {
              ++i;
              if (i === set.length) {
                advance(resolve);
                return false;
              }
            }
            if (compare(key3, set[i]) === 0) {
              return true;
            } else {
              advance(function() {
                cursor.continue(set[i]);
              });
              return false;
            }
          });
          return c;
        };
        WhereClause2.prototype.notEqual = function(value) {
          return this.inAnyRange([
            [minKey, value],
            [value, this.db._maxKey]
          ], { includeLowers: false, includeUppers: false });
        };
        WhereClause2.prototype.noneOf = function() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return new this.Collection(this);
          try {
            set.sort(this._ascending);
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          var ranges = set.reduce(function(res, val) {
            return res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]];
          }, null);
          ranges.push([set[set.length - 1], this.db._maxKey]);
          return this.inAnyRange(ranges, {
            includeLowers: false,
            includeUppers: false
          });
        };
        WhereClause2.prototype.inAnyRange = function(ranges, options) {
          var _this = this;
          var cmp3 = this._cmp, ascending = this._ascending, descending = this._descending, min = this._min, max = this._max;
          if (ranges.length === 0)
            return emptyCollection(this);
          if (!ranges.every(function(range) {
            return range[0] !== void 0 && range[1] !== void 0 && ascending(range[0], range[1]) <= 0;
          })) {
            return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
          }
          var includeLowers = !options || options.includeLowers !== false;
          var includeUppers = options && options.includeUppers === true;
          function addRange2(ranges2, newRange) {
            var i = 0, l = ranges2.length;
            for (; i < l; ++i) {
              var range = ranges2[i];
              if (cmp3(newRange[0], range[1]) < 0 && cmp3(newRange[1], range[0]) > 0) {
                range[0] = min(range[0], newRange[0]);
                range[1] = max(range[1], newRange[1]);
                break;
              }
            }
            if (i === l)
              ranges2.push(newRange);
            return ranges2;
          }
          var sortDirection = ascending;
          function rangeSorter(a, b) {
            return sortDirection(a[0], b[0]);
          }
          var set;
          try {
            set = ranges.reduce(addRange2, []);
            set.sort(rangeSorter);
          } catch (ex) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          var rangePos = 0;
          var keyIsBeyondCurrentEntry = includeUppers ? function(key3) {
            return ascending(key3, set[rangePos][1]) > 0;
          } : function(key3) {
            return ascending(key3, set[rangePos][1]) >= 0;
          };
          var keyIsBeforeCurrentEntry = includeLowers ? function(key3) {
            return descending(key3, set[rangePos][0]) > 0;
          } : function(key3) {
            return descending(key3, set[rangePos][0]) >= 0;
          };
          function keyWithinCurrentRange(key3) {
            return !keyIsBeyondCurrentEntry(key3) && !keyIsBeforeCurrentEntry(key3);
          }
          var checkKey = keyIsBeyondCurrentEntry;
          var c = new this.Collection(this, function() {
            return createRange(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
          });
          c._ondirectionchange = function(direction) {
            if (direction === "next") {
              checkKey = keyIsBeyondCurrentEntry;
              sortDirection = ascending;
            } else {
              checkKey = keyIsBeforeCurrentEntry;
              sortDirection = descending;
            }
            set.sort(rangeSorter);
          };
          c._addAlgorithm(function(cursor, advance, resolve) {
            var key3 = cursor.key;
            while (checkKey(key3)) {
              ++rangePos;
              if (rangePos === set.length) {
                advance(resolve);
                return false;
              }
            }
            if (keyWithinCurrentRange(key3)) {
              return true;
            } else if (_this._cmp(key3, set[rangePos][1]) === 0 || _this._cmp(key3, set[rangePos][0]) === 0) {
              return false;
            } else {
              advance(function() {
                if (sortDirection === ascending)
                  cursor.continue(set[rangePos][0]);
                else
                  cursor.continue(set[rangePos][1]);
              });
              return false;
            }
          });
          return c;
        };
        WhereClause2.prototype.startsWithAnyOf = function() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (!set.every(function(s) {
            return typeof s === "string";
          })) {
            return fail(this, "startsWithAnyOf() only works with strings");
          }
          if (set.length === 0)
            return emptyCollection(this);
          return this.inAnyRange(set.map(function(str) {
            return [str, str + maxString];
          }));
        };
        return WhereClause2;
      }();
      function createWhereClauseConstructor(db) {
        return makeClassConstructor(WhereClause.prototype, function WhereClause2(table, index, orCollection) {
          this.db = db;
          this._ctx = {
            table,
            index: index === ":id" ? null : index,
            or: orCollection
          };
          this._cmp = this._ascending = cmp2;
          this._descending = function(a, b) {
            return cmp2(b, a);
          };
          this._max = function(a, b) {
            return cmp2(a, b) > 0 ? a : b;
          };
          this._min = function(a, b) {
            return cmp2(a, b) < 0 ? a : b;
          };
          this._IDBKeyRange = db._deps.IDBKeyRange;
          if (!this._IDBKeyRange)
            throw new exceptions.MissingAPI();
        });
      }
      function eventRejectHandler(reject) {
        return wrap(function(event) {
          preventDefault(event);
          reject(event.target.error);
          return false;
        });
      }
      function preventDefault(event) {
        if (event.stopPropagation)
          event.stopPropagation();
        if (event.preventDefault)
          event.preventDefault();
      }
      var DEXIE_STORAGE_MUTATED_EVENT_NAME = "storagemutated";
      var STORAGE_MUTATED_DOM_EVENT_NAME = "x-storagemutated-1";
      var globalEvents = Events(null, DEXIE_STORAGE_MUTATED_EVENT_NAME);
      var Transaction = function() {
        function Transaction2() {
        }
        Transaction2.prototype._lock = function() {
          assert(!PSD.global);
          ++this._reculock;
          if (this._reculock === 1 && !PSD.global)
            PSD.lockOwnerFor = this;
          return this;
        };
        Transaction2.prototype._unlock = function() {
          assert(!PSD.global);
          if (--this._reculock === 0) {
            if (!PSD.global)
              PSD.lockOwnerFor = null;
            while (this._blockedFuncs.length > 0 && !this._locked()) {
              var fnAndPSD = this._blockedFuncs.shift();
              try {
                usePSD(fnAndPSD[1], fnAndPSD[0]);
              } catch (e) {
              }
            }
          }
          return this;
        };
        Transaction2.prototype._locked = function() {
          return this._reculock && PSD.lockOwnerFor !== this;
        };
        Transaction2.prototype.create = function(idbtrans) {
          var _this = this;
          if (!this.mode)
            return this;
          var idbdb = this.db.idbdb;
          var dbOpenError = this.db._state.dbOpenError;
          assert(!this.idbtrans);
          if (!idbtrans && !idbdb) {
            switch (dbOpenError && dbOpenError.name) {
              case "DatabaseClosedError":
                throw new exceptions.DatabaseClosed(dbOpenError);
              case "MissingAPIError":
                throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
              default:
                throw new exceptions.OpenFailed(dbOpenError);
            }
          }
          if (!this.active)
            throw new exceptions.TransactionInactive();
          assert(this._completion._state === null);
          idbtrans = this.idbtrans = idbtrans || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : idbdb.transaction(this.storeNames, this.mode, {
            durability: this.chromeTransactionDurability
          }));
          idbtrans.onerror = wrap(function(ev) {
            preventDefault(ev);
            _this._reject(idbtrans.error);
          });
          idbtrans.onabort = wrap(function(ev) {
            preventDefault(ev);
            _this.active && _this._reject(new exceptions.Abort(idbtrans.error));
            _this.active = false;
            _this.on("abort").fire(ev);
          });
          idbtrans.oncomplete = wrap(function() {
            _this.active = false;
            _this._resolve();
            if ("mutatedParts" in idbtrans) {
              globalEvents.storagemutated.fire(idbtrans["mutatedParts"]);
            }
          });
          return this;
        };
        Transaction2.prototype._promise = function(mode, fn, bWriteLock) {
          var _this = this;
          if (mode === "readwrite" && this.mode !== "readwrite")
            return rejection(new exceptions.ReadOnly("Transaction is readonly"));
          if (!this.active)
            return rejection(new exceptions.TransactionInactive());
          if (this._locked()) {
            return new DexiePromise(function(resolve, reject) {
              _this._blockedFuncs.push([
                function() {
                  _this._promise(mode, fn, bWriteLock).then(resolve, reject);
                },
                PSD
              ]);
            });
          } else if (bWriteLock) {
            return newScope(function() {
              var p2 = new DexiePromise(function(resolve, reject) {
                _this._lock();
                var rv = fn(resolve, reject, _this);
                if (rv && rv.then)
                  rv.then(resolve, reject);
              });
              p2.finally(function() {
                return _this._unlock();
              });
              p2._lib = true;
              return p2;
            });
          } else {
            var p = new DexiePromise(function(resolve, reject) {
              var rv = fn(resolve, reject, _this);
              if (rv && rv.then)
                rv.then(resolve, reject);
            });
            p._lib = true;
            return p;
          }
        };
        Transaction2.prototype._root = function() {
          return this.parent ? this.parent._root() : this;
        };
        Transaction2.prototype.waitFor = function(promiseLike) {
          var root = this._root();
          var promise = DexiePromise.resolve(promiseLike);
          if (root._waitingFor) {
            root._waitingFor = root._waitingFor.then(function() {
              return promise;
            });
          } else {
            root._waitingFor = promise;
            root._waitingQueue = [];
            var store = root.idbtrans.objectStore(root.storeNames[0]);
            (function spin() {
              ++root._spinCount;
              while (root._waitingQueue.length)
                root._waitingQueue.shift()();
              if (root._waitingFor)
                store.get(-Infinity).onsuccess = spin;
            })();
          }
          var currentWaitPromise = root._waitingFor;
          return new DexiePromise(function(resolve, reject) {
            promise.then(function(res) {
              return root._waitingQueue.push(wrap(resolve.bind(null, res)));
            }, function(err) {
              return root._waitingQueue.push(wrap(reject.bind(null, err)));
            }).finally(function() {
              if (root._waitingFor === currentWaitPromise) {
                root._waitingFor = null;
              }
            });
          });
        };
        Transaction2.prototype.abort = function() {
          if (this.active) {
            this.active = false;
            if (this.idbtrans)
              this.idbtrans.abort();
            this._reject(new exceptions.Abort());
          }
        };
        Transaction2.prototype.table = function(tableName) {
          var memoizedTables = this._memoizedTables || (this._memoizedTables = {});
          if (hasOwn(memoizedTables, tableName))
            return memoizedTables[tableName];
          var tableSchema = this.schema[tableName];
          if (!tableSchema) {
            throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
          }
          var transactionBoundTable = new this.db.Table(tableName, tableSchema, this);
          transactionBoundTable.core = this.db.core.table(tableName);
          memoizedTables[tableName] = transactionBoundTable;
          return transactionBoundTable;
        };
        return Transaction2;
      }();
      function createTransactionConstructor(db) {
        return makeClassConstructor(Transaction.prototype, function Transaction2(mode, storeNames, dbschema, chromeTransactionDurability, parent) {
          var _this = this;
          if (mode !== "readonly")
            storeNames.forEach(function(storeName) {
              var _a2;
              var yProps = (_a2 = dbschema[storeName]) === null || _a2 === void 0 ? void 0 : _a2.yProps;
              if (yProps)
                storeNames = storeNames.concat(yProps.map(function(p) {
                  return p.updatesTable;
                }));
            });
          this.db = db;
          this.mode = mode;
          this.storeNames = storeNames;
          this.schema = dbschema;
          this.chromeTransactionDurability = chromeTransactionDurability;
          this.idbtrans = null;
          this.on = Events(this, "complete", "error", "abort");
          this.parent = parent || null;
          this.active = true;
          this._reculock = 0;
          this._blockedFuncs = [];
          this._resolve = null;
          this._reject = null;
          this._waitingFor = null;
          this._waitingQueue = null;
          this._spinCount = 0;
          this._completion = new DexiePromise(function(resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
          });
          this._completion.then(function() {
            _this.active = false;
            _this.on.complete.fire();
          }, function(e) {
            var wasActive = _this.active;
            _this.active = false;
            _this.on.error.fire(e);
            _this.parent ? _this.parent._reject(e) : wasActive && _this.idbtrans && _this.idbtrans.abort();
            return rejection(e);
          });
        });
      }
      function createIndexSpec(name, keyPath, unique, multi, auto, compound, isPrimKey, type2) {
        return {
          name,
          keyPath,
          unique,
          multi,
          auto,
          compound,
          src: (unique && !isPrimKey ? "&" : "") + (multi ? "*" : "") + (auto ? "++" : "") + nameFromKeyPath(keyPath),
          type: type2
        };
      }
      function nameFromKeyPath(keyPath) {
        return typeof keyPath === "string" ? keyPath : keyPath ? "[" + [].join.call(keyPath, "+") + "]" : "";
      }
      function createTableSchema(name, primKey, indexes) {
        return {
          name,
          primKey,
          indexes,
          mappedClass: null,
          idxByName: arrayToObject(indexes, function(index) {
            return [index.name, index];
          })
        };
      }
      function safariMultiStoreFix(storeNames) {
        return storeNames.length === 1 ? storeNames[0] : storeNames;
      }
      var getMaxKey = function(IdbKeyRange) {
        try {
          IdbKeyRange.only([[]]);
          getMaxKey = function() {
            return [[]];
          };
          return [[]];
        } catch (e) {
          getMaxKey = function() {
            return maxString;
          };
          return maxString;
        }
      };
      function getKeyExtractor(keyPath) {
        if (keyPath == null) {
          return function() {
            return void 0;
          };
        } else if (typeof keyPath === "string") {
          return getSinglePathKeyExtractor(keyPath);
        } else {
          return function(obj) {
            return getByKeyPath(obj, keyPath);
          };
        }
      }
      function getSinglePathKeyExtractor(keyPath) {
        var split = keyPath.split(".");
        if (split.length === 1) {
          return function(obj) {
            return obj[keyPath];
          };
        } else {
          return function(obj) {
            return getByKeyPath(obj, keyPath);
          };
        }
      }
      function arrayify(arrayLike) {
        return [].slice.call(arrayLike);
      }
      var _id_counter = 0;
      function getKeyPathAlias(keyPath) {
        return keyPath == null ? ":id" : typeof keyPath === "string" ? keyPath : "[".concat(keyPath.join("+"), "]");
      }
      function createDBCore(db, IdbKeyRange, tmpTrans) {
        function extractSchema(db2, trans) {
          var tables2 = arrayify(db2.objectStoreNames);
          var tempStore = tables2.length > 0 ? trans.objectStore(tables2[0]) : {};
          return {
            schema: {
              name: db2.name,
              tables: tables2.map(function(table) {
                return trans.objectStore(table);
              }).map(function(store) {
                var keyPath = store.keyPath, autoIncrement = store.autoIncrement;
                var compound = isArray(keyPath);
                var outbound = keyPath == null;
                var indexByKeyPath = {};
                var result = {
                  name: store.name,
                  primaryKey: {
                    name: null,
                    isPrimaryKey: true,
                    outbound,
                    compound,
                    keyPath,
                    autoIncrement,
                    unique: true,
                    extractKey: getKeyExtractor(keyPath)
                  },
                  indexes: arrayify(store.indexNames).map(function(indexName) {
                    return store.index(indexName);
                  }).map(function(index) {
                    var name = index.name, unique = index.unique, multiEntry = index.multiEntry, keyPath2 = index.keyPath;
                    var compound2 = isArray(keyPath2);
                    var result2 = {
                      name,
                      compound: compound2,
                      keyPath: keyPath2,
                      unique,
                      multiEntry,
                      extractKey: getKeyExtractor(keyPath2)
                    };
                    indexByKeyPath[getKeyPathAlias(keyPath2)] = result2;
                    return result2;
                  }),
                  getIndexByKeyPath: function(keyPath2) {
                    return indexByKeyPath[getKeyPathAlias(keyPath2)];
                  }
                };
                indexByKeyPath[":id"] = result.primaryKey;
                if (keyPath != null) {
                  indexByKeyPath[getKeyPathAlias(keyPath)] = result.primaryKey;
                }
                return result;
              })
            },
            hasGetAll: tables2.length > 0 && "getAll" in tempStore && !(typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604),
            hasIdb3Features: "getAllRecords" in tempStore
          };
        }
        function makeIDBKeyRange(range) {
          if (range.type === 3)
            return null;
          if (range.type === 4)
            throw new Error("Cannot convert never type to IDBKeyRange");
          var lower = range.lower, upper = range.upper, lowerOpen = range.lowerOpen, upperOpen = range.upperOpen;
          var idbRange = lower === void 0 ? upper === void 0 ? null : IdbKeyRange.upperBound(upper, !!upperOpen) : upper === void 0 ? IdbKeyRange.lowerBound(lower, !!lowerOpen) : IdbKeyRange.bound(lower, upper, !!lowerOpen, !!upperOpen);
          return idbRange;
        }
        function createDbCoreTable(tableSchema) {
          var tableName = tableSchema.name;
          function mutate(_a3) {
            var trans = _a3.trans, type2 = _a3.type, keys2 = _a3.keys, values = _a3.values, range = _a3.range;
            return new Promise(function(resolve, reject) {
              resolve = wrap(resolve);
              var store = trans.objectStore(tableName);
              var outbound = store.keyPath == null;
              var isAddOrPut = type2 === "put" || type2 === "add";
              if (!isAddOrPut && type2 !== "delete" && type2 !== "deleteRange")
                throw new Error("Invalid operation type: " + type2);
              var length = (keys2 || values || { length: 1 }).length;
              if (keys2 && values && keys2.length !== values.length) {
                throw new Error("Given keys array must have same length as given values array.");
              }
              if (length === 0)
                return resolve({
                  numFailures: 0,
                  failures: {},
                  results: [],
                  lastResult: void 0
                });
              var req;
              var reqs = [];
              var failures = [];
              var numFailures = 0;
              var errorHandler = function(event) {
                ++numFailures;
                preventDefault(event);
              };
              if (type2 === "deleteRange") {
                if (range.type === 4)
                  return resolve({
                    numFailures,
                    failures,
                    results: [],
                    lastResult: void 0
                  });
                if (range.type === 3)
                  reqs.push(req = store.clear());
                else
                  reqs.push(req = store.delete(makeIDBKeyRange(range)));
              } else {
                var _a4 = isAddOrPut ? outbound ? [values, keys2] : [values, null] : [keys2, null], args1 = _a4[0], args2 = _a4[1];
                if (isAddOrPut) {
                  for (var i = 0; i < length; ++i) {
                    reqs.push(req = args2 && args2[i] !== void 0 ? store[type2](args1[i], args2[i]) : store[type2](args1[i]));
                    req.onerror = errorHandler;
                  }
                } else {
                  for (var i = 0; i < length; ++i) {
                    reqs.push(req = store[type2](args1[i]));
                    req.onerror = errorHandler;
                  }
                }
              }
              var done = function(event) {
                var lastResult = event.target.result;
                reqs.forEach(function(req2, i2) {
                  return req2.error != null && (failures[i2] = req2.error);
                });
                resolve({
                  numFailures,
                  failures,
                  results: type2 === "delete" ? keys2 : reqs.map(function(req2) {
                    return req2.result;
                  }),
                  lastResult
                });
              };
              req.onerror = function(event) {
                errorHandler(event);
                done(event);
              };
              req.onsuccess = done;
            });
          }
          function openCursor2(_a3) {
            var trans = _a3.trans, values = _a3.values, query2 = _a3.query, reverse = _a3.reverse, unique = _a3.unique;
            return new Promise(function(resolve, reject) {
              resolve = wrap(resolve);
              var index = query2.index, range = query2.range;
              var store = trans.objectStore(tableName);
              var source = index.isPrimaryKey ? store : store.index(index.name);
              var direction = reverse ? unique ? "prevunique" : "prev" : unique ? "nextunique" : "next";
              var req = values || !("openKeyCursor" in source) ? source.openCursor(makeIDBKeyRange(range), direction) : source.openKeyCursor(makeIDBKeyRange(range), direction);
              req.onerror = eventRejectHandler(reject);
              req.onsuccess = wrap(function(ev) {
                var cursor = req.result;
                if (!cursor) {
                  resolve(null);
                  return;
                }
                cursor.___id = ++_id_counter;
                cursor.done = false;
                var _cursorContinue = cursor.continue.bind(cursor);
                var _cursorContinuePrimaryKey = cursor.continuePrimaryKey;
                if (_cursorContinuePrimaryKey)
                  _cursorContinuePrimaryKey = _cursorContinuePrimaryKey.bind(cursor);
                var _cursorAdvance = cursor.advance.bind(cursor);
                var doThrowCursorIsNotStarted = function() {
                  throw new Error("Cursor not started");
                };
                var doThrowCursorIsStopped = function() {
                  throw new Error("Cursor not stopped");
                };
                cursor.trans = trans;
                cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsNotStarted;
                cursor.fail = wrap(reject);
                cursor.next = function() {
                  var _this = this;
                  var gotOne = 1;
                  return this.start(function() {
                    return gotOne-- ? _this.continue() : _this.stop();
                  }).then(function() {
                    return _this;
                  });
                };
                cursor.start = function(callback) {
                  var iterationPromise = new Promise(function(resolveIteration, rejectIteration) {
                    resolveIteration = wrap(resolveIteration);
                    req.onerror = eventRejectHandler(rejectIteration);
                    cursor.fail = rejectIteration;
                    cursor.stop = function(value) {
                      cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsStopped;
                      resolveIteration(value);
                    };
                  });
                  var guardedCallback = function() {
                    if (req.result) {
                      try {
                        callback();
                      } catch (err) {
                        cursor.fail(err);
                      }
                    } else {
                      cursor.done = true;
                      cursor.start = function() {
                        throw new Error("Cursor behind last entry");
                      };
                      cursor.stop();
                    }
                  };
                  req.onsuccess = wrap(function(ev2) {
                    req.onsuccess = guardedCallback;
                    guardedCallback();
                  });
                  cursor.continue = _cursorContinue;
                  cursor.continuePrimaryKey = _cursorContinuePrimaryKey;
                  cursor.advance = _cursorAdvance;
                  guardedCallback();
                  return iterationPromise;
                };
                resolve(cursor);
              }, reject);
            });
          }
          function query(hasGetAll2, hasIdb3Features2) {
            return function(request) {
              return new Promise(function(resolve, reject) {
                var _a3;
                resolve = wrap(resolve);
                var trans = request.trans, values = request.values, limit = request.limit, query2 = request.query;
                var direction = (_a3 = request.direction) !== null && _a3 !== void 0 ? _a3 : "next";
                var nonInfinitLimit = limit === Infinity ? void 0 : limit;
                var index = query2.index, range = query2.range;
                var store = trans.objectStore(tableName);
                var source = index.isPrimaryKey ? store : store.index(index.name);
                var idbKeyRange = makeIDBKeyRange(range);
                if (limit === 0)
                  return resolve({ result: [] });
                if (hasIdb3Features2) {
                  var options = {
                    query: idbKeyRange,
                    count: nonInfinitLimit,
                    direction
                  };
                  var req = values ? source.getAll(options) : source.getAllKeys(options);
                  req.onsuccess = function(event) {
                    return resolve({ result: event.target.result });
                  };
                  req.onerror = eventRejectHandler(reject);
                } else if (hasGetAll2 && direction === "next") {
                  var req = values ? source.getAll(idbKeyRange, nonInfinitLimit) : source.getAllKeys(idbKeyRange, nonInfinitLimit);
                  req.onsuccess = function(event) {
                    return resolve({ result: event.target.result });
                  };
                  req.onerror = eventRejectHandler(reject);
                } else {
                  var count_1 = 0;
                  var req_1 = values || !("openKeyCursor" in source) ? source.openCursor(idbKeyRange, direction) : source.openKeyCursor(idbKeyRange, direction);
                  var result_1 = [];
                  req_1.onsuccess = function() {
                    var cursor = req_1.result;
                    if (!cursor)
                      return resolve({ result: result_1 });
                    result_1.push(values ? cursor.value : cursor.primaryKey);
                    if (++count_1 === limit)
                      return resolve({ result: result_1 });
                    cursor.continue();
                  };
                  req_1.onerror = eventRejectHandler(reject);
                }
              });
            };
          }
          return {
            name: tableName,
            schema: tableSchema,
            mutate,
            getMany: function(_a3) {
              var trans = _a3.trans, keys2 = _a3.keys;
              return new Promise(function(resolve, reject) {
                resolve = wrap(resolve);
                var store = trans.objectStore(tableName);
                var length = keys2.length;
                var result = new Array(length);
                var keyCount = 0;
                var callbackCount = 0;
                var req;
                var successHandler = function(event) {
                  var req2 = event.target;
                  if ((result[req2._pos] = req2.result) != null)
                    ;
                  if (++callbackCount === keyCount)
                    resolve(result);
                };
                var errorHandler = eventRejectHandler(reject);
                for (var i = 0; i < length; ++i) {
                  var key3 = keys2[i];
                  if (key3 != null) {
                    req = store.get(keys2[i]);
                    req._pos = i;
                    req.onsuccess = successHandler;
                    req.onerror = errorHandler;
                    ++keyCount;
                  }
                }
                if (keyCount === 0)
                  resolve(result);
              });
            },
            get: function(_a3) {
              var trans = _a3.trans, key3 = _a3.key;
              return new Promise(function(resolve, reject) {
                resolve = wrap(resolve);
                var store = trans.objectStore(tableName);
                var req = store.get(key3);
                req.onsuccess = function(event) {
                  return resolve(event.target.result);
                };
                req.onerror = eventRejectHandler(reject);
              });
            },
            query: query(hasGetAll, hasIdb3Features),
            openCursor: openCursor2,
            count: function(_a3) {
              var query2 = _a3.query, trans = _a3.trans;
              var index = query2.index, range = query2.range;
              return new Promise(function(resolve, reject) {
                var store = trans.objectStore(tableName);
                var source = index.isPrimaryKey ? store : store.index(index.name);
                var idbKeyRange = makeIDBKeyRange(range);
                var req = idbKeyRange ? source.count(idbKeyRange) : source.count();
                req.onsuccess = wrap(function(ev) {
                  return resolve(ev.target.result);
                });
                req.onerror = eventRejectHandler(reject);
              });
            }
          };
        }
        var _a2 = extractSchema(db, tmpTrans), schema = _a2.schema, hasGetAll = _a2.hasGetAll, hasIdb3Features = _a2.hasIdb3Features;
        var tables = schema.tables.map(function(tableSchema) {
          return createDbCoreTable(tableSchema);
        });
        var tableMap = {};
        tables.forEach(function(table) {
          return tableMap[table.name] = table;
        });
        return {
          stack: "dbcore",
          transaction: db.transaction.bind(db),
          table: function(name) {
            var result = tableMap[name];
            if (!result)
              throw new Error("Table '".concat(name, "' not found"));
            return tableMap[name];
          },
          MIN_KEY: -Infinity,
          MAX_KEY: getMaxKey(IdbKeyRange),
          schema
        };
      }
      function createMiddlewareStack(stackImpl, middlewares) {
        return middlewares.reduce(function(down, _a2) {
          var create = _a2.create;
          return __assign(__assign({}, down), create(down));
        }, stackImpl);
      }
      function createMiddlewareStacks(middlewares, idbdb, _a2, tmpTrans) {
        var IDBKeyRange = _a2.IDBKeyRange;
        _a2.indexedDB;
        var dbcore = createMiddlewareStack(createDBCore(idbdb, IDBKeyRange, tmpTrans), middlewares.dbcore);
        return {
          dbcore
        };
      }
      function generateMiddlewareStacks(db, tmpTrans) {
        var idbdb = tmpTrans.db;
        var stacks = createMiddlewareStacks(db._middlewares, idbdb, db._deps, tmpTrans);
        db.core = stacks.dbcore;
        db.tables.forEach(function(table) {
          var tableName = table.name;
          if (db.core.schema.tables.some(function(tbl) {
            return tbl.name === tableName;
          })) {
            table.core = db.core.table(tableName);
            if (db[tableName] instanceof db.Table) {
              db[tableName].core = table.core;
            }
          }
        });
      }
      function setApiOnPlace(db, objs, tableNames, dbschema) {
        tableNames.forEach(function(tableName) {
          var schema = dbschema[tableName];
          objs.forEach(function(obj) {
            var propDesc = getPropertyDescriptor(obj, tableName);
            if (!propDesc || "value" in propDesc && propDesc.value === void 0) {
              if (obj === db.Transaction.prototype || obj instanceof db.Transaction) {
                setProp(obj, tableName, {
                  get: function() {
                    return this.table(tableName);
                  },
                  set: function(value) {
                    defineProperty(this, tableName, {
                      value,
                      writable: true,
                      configurable: true,
                      enumerable: true
                    });
                  }
                });
              } else {
                obj[tableName] = new db.Table(tableName, schema);
              }
            }
          });
        });
      }
      function removeTablesApi(db, objs) {
        objs.forEach(function(obj) {
          for (var key3 in obj) {
            if (obj[key3] instanceof db.Table)
              delete obj[key3];
          }
        });
      }
      function lowerVersionFirst(a, b) {
        return a._cfg.version - b._cfg.version;
      }
      function runUpgraders(db, oldVersion, idbUpgradeTrans, reject) {
        var globalSchema = db._dbSchema;
        if (idbUpgradeTrans.objectStoreNames.contains("$meta") && !globalSchema.$meta) {
          globalSchema.$meta = createTableSchema("$meta", parseIndexSyntax("")[0], []);
          db._storeNames.push("$meta");
        }
        var trans = db._createTransaction("readwrite", db._storeNames, globalSchema);
        trans.create(idbUpgradeTrans);
        trans._completion.catch(reject);
        var rejectTransaction = trans._reject.bind(trans);
        var transless = PSD.transless || PSD;
        newScope(function() {
          PSD.trans = trans;
          PSD.transless = transless;
          if (oldVersion === 0) {
            keys(globalSchema).forEach(function(tableName) {
              createTable(idbUpgradeTrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
            });
            generateMiddlewareStacks(db, idbUpgradeTrans);
            DexiePromise.follow(function() {
              return db.on.populate.fire(trans);
            }).catch(rejectTransaction);
          } else {
            generateMiddlewareStacks(db, idbUpgradeTrans);
            return getExistingVersion(db, trans, oldVersion).then(function(oldVersion2) {
              return updateTablesAndIndexes(db, oldVersion2, trans, idbUpgradeTrans);
            }).catch(rejectTransaction);
          }
        });
      }
      function patchCurrentVersion(db, idbUpgradeTrans) {
        createMissingTables(db._dbSchema, idbUpgradeTrans);
        if (idbUpgradeTrans.db.version % 10 === 0 && !idbUpgradeTrans.objectStoreNames.contains("$meta")) {
          idbUpgradeTrans.db.createObjectStore("$meta").add(Math.ceil(idbUpgradeTrans.db.version / 10 - 1), "version");
        }
        var globalSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
        adjustToExistingIndexNames(db, db._dbSchema, idbUpgradeTrans);
        var diff = getSchemaDiff(globalSchema, db._dbSchema);
        var _loop_1 = function(tableChange2) {
          if (tableChange2.change.length || tableChange2.recreate) {
            console.warn("Unable to patch indexes of table ".concat(tableChange2.name, " because it has changes on the type of index or primary key."));
            return { value: void 0 };
          }
          var store = idbUpgradeTrans.objectStore(tableChange2.name);
          tableChange2.add.forEach(function(idx) {
            if (debug)
              console.debug("Dexie upgrade patch: Creating missing index ".concat(tableChange2.name, ".").concat(idx.src));
            addIndex(store, idx);
          });
        };
        for (var _i = 0, _a2 = diff.change; _i < _a2.length; _i++) {
          var tableChange = _a2[_i];
          var state_1 = _loop_1(tableChange);
          if (typeof state_1 === "object")
            return state_1.value;
        }
      }
      function getExistingVersion(db, trans, oldVersion) {
        if (trans.storeNames.includes("$meta")) {
          return trans.table("$meta").get("version").then(function(metaVersion) {
            return metaVersion != null ? metaVersion : oldVersion;
          });
        } else {
          return DexiePromise.resolve(oldVersion);
        }
      }
      function updateTablesAndIndexes(db, oldVersion, trans, idbUpgradeTrans) {
        var queue = [];
        var versions = db._versions;
        var globalSchema = db._dbSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
        var versToRun = versions.filter(function(v) {
          return v._cfg.version >= oldVersion;
        });
        if (versToRun.length === 0) {
          return DexiePromise.resolve();
        }
        versToRun.forEach(function(version) {
          queue.push(function() {
            var oldSchema = globalSchema;
            var newSchema = version._cfg.dbschema;
            adjustToExistingIndexNames(db, oldSchema, idbUpgradeTrans);
            adjustToExistingIndexNames(db, newSchema, idbUpgradeTrans);
            globalSchema = db._dbSchema = newSchema;
            var diff = getSchemaDiff(oldSchema, newSchema);
            diff.add.forEach(function(tuple) {
              createTable(idbUpgradeTrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
            });
            diff.change.forEach(function(change) {
              if (change.recreate) {
                throw new exceptions.Upgrade("Not yet support for changing primary key");
              } else {
                var store_1 = idbUpgradeTrans.objectStore(change.name);
                change.add.forEach(function(idx) {
                  return addIndex(store_1, idx);
                });
                change.change.forEach(function(idx) {
                  store_1.deleteIndex(idx.name);
                  addIndex(store_1, idx);
                });
                change.del.forEach(function(idxName) {
                  return store_1.deleteIndex(idxName);
                });
              }
            });
            var contentUpgrade = version._cfg.contentUpgrade;
            if (contentUpgrade && version._cfg.version > oldVersion) {
              generateMiddlewareStacks(db, idbUpgradeTrans);
              trans._memoizedTables = {};
              var upgradeSchema_1 = shallowClone(newSchema);
              diff.del.forEach(function(table) {
                upgradeSchema_1[table] = oldSchema[table];
              });
              removeTablesApi(db, [db.Transaction.prototype]);
              setApiOnPlace(db, [db.Transaction.prototype], keys(upgradeSchema_1), upgradeSchema_1);
              trans.schema = upgradeSchema_1;
              var contentUpgradeIsAsync_1 = isAsyncFunction(contentUpgrade);
              if (contentUpgradeIsAsync_1) {
                incrementExpectedAwaits();
              }
              var returnValue_1;
              var promiseFollowed = DexiePromise.follow(function() {
                returnValue_1 = contentUpgrade(trans);
                if (returnValue_1) {
                  if (contentUpgradeIsAsync_1) {
                    var decrementor = decrementExpectedAwaits.bind(null, null);
                    returnValue_1.then(decrementor, decrementor);
                  }
                }
              });
              return returnValue_1 && typeof returnValue_1.then === "function" ? DexiePromise.resolve(returnValue_1) : promiseFollowed.then(function() {
                return returnValue_1;
              });
            }
          });
          queue.push(function(idbtrans) {
            var newSchema = version._cfg.dbschema;
            deleteRemovedTables(newSchema, idbtrans);
            removeTablesApi(db, [db.Transaction.prototype]);
            setApiOnPlace(db, [db.Transaction.prototype], db._storeNames, db._dbSchema);
            trans.schema = db._dbSchema;
          });
          queue.push(function(idbtrans) {
            if (db.idbdb.objectStoreNames.contains("$meta")) {
              if (Math.ceil(db.idbdb.version / 10) === version._cfg.version) {
                db.idbdb.deleteObjectStore("$meta");
                delete db._dbSchema.$meta;
                db._storeNames = db._storeNames.filter(function(name) {
                  return name !== "$meta";
                });
              } else {
                idbtrans.objectStore("$meta").put(version._cfg.version, "version");
              }
            }
          });
        });
        function runQueue() {
          return queue.length ? DexiePromise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : DexiePromise.resolve();
        }
        return runQueue().then(function() {
          createMissingTables(globalSchema, idbUpgradeTrans);
        });
      }
      function getSchemaDiff(oldSchema, newSchema) {
        var diff = {
          del: [],
          add: [],
          change: []
        };
        var table;
        for (table in oldSchema) {
          if (!newSchema[table])
            diff.del.push(table);
        }
        for (table in newSchema) {
          var oldDef = oldSchema[table], newDef = newSchema[table];
          if (!oldDef) {
            diff.add.push([table, newDef]);
          } else {
            var change = {
              name: table,
              def: newDef,
              recreate: false,
              del: [],
              add: [],
              change: []
            };
            if ("" + (oldDef.primKey.keyPath || "") !== "" + (newDef.primKey.keyPath || "") || oldDef.primKey.auto !== newDef.primKey.auto) {
              change.recreate = true;
              diff.change.push(change);
            } else {
              var oldIndexes = oldDef.idxByName;
              var newIndexes = newDef.idxByName;
              var idxName = void 0;
              for (idxName in oldIndexes) {
                if (!newIndexes[idxName])
                  change.del.push(idxName);
              }
              for (idxName in newIndexes) {
                var oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
                if (!oldIdx)
                  change.add.push(newIdx);
                else if (oldIdx.src !== newIdx.src)
                  change.change.push(newIdx);
              }
              if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                diff.change.push(change);
              }
            }
          }
        }
        return diff;
      }
      function createTable(idbtrans, tableName, primKey, indexes) {
        var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
        indexes.forEach(function(idx) {
          return addIndex(store, idx);
        });
        return store;
      }
      function createMissingTables(newSchema, idbtrans) {
        keys(newSchema).forEach(function(tableName) {
          if (!idbtrans.db.objectStoreNames.contains(tableName)) {
            if (debug)
              console.debug("Dexie: Creating missing table", tableName);
            createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
          }
        });
      }
      function deleteRemovedTables(newSchema, idbtrans) {
        [].slice.call(idbtrans.db.objectStoreNames).forEach(function(storeName) {
          return newSchema[storeName] == null && idbtrans.db.deleteObjectStore(storeName);
        });
      }
      function addIndex(store, idx) {
        store.createIndex(idx.name, idx.keyPath, {
          unique: idx.unique,
          multiEntry: idx.multi
        });
      }
      function buildGlobalSchema(db, idbdb, tmpTrans) {
        var globalSchema = {};
        var dbStoreNames = slice(idbdb.objectStoreNames, 0);
        dbStoreNames.forEach(function(storeName) {
          var store = tmpTrans.objectStore(storeName);
          var keyPath = store.keyPath;
          var primKey = createIndexSpec(nameFromKeyPath(keyPath), keyPath || "", true, false, !!store.autoIncrement, keyPath && typeof keyPath !== "string", true);
          var indexes = [];
          for (var j = 0; j < store.indexNames.length; ++j) {
            var idbindex = store.index(store.indexNames[j]);
            keyPath = idbindex.keyPath;
            var index = createIndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== "string", false);
            indexes.push(index);
          }
          globalSchema[storeName] = createTableSchema(storeName, primKey, indexes);
        });
        return globalSchema;
      }
      function readGlobalSchema(db, idbdb, tmpTrans) {
        db.verno = idbdb.version / 10;
        var globalSchema = db._dbSchema = buildGlobalSchema(db, idbdb, tmpTrans);
        db._storeNames = slice(idbdb.objectStoreNames, 0);
        setApiOnPlace(db, [db._allTables], keys(globalSchema), globalSchema);
      }
      function verifyInstalledSchema(db, tmpTrans) {
        var installedSchema = buildGlobalSchema(db, db.idbdb, tmpTrans);
        var diff = getSchemaDiff(installedSchema, db._dbSchema);
        return !(diff.add.length || diff.change.some(function(ch) {
          return ch.add.length || ch.change.length;
        }));
      }
      function adjustToExistingIndexNames(db, schema, idbtrans) {
        var storeNames = idbtrans.db.objectStoreNames;
        for (var i = 0; i < storeNames.length; ++i) {
          var storeName = storeNames[i];
          var store = idbtrans.objectStore(storeName);
          db._hasGetAll = "getAll" in store;
          for (var j = 0; j < store.indexNames.length; ++j) {
            var indexName = store.indexNames[j];
            var keyPath = store.index(indexName).keyPath;
            var dexieName = typeof keyPath === "string" ? keyPath : "[" + slice(keyPath).join("+") + "]";
            if (schema[storeName]) {
              var indexSpec = schema[storeName].idxByName[dexieName];
              if (indexSpec) {
                indexSpec.name = indexName;
                delete schema[storeName].idxByName[dexieName];
                schema[storeName].idxByName[indexName] = indexSpec;
              }
            }
          }
        }
        if (typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
          db._hasGetAll = false;
        }
      }
      function parseIndexSyntax(primKeyAndIndexes) {
        return primKeyAndIndexes.split(",").map(function(index, indexNum) {
          var _a2;
          var typeSplit = index.split(":");
          var type2 = (_a2 = typeSplit[1]) === null || _a2 === void 0 ? void 0 : _a2.trim();
          index = typeSplit[0].trim();
          var name = index.replace(/([&*]|\+\+)/g, "");
          var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split("+") : name;
          return createIndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), indexNum === 0, type2);
        });
      }
      var Version = function() {
        function Version2() {
        }
        Version2.prototype._createTableSchema = function(name, primKey, indexes) {
          return createTableSchema(name, primKey, indexes);
        };
        Version2.prototype._parseIndexSyntax = function(primKeyAndIndexes) {
          return parseIndexSyntax(primKeyAndIndexes);
        };
        Version2.prototype._parseStoresSpec = function(stores, outSchema) {
          var _this = this;
          keys(stores).forEach(function(tableName) {
            if (stores[tableName] !== null) {
              var indexes = _this._parseIndexSyntax(stores[tableName]);
              var primKey = indexes.shift();
              if (!primKey) {
                throw new exceptions.Schema("Invalid schema for table " + tableName + ": " + stores[tableName]);
              }
              primKey.unique = true;
              if (primKey.multi)
                throw new exceptions.Schema("Primary key cannot be multiEntry*");
              indexes.forEach(function(idx) {
                if (idx.auto)
                  throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                if (!idx.keyPath)
                  throw new exceptions.Schema("Index must have a name and cannot be an empty string");
              });
              var tblSchema = _this._createTableSchema(tableName, primKey, indexes);
              outSchema[tableName] = tblSchema;
            }
          });
        };
        Version2.prototype.stores = function(stores) {
          var db = this.db;
          this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;
          var versions = db._versions;
          var storesSpec = {};
          var dbschema = {};
          versions.forEach(function(version) {
            extend(storesSpec, version._cfg.storesSource);
            dbschema = version._cfg.dbschema = {};
            version._parseStoresSpec(storesSpec, dbschema);
          });
          db._dbSchema = dbschema;
          removeTablesApi(db, [db._allTables, db, db.Transaction.prototype]);
          setApiOnPlace(db, [db._allTables, db, db.Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
          db._storeNames = keys(dbschema);
          return this;
        };
        Version2.prototype.upgrade = function(upgradeFunction) {
          this._cfg.contentUpgrade = promisableChain(this._cfg.contentUpgrade || nop, upgradeFunction);
          return this;
        };
        return Version2;
      }();
      function createVersionConstructor(db) {
        return makeClassConstructor(Version.prototype, function Version2(versionNumber) {
          this.db = db;
          this._cfg = {
            version: versionNumber,
            storesSource: null,
            dbschema: {},
            tables: {},
            contentUpgrade: null
          };
        });
      }
      var connections = createConnectionsManager();
      function createConnectionsManager() {
        if (typeof FinalizationRegistry !== "undefined" && typeof WeakRef !== "undefined") {
          var _refs_1 = /* @__PURE__ */ new Set();
          var _registry_1 = new FinalizationRegistry(function(ref) {
            _refs_1.delete(ref);
          });
          var toArray = function() {
            return Array.from(_refs_1).map(function(ref) {
              return ref.deref();
            }).filter(function(db) {
              return db !== void 0;
            });
          };
          var add3 = function(db) {
            var ref = new WeakRef(db._novip);
            _refs_1.add(ref);
            _registry_1.register(db._novip, ref, ref);
            if (_refs_1.size > db._options.maxConnections) {
              var oldestRef = _refs_1.values().next().value;
              _refs_1.delete(oldestRef);
              _registry_1.unregister(oldestRef);
            }
          };
          var remove3 = function(db) {
            if (!db)
              return;
            var iterator = _refs_1.values();
            var result = iterator.next();
            while (!result.done) {
              var ref = result.value;
              if (ref.deref() === db._novip) {
                _refs_1.delete(ref);
                _registry_1.unregister(ref);
                return;
              }
              result = iterator.next();
            }
          };
          return { toArray, add: add3, remove: remove3 };
        } else {
          var connections_1 = [];
          var toArray = function() {
            return connections_1;
          };
          var add3 = function(db) {
            connections_1.push(db._novip);
          };
          var remove3 = function(db) {
            if (!db)
              return;
            var index = connections_1.indexOf(db._novip);
            if (index !== -1) {
              connections_1.splice(index, 1);
            }
          };
          return { toArray, add: add3, remove: remove3 };
        }
      }
      function getDbNamesTable(indexedDB2, IDBKeyRange) {
        var dbNamesDB = indexedDB2["_dbNamesDB"];
        if (!dbNamesDB) {
          dbNamesDB = indexedDB2["_dbNamesDB"] = new Dexie$1(DBNAMES_DB, {
            addons: [],
            indexedDB: indexedDB2,
            IDBKeyRange
          });
          dbNamesDB.version(1).stores({ dbnames: "name" });
        }
        return dbNamesDB.table("dbnames");
      }
      function hasDatabasesNative(indexedDB2) {
        return indexedDB2 && typeof indexedDB2.databases === "function";
      }
      function getDatabaseNames(_a2) {
        var indexedDB2 = _a2.indexedDB, IDBKeyRange = _a2.IDBKeyRange;
        return hasDatabasesNative(indexedDB2) ? Promise.resolve(indexedDB2.databases()).then(function(infos) {
          return infos.map(function(info) {
            return info.name;
          }).filter(function(name) {
            return name !== DBNAMES_DB;
          });
        }) : getDbNamesTable(indexedDB2, IDBKeyRange).toCollection().primaryKeys();
      }
      function _onDatabaseCreated(_a2, name) {
        var indexedDB2 = _a2.indexedDB, IDBKeyRange = _a2.IDBKeyRange;
        !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).put({ name }).catch(nop);
      }
      function _onDatabaseDeleted(_a2, name) {
        var indexedDB2 = _a2.indexedDB, IDBKeyRange = _a2.IDBKeyRange;
        !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).delete(name).catch(nop);
      }
      function vip(fn) {
        return newScope(function() {
          PSD.letThrough = true;
          return fn();
        });
      }
      function idbReady() {
        var isSafari = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
        if (!isSafari || !indexedDB.databases)
          return Promise.resolve();
        var intervalId;
        return new Promise(function(resolve) {
          var tryIdb = function() {
            return indexedDB.databases().finally(resolve);
          };
          intervalId = setInterval(tryIdb, 100);
          tryIdb();
        }).finally(function() {
          return clearInterval(intervalId);
        });
      }
      var _a;
      function isEmptyRange(node) {
        return !("from" in node);
      }
      var RangeSet2 = function(fromOrTree, to) {
        if (this) {
          extend(this, arguments.length ? { d: 1, from: fromOrTree, to: arguments.length > 1 ? to : fromOrTree } : { d: 0 });
        } else {
          var rv = new RangeSet2();
          if (fromOrTree && "d" in fromOrTree) {
            extend(rv, fromOrTree);
          }
          return rv;
        }
      };
      props(RangeSet2.prototype, (_a = {
        add: function(rangeSet) {
          mergeRanges2(this, rangeSet);
          return this;
        },
        addKey: function(key3) {
          addRange(this, key3, key3);
          return this;
        },
        addKeys: function(keys2) {
          var _this = this;
          keys2.forEach(function(key3) {
            return addRange(_this, key3, key3);
          });
          return this;
        },
        hasKey: function(key3) {
          var node = getRangeSetIterator(this).next(key3).value;
          return node && cmp2(node.from, key3) <= 0 && cmp2(node.to, key3) >= 0;
        }
      }, _a[iteratorSymbol] = function() {
        return getRangeSetIterator(this);
      }, _a));
      function addRange(target, from, to) {
        var diff = cmp2(from, to);
        if (isNaN(diff))
          return;
        if (diff > 0)
          throw RangeError();
        if (isEmptyRange(target))
          return extend(target, { from, to, d: 1 });
        var left = target.l;
        var right = target.r;
        if (cmp2(to, target.from) < 0) {
          left ? addRange(left, from, to) : target.l = { from, to, d: 1, l: null, r: null };
          return rebalance(target);
        }
        if (cmp2(from, target.to) > 0) {
          right ? addRange(right, from, to) : target.r = { from, to, d: 1, l: null, r: null };
          return rebalance(target);
        }
        if (cmp2(from, target.from) < 0) {
          target.from = from;
          target.l = null;
          target.d = right ? right.d + 1 : 1;
        }
        if (cmp2(to, target.to) > 0) {
          target.to = to;
          target.r = null;
          target.d = target.l ? target.l.d + 1 : 1;
        }
        var rightWasCutOff = !target.r;
        if (left && !target.l) {
          mergeRanges2(target, left);
        }
        if (right && rightWasCutOff) {
          mergeRanges2(target, right);
        }
      }
      function mergeRanges2(target, newSet) {
        function _addRangeSet(target2, _a2) {
          var from = _a2.from, to = _a2.to, l = _a2.l, r = _a2.r;
          addRange(target2, from, to);
          if (l)
            _addRangeSet(target2, l);
          if (r)
            _addRangeSet(target2, r);
        }
        if (!isEmptyRange(newSet))
          _addRangeSet(target, newSet);
      }
      function rangesOverlap2(rangeSet1, rangeSet2) {
        var i1 = getRangeSetIterator(rangeSet2);
        var nextResult1 = i1.next();
        if (nextResult1.done)
          return false;
        var a = nextResult1.value;
        var i2 = getRangeSetIterator(rangeSet1);
        var nextResult2 = i2.next(a.from);
        var b = nextResult2.value;
        while (!nextResult1.done && !nextResult2.done) {
          if (cmp2(b.from, a.to) <= 0 && cmp2(b.to, a.from) >= 0)
            return true;
          cmp2(a.from, b.from) < 0 ? a = (nextResult1 = i1.next(b.from)).value : b = (nextResult2 = i2.next(a.from)).value;
        }
        return false;
      }
      function getRangeSetIterator(node) {
        var state = isEmptyRange(node) ? null : { s: 0, n: node };
        return {
          next: function(key3) {
            var keyProvided = arguments.length > 0;
            while (state) {
              switch (state.s) {
                case 0:
                  state.s = 1;
                  if (keyProvided) {
                    while (state.n.l && cmp2(key3, state.n.from) < 0)
                      state = { up: state, n: state.n.l, s: 1 };
                  } else {
                    while (state.n.l)
                      state = { up: state, n: state.n.l, s: 1 };
                  }
                case 1:
                  state.s = 2;
                  if (!keyProvided || cmp2(key3, state.n.to) <= 0)
                    return { value: state.n, done: false };
                case 2:
                  if (state.n.r) {
                    state.s = 3;
                    state = { up: state, n: state.n.r, s: 0 };
                    continue;
                  }
                case 3:
                  state = state.up;
              }
            }
            return { done: true };
          }
        };
      }
      function rebalance(target) {
        var _a2, _b;
        var diff = (((_a2 = target.r) === null || _a2 === void 0 ? void 0 : _a2.d) || 0) - (((_b = target.l) === null || _b === void 0 ? void 0 : _b.d) || 0);
        var r = diff > 1 ? "r" : diff < -1 ? "l" : "";
        if (r) {
          var l = r === "r" ? "l" : "r";
          var rootClone = __assign({}, target);
          var oldRootRight = target[r];
          target.from = oldRootRight.from;
          target.to = oldRootRight.to;
          target[r] = oldRootRight[r];
          rootClone[r] = oldRootRight[l];
          target[l] = rootClone;
          rootClone.d = computeDepth(rootClone);
        }
        target.d = computeDepth(target);
      }
      function computeDepth(_a2) {
        var r = _a2.r, l = _a2.l;
        return (r ? l ? Math.max(r.d, l.d) : r.d : l ? l.d : 0) + 1;
      }
      function extendObservabilitySet(target, newSet) {
        keys(newSet).forEach(function(part) {
          if (target[part])
            mergeRanges2(target[part], newSet[part]);
          else
            target[part] = cloneSimpleObjectTree(newSet[part]);
        });
        return target;
      }
      function obsSetsOverlap(os1, os2) {
        return os1.all || os2.all || Object.keys(os1).some(function(key3) {
          return os2[key3] && rangesOverlap2(os2[key3], os1[key3]);
        });
      }
      var cache = {};
      var unsignaledParts = {};
      var isTaskEnqueued = false;
      function signalSubscribersLazily(part, optimistic) {
        extendObservabilitySet(unsignaledParts, part);
        if (!isTaskEnqueued) {
          isTaskEnqueued = true;
          setTimeout(function() {
            isTaskEnqueued = false;
            var parts = unsignaledParts;
            unsignaledParts = {};
            signalSubscribersNow(parts, false);
          }, 0);
        }
      }
      function signalSubscribersNow(updatedParts, deleteAffectedCacheEntries) {
        if (deleteAffectedCacheEntries === void 0) {
          deleteAffectedCacheEntries = false;
        }
        var queriesToSignal = /* @__PURE__ */ new Set();
        if (updatedParts.all) {
          for (var _i = 0, _a2 = Object.values(cache); _i < _a2.length; _i++) {
            var tblCache = _a2[_i];
            collectTableSubscribers(tblCache, updatedParts, queriesToSignal, deleteAffectedCacheEntries);
          }
        } else {
          for (var key3 in updatedParts) {
            var parts = /^idb\:\/\/(.*)\/(.*)\//.exec(key3);
            if (parts) {
              var dbName = parts[1], tableName = parts[2];
              var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
              if (tblCache)
                collectTableSubscribers(tblCache, updatedParts, queriesToSignal, deleteAffectedCacheEntries);
            }
          }
        }
        queriesToSignal.forEach(function(requery) {
          return requery();
        });
      }
      function collectTableSubscribers(tblCache, updatedParts, outQueriesToSignal, deleteAffectedCacheEntries) {
        var updatedEntryLists = [];
        for (var _i = 0, _a2 = Object.entries(tblCache.queries.query); _i < _a2.length; _i++) {
          var _b = _a2[_i], indexName = _b[0], entries = _b[1];
          var filteredEntries = [];
          for (var _c = 0, entries_1 = entries; _c < entries_1.length; _c++) {
            var entry = entries_1[_c];
            if (obsSetsOverlap(updatedParts, entry.obsSet)) {
              entry.subscribers.forEach(function(requery) {
                return outQueriesToSignal.add(requery);
              });
            } else if (deleteAffectedCacheEntries) {
              filteredEntries.push(entry);
            }
          }
          if (deleteAffectedCacheEntries)
            updatedEntryLists.push([indexName, filteredEntries]);
        }
        if (deleteAffectedCacheEntries) {
          for (var _d = 0, updatedEntryLists_1 = updatedEntryLists; _d < updatedEntryLists_1.length; _d++) {
            var _e = updatedEntryLists_1[_d], indexName = _e[0], filteredEntries = _e[1];
            tblCache.queries.query[indexName] = filteredEntries;
          }
        }
      }
      function dexieOpen(db) {
        var state = db._state;
        var indexedDB2 = db._deps.indexedDB;
        if (state.isBeingOpened || db.idbdb)
          return state.dbReadyPromise.then(function() {
            return state.dbOpenError ? rejection(state.dbOpenError) : db;
          });
        state.isBeingOpened = true;
        state.dbOpenError = null;
        state.openComplete = false;
        var openCanceller = state.openCanceller;
        var nativeVerToOpen = Math.round(db.verno * 10);
        var schemaPatchMode = false;
        function throwIfCancelled() {
          if (state.openCanceller !== openCanceller)
            throw new exceptions.DatabaseClosed("db.open() was cancelled");
        }
        var resolveDbReady = state.dbReadyResolve, upgradeTransaction = null, wasCreated = false;
        var tryOpenDB = function() {
          return new DexiePromise(function(resolve, reject) {
            throwIfCancelled();
            if (!indexedDB2)
              throw new exceptions.MissingAPI();
            var dbName = db.name;
            var req = state.autoSchema || !nativeVerToOpen ? indexedDB2.open(dbName) : indexedDB2.open(dbName, nativeVerToOpen);
            if (!req)
              throw new exceptions.MissingAPI();
            req.onerror = eventRejectHandler(reject);
            req.onblocked = wrap(db._fireOnBlocked);
            req.onupgradeneeded = wrap(function(e) {
              upgradeTransaction = req.transaction;
              if (state.autoSchema && !db._options.allowEmptyDB) {
                req.onerror = preventDefault;
                upgradeTransaction.abort();
                req.result.close();
                var delreq = indexedDB2.deleteDatabase(dbName);
                delreq.onsuccess = delreq.onerror = wrap(function() {
                  reject(new exceptions.NoSuchDatabase("Database ".concat(dbName, " doesnt exist")));
                });
              } else {
                upgradeTransaction.onerror = eventRejectHandler(reject);
                var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion;
                wasCreated = oldVer < 1;
                db.idbdb = req.result;
                if (schemaPatchMode) {
                  patchCurrentVersion(db, upgradeTransaction);
                }
                runUpgraders(db, oldVer / 10, upgradeTransaction, reject);
              }
            }, reject);
            req.onsuccess = wrap(function() {
              upgradeTransaction = null;
              var idbdb = db.idbdb = req.result;
              var objectStoreNames = slice(idbdb.objectStoreNames);
              if (objectStoreNames.length > 0)
                try {
                  var tmpTrans = idbdb.transaction(safariMultiStoreFix(objectStoreNames), "readonly");
                  if (state.autoSchema)
                    readGlobalSchema(db, idbdb, tmpTrans);
                  else {
                    adjustToExistingIndexNames(db, db._dbSchema, tmpTrans);
                    if (!verifyInstalledSchema(db, tmpTrans) && !schemaPatchMode) {
                      console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this.");
                      idbdb.close();
                      nativeVerToOpen = idbdb.version + 1;
                      schemaPatchMode = true;
                      return resolve(tryOpenDB());
                    }
                  }
                  generateMiddlewareStacks(db, tmpTrans);
                } catch (e) {
                }
              connections.add(db);
              idbdb.onversionchange = wrap(function(ev) {
                state.vcFired = true;
                db.on("versionchange").fire(ev);
              });
              idbdb.onclose = wrap(function() {
                db.close({ disableAutoOpen: false });
              });
              if (wasCreated)
                _onDatabaseCreated(db._deps, dbName);
              resolve();
            }, reject);
          }).catch(function(err) {
            switch (err === null || err === void 0 ? void 0 : err.name) {
              case "UnknownError":
                if (state.PR1398_maxLoop > 0) {
                  state.PR1398_maxLoop--;
                  console.warn("Dexie: Workaround for Chrome UnknownError on open()");
                  return tryOpenDB();
                }
                break;
              case "VersionError":
                if (nativeVerToOpen > 0) {
                  nativeVerToOpen = 0;
                  return tryOpenDB();
                }
                break;
            }
            return DexiePromise.reject(err);
          });
        };
        return DexiePromise.race([
          openCanceller,
          (typeof navigator === "undefined" ? DexiePromise.resolve() : idbReady()).then(tryOpenDB)
        ]).then(function() {
          throwIfCancelled();
          state.onReadyBeingFired = [];
          return DexiePromise.resolve(vip(function() {
            return db.on.ready.fire(db.vip);
          })).then(function fireRemainders() {
            if (state.onReadyBeingFired.length > 0) {
              var remainders_1 = state.onReadyBeingFired.reduce(promisableChain, nop);
              state.onReadyBeingFired = [];
              return DexiePromise.resolve(vip(function() {
                return remainders_1(db.vip);
              })).then(fireRemainders);
            }
          });
        }).finally(function() {
          if (state.openCanceller === openCanceller) {
            state.onReadyBeingFired = null;
            state.isBeingOpened = false;
          }
        }).catch(function(err) {
          state.dbOpenError = err;
          try {
            upgradeTransaction && upgradeTransaction.abort();
          } catch (_a2) {
          }
          if (openCanceller === state.openCanceller) {
            db._close();
          }
          return rejection(err);
        }).finally(function() {
          state.openComplete = true;
          resolveDbReady();
        }).then(function() {
          if (wasCreated) {
            var everything_1 = {};
            db.tables.forEach(function(table) {
              table.schema.indexes.forEach(function(idx) {
                if (idx.name)
                  everything_1["idb://".concat(db.name, "/").concat(table.name, "/").concat(idx.name)] = new RangeSet2(-Infinity, [[[]]]);
              });
              everything_1["idb://".concat(db.name, "/").concat(table.name, "/")] = everything_1["idb://".concat(db.name, "/").concat(table.name, "/:dels")] = new RangeSet2(-Infinity, [[[]]]);
            });
            globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME).fire(everything_1);
            signalSubscribersNow(everything_1, true);
          }
          return db;
        });
      }
      function awaitIterator(iterator) {
        var callNext = function(result) {
          return iterator.next(result);
        }, doThrow = function(error) {
          return iterator.throw(error);
        }, onSuccess = step(callNext), onError = step(doThrow);
        function step(getNext) {
          return function(val) {
            var next = getNext(val), value = next.value;
            return next.done ? value : !value || typeof value.then !== "function" ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
          };
        }
        return step(callNext)();
      }
      function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
        var i = arguments.length;
        if (i < 2)
          throw new exceptions.InvalidArgument("Too few arguments");
        var args = new Array(i - 1);
        while (--i)
          args[i - 1] = arguments[i];
        scopeFunc = args.pop();
        var tables = flatten(args);
        return [mode, tables, scopeFunc];
      }
      function enterTransactionScope(db, mode, storeNames, parentTransaction, scopeFunc) {
        return DexiePromise.resolve().then(function() {
          var transless = PSD.transless || PSD;
          var trans = db._createTransaction(mode, storeNames, db._dbSchema, parentTransaction);
          trans.explicit = true;
          var zoneProps = {
            trans,
            transless
          };
          if (parentTransaction) {
            trans.idbtrans = parentTransaction.idbtrans;
          } else {
            try {
              trans.create();
              trans.idbtrans._explicit = true;
              db._state.PR1398_maxLoop = 3;
            } catch (ex) {
              if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
                console.warn("Dexie: Need to reopen db");
                db.close({ disableAutoOpen: false });
                return db.open().then(function() {
                  return enterTransactionScope(db, mode, storeNames, null, scopeFunc);
                });
              }
              return rejection(ex);
            }
          }
          var scopeFuncIsAsync = isAsyncFunction(scopeFunc);
          if (scopeFuncIsAsync) {
            incrementExpectedAwaits();
          }
          var returnValue;
          var promiseFollowed = DexiePromise.follow(function() {
            returnValue = scopeFunc.call(trans, trans);
            if (returnValue) {
              if (scopeFuncIsAsync) {
                var decrementor = decrementExpectedAwaits.bind(null, null);
                returnValue.then(decrementor, decrementor);
              } else if (typeof returnValue.next === "function" && typeof returnValue.throw === "function") {
                returnValue = awaitIterator(returnValue);
              }
            }
          }, zoneProps);
          return (returnValue && typeof returnValue.then === "function" ? DexiePromise.resolve(returnValue).then(function(x) {
            return trans.active ? x : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
          }) : promiseFollowed.then(function() {
            return returnValue;
          })).then(function(x) {
            if (parentTransaction)
              trans._resolve();
            return trans._completion.then(function() {
              return x;
            });
          }).catch(function(e) {
            trans._reject(e);
            return rejection(e);
          });
        });
      }
      function pad2(a, value, count) {
        var result = isArray(a) ? a.slice() : [a];
        for (var i = 0; i < count; ++i)
          result.push(value);
        return result;
      }
      function createVirtualIndexMiddleware(down) {
        return __assign(__assign({}, down), { table: function(tableName) {
          var table = down.table(tableName);
          var schema = table.schema;
          var indexLookup = {};
          var allVirtualIndexes = [];
          function addVirtualIndexes(keyPath, keyTail, lowLevelIndex) {
            var keyPathAlias = getKeyPathAlias(keyPath);
            var indexList = indexLookup[keyPathAlias] = indexLookup[keyPathAlias] || [];
            var keyLength = keyPath == null ? 0 : typeof keyPath === "string" ? 1 : keyPath.length;
            var isVirtual = keyTail > 0;
            var virtualIndex = __assign(__assign({}, lowLevelIndex), { name: isVirtual ? "".concat(keyPathAlias, "(virtual-from:").concat(lowLevelIndex.name, ")") : lowLevelIndex.name, lowLevelIndex, isVirtual, keyTail, keyLength, extractKey: getKeyExtractor(keyPath), unique: !isVirtual && lowLevelIndex.unique });
            indexList.push(virtualIndex);
            if (!virtualIndex.isPrimaryKey) {
              allVirtualIndexes.push(virtualIndex);
            }
            if (keyLength > 1) {
              var virtualKeyPath = keyLength === 2 ? keyPath[0] : keyPath.slice(0, keyLength - 1);
              addVirtualIndexes(virtualKeyPath, keyTail + 1, lowLevelIndex);
            }
            indexList.sort(function(a, b) {
              return a.keyTail - b.keyTail;
            });
            return virtualIndex;
          }
          var primaryKey = addVirtualIndexes(schema.primaryKey.keyPath, 0, schema.primaryKey);
          indexLookup[":id"] = [primaryKey];
          for (var _i = 0, _a2 = schema.indexes; _i < _a2.length; _i++) {
            var index = _a2[_i];
            addVirtualIndexes(index.keyPath, 0, index);
          }
          function findBestIndex(keyPath) {
            var result2 = indexLookup[getKeyPathAlias(keyPath)];
            return result2 && result2[0];
          }
          function translateRange(range, keyTail) {
            return {
              type: range.type === 1 ? 2 : range.type,
              lower: pad2(range.lower, range.lowerOpen ? down.MAX_KEY : down.MIN_KEY, keyTail),
              lowerOpen: true,
              upper: pad2(range.upper, range.upperOpen ? down.MIN_KEY : down.MAX_KEY, keyTail),
              upperOpen: true
            };
          }
          function translateRequest(req) {
            var index2 = req.query.index;
            return index2.isVirtual ? __assign(__assign({}, req), { query: {
              index: index2.lowLevelIndex,
              range: translateRange(req.query.range, index2.keyTail)
            } }) : req;
          }
          var result = __assign(__assign({}, table), { schema: __assign(__assign({}, schema), { primaryKey, indexes: allVirtualIndexes, getIndexByKeyPath: findBestIndex }), count: function(req) {
            return table.count(translateRequest(req));
          }, query: function(req) {
            return table.query(translateRequest(req));
          }, openCursor: function(req) {
            var _a3 = req.query.index, keyTail = _a3.keyTail, isVirtual = _a3.isVirtual, keyLength = _a3.keyLength;
            if (!isVirtual)
              return table.openCursor(req);
            function createVirtualCursor(cursor) {
              function _continue(key3) {
                key3 != null ? cursor.continue(pad2(key3, req.reverse ? down.MAX_KEY : down.MIN_KEY, keyTail)) : req.unique ? cursor.continue(cursor.key.slice(0, keyLength).concat(req.reverse ? down.MIN_KEY : down.MAX_KEY, keyTail)) : cursor.continue();
              }
              var virtualCursor = Object.create(cursor, {
                continue: { value: _continue },
                continuePrimaryKey: {
                  value: function(key3, primaryKey2) {
                    cursor.continuePrimaryKey(pad2(key3, down.MAX_KEY, keyTail), primaryKey2);
                  }
                },
                primaryKey: {
                  get: function() {
                    return cursor.primaryKey;
                  }
                },
                key: {
                  get: function() {
                    var key3 = cursor.key;
                    return keyLength === 1 ? key3[0] : key3.slice(0, keyLength);
                  }
                },
                value: {
                  get: function() {
                    return cursor.value;
                  }
                }
              });
              return virtualCursor;
            }
            return table.openCursor(translateRequest(req)).then(function(cursor) {
              return cursor && createVirtualCursor(cursor);
            });
          } });
          return result;
        } });
      }
      var virtualIndexMiddleware = {
        stack: "dbcore",
        name: "VirtualIndexMiddleware",
        level: 1,
        create: createVirtualIndexMiddleware
      };
      function getObjectDiff(a, b, rv, prfx) {
        rv = rv || {};
        prfx = prfx || "";
        keys(a).forEach(function(prop) {
          if (!hasOwn(b, prop)) {
            rv[prfx + prop] = void 0;
          } else {
            var ap = a[prop], bp = b[prop];
            if (typeof ap === "object" && typeof bp === "object" && ap && bp) {
              var apTypeName = toStringTag(ap);
              var bpTypeName = toStringTag(bp);
              if (apTypeName !== bpTypeName) {
                rv[prfx + prop] = b[prop];
              } else if (apTypeName === "Object") {
                getObjectDiff(ap, bp, rv, prfx + prop + ".");
              } else if (ap !== bp) {
                rv[prfx + prop] = b[prop];
              }
            } else if (ap !== bp)
              rv[prfx + prop] = b[prop];
          }
        });
        keys(b).forEach(function(prop) {
          if (!hasOwn(a, prop)) {
            rv[prfx + prop] = b[prop];
          }
        });
        return rv;
      }
      function getEffectiveKeys(primaryKey, req) {
        if (req.type === "delete")
          return req.keys;
        return req.keys || req.values.map(primaryKey.extractKey);
      }
      var hooksMiddleware = {
        stack: "dbcore",
        name: "HooksMiddleware",
        level: 2,
        create: function(downCore) {
          return __assign(__assign({}, downCore), { table: function(tableName) {
            var downTable = downCore.table(tableName);
            var primaryKey = downTable.schema.primaryKey;
            var tableMiddleware = __assign(__assign({}, downTable), { mutate: function(req) {
              var dxTrans = PSD.trans;
              var _a2 = dxTrans.table(tableName).hook, deleting = _a2.deleting, creating = _a2.creating, updating = _a2.updating;
              switch (req.type) {
                case "add":
                  if (creating.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", function() {
                    return addPutOrDelete(req);
                  }, true);
                case "put":
                  if (creating.fire === nop && updating.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", function() {
                    return addPutOrDelete(req);
                  }, true);
                case "delete":
                  if (deleting.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", function() {
                    return addPutOrDelete(req);
                  }, true);
                case "deleteRange":
                  if (deleting.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", function() {
                    return deleteRange(req);
                  }, true);
              }
              return downTable.mutate(req);
              function addPutOrDelete(req2) {
                var dxTrans2 = PSD.trans;
                var keys2 = req2.keys || getEffectiveKeys(primaryKey, req2);
                if (!keys2)
                  throw new Error("Keys missing");
                req2 = req2.type === "add" || req2.type === "put" ? __assign(__assign({}, req2), { keys: keys2 }) : __assign({}, req2);
                if (req2.type !== "delete")
                  req2.values = __spreadArray([], req2.values, true);
                if (req2.keys)
                  req2.keys = __spreadArray([], req2.keys, true);
                return getExistingValues(downTable, req2, keys2).then(function(existingValues) {
                  var contexts = keys2.map(function(key3, i) {
                    var existingValue = existingValues[i];
                    var ctx = { onerror: null, onsuccess: null };
                    if (req2.type === "delete") {
                      deleting.fire.call(ctx, key3, existingValue, dxTrans2);
                    } else if (req2.type === "add" || existingValue === void 0) {
                      var generatedPrimaryKey = creating.fire.call(ctx, key3, req2.values[i], dxTrans2);
                      if (key3 == null && generatedPrimaryKey != null) {
                        key3 = generatedPrimaryKey;
                        req2.keys[i] = key3;
                        if (!primaryKey.outbound) {
                          setByKeyPath(req2.values[i], primaryKey.keyPath, key3);
                        }
                      }
                    } else {
                      var objectDiff = getObjectDiff(existingValue, req2.values[i]);
                      var additionalChanges_1 = updating.fire.call(ctx, objectDiff, key3, existingValue, dxTrans2);
                      if (additionalChanges_1) {
                        var requestedValue_1 = req2.values[i];
                        Object.keys(additionalChanges_1).forEach(function(keyPath) {
                          if (hasOwn(requestedValue_1, keyPath)) {
                            requestedValue_1[keyPath] = additionalChanges_1[keyPath];
                          } else {
                            setByKeyPath(requestedValue_1, keyPath, additionalChanges_1[keyPath]);
                          }
                        });
                      }
                    }
                    return ctx;
                  });
                  return downTable.mutate(req2).then(function(_a3) {
                    var failures = _a3.failures, results = _a3.results, numFailures = _a3.numFailures, lastResult = _a3.lastResult;
                    for (var i = 0; i < keys2.length; ++i) {
                      var primKey = results ? results[i] : keys2[i];
                      var ctx = contexts[i];
                      if (primKey == null) {
                        ctx.onerror && ctx.onerror(failures[i]);
                      } else {
                        ctx.onsuccess && ctx.onsuccess(
                          req2.type === "put" && existingValues[i] ? req2.values[i] : primKey
                        );
                      }
                    }
                    return { failures, results, numFailures, lastResult };
                  }).catch(function(error) {
                    contexts.forEach(function(ctx) {
                      return ctx.onerror && ctx.onerror(error);
                    });
                    return Promise.reject(error);
                  });
                });
              }
              function deleteRange(req2) {
                return deleteNextChunk(req2.trans, req2.range, 1e4);
              }
              function deleteNextChunk(trans, range, limit) {
                return downTable.query({
                  trans,
                  values: false,
                  query: { index: primaryKey, range },
                  limit
                }).then(function(_a3) {
                  var result = _a3.result;
                  return addPutOrDelete({
                    type: "delete",
                    keys: result,
                    trans
                  }).then(function(res) {
                    if (res.numFailures > 0)
                      return Promise.reject(res.failures[0]);
                    if (result.length < limit) {
                      return {
                        failures: [],
                        numFailures: 0,
                        lastResult: void 0
                      };
                    } else {
                      return deleteNextChunk(trans, __assign(__assign({}, range), { lower: result[result.length - 1], lowerOpen: true }), limit);
                    }
                  });
                });
              }
            } });
            return tableMiddleware;
          } });
        }
      };
      function getExistingValues(table, req, effectiveKeys) {
        return req.type === "add" ? Promise.resolve([]) : table.getMany({
          trans: req.trans,
          keys: effectiveKeys,
          cache: "immutable"
        });
      }
      function getFromTransactionCache(keys2, cache2, clone) {
        try {
          if (!cache2)
            return null;
          if (cache2.keys.length < keys2.length)
            return null;
          var result = [];
          for (var i = 0, j = 0; i < cache2.keys.length && j < keys2.length; ++i) {
            if (cmp2(cache2.keys[i], keys2[j]) !== 0)
              continue;
            result.push(clone ? deepClone(cache2.values[i]) : cache2.values[i]);
            ++j;
          }
          return result.length === keys2.length ? result : null;
        } catch (_a2) {
          return null;
        }
      }
      var cacheExistingValuesMiddleware = {
        stack: "dbcore",
        level: -1,
        create: function(core) {
          return {
            table: function(tableName) {
              var table = core.table(tableName);
              return __assign(__assign({}, table), { getMany: function(req) {
                if (!req.cache) {
                  return table.getMany(req);
                }
                var cachedResult = getFromTransactionCache(req.keys, req.trans["_cache"], req.cache === "clone");
                if (cachedResult) {
                  return DexiePromise.resolve(cachedResult);
                }
                return table.getMany(req).then(function(res) {
                  req.trans["_cache"] = {
                    keys: req.keys,
                    values: req.cache === "clone" ? deepClone(res) : res
                  };
                  return res;
                });
              }, mutate: function(req) {
                if (req.type !== "add")
                  req.trans["_cache"] = null;
                return table.mutate(req);
              } });
            }
          };
        }
      };
      function isCachableContext(ctx, table) {
        return ctx.trans.mode === "readonly" && !!ctx.subscr && !ctx.trans.explicit && ctx.trans.db._options.cache !== "disabled" && !table.schema.primaryKey.outbound;
      }
      function isCachableRequest(type2, req) {
        switch (type2) {
          case "query":
            return req.values && !req.unique;
          case "get":
            return false;
          case "getMany":
            return false;
          case "count":
            return false;
          case "openCursor":
            return false;
        }
      }
      var observabilityMiddleware = {
        stack: "dbcore",
        level: 0,
        name: "Observability",
        create: function(core) {
          var dbName = core.schema.name;
          var FULL_RANGE = new RangeSet2(core.MIN_KEY, core.MAX_KEY);
          return __assign(__assign({}, core), { transaction: function(stores, mode, options) {
            if (PSD.subscr && mode !== "readonly") {
              throw new exceptions.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(PSD.querier));
            }
            return core.transaction(stores, mode, options);
          }, table: function(tableName) {
            var table = core.table(tableName);
            var schema = table.schema;
            var primaryKey = schema.primaryKey, indexes = schema.indexes;
            var extractKey = primaryKey.extractKey, outbound = primaryKey.outbound;
            var indexesWithAutoIncPK = primaryKey.autoIncrement && indexes.filter(function(index) {
              return index.compound && index.keyPath.includes(primaryKey.keyPath);
            });
            var tableClone = __assign(__assign({}, table), { mutate: function(req) {
              var _a2, _b;
              var trans = req.trans;
              var mutatedParts = req.mutatedParts || (req.mutatedParts = {});
              var getRangeSet = function(indexName) {
                var part = "idb://".concat(dbName, "/").concat(tableName, "/").concat(indexName);
                return mutatedParts[part] || (mutatedParts[part] = new RangeSet2());
              };
              var pkRangeSet = getRangeSet("");
              var delsRangeSet = getRangeSet(":dels");
              var type2 = req.type;
              var _c = req.type === "deleteRange" ? [req.range] : req.type === "delete" ? [req.keys] : req.values.length < 50 ? [
                getEffectiveKeys(primaryKey, req).filter(function(id) {
                  return id;
                }),
                req.values
              ] : [], keys2 = _c[0], newObjs = _c[1];
              var oldCache = req.trans["_cache"];
              if (isArray(keys2)) {
                pkRangeSet.addKeys(keys2);
                var oldObjs = type2 === "delete" || keys2.length === newObjs.length ? getFromTransactionCache(keys2, oldCache) : null;
                if (!oldObjs) {
                  delsRangeSet.addKeys(keys2);
                }
                if (oldObjs || newObjs) {
                  trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs);
                }
              } else if (keys2) {
                var range = {
                  from: (_a2 = keys2.lower) !== null && _a2 !== void 0 ? _a2 : core.MIN_KEY,
                  to: (_b = keys2.upper) !== null && _b !== void 0 ? _b : core.MAX_KEY
                };
                delsRangeSet.add(range);
                pkRangeSet.add(range);
              } else {
                pkRangeSet.add(FULL_RANGE);
                delsRangeSet.add(FULL_RANGE);
                schema.indexes.forEach(function(idx) {
                  return getRangeSet(idx.name).add(FULL_RANGE);
                });
              }
              return table.mutate(req).then(function(res) {
                if (keys2 && (req.type === "add" || req.type === "put")) {
                  pkRangeSet.addKeys(res.results);
                  if (indexesWithAutoIncPK) {
                    indexesWithAutoIncPK.forEach(function(idx) {
                      var idxVals = req.values.map(function(v) {
                        return idx.extractKey(v);
                      });
                      var pkPos = idx.keyPath.findIndex(function(prop) {
                        return prop === primaryKey.keyPath;
                      });
                      for (var i = 0, len = res.results.length; i < len; ++i) {
                        idxVals[i][pkPos] = res.results[i];
                      }
                      getRangeSet(idx.name).addKeys(idxVals);
                    });
                  }
                }
                trans.mutatedParts = extendObservabilitySet(trans.mutatedParts || {}, mutatedParts);
                return res;
              });
            } });
            var getRange = function(_a2) {
              var _b, _c;
              var _d = _a2.query, index = _d.index, range = _d.range;
              return [
                index,
                new RangeSet2((_b = range.lower) !== null && _b !== void 0 ? _b : core.MIN_KEY, (_c = range.upper) !== null && _c !== void 0 ? _c : core.MAX_KEY)
              ];
            };
            var readSubscribers = {
              get: function(req) {
                return [primaryKey, new RangeSet2(req.key)];
              },
              getMany: function(req) {
                return [primaryKey, new RangeSet2().addKeys(req.keys)];
              },
              count: getRange,
              query: getRange,
              openCursor: getRange
            };
            keys(readSubscribers).forEach(function(method) {
              tableClone[method] = function(req) {
                var subscr = PSD.subscr;
                var isLiveQuery = !!subscr;
                var cachable = isCachableContext(PSD, table) && isCachableRequest(method, req);
                var obsSet = cachable ? req.obsSet = {} : subscr;
                if (isLiveQuery) {
                  var getRangeSet = function(indexName) {
                    var part = "idb://".concat(dbName, "/").concat(tableName, "/").concat(indexName);
                    return obsSet[part] || (obsSet[part] = new RangeSet2());
                  };
                  var pkRangeSet_1 = getRangeSet("");
                  var delsRangeSet_1 = getRangeSet(":dels");
                  var _a2 = readSubscribers[method](req), queriedIndex = _a2[0], queriedRanges = _a2[1];
                  if (method === "query" && queriedIndex.isPrimaryKey && !req.values) {
                    delsRangeSet_1.add(queriedRanges);
                  } else {
                    getRangeSet(queriedIndex.name || "").add(queriedRanges);
                  }
                  if (!queriedIndex.isPrimaryKey) {
                    if (method === "count") {
                      delsRangeSet_1.add(FULL_RANGE);
                    } else {
                      var keysPromise_1 = method === "query" && outbound && req.values && table.query(__assign(__assign({}, req), { values: false }));
                      return table[method].apply(this, arguments).then(function(res) {
                        if (method === "query") {
                          if (outbound && req.values) {
                            return keysPromise_1.then(function(_a3) {
                              var resultingKeys = _a3.result;
                              pkRangeSet_1.addKeys(resultingKeys);
                              return res;
                            });
                          }
                          var pKeys = req.values ? res.result.map(extractKey) : res.result;
                          if (req.values) {
                            pkRangeSet_1.addKeys(pKeys);
                          } else {
                            delsRangeSet_1.addKeys(pKeys);
                          }
                        } else if (method === "openCursor") {
                          var cursor_1 = res;
                          var wantValues_1 = req.values;
                          return cursor_1 && Object.create(cursor_1, {
                            key: {
                              get: function() {
                                delsRangeSet_1.addKey(cursor_1.primaryKey);
                                return cursor_1.key;
                              }
                            },
                            primaryKey: {
                              get: function() {
                                var pkey = cursor_1.primaryKey;
                                delsRangeSet_1.addKey(pkey);
                                return pkey;
                              }
                            },
                            value: {
                              get: function() {
                                wantValues_1 && pkRangeSet_1.addKey(cursor_1.primaryKey);
                                return cursor_1.value;
                              }
                            }
                          });
                        }
                        return res;
                      });
                    }
                  }
                }
                return table[method].apply(this, arguments);
              };
            });
            return tableClone;
          } });
        }
      };
      function trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs) {
        function addAffectedIndex(ix) {
          var rangeSet = getRangeSet(ix.name || "");
          function extractKey(obj) {
            return obj != null ? ix.extractKey(obj) : null;
          }
          var addKeyOrKeys = function(key3) {
            return ix.multiEntry && isArray(key3) ? key3.forEach(function(key4) {
              return rangeSet.addKey(key4);
            }) : rangeSet.addKey(key3);
          };
          (oldObjs || newObjs).forEach(function(_, i) {
            var oldKey = oldObjs && extractKey(oldObjs[i]);
            var newKey = newObjs && extractKey(newObjs[i]);
            if (cmp2(oldKey, newKey) !== 0) {
              if (oldKey != null)
                addKeyOrKeys(oldKey);
              if (newKey != null)
                addKeyOrKeys(newKey);
            }
          });
        }
        schema.indexes.forEach(addAffectedIndex);
      }
      function adjustOptimisticFromFailures(tblCache, req, res) {
        if (res.numFailures === 0)
          return req;
        if (req.type === "deleteRange") {
          return null;
        }
        var numBulkOps = req.keys ? req.keys.length : "values" in req && req.values ? req.values.length : 1;
        if (res.numFailures === numBulkOps) {
          return null;
        }
        var clone = __assign({}, req);
        if (isArray(clone.keys)) {
          clone.keys = clone.keys.filter(function(_, i) {
            return !(i in res.failures);
          });
        }
        if ("values" in clone && isArray(clone.values)) {
          clone.values = clone.values.filter(function(_, i) {
            return !(i in res.failures);
          });
        }
        return clone;
      }
      function isAboveLower(key3, range) {
        return range.lower === void 0 ? true : range.lowerOpen ? cmp2(key3, range.lower) > 0 : cmp2(key3, range.lower) >= 0;
      }
      function isBelowUpper(key3, range) {
        return range.upper === void 0 ? true : range.upperOpen ? cmp2(key3, range.upper) < 0 : cmp2(key3, range.upper) <= 0;
      }
      function isWithinRange(key3, range) {
        return isAboveLower(key3, range) && isBelowUpper(key3, range);
      }
      function applyOptimisticOps(result, req, ops, table, cacheEntry, immutable) {
        if (!ops || ops.length === 0)
          return result;
        var index = req.query.index;
        var multiEntry = index.multiEntry;
        var queryRange = req.query.range;
        var primaryKey = table.schema.primaryKey;
        var extractPrimKey = primaryKey.extractKey;
        var extractIndex = index.extractKey;
        var extractLowLevelIndex = (index.lowLevelIndex || index).extractKey;
        var finalResult = ops.reduce(function(result2, op) {
          var modifedResult = result2;
          var includedValues = [];
          if (op.type === "add" || op.type === "put") {
            var includedPKs = new RangeSet2();
            for (var i = op.values.length - 1; i >= 0; --i) {
              var value = op.values[i];
              var pk = extractPrimKey(value);
              if (includedPKs.hasKey(pk))
                continue;
              var key3 = extractIndex(value);
              if (multiEntry && isArray(key3) ? key3.some(function(k) {
                return isWithinRange(k, queryRange);
              }) : isWithinRange(key3, queryRange)) {
                includedPKs.addKey(pk);
                includedValues.push(value);
              }
            }
          }
          switch (op.type) {
            case "add": {
              var existingKeys_1 = new RangeSet2().addKeys(req.values ? result2.map(function(v) {
                return extractPrimKey(v);
              }) : result2);
              modifedResult = result2.concat(req.values ? includedValues.filter(function(v) {
                var key4 = extractPrimKey(v);
                if (existingKeys_1.hasKey(key4))
                  return false;
                existingKeys_1.addKey(key4);
                return true;
              }) : includedValues.map(function(v) {
                return extractPrimKey(v);
              }).filter(function(k) {
                if (existingKeys_1.hasKey(k))
                  return false;
                existingKeys_1.addKey(k);
                return true;
              }));
              break;
            }
            case "put": {
              var keySet_1 = new RangeSet2().addKeys(op.values.map(function(v) {
                return extractPrimKey(v);
              }));
              modifedResult = result2.filter(
                function(item) {
                  return !keySet_1.hasKey(req.values ? extractPrimKey(item) : item);
                }
              ).concat(
                req.values ? includedValues : includedValues.map(function(v) {
                  return extractPrimKey(v);
                })
              );
              break;
            }
            case "delete":
              var keysToDelete_1 = new RangeSet2().addKeys(op.keys);
              modifedResult = result2.filter(function(item) {
                return !keysToDelete_1.hasKey(req.values ? extractPrimKey(item) : item);
              });
              break;
            case "deleteRange":
              var range_1 = op.range;
              modifedResult = result2.filter(function(item) {
                return !isWithinRange(extractPrimKey(item), range_1);
              });
              break;
          }
          return modifedResult;
        }, result);
        if (finalResult === result)
          return result;
        var sorter = function(a, b) {
          return cmp2(extractLowLevelIndex(a), extractLowLevelIndex(b)) || cmp2(extractPrimKey(a), extractPrimKey(b));
        };
        finalResult.sort(req.direction === "prev" || req.direction === "prevunique" ? function(a, b) {
          return sorter(b, a);
        } : sorter);
        if (req.limit && req.limit < Infinity) {
          if (finalResult.length > req.limit) {
            finalResult.length = req.limit;
          } else if (result.length === req.limit && finalResult.length < req.limit) {
            cacheEntry.dirty = true;
          }
        }
        return immutable ? Object.freeze(finalResult) : finalResult;
      }
      function areRangesEqual(r1, r2) {
        return cmp2(r1.lower, r2.lower) === 0 && cmp2(r1.upper, r2.upper) === 0 && !!r1.lowerOpen === !!r2.lowerOpen && !!r1.upperOpen === !!r2.upperOpen;
      }
      function compareLowers(lower1, lower2, lowerOpen1, lowerOpen2) {
        if (lower1 === void 0)
          return lower2 !== void 0 ? -1 : 0;
        if (lower2 === void 0)
          return 1;
        var c = cmp2(lower1, lower2);
        if (c === 0) {
          if (lowerOpen1 && lowerOpen2)
            return 0;
          if (lowerOpen1)
            return 1;
          if (lowerOpen2)
            return -1;
        }
        return c;
      }
      function compareUppers(upper1, upper2, upperOpen1, upperOpen2) {
        if (upper1 === void 0)
          return upper2 !== void 0 ? 1 : 0;
        if (upper2 === void 0)
          return -1;
        var c = cmp2(upper1, upper2);
        if (c === 0) {
          if (upperOpen1 && upperOpen2)
            return 0;
          if (upperOpen1)
            return -1;
          if (upperOpen2)
            return 1;
        }
        return c;
      }
      function isSuperRange(r1, r2) {
        return compareLowers(r1.lower, r2.lower, r1.lowerOpen, r2.lowerOpen) <= 0 && compareUppers(r1.upper, r2.upper, r1.upperOpen, r2.upperOpen) >= 0;
      }
      function findCompatibleQuery(dbName, tableName, type2, req) {
        var _a2;
        var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
        if (!tblCache)
          return [];
        var queries = tblCache.queries[type2];
        if (!queries)
          return [null, false, tblCache, null];
        var indexName = req.query ? req.query.index.name : null;
        var entries = queries[indexName || ""];
        if (!entries)
          return [null, false, tblCache, null];
        switch (type2) {
          case "query":
            var reqDirection_1 = (_a2 = req.direction) !== null && _a2 !== void 0 ? _a2 : "next";
            var equalEntry = entries.find(function(entry) {
              var _a3;
              return entry.req.limit === req.limit && entry.req.values === req.values && ((_a3 = entry.req.direction) !== null && _a3 !== void 0 ? _a3 : "next") === reqDirection_1 && areRangesEqual(entry.req.query.range, req.query.range);
            });
            if (equalEntry)
              return [
                equalEntry,
                true,
                tblCache,
                entries
              ];
            var superEntry = entries.find(function(entry) {
              var _a3;
              var limit = "limit" in entry.req ? entry.req.limit : Infinity;
              return limit >= req.limit && ((_a3 = entry.req.direction) !== null && _a3 !== void 0 ? _a3 : "next") === reqDirection_1 && (req.values ? entry.req.values : true) && isSuperRange(entry.req.query.range, req.query.range);
            });
            return [superEntry, false, tblCache, entries];
          case "count":
            var countQuery = entries.find(function(entry) {
              return areRangesEqual(entry.req.query.range, req.query.range);
            });
            return [countQuery, !!countQuery, tblCache, entries];
        }
      }
      function subscribeToCacheEntry(cacheEntry, container, requery, signal) {
        cacheEntry.subscribers.add(requery);
        signal.addEventListener("abort", function() {
          cacheEntry.subscribers.delete(requery);
          if (cacheEntry.subscribers.size === 0) {
            enqueForDeletion(cacheEntry, container);
          }
        });
      }
      function enqueForDeletion(cacheEntry, container) {
        setTimeout(function() {
          if (cacheEntry.subscribers.size === 0) {
            delArrayItem(container, cacheEntry);
          }
        }, 3e3);
      }
      var cacheMiddleware = {
        stack: "dbcore",
        level: 0,
        name: "Cache",
        create: function(core) {
          var dbName = core.schema.name;
          var coreMW = __assign(__assign({}, core), { transaction: function(stores, mode, options) {
            var idbtrans = core.transaction(stores, mode, options);
            if (mode === "readwrite") {
              var ac_1 = new AbortController();
              var signal = ac_1.signal;
              var endTransaction = function(wasCommitted) {
                return function() {
                  ac_1.abort();
                  if (mode === "readwrite") {
                    var affectedSubscribers_1 = /* @__PURE__ */ new Set();
                    for (var _i = 0, stores_1 = stores; _i < stores_1.length; _i++) {
                      var storeName = stores_1[_i];
                      var tblCache = cache["idb://".concat(dbName, "/").concat(storeName)];
                      if (tblCache) {
                        var table = core.table(storeName);
                        var ops = tblCache.optimisticOps.filter(function(op) {
                          return op.trans === idbtrans;
                        });
                        if (idbtrans._explicit && wasCommitted && idbtrans.mutatedParts) {
                          for (var _a2 = 0, _b = Object.values(tblCache.queries.query); _a2 < _b.length; _a2++) {
                            var entries = _b[_a2];
                            for (var _c = 0, _d = entries.slice(); _c < _d.length; _c++) {
                              var entry = _d[_c];
                              if (obsSetsOverlap(entry.obsSet, idbtrans.mutatedParts)) {
                                delArrayItem(entries, entry);
                                entry.subscribers.forEach(function(requery) {
                                  return affectedSubscribers_1.add(requery);
                                });
                              }
                            }
                          }
                        } else if (ops.length > 0) {
                          tblCache.optimisticOps = tblCache.optimisticOps.filter(function(op) {
                            return op.trans !== idbtrans;
                          });
                          for (var _e = 0, _f = Object.values(tblCache.queries.query); _e < _f.length; _e++) {
                            var entries = _f[_e];
                            for (var _g = 0, _h = entries.slice(); _g < _h.length; _g++) {
                              var entry = _h[_g];
                              if (entry.res != null && idbtrans.mutatedParts) {
                                if (wasCommitted && !entry.dirty) {
                                  var freezeResults = Object.isFrozen(entry.res);
                                  var modRes = applyOptimisticOps(entry.res, entry.req, ops, table, entry, freezeResults);
                                  if (entry.dirty) {
                                    delArrayItem(entries, entry);
                                    entry.subscribers.forEach(function(requery) {
                                      return affectedSubscribers_1.add(requery);
                                    });
                                  } else if (modRes !== entry.res) {
                                    entry.res = modRes;
                                    entry.promise = DexiePromise.resolve({
                                      result: modRes
                                    });
                                  }
                                } else {
                                  if (entry.dirty) {
                                    delArrayItem(entries, entry);
                                  }
                                  entry.subscribers.forEach(function(requery) {
                                    return affectedSubscribers_1.add(requery);
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    affectedSubscribers_1.forEach(function(requery) {
                      return requery();
                    });
                  }
                };
              };
              idbtrans.addEventListener("abort", endTransaction(false), {
                signal
              });
              idbtrans.addEventListener("error", endTransaction(false), {
                signal
              });
              idbtrans.addEventListener("complete", endTransaction(true), {
                signal
              });
            }
            return idbtrans;
          }, table: function(tableName) {
            var downTable = core.table(tableName);
            var primKey = downTable.schema.primaryKey;
            var tableMW = __assign(__assign({}, downTable), { mutate: function(req) {
              var trans = PSD.trans;
              if (primKey.outbound || trans.db._options.cache === "disabled" || trans.explicit || trans.idbtrans.mode !== "readwrite") {
                return downTable.mutate(req);
              }
              var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
              if (!tblCache)
                return downTable.mutate(req);
              var promise = downTable.mutate(req);
              if ((req.type === "add" || req.type === "put") && (req.values.length >= 50 || getEffectiveKeys(primKey, req).some(function(key3) {
                return key3 == null;
              }))) {
                promise.then(function(res) {
                  var reqWithResolvedKeys = __assign(__assign({}, req), { values: req.values.map(function(value, i) {
                    var _a2;
                    if (res.failures[i])
                      return value;
                    var valueWithKey = ((_a2 = primKey.keyPath) === null || _a2 === void 0 ? void 0 : _a2.includes(".")) ? deepClone(value) : __assign({}, value);
                    setByKeyPath(valueWithKey, primKey.keyPath, res.results[i]);
                    return valueWithKey;
                  }) });
                  var adjustedReq = adjustOptimisticFromFailures(tblCache, reqWithResolvedKeys, res);
                  tblCache.optimisticOps.push(adjustedReq);
                  queueMicrotask(function() {
                    return req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                  });
                });
              } else {
                tblCache.optimisticOps.push(req);
                req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                promise.then(function(res) {
                  if (res.numFailures > 0) {
                    delArrayItem(tblCache.optimisticOps, req);
                    var adjustedReq = adjustOptimisticFromFailures(tblCache, req, res);
                    if (adjustedReq) {
                      tblCache.optimisticOps.push(adjustedReq);
                    }
                    req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                  }
                });
                promise.catch(function() {
                  delArrayItem(tblCache.optimisticOps, req);
                  req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                });
              }
              return promise;
            }, query: function(req) {
              var _a2;
              if (!isCachableContext(PSD, downTable) || !isCachableRequest("query", req))
                return downTable.query(req);
              var freezeResults = ((_a2 = PSD.trans) === null || _a2 === void 0 ? void 0 : _a2.db._options.cache) === "immutable";
              var _b = PSD, requery = _b.requery, signal = _b.signal;
              var _c = findCompatibleQuery(dbName, tableName, "query", req), cacheEntry = _c[0], exactMatch = _c[1], tblCache = _c[2], container = _c[3];
              if (cacheEntry && exactMatch) {
                cacheEntry.obsSet = req.obsSet;
              } else {
                var promise = downTable.query(req).then(function(res) {
                  var result = res.result;
                  if (cacheEntry)
                    cacheEntry.res = result;
                  if (freezeResults) {
                    for (var i = 0, l = result.length; i < l; ++i) {
                      Object.freeze(result[i]);
                    }
                    Object.freeze(result);
                  }
                  return res;
                }).catch(function(error) {
                  if (container && cacheEntry)
                    delArrayItem(container, cacheEntry);
                  return Promise.reject(error);
                });
                cacheEntry = {
                  obsSet: req.obsSet,
                  promise,
                  subscribers: /* @__PURE__ */ new Set(),
                  type: "query",
                  req,
                  dirty: false
                };
                if (container) {
                  container.push(cacheEntry);
                } else {
                  container = [cacheEntry];
                  if (!tblCache) {
                    tblCache = cache["idb://".concat(dbName, "/").concat(tableName)] = {
                      queries: {
                        query: {},
                        count: {}
                      },
                      objs: /* @__PURE__ */ new Map(),
                      optimisticOps: [],
                      unsignaledParts: {}
                    };
                  }
                  tblCache.queries.query[req.query.index.name || ""] = container;
                }
              }
              subscribeToCacheEntry(cacheEntry, container, requery, signal);
              return cacheEntry.promise.then(function(res) {
                var result = applyOptimisticOps(res.result, req, tblCache === null || tblCache === void 0 ? void 0 : tblCache.optimisticOps, downTable, cacheEntry, freezeResults);
                return {
                  result: freezeResults ? result : deepClone(result)
                };
              });
            } });
            return tableMW;
          } });
          return coreMW;
        }
      };
      function vipify(target, vipDb) {
        return new Proxy(target, {
          get: function(target2, prop, receiver) {
            if (prop === "db")
              return vipDb;
            return Reflect.get(target2, prop, receiver);
          }
        });
      }
      var Dexie$1 = function() {
        function Dexie3(name, options) {
          var _this = this;
          this._middlewares = {};
          this.verno = 0;
          var deps = Dexie3.dependencies;
          this._options = options = __assign({
            addons: Dexie3.addons,
            autoOpen: true,
            indexedDB: deps.indexedDB,
            IDBKeyRange: deps.IDBKeyRange,
            cache: "cloned",
            maxConnections: DEFAULT_MAX_CONNECTIONS
          }, options);
          this._deps = {
            indexedDB: options.indexedDB,
            IDBKeyRange: options.IDBKeyRange
          };
          var addons = options.addons;
          this._dbSchema = {};
          this._versions = [];
          this._storeNames = [];
          this._allTables = {};
          this.idbdb = null;
          this._novip = this;
          var state = {
            dbOpenError: null,
            isBeingOpened: false,
            onReadyBeingFired: null,
            openComplete: false,
            dbReadyResolve: nop,
            dbReadyPromise: null,
            cancelOpen: nop,
            openCanceller: null,
            autoSchema: true,
            PR1398_maxLoop: 3,
            autoOpen: options.autoOpen
          };
          state.dbReadyPromise = new DexiePromise(function(resolve) {
            state.dbReadyResolve = resolve;
          });
          state.openCanceller = new DexiePromise(function(_, reject) {
            state.cancelOpen = reject;
          });
          this._state = state;
          this.name = name;
          this.on = Events(this, "populate", "blocked", "versionchange", "close", {
            ready: [promisableChain, nop]
          });
          this.once = function(event, callback) {
            var fn = function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              _this.on(event).unsubscribe(fn);
              callback.apply(_this, args);
            };
            return _this.on(event, fn);
          };
          this.on.ready.subscribe = override(this.on.ready.subscribe, function(subscribe) {
            return function(subscriber, bSticky) {
              Dexie3.vip(function() {
                var state2 = _this._state;
                if (state2.openComplete) {
                  if (!state2.dbOpenError)
                    DexiePromise.resolve().then(subscriber);
                  if (bSticky)
                    subscribe(subscriber);
                } else if (state2.onReadyBeingFired) {
                  state2.onReadyBeingFired.push(subscriber);
                  if (bSticky)
                    subscribe(subscriber);
                } else {
                  subscribe(subscriber);
                  var db_1 = _this;
                  if (!bSticky)
                    subscribe(function unsubscribe() {
                      db_1.on.ready.unsubscribe(subscriber);
                      db_1.on.ready.unsubscribe(unsubscribe);
                    });
                }
              });
            };
          });
          this.Collection = createCollectionConstructor(this);
          this.Table = createTableConstructor(this);
          this.Transaction = createTransactionConstructor(this);
          this.Version = createVersionConstructor(this);
          this.WhereClause = createWhereClauseConstructor(this);
          this.on("versionchange", function(ev) {
            if (ev.newVersion > 0)
              console.warn("Another connection wants to upgrade database '".concat(_this.name, "'. Closing db now to resume the upgrade."));
            else
              console.warn("Another connection wants to delete database '".concat(_this.name, "'. Closing db now to resume the delete request."));
            _this.close({ disableAutoOpen: false });
          });
          this.on("blocked", function(ev) {
            if (!ev.newVersion || ev.newVersion < ev.oldVersion)
              console.warn("Dexie.delete('".concat(_this.name, "') was blocked"));
            else
              console.warn("Upgrade '".concat(_this.name, "' blocked by other connection holding version ").concat(ev.oldVersion / 10));
          });
          this._maxKey = getMaxKey(options.IDBKeyRange);
          this._createTransaction = function(mode, storeNames, dbschema, parentTransaction) {
            return new _this.Transaction(mode, storeNames, dbschema, _this._options.chromeTransactionDurability, parentTransaction);
          };
          this._fireOnBlocked = function(ev) {
            _this.on("blocked").fire(ev);
            connections.toArray().filter(function(c) {
              return c.name === _this.name && c !== _this && !c._state.vcFired;
            }).map(function(c) {
              return c.on("versionchange").fire(ev);
            });
          };
          this.use(cacheExistingValuesMiddleware);
          this.use(cacheMiddleware);
          this.use(observabilityMiddleware);
          this.use(virtualIndexMiddleware);
          this.use(hooksMiddleware);
          var vipDB = new Proxy(this, {
            get: function(_, prop, receiver) {
              if (prop === "_vip")
                return true;
              if (prop === "table")
                return function(tableName) {
                  return vipify(_this.table(tableName), vipDB);
                };
              var rv = Reflect.get(_, prop, receiver);
              if (rv instanceof Table)
                return vipify(rv, vipDB);
              if (prop === "tables")
                return rv.map(function(t) {
                  return vipify(t, vipDB);
                });
              if (prop === "_createTransaction")
                return function() {
                  var tx = rv.apply(this, arguments);
                  return vipify(tx, vipDB);
                };
              return rv;
            }
          });
          this.vip = vipDB;
          addons.forEach(function(addon) {
            return addon(_this);
          });
        }
        Dexie3.prototype.version = function(versionNumber) {
          if (isNaN(versionNumber) || versionNumber < 0.1)
            throw new exceptions.Type("Given version is not a positive number");
          versionNumber = Math.round(versionNumber * 10) / 10;
          if (this.idbdb || this._state.isBeingOpened)
            throw new exceptions.Schema("Cannot add version when database is open");
          this.verno = Math.max(this.verno, versionNumber);
          var versions = this._versions;
          var versionInstance = versions.filter(function(v) {
            return v._cfg.version === versionNumber;
          })[0];
          if (versionInstance)
            return versionInstance;
          versionInstance = new this.Version(versionNumber);
          versions.push(versionInstance);
          versions.sort(lowerVersionFirst);
          versionInstance.stores({});
          this._state.autoSchema = false;
          return versionInstance;
        };
        Dexie3.prototype._whenReady = function(fn) {
          var _this = this;
          return this.idbdb && (this._state.openComplete || PSD.letThrough || this._vip) ? fn() : new DexiePromise(function(resolve, reject) {
            if (_this._state.openComplete) {
              return reject(new exceptions.DatabaseClosed(_this._state.dbOpenError));
            }
            if (!_this._state.isBeingOpened) {
              if (!_this._state.autoOpen) {
                reject(new exceptions.DatabaseClosed());
                return;
              }
              _this.open().catch(nop);
            }
            _this._state.dbReadyPromise.then(resolve, reject);
          }).then(fn);
        };
        Dexie3.prototype.use = function(_a2) {
          var stack = _a2.stack, create = _a2.create, level = _a2.level, name = _a2.name;
          if (name)
            this.unuse({ stack, name });
          var middlewares = this._middlewares[stack] || (this._middlewares[stack] = []);
          middlewares.push({
            stack,
            create,
            level: level == null ? 10 : level,
            name
          });
          middlewares.sort(function(a, b) {
            return a.level - b.level;
          });
          return this;
        };
        Dexie3.prototype.unuse = function(_a2) {
          var stack = _a2.stack, name = _a2.name, create = _a2.create;
          if (stack && this._middlewares[stack]) {
            this._middlewares[stack] = this._middlewares[stack].filter(function(mw) {
              return create ? mw.create !== create : name ? mw.name !== name : false;
            });
          }
          return this;
        };
        Dexie3.prototype.open = function() {
          var _this = this;
          return usePSD(
            globalPSD,
            function() {
              return dexieOpen(_this);
            }
          );
        };
        Dexie3.prototype._close = function() {
          this.on.close.fire(new CustomEvent("close"));
          var state = this._state;
          connections.remove(this);
          if (this.idbdb) {
            try {
              this.idbdb.close();
            } catch (e) {
            }
            this.idbdb = null;
          }
          if (!state.isBeingOpened) {
            state.dbReadyPromise = new DexiePromise(function(resolve) {
              state.dbReadyResolve = resolve;
            });
            state.openCanceller = new DexiePromise(function(_, reject) {
              state.cancelOpen = reject;
            });
          }
        };
        Dexie3.prototype.close = function(_a2) {
          var _b = _a2 === void 0 ? { disableAutoOpen: true } : _a2, disableAutoOpen = _b.disableAutoOpen;
          var state = this._state;
          if (disableAutoOpen) {
            if (state.isBeingOpened) {
              state.cancelOpen(new exceptions.DatabaseClosed());
            }
            this._close();
            state.autoOpen = false;
            state.dbOpenError = new exceptions.DatabaseClosed();
          } else {
            this._close();
            state.autoOpen = this._options.autoOpen || state.isBeingOpened;
            state.openComplete = false;
            state.dbOpenError = null;
          }
        };
        Dexie3.prototype.delete = function(closeOptions) {
          var _this = this;
          if (closeOptions === void 0) {
            closeOptions = { disableAutoOpen: true };
          }
          var hasInvalidArguments = arguments.length > 0 && typeof arguments[0] !== "object";
          var state = this._state;
          return new DexiePromise(function(resolve, reject) {
            var doDelete = function() {
              _this.close(closeOptions);
              var req = _this._deps.indexedDB.deleteDatabase(_this.name);
              req.onsuccess = wrap(function() {
                _onDatabaseDeleted(_this._deps, _this.name);
                resolve();
              });
              req.onerror = eventRejectHandler(reject);
              req.onblocked = _this._fireOnBlocked;
            };
            if (hasInvalidArguments)
              throw new exceptions.InvalidArgument("Invalid closeOptions argument to db.delete()");
            if (state.isBeingOpened) {
              state.dbReadyPromise.then(doDelete);
            } else {
              doDelete();
            }
          });
        };
        Dexie3.prototype.backendDB = function() {
          return this.idbdb;
        };
        Dexie3.prototype.isOpen = function() {
          return this.idbdb !== null;
        };
        Dexie3.prototype.hasBeenClosed = function() {
          var dbOpenError = this._state.dbOpenError;
          return dbOpenError && dbOpenError.name === "DatabaseClosed";
        };
        Dexie3.prototype.hasFailed = function() {
          return this._state.dbOpenError !== null;
        };
        Dexie3.prototype.dynamicallyOpened = function() {
          return this._state.autoSchema;
        };
        Object.defineProperty(Dexie3.prototype, "tables", {
          get: function() {
            var _this = this;
            return keys(this._allTables).map(function(name) {
              return _this._allTables[name];
            });
          },
          enumerable: false,
          configurable: true
        });
        Dexie3.prototype.transaction = function() {
          var args = extractTransactionArgs.apply(this, arguments);
          return this._transaction.apply(this, args);
        };
        Dexie3.prototype._transaction = function(mode, tables, scopeFunc) {
          var _this = this;
          var parentTransaction = PSD.trans;
          if (!parentTransaction || parentTransaction.db !== this || mode.indexOf("!") !== -1)
            parentTransaction = null;
          var onlyIfCompatible = mode.indexOf("?") !== -1;
          mode = mode.replace("!", "").replace("?", "");
          var idbMode, storeNames;
          try {
            storeNames = tables.map(function(table) {
              var storeName = table instanceof _this.Table ? table.name : table;
              if (typeof storeName !== "string")
                throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
              return storeName;
            });
            if (mode == "r" || mode === READONLY)
              idbMode = READONLY;
            else if (mode == "rw" || mode == READWRITE)
              idbMode = READWRITE;
            else
              throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
            if (parentTransaction) {
              if (parentTransaction.mode === READONLY && idbMode === READWRITE) {
                if (onlyIfCompatible) {
                  parentTransaction = null;
                } else
                  throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
              }
              if (parentTransaction) {
                storeNames.forEach(function(storeName) {
                  if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                    if (onlyIfCompatible) {
                      parentTransaction = null;
                    } else
                      throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
                  }
                });
              }
              if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
                parentTransaction = null;
              }
            }
          } catch (e) {
            return parentTransaction ? parentTransaction._promise(null, function(_, reject) {
              reject(e);
            }) : rejection(e);
          }
          var enterTransaction = enterTransactionScope.bind(null, this, idbMode, storeNames, parentTransaction, scopeFunc);
          return parentTransaction ? parentTransaction._promise(idbMode, enterTransaction, "lock") : PSD.trans ? usePSD(PSD.transless, function() {
            return _this._whenReady(enterTransaction);
          }) : this._whenReady(enterTransaction);
        };
        Dexie3.prototype.table = function(tableName) {
          if (!hasOwn(this._allTables, tableName)) {
            throw new exceptions.InvalidTable("Table ".concat(tableName, " does not exist"));
          }
          return this._allTables[tableName];
        };
        return Dexie3;
      }();
      var symbolObservable = typeof Symbol !== "undefined" && "observable" in Symbol ? Symbol.observable : "@@observable";
      var Observable = function() {
        function Observable2(subscribe) {
          this._subscribe = subscribe;
        }
        Observable2.prototype.subscribe = function(x, error, complete) {
          return this._subscribe(!x || typeof x === "function" ? { next: x, error, complete } : x);
        };
        Observable2.prototype[symbolObservable] = function() {
          return this;
        };
        return Observable2;
      }();
      var domDeps;
      try {
        domDeps = {
          indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
          IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
        };
      } catch (e) {
        domDeps = { indexedDB: null, IDBKeyRange: null };
      }
      function liveQuery2(querier) {
        var hasValue = false;
        var currentValue;
        var observable = new Observable(function(observer) {
          var scopeFuncIsAsync = isAsyncFunction(querier);
          function execute(ctx) {
            var wasRootExec = beginMicroTickScope();
            try {
              if (scopeFuncIsAsync) {
                incrementExpectedAwaits();
              }
              var rv = newScope(querier, ctx);
              if (scopeFuncIsAsync) {
                rv = rv.finally(decrementExpectedAwaits);
              }
              return rv;
            } finally {
              wasRootExec && endMicroTickScope();
            }
          }
          var closed = false;
          var abortController;
          var accumMuts = {};
          var currentObs = {};
          var subscription = {
            get closed() {
              return closed;
            },
            unsubscribe: function() {
              if (closed)
                return;
              closed = true;
              if (abortController)
                abortController.abort();
              if (startedListening)
                globalEvents.storagemutated.unsubscribe(mutationListener);
            }
          };
          observer.start && observer.start(subscription);
          var startedListening = false;
          var doQuery = function() {
            return execInGlobalContext(_doQuery);
          };
          function shouldNotify() {
            return obsSetsOverlap(currentObs, accumMuts);
          }
          var mutationListener = function(parts) {
            extendObservabilitySet(accumMuts, parts);
            if (shouldNotify()) {
              doQuery();
            }
          };
          var _doQuery = function() {
            if (closed || !domDeps.indexedDB) {
              return;
            }
            accumMuts = {};
            var subscr = {};
            if (abortController)
              abortController.abort();
            abortController = new AbortController();
            var ctx = {
              subscr,
              signal: abortController.signal,
              requery: doQuery,
              querier,
              trans: null
            };
            var ret = execute(ctx);
            if (!startedListening) {
              globalEvents.storagemutated.subscribe(mutationListener);
              startedListening = true;
            }
            Promise.resolve(ret).then(function(result) {
              hasValue = true;
              currentValue = result;
              if (closed || ctx.signal.aborted) {
                return;
              }
              if (shouldNotify()) {
                doQuery();
              } else {
                currentObs = subscr;
                if (shouldNotify()) {
                  doQuery();
                } else {
                  accumMuts = {};
                  execInGlobalContext(function() {
                    return !closed && observer.next && observer.next(result);
                  });
                }
              }
            }, function(err) {
              hasValue = false;
              if (!["DatabaseClosedError", "AbortError"].includes(err === null || err === void 0 ? void 0 : err.name)) {
                if (!closed)
                  execInGlobalContext(function() {
                    if (closed)
                      return;
                    observer.error && observer.error(err);
                  });
              }
            });
          };
          setTimeout(doQuery, 0);
          return subscription;
        });
        observable.hasValue = function() {
          return hasValue;
        };
        observable.getValue = function() {
          return currentValue;
        };
        return observable;
      }
      var Dexie2 = Dexie$1;
      props(Dexie2, __assign(__assign({}, fullNameExceptions), {
        delete: function(databaseName) {
          var db = new Dexie2(databaseName, { addons: [] });
          return db.delete();
        },
        exists: function(name) {
          return new Dexie2(name, { addons: [] }).open().then(function(db) {
            db.close();
            return true;
          }).catch("NoSuchDatabaseError", function() {
            return false;
          });
        },
        getDatabaseNames: function(cb) {
          try {
            return getDatabaseNames(Dexie2.dependencies).then(cb);
          } catch (_a2) {
            return rejection(new exceptions.MissingAPI());
          }
        },
        defineClass: function() {
          function Class(content) {
            extend(this, content);
          }
          return Class;
        },
        ignoreTransaction: function(scopeFunc) {
          return PSD.trans ? usePSD(PSD.transless || globalPSD, scopeFunc) : scopeFunc();
        },
        vip,
        async: function(generatorFn) {
          return function() {
            try {
              var rv = awaitIterator(generatorFn.apply(this, arguments));
              if (!rv || typeof rv.then !== "function")
                return DexiePromise.resolve(rv);
              return rv;
            } catch (e) {
              return rejection(e);
            }
          };
        },
        spawn: function(generatorFn, args, thiz) {
          try {
            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== "function")
              return DexiePromise.resolve(rv);
            return rv;
          } catch (e) {
            return rejection(e);
          }
        },
        currentTransaction: {
          get: function() {
            return PSD.trans || null;
          }
        },
        waitFor: function(promiseOrFunction, optionalTimeout) {
          var promise = DexiePromise.resolve(typeof promiseOrFunction === "function" ? Dexie2.ignoreTransaction(promiseOrFunction) : promiseOrFunction).timeout(optionalTimeout || 6e4);
          return PSD.trans ? PSD.trans.waitFor(promise) : promise;
        },
        Promise: DexiePromise,
        debug: {
          get: function() {
            return debug;
          },
          set: function(value) {
            setDebug(value);
          }
        },
        derive,
        extend,
        props,
        override,
        Events,
        on: globalEvents,
        liveQuery: liveQuery2,
        extendObservabilitySet,
        getByKeyPath,
        setByKeyPath,
        delByKeyPath,
        shallowClone,
        deepClone,
        getObjectDiff,
        cmp: cmp2,
        asap: asap$1,
        minKey,
        addons: [],
        connections: {
          get: connections.toArray
        },
        errnames,
        dependencies: domDeps,
        cache,
        semVer: DEXIE_VERSION,
        version: DEXIE_VERSION.split(".").map(function(n) {
          return parseInt(n);
        }).reduce(function(p, c, i) {
          return p + c / Math.pow(10, i * 2);
        })
      }));
      Dexie2.maxKey = getMaxKey(Dexie2.dependencies.IDBKeyRange);
      if (typeof dispatchEvent !== "undefined" && typeof addEventListener !== "undefined") {
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, function(updatedParts) {
          if (!propagatingLocally) {
            var event_1;
            event_1 = new CustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, {
              detail: updatedParts
            });
            propagatingLocally = true;
            dispatchEvent(event_1);
            propagatingLocally = false;
          }
        });
        addEventListener(STORAGE_MUTATED_DOM_EVENT_NAME, function(_a2) {
          var detail = _a2.detail;
          if (!propagatingLocally) {
            propagateLocally(detail);
          }
        });
      }
      function propagateLocally(updateParts) {
        var wasMe = propagatingLocally;
        try {
          propagatingLocally = true;
          globalEvents.storagemutated.fire(updateParts);
          signalSubscribersNow(updateParts, true);
        } finally {
          propagatingLocally = wasMe;
        }
      }
      var propagatingLocally = false;
      var bc;
      var createBC = function() {
      };
      if (typeof BroadcastChannel !== "undefined") {
        createBC = function() {
          bc = new BroadcastChannel(STORAGE_MUTATED_DOM_EVENT_NAME);
          bc.onmessage = function(ev) {
            return ev.data && propagateLocally(ev.data);
          };
        };
        createBC();
        if (typeof bc.unref === "function") {
          bc.unref();
        }
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, function(changedParts) {
          if (!propagatingLocally) {
            bc.postMessage(changedParts);
          }
        });
      }
      if (typeof addEventListener !== "undefined") {
        addEventListener("pagehide", function(event) {
          if (!Dexie$1.disableBfCache && event.persisted) {
            if (debug)
              console.debug("Dexie: handling persisted pagehide");
            bc === null || bc === void 0 ? void 0 : bc.close();
            for (var _i = 0, _a2 = connections.toArray(); _i < _a2.length; _i++) {
              var db = _a2[_i];
              db.close({ disableAutoOpen: false });
            }
          }
        });
        addEventListener("pageshow", function(event) {
          if (!Dexie$1.disableBfCache && event.persisted) {
            if (debug)
              console.debug("Dexie: handling persisted pageshow");
            createBC();
            propagateLocally({ all: new RangeSet2(-Infinity, [[]]) });
          }
        });
      }
      function add2(value) {
        return new PropModification2({ add: value });
      }
      function remove2(value) {
        return new PropModification2({ remove: value });
      }
      function replacePrefix2(a, b) {
        return new PropModification2({ replacePrefix: [a, b] });
      }
      DexiePromise.rejectionMapper = mapError;
      setDebug(debug);
      var namedExports = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        DEFAULT_MAX_CONNECTIONS,
        Dexie: Dexie$1,
        Entity: Entity2,
        PropModification: PropModification2,
        RangeSet: RangeSet2,
        add: add2,
        cmp: cmp2,
        default: Dexie$1,
        liveQuery: liveQuery2,
        mergeRanges: mergeRanges2,
        rangesOverlap: rangesOverlap2,
        remove: remove2,
        replacePrefix: replacePrefix2
      });
      __assign(Dexie$1, namedExports, { default: Dexie$1 });
      return Dexie$1;
    });
  }
});

// node_modules/.pnpm/lz-string@1.5.0/node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "node_modules/.pnpm/lz-string@1.5.0/node_modules/lz-string/libs/lz-string.js"(exports, module2) {
    var LZString2 = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString3 = {
        compressToBase64: function(input) {
          if (input == null) return "";
          var res = LZString3._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            // To produce valid Base64
            default:
            // When could this happen ?
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          return LZString3._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null) return "";
          return LZString3._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString3._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString3.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString3.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString3.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null) return "";
          return LZString3._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          input = input.replace(/ /g, "+");
          return LZString3._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString3._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null) return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString3._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (next = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString3;
    }();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString2;
      });
    } else if (typeof module2 !== "undefined" && module2 != null) {
      module2.exports = LZString2;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString2;
      });
    }
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => XDAttachmentManagerPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian14 = require("obsidian");

// src/constants.ts
var ASSETS_ROOT = "Assets";
var META_ROOT = `${ASSETS_ROOT}/.attachment-meta`;
var META_SCHEMA_VERSION = 2;
var DATABASE_SCHEMA_VERSION = 3;
var REFERENCE_INDEX_VERSION = 2;
var DEFAULT_EMPTY_FOLDER_DEBOUNCE_MS = 800;
var DEFAULT_LINK_FORMAT = "wiki";
var LEGACY_PLUGIN_IDS = [
  "attachment-management",
  "image-converter",
  "janitor",
  "empty-folder-cleaner"
];
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
  "avif",
  "bmp",
  "gif",
  "heic",
  "ico",
  "jpeg",
  "jpg",
  "png",
  "svg",
  "tif",
  "tiff",
  "webp"
]);
var EMBEDDABLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ...IMAGE_EXTENSIONS,
  "aac",
  "flac",
  "m4a",
  "m4v",
  "mkv",
  "mov",
  "mp3",
  "mp4",
  "oga",
  "ogg",
  "ogv",
  "opus",
  "pdf",
  "wav",
  "webm"
]);

// src/utils/path.ts
var INVALID_FILENAME_CHARS = /[\\/:*?"<>|]/g;
var SIZE_TOKEN = /^\d+(?:px)?(?:x\d+(?:px)?)?$/i;
function normalizeVaultPath(path) {
  const segments = [];
  for (const segment of path.replace(/\\/g, "/").replace(/^\/+/, "").split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") segments.pop();
    else segments.push(segment);
  }
  return segments.join("/");
}
function dirname(path) {
  const normalized = normalizeVaultPath(path);
  const index = normalized.lastIndexOf("/");
  return index < 0 ? "" : normalized.slice(0, index);
}
function basename(path) {
  const normalized = normalizeVaultPath(path);
  return normalized.slice(normalized.lastIndexOf("/") + 1);
}
function extension(path) {
  const name = basename(path);
  const index = name.lastIndexOf(".");
  return index < 0 ? "" : name.slice(index + 1).toLowerCase();
}
function removeExtension(path) {
  const name = basename(path);
  if (name.toLowerCase().endsWith(".excalidraw.md")) {
    return name.slice(0, -".excalidraw.md".length);
  }
  const index = name.lastIndexOf(".");
  return index < 0 ? name : name.slice(0, index);
}
function sanitizeFilename(value, fallback = "Attachment") {
  const sanitized = value.replace(INVALID_FILENAME_CHARS, "_").replace(/[. ]+$/g, "").trim();
  return sanitized || fallback;
}
function isInsideAssets(path) {
  const normalized = normalizeVaultPath(path);
  return normalized === ASSETS_ROOT || normalized.startsWith(`${ASSETS_ROOT}/`);
}
function isInsideMeta(path) {
  const normalized = normalizeVaultPath(path);
  return normalized === META_ROOT || normalized.startsWith(`${META_ROOT}/`);
}
function isAttachmentPath(path) {
  return isInsideAssets(path) && !isInsideMeta(path);
}
function isNotePath(path) {
  if (isInsideAssets(path) || isInsideMeta(path)) return false;
  const lower = normalizeVaultPath(path).toLowerCase();
  return lower.endsWith(".md") || lower.endsWith(".canvas");
}
function isReferenceContainerPath(path) {
  if (isInsideMeta(path)) return false;
  if (isInsideAssets(path)) return isVisualSourcePath(path);
  return isNotePath(path);
}
function assetsRelativePath(path) {
  const normalized = normalizeVaultPath(path);
  return normalized === ASSETS_ROOT ? "" : normalized.slice(`${ASSETS_ROOT}/`.length);
}
function noteAssetsFolderName(noteBasename, suffix) {
  const base = `NoteAssets_${sanitizeFilename(noteBasename, "Note")}`;
  return suffix ? `${base}_${suffix}` : base;
}
function isVisualSourcePath(path) {
  const lower = path.toLowerCase();
  return lower.endsWith(".canvas") || lower.endsWith(".excalidraw.md");
}
function isPlainMarkdownPath(path) {
  const lower = path.toLowerCase();
  return lower.endsWith(".md") && !lower.endsWith(".excalidraw.md");
}
function isSizeToken(value) {
  return SIZE_TOKEN.test(value.trim());
}
function pathEquals(a, b) {
  return normalizeVaultPath(a).toLowerCase() === normalizeVaultPath(b).toLowerCase();
}
function pathStartsWith(path, parent) {
  const normalizedPath = normalizeVaultPath(path).toLowerCase();
  const normalizedParent = normalizeVaultPath(parent).toLowerCase();
  return normalizedPath === normalizedParent || normalizedPath.startsWith(`${normalizedParent}/`);
}
function encodeMarkdownDestination(path, preserveEncoding) {
  return preserveEncoding ? encodeURI(path).replace(/#/g, "%23") : path;
}

// node_modules/.pnpm/dexie@4.4.4/node_modules/dexie/import-wrapper.mjs
var import_dexie = __toESM(require_dexie(), 1);
var DexieSymbol = Symbol.for("Dexie");
var Dexie = globalThis[DexieSymbol] || (globalThis[DexieSymbol] = import_dexie.default);
if (import_dexie.default.semVer !== Dexie.semVer) {
  throw new Error(`Two different versions of Dexie loaded in the same app: ${import_dexie.default.semVer} and ${Dexie.semVer}`);
}
var {
  liveQuery,
  mergeRanges,
  rangesOverlap,
  RangeSet,
  cmp,
  Entity,
  PropModification,
  replacePrefix,
  add,
  remove,
  DexieYProvider
} = Dexie;
var import_wrapper_default = Dexie;

// src/utils/id.ts
function createId(prefix) {
  var _a, _b, _c;
  const random = (_c = (_b = (_a = globalThis.crypto) == null ? void 0 : _a.randomUUID) == null ? void 0 : _b.call(_a)) != null ? _c : fallbackRandomId();
  return `${prefix}_${random.replace(/-/g, "")}`;
}
function shortId(id, length = 6) {
  const compact = id.replace(/[^a-zA-Z0-9]/g, "");
  return compact.slice(-length).toLowerCase().padEnd(length, "0");
}
function stableHash(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}
function fallbackRandomId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 14);
  return `${timestamp}${random}`;
}

// src/data/repository.ts
var INDEX_STORES = {
  notes: "id, &path, kind, role, mtime",
  assets: "id, &path, ownerNoteId, state, groupId",
  folders: "id, &path, kind, ownerNoteId, groupId",
  references: "id, assetPath, noteId, notePath, containerRole, [assetPath+noteId]",
  groups: "id, &rootPath, &sourcePath, ownerNoteId",
  groupMembers: "id, groupId, assetId, path, [groupId+assetId]",
  operations: "id, status, updatedAt"
};
var AttachmentDexie = class extends import_wrapper_default {
  constructor(name) {
    super(name);
    __publicField(this, "notes");
    __publicField(this, "assets");
    __publicField(this, "folders");
    __publicField(this, "references");
    __publicField(this, "groups");
    __publicField(this, "groupMembers");
    __publicField(this, "operations");
    __publicField(this, "visualPreviews");
    this.version(1).stores(INDEX_STORES);
    this.version(DATABASE_SCHEMA_VERSION).stores({
      ...INDEX_STORES,
      visualPreviews: "id, noteId, sourcePath, lastAccessedAt"
    });
  }
};
var DexieAttachmentRepository = class {
  constructor(vaultKey) {
    __publicField(this, "persistent", true);
    __publicField(this, "database");
    this.database = new AttachmentDexie(`xd-attachment-manager-${stableHash(vaultKey)}`);
  }
  async open() {
    await this.database.open();
  }
  close() {
    this.database.close();
  }
  async snapshot() {
    const [notes, assets, folders, references, groups, groupMembers, operations] = await Promise.all([
      this.database.notes.toArray(),
      this.database.assets.toArray(),
      this.database.folders.toArray(),
      this.database.references.toArray(),
      this.database.groups.toArray(),
      this.database.groupMembers.toArray(),
      this.database.operations.toArray()
    ]);
    return { notes, assets, folders, references, groups, groupMembers, operations };
  }
  async putNote(record) {
    await this.database.notes.put(record);
  }
  async deleteNote(id) {
    await this.database.notes.delete(id);
  }
  async putAsset(record) {
    await this.database.assets.put(record);
  }
  async deleteAsset(id) {
    await this.database.assets.delete(id);
  }
  async putFolder(record) {
    await this.database.folders.put(record);
  }
  async deleteFolder(id) {
    await this.database.folders.delete(id);
  }
  async putGroup(record) {
    await this.database.groups.put(record);
  }
  async deleteGroup(id) {
    await this.database.groups.delete(id);
  }
  async replaceReferencesForNote(noteId, records) {
    await this.database.transaction("rw", this.database.references, async () => {
      await this.database.references.where("noteId").equals(noteId).delete();
      if (records.length > 0) {
        await this.database.references.bulkPut(records);
      }
    });
  }
  async replaceGroupMembers(groupId, records) {
    await this.database.transaction("rw", this.database.groupMembers, async () => {
      await this.database.groupMembers.where("groupId").equals(groupId).delete();
      if (records.length > 0) {
        await this.database.groupMembers.bulkPut(records);
      }
    });
  }
  async putOperation(record) {
    await this.database.operations.put(record);
  }
  async deleteOperation(id) {
    await this.database.operations.delete(id);
  }
  async getVisualPreview(id) {
    var _a;
    return (_a = await this.database.visualPreviews.get(id)) != null ? _a : null;
  }
  async putVisualPreview(record) {
    await this.database.visualPreviews.put(record);
  }
  async deleteVisualPreviewsForNote(noteId) {
    await this.database.visualPreviews.where("noteId").equals(noteId).delete();
  }
  async pruneVisualPreviews(maxBytes, maxRecords, keepIds = []) {
    const records = await this.database.visualPreviews.orderBy("lastAccessedAt").toArray();
    return prunePreviewRecords(records, maxBytes, maxRecords, new Set(keepIds), (id) => this.database.visualPreviews.delete(id));
  }
  async clearDerivedData() {
    await this.database.transaction(
      "rw",
      [
        this.database.notes,
        this.database.assets,
        this.database.folders,
        this.database.references,
        this.database.groups,
        this.database.groupMembers,
        this.database.operations,
        this.database.visualPreviews
      ],
      async () => {
        await Promise.all([
          this.database.notes.clear(),
          this.database.assets.clear(),
          this.database.folders.clear(),
          this.database.references.clear(),
          this.database.groups.clear(),
          this.database.groupMembers.clear(),
          this.database.operations.clear(),
          this.database.visualPreviews.clear()
        ]);
      }
    );
  }
};
var MemoryAttachmentRepository = class {
  constructor() {
    __publicField(this, "persistent", false);
    __publicField(this, "notes", /* @__PURE__ */ new Map());
    __publicField(this, "assets", /* @__PURE__ */ new Map());
    __publicField(this, "folders", /* @__PURE__ */ new Map());
    __publicField(this, "references", /* @__PURE__ */ new Map());
    __publicField(this, "groups", /* @__PURE__ */ new Map());
    __publicField(this, "groupMembers", /* @__PURE__ */ new Map());
    __publicField(this, "operations", /* @__PURE__ */ new Map());
    __publicField(this, "visualPreviews", /* @__PURE__ */ new Map());
  }
  async open() {
  }
  close() {
  }
  async snapshot() {
    return {
      notes: [...this.notes.values()],
      assets: [...this.assets.values()],
      folders: [...this.folders.values()],
      references: [...this.references.values()],
      groups: [...this.groups.values()],
      groupMembers: [...this.groupMembers.values()],
      operations: [...this.operations.values()]
    };
  }
  async putNote(record) {
    this.notes.set(record.id, record);
  }
  async deleteNote(id) {
    this.notes.delete(id);
  }
  async putAsset(record) {
    this.assets.set(record.id, record);
  }
  async deleteAsset(id) {
    this.assets.delete(id);
  }
  async putFolder(record) {
    this.folders.set(record.id, record);
  }
  async deleteFolder(id) {
    this.folders.delete(id);
  }
  async putGroup(record) {
    this.groups.set(record.id, record);
  }
  async deleteGroup(id) {
    this.groups.delete(id);
  }
  async replaceReferencesForNote(noteId, records) {
    for (const [id, record] of this.references) {
      if (record.noteId === noteId) {
        this.references.delete(id);
      }
    }
    for (const record of records) {
      this.references.set(record.id, record);
    }
  }
  async replaceGroupMembers(groupId, records) {
    for (const [id, record] of this.groupMembers) {
      if (record.groupId === groupId) {
        this.groupMembers.delete(id);
      }
    }
    for (const record of records) {
      this.groupMembers.set(record.id, record);
    }
  }
  async putOperation(record) {
    this.operations.set(record.id, record);
  }
  async deleteOperation(id) {
    this.operations.delete(id);
  }
  async getVisualPreview(id) {
    var _a;
    return (_a = this.visualPreviews.get(id)) != null ? _a : null;
  }
  async putVisualPreview(record) {
    this.visualPreviews.set(record.id, record);
  }
  async deleteVisualPreviewsForNote(noteId) {
    for (const [id, record] of this.visualPreviews) {
      if (record.noteId === noteId) this.visualPreviews.delete(id);
    }
  }
  async pruneVisualPreviews(maxBytes, maxRecords, keepIds = []) {
    const records = [...this.visualPreviews.values()].sort((left, right) => left.lastAccessedAt - right.lastAccessedAt);
    return prunePreviewRecords(records, maxBytes, maxRecords, new Set(keepIds), async (id) => {
      this.visualPreviews.delete(id);
    });
  }
  async clearDerivedData() {
    this.notes.clear();
    this.assets.clear();
    this.folders.clear();
    this.references.clear();
    this.groups.clear();
    this.groupMembers.clear();
    this.operations.clear();
    this.visualPreviews.clear();
  }
};
async function prunePreviewRecords(records, maxBytes, maxRecords, keepIds, remove2) {
  let bytes = records.reduce((total, record) => total + record.byteSize, 0);
  let count = records.length;
  const removed = [];
  for (const record of records) {
    if (bytes <= maxBytes && count <= maxRecords) break;
    if (keepIds.has(record.id)) continue;
    await remove2(record.id);
    bytes -= record.byteSize;
    count -= 1;
    removed.push(record.id);
  }
  return removed;
}
async function createRepository(vaultKey) {
  if (typeof indexedDB === "undefined") {
    const repository2 = new MemoryAttachmentRepository();
    await repository2.open();
    return repository2;
  }
  const repository = new DexieAttachmentRepository(vaultKey);
  try {
    await repository.open();
    return repository;
  } catch (error) {
    console.warn("XD Attachment Manager: IndexedDB unavailable, using memory cache", error);
    repository.close();
    const fallback = new MemoryAttachmentRepository();
    await fallback.open();
    return fallback;
  }
}

// src/data/meta-store.ts
var MetaStore = class {
  constructor(adapter) {
    this.adapter = adapter;
  }
  async initialize() {
    await this.mkdirp(META_ROOT);
    for (const folder of ["notes", "files", "folders", "groups", "operations"]) {
      await this.mkdirp(`${META_ROOT}/${folder}`);
    }
    const existing = await this.readJson(`${META_ROOT}/root.meta`);
    if (existing == null ? void 0 : existing.vaultId) {
      if (existing.schemaVersion === META_SCHEMA_VERSION) return existing;
      const upgraded = { ...existing, schemaVersion: META_SCHEMA_VERSION, updatedAt: Date.now() };
      await this.writeJson(`${META_ROOT}/root.meta`, upgraded);
      return upgraded;
    }
    const now = Date.now();
    const root = {
      schemaVersion: META_SCHEMA_VERSION,
      vaultId: createId("vault"),
      createdAt: now,
      updatedAt: now
    };
    await this.writeJson(`${META_ROOT}/root.meta`, root);
    return root;
  }
  async snapshot() {
    const root = await this.initialize();
    const [notes, assets, folders, groups, operations] = await Promise.all([
      this.readTree(`${META_ROOT}/notes`, (record) => this.noteMetaPath(record.path)),
      this.readTree(`${META_ROOT}/files`, (record) => this.assetMetaPath(record.path)),
      this.readTree(`${META_ROOT}/folders`, (record) => this.folderMetaPath(record.path)),
      this.readTree(`${META_ROOT}/groups`, (record) => this.groupMetaPath(record.rootPath)),
      this.readTree(`${META_ROOT}/operations`, (record) => `${META_ROOT}/operations/${record.id}.meta`)
    ]);
    return { root, notes, assets, folders, groups, operations };
  }
  async writeNote(record) {
    await this.writeJson(this.noteMetaPath(record.path), record);
  }
  async removeNote(path) {
    await this.removeIfExists(this.noteMetaPath(path));
  }
  async moveNote(oldPath, newPath) {
    await this.moveIfExists(this.noteMetaPath(oldPath), this.noteMetaPath(newPath));
  }
  async writeAsset(record) {
    await this.writeJson(this.assetMetaPath(record.path), record);
  }
  async removeAsset(path) {
    await this.removeIfExists(this.assetMetaPath(path));
  }
  async moveAsset(oldPath, newPath) {
    await this.moveIfExists(this.assetMetaPath(oldPath), this.assetMetaPath(newPath));
  }
  async writeFolder(record) {
    await this.writeJson(this.folderMetaPath(record.path), record);
  }
  async removeFolder(path) {
    await this.removeIfExists(this.folderMetaPath(path));
  }
  async moveFolder(oldPath, newPath) {
    await this.moveIfExists(this.folderMetaPath(oldPath), this.folderMetaPath(newPath));
  }
  async writeGroup(record) {
    await this.writeJson(this.groupMetaPath(record.rootPath), record);
  }
  async removeGroup(rootPath) {
    await this.removeIfExists(this.groupMetaPath(rootPath));
  }
  async moveGroup(oldRootPath, newRootPath) {
    await this.moveIfExists(this.groupMetaPath(oldRootPath), this.groupMetaPath(newRootPath));
  }
  async writeOperation(record) {
    await this.writeJson(`${META_ROOT}/operations/${record.id}.meta`, record);
  }
  async removeOperation(id) {
    await this.removeIfExists(`${META_ROOT}/operations/${id}.meta`);
  }
  assetMetaPath(assetPath) {
    const relative = assetsRelativePath(assetPath);
    return normalizeVaultPath(`${META_ROOT}/files/${relative}.meta`);
  }
  folderMetaPath(folderPath) {
    const relative = assetsRelativePath(folderPath);
    return normalizeVaultPath(`${META_ROOT}/folders/${relative || "_root"}.meta`);
  }
  noteMetaPath(notePath) {
    return normalizeVaultPath(`${META_ROOT}/notes/${normalizeVaultPath(notePath)}.meta`);
  }
  groupMetaPath(groupRootPath) {
    return normalizeVaultPath(`${META_ROOT}/groups/${assetsRelativePath(groupRootPath)}.meta`);
  }
  async readJson(path) {
    const normalized = normalizeVaultPath(path);
    if (!await this.adapter.exists(normalized)) return null;
    try {
      return JSON.parse(await this.adapter.read(normalized));
    } catch (error) {
      console.warn(`XD Attachment Manager: invalid meta ${normalized}`, error);
      return null;
    }
  }
  async writeJson(path, value) {
    const normalized = normalizeVaultPath(path);
    await this.mkdirp(dirname(normalized));
    await this.adapter.write(normalized, `${JSON.stringify(value, null, 2)}
`);
  }
  async mkdirp(path) {
    const normalized = normalizeVaultPath(path);
    if (!normalized) return;
    const segments = normalized.split("/");
    let current = "";
    for (const segment of segments) {
      current = current ? `${current}/${segment}` : segment;
      if (!await this.adapter.exists(current)) {
        await this.adapter.mkdir(current);
      }
    }
  }
  async ensureAssetsRoot() {
    if (!await this.adapter.exists(ASSETS_ROOT)) {
      await this.adapter.mkdir(ASSETS_ROOT);
    }
    await this.initialize();
  }
  async setReferenceScanComplete(complete) {
    const root = await this.initialize();
    await this.writeJson(`${META_ROOT}/root.meta`, {
      ...root,
      referenceIndexVersion: REFERENCE_INDEX_VERSION,
      referenceScanComplete: complete,
      updatedAt: Date.now()
    });
  }
  async readTree(root, expectedPath) {
    var _a;
    if (!await this.adapter.exists(root)) return [];
    const result = /* @__PURE__ */ new Map();
    const stack = [normalizeVaultPath(root)];
    while (stack.length > 0) {
      const current = stack.pop();
      if (!current) continue;
      const listed = await this.adapter.list(current);
      stack.push(...listed.folders);
      for (const file of listed.files) {
        if (!file.endsWith(".meta")) continue;
        const parsed = await this.readJson(file);
        if (!parsed) continue;
        const actual = normalizeVaultPath(file);
        let expected = actual;
        try {
          expected = normalizeVaultPath((_a = expectedPath == null ? void 0 : expectedPath(parsed)) != null ? _a : file);
        } catch (error) {
          console.warn(`XD Attachment Manager: incomplete meta ${actual}`, error);
          continue;
        }
        if (expected.toLowerCase() !== actual.toLowerCase()) {
          if (await this.adapter.exists(expected)) {
            const canonical = await this.readJson(expected);
            if (canonical) result.set(expected.toLowerCase(), canonical);
            await this.adapter.remove(actual);
            continue;
          }
          await this.mkdirp(dirname(expected));
          await this.adapter.rename(actual, expected);
        }
        result.set(expected.toLowerCase(), parsed);
      }
    }
    return [...result.values()];
  }
  async removeIfExists(path) {
    const normalized = normalizeVaultPath(path);
    if (await this.adapter.exists(normalized)) {
      await this.adapter.remove(normalized);
    }
  }
  async moveIfExists(oldPath, newPath) {
    const oldNormalized = normalizeVaultPath(oldPath);
    const newNormalized = normalizeVaultPath(newPath);
    if (!await this.adapter.exists(oldNormalized)) return;
    await this.mkdirp(dirname(newNormalized));
    if (await this.adapter.exists(newNormalized)) {
      await this.adapter.remove(newNormalized);
    }
    await this.adapter.rename(oldNormalized, newNormalized);
  }
};

// src/data/hot-index.ts
var HotIndex = class {
  constructor(repository) {
    this.repository = repository;
    __publicField(this, "notesById", /* @__PURE__ */ new Map());
    __publicField(this, "notesByPath", /* @__PURE__ */ new Map());
    __publicField(this, "assetsById", /* @__PURE__ */ new Map());
    __publicField(this, "assetsByPath", /* @__PURE__ */ new Map());
    __publicField(this, "foldersById", /* @__PURE__ */ new Map());
    __publicField(this, "foldersByPath", /* @__PURE__ */ new Map());
    __publicField(this, "groupsById", /* @__PURE__ */ new Map());
    __publicField(this, "groupsBySourcePath", /* @__PURE__ */ new Map());
    __publicField(this, "groupsByRootPath", /* @__PURE__ */ new Map());
    __publicField(this, "referencesByAssetPath", /* @__PURE__ */ new Map());
    __publicField(this, "referencesByNoteId", /* @__PURE__ */ new Map());
    __publicField(this, "membersByGroupId", /* @__PURE__ */ new Map());
    __publicField(this, "membersByPath", /* @__PURE__ */ new Map());
  }
  load(snapshot) {
    this.clearMemory();
    for (const note of snapshot.notes) this.indexNote(note);
    for (const asset of snapshot.assets) this.indexAsset(asset);
    for (const folder of snapshot.folders) this.indexFolder(folder);
    for (const group of snapshot.groups) this.indexGroup(group);
    for (const reference of snapshot.references) this.indexReference(reference);
    for (const member of snapshot.groupMembers) this.indexMember(member);
  }
  get allNotes() {
    return [...this.notesById.values()];
  }
  get allAssets() {
    return [...this.assetsById.values()];
  }
  get allFolders() {
    return [...this.foldersById.values()];
  }
  get allGroups() {
    return [...this.groupsById.values()];
  }
  noteById(id) {
    var _a;
    return (_a = this.notesById.get(id)) != null ? _a : null;
  }
  noteByPath(path) {
    var _a;
    return (_a = this.notesByPath.get(key(path))) != null ? _a : null;
  }
  assetById(id) {
    var _a;
    return (_a = this.assetsById.get(id)) != null ? _a : null;
  }
  assetByPath(path) {
    var _a;
    return (_a = this.assetsByPath.get(key(path))) != null ? _a : null;
  }
  folderByPath(path) {
    var _a;
    return (_a = this.foldersByPath.get(key(path))) != null ? _a : null;
  }
  groupById(id) {
    var _a;
    return (_a = this.groupsById.get(id)) != null ? _a : null;
  }
  groupBySourcePath(path) {
    var _a;
    return (_a = this.groupsBySourcePath.get(key(path))) != null ? _a : null;
  }
  groupByRootPath(path) {
    var _a;
    return (_a = this.groupsByRootPath.get(key(path))) != null ? _a : null;
  }
  groupMemberByPath(path) {
    var _a;
    return (_a = this.membersByPath.get(key(path))) != null ? _a : null;
  }
  groupMembers(groupId) {
    var _a;
    return [...(_a = this.membersByGroupId.get(groupId)) != null ? _a : []];
  }
  referencesForAsset(path) {
    var _a;
    return [...(_a = this.referencesByAssetPath.get(key(path))) != null ? _a : []].sort(
      (left, right) => left.firstSeenAt - right.firstSeenAt || left.notePath.localeCompare(right.notePath)
    );
  }
  referencesForNote(noteId) {
    var _a;
    return [...(_a = this.referencesByNoteId.get(noteId)) != null ? _a : []];
  }
  async upsertNote(record) {
    const previous = this.notesById.get(record.id);
    if (previous) this.notesByPath.delete(key(previous.path));
    this.indexNote(record);
    await this.repository.putNote(record);
  }
  async removeNote(id) {
    const previous = this.notesById.get(id);
    if (!previous) return;
    this.notesById.delete(id);
    this.notesByPath.delete(key(previous.path));
    await this.repository.deleteNote(id);
  }
  async upsertAsset(record) {
    const previous = this.assetsById.get(record.id);
    if (previous) this.assetsByPath.delete(key(previous.path));
    this.indexAsset(record);
    await this.repository.putAsset(record);
  }
  async removeAsset(id) {
    const previous = this.assetsById.get(id);
    if (!previous) return;
    this.assetsById.delete(id);
    this.assetsByPath.delete(key(previous.path));
    await this.repository.deleteAsset(id);
  }
  async upsertFolder(record) {
    const previous = this.foldersById.get(record.id);
    if (previous) this.foldersByPath.delete(key(previous.path));
    this.indexFolder(record);
    await this.repository.putFolder(record);
  }
  async removeFolder(id) {
    const previous = this.foldersById.get(id);
    if (!previous) return;
    this.foldersById.delete(id);
    this.foldersByPath.delete(key(previous.path));
    await this.repository.deleteFolder(id);
  }
  async upsertGroup(record) {
    const previous = this.groupsById.get(record.id);
    await this.repository.putGroup(record);
    if (previous) {
      this.groupsByRootPath.delete(key(previous.rootPath));
      this.groupsBySourcePath.delete(key(previous.sourcePath));
    }
    this.indexGroup(record);
  }
  async removeGroup(id) {
    const previous = this.groupsById.get(id);
    if (!previous) return;
    this.groupsById.delete(id);
    this.groupsByRootPath.delete(key(previous.rootPath));
    this.groupsBySourcePath.delete(key(previous.sourcePath));
    this.removeMembersFromMemory(id);
    await this.repository.deleteGroup(id);
    await this.repository.replaceGroupMembers(id, []);
  }
  async replaceReferencesForNote(noteId, records) {
    var _a, _b;
    const previous = (_a = this.referencesByNoteId.get(noteId)) != null ? _a : [];
    for (const record of previous) {
      const assetKey = key(record.assetPath);
      const remaining = ((_b = this.referencesByAssetPath.get(assetKey)) != null ? _b : []).filter((item) => item.id !== record.id);
      if (remaining.length === 0) this.referencesByAssetPath.delete(assetKey);
      else this.referencesByAssetPath.set(assetKey, remaining);
    }
    this.referencesByNoteId.delete(noteId);
    for (const record of records) this.indexReference(record);
    await this.repository.replaceReferencesForNote(noteId, records);
  }
  async replaceGroupMembers(groupId, records) {
    this.removeMembersFromMemory(groupId);
    for (const record of records) this.indexMember(record);
    await this.repository.replaceGroupMembers(groupId, records);
  }
  indexNote(record) {
    this.notesById.set(record.id, record);
    this.notesByPath.set(key(record.path), record);
  }
  indexAsset(record) {
    this.assetsById.set(record.id, record);
    this.assetsByPath.set(key(record.path), record);
  }
  indexFolder(record) {
    this.foldersById.set(record.id, record);
    this.foldersByPath.set(key(record.path), record);
  }
  indexGroup(record) {
    this.groupsById.set(record.id, record);
    this.groupsByRootPath.set(key(record.rootPath), record);
    this.groupsBySourcePath.set(key(record.sourcePath), record);
  }
  indexReference(record) {
    var _a, _b;
    const assetKey = key(record.assetPath);
    const assetRecords = (_a = this.referencesByAssetPath.get(assetKey)) != null ? _a : [];
    assetRecords.push(record);
    this.referencesByAssetPath.set(assetKey, assetRecords);
    const noteRecords = (_b = this.referencesByNoteId.get(record.noteId)) != null ? _b : [];
    noteRecords.push(record);
    this.referencesByNoteId.set(record.noteId, noteRecords);
  }
  indexMember(record) {
    var _a;
    const records = (_a = this.membersByGroupId.get(record.groupId)) != null ? _a : [];
    records.push(record);
    this.membersByGroupId.set(record.groupId, records);
    this.membersByPath.set(key(record.path), record);
  }
  removeMembersFromMemory(groupId) {
    var _a;
    for (const member of (_a = this.membersByGroupId.get(groupId)) != null ? _a : []) {
      this.membersByPath.delete(key(member.path));
    }
    this.membersByGroupId.delete(groupId);
  }
  clearMemory() {
    this.notesById.clear();
    this.notesByPath.clear();
    this.assetsById.clear();
    this.assetsByPath.clear();
    this.foldersById.clear();
    this.foldersByPath.clear();
    this.groupsById.clear();
    this.groupsBySourcePath.clear();
    this.groupsByRootPath.clear();
    this.referencesByAssetPath.clear();
    this.referencesByNoteId.clear();
    this.membersByGroupId.clear();
    this.membersByPath.clear();
  }
};
function key(path) {
  return normalizeVaultPath(path).toLowerCase();
}

// src/references/markdown-tokenizer.ts
function scanMarkdownReferences(sourcePath, content, syntaxOverride) {
  const references = [];
  let index = 0;
  let fence = null;
  while (index < content.length) {
    if (isLineStart(content, index)) {
      const marker = readFenceMarker(content, index);
      if (marker) {
        if (!fence) fence = marker;
        else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
        index = lineEnd(content, index);
        continue;
      }
    }
    if (fence) {
      index += 1;
      continue;
    }
    if (content.startsWith("<!--", index)) {
      const end = content.indexOf("-->", index + 4);
      index = end < 0 ? content.length : end + 3;
      continue;
    }
    if (content[index] === "`") {
      const tickCount = countRun(content, index, "`");
      const close = content.indexOf("`".repeat(tickCount), index + tickCount);
      index = close < 0 ? content.length : close + tickCount;
      continue;
    }
    const wiki = readWikiReference(content, index, sourcePath, syntaxOverride);
    if (wiki) {
      references.push(wiki);
      index = wiki.end;
      continue;
    }
    const markdown = readMarkdownReference(content, index, sourcePath, syntaxOverride);
    if (markdown) {
      references.push(markdown);
      index = markdown.end;
      continue;
    }
    index += 1;
  }
  return references;
}
function applyReferenceEdits(content, edits) {
  const sorted = [...edits].sort((left, right) => right.start - left.start || right.end - left.end);
  let previousStart = content.length;
  let result = content;
  for (const edit of sorted) {
    if (edit.start < 0 || edit.end < edit.start || edit.end > content.length) {
      throw new Error(`Invalid reference edit ${edit.start}:${edit.end}`);
    }
    if (edit.end > previousStart) {
      throw new Error("Overlapping reference edits are not allowed");
    }
    result = `${result.slice(0, edit.start)}${edit.replacement}${result.slice(edit.end)}`;
    previousStart = edit.start;
  }
  return result;
}
function mutateMarkdownReferences(content, references, mutation) {
  const edits = [];
  for (const reference of references) {
    if (!referenceMatchesPath(reference, mutation.oldPath)) continue;
    if (mutation.remove) {
      edits.push({ start: reference.start, end: reference.end, replacement: "" });
      continue;
    }
    let replacement = reference.raw;
    if (mutation.label !== void 0) replacement = setReferenceLabel(replacement, reference.syntax, mutation.label);
    if (mutation.resetSize) {
      replacement = removeReferenceSize(replacement, reference.syntax);
    } else if (mutation.width !== void 0 || mutation.height !== void 0) {
      replacement = setReferenceSize(replacement, reference.syntax, mutation.width, mutation.height);
    }
    if (mutation.newPath) replacement = replaceReferenceTarget(replacement, reference.syntax, mutation.newPath);
    if (replacement !== reference.raw) edits.push({ start: reference.start, end: reference.end, replacement });
  }
  return applyReferenceEdits(content, edits);
}
function replaceReferenceTarget(raw, syntax, newPath) {
  if (syntax === "wiki" || syntax === "excalidraw") {
    const open = raw.indexOf("[[");
    const close = raw.lastIndexOf("]] ".trim());
    if (open < 0 || close < open) return raw;
    const inner = raw.slice(open + 2, close);
    const pipe = inner.indexOf("|");
    const target2 = pipe < 0 ? inner : inner.slice(0, pipe);
    const suffix = splitSubpath(target2).suffix;
    const tail = pipe < 0 ? "" : inner.slice(pipe);
    return `${raw.slice(0, open + 2)}${newPath}${suffix}${tail}${raw.slice(close)}`;
  }
  const destination = locateMarkdownDestination(raw);
  if (!destination) return raw;
  const split = isRemoteTarget(destination.value) ? { path: destination.value, suffix: "" } : splitSubpath(destination.value);
  const preserveEncoding = /%[0-9a-f]{2}/i.test(destination.value);
  const encoded = encodeMarkdownDestination(newPath, preserveEncoding);
  const target = `${encoded}${split.suffix}`;
  const replacement = destination.angleWrapped || /\s/.test(target) ? `<${target}>` : target;
  return `${raw.slice(0, destination.start)}${replacement}${raw.slice(destination.end)}`;
}
function setReferenceSize(raw, syntax, width, height) {
  var _a, _b;
  const size = formatSize(width, height);
  if (!size) return raw;
  if (syntax === "wiki" || syntax === "excalidraw") {
    const open = raw.indexOf("[[");
    const close = raw.lastIndexOf("]] ".trim());
    if (open < 0 || close < open) return raw;
    const parts2 = splitPipeParts(raw.slice(open + 2, close));
    if (parts2.length > 1 && isSizeToken((_a = parts2[parts2.length - 1]) != null ? _a : "")) parts2.pop();
    parts2.push(size);
    return `${raw.slice(0, open + 2)}${parts2.join("|")}${raw.slice(close)}`;
  }
  const labelStart = raw.indexOf("[");
  const labelEnd = findClosingBracket(raw, labelStart, "[", "]");
  if (labelStart < 0 || labelEnd < 0) return raw;
  const label = raw.slice(labelStart + 1, labelEnd);
  const parts = splitPipeParts(label);
  if (parts.length > 1 && isSizeToken((_b = parts[parts.length - 1]) != null ? _b : "")) parts.pop();
  if (parts.length === 1 && parts[0] === "") parts.push(size);
  else parts.push(size);
  return `${raw.slice(0, labelStart + 1)}${parts.join("|")}${raw.slice(labelEnd)}`;
}
function removeReferenceSize(raw, syntax) {
  var _a, _b;
  if (syntax === "wiki" || syntax === "excalidraw") {
    const open = raw.indexOf("[[");
    const close = raw.lastIndexOf("]] ".trim());
    if (open < 0 || close < open) return raw;
    const parts2 = splitPipeParts(raw.slice(open + 2, close));
    if (parts2.length <= 1 || !isSizeToken((_a = parts2[parts2.length - 1]) != null ? _a : "")) return raw;
    parts2.pop();
    return `${raw.slice(0, open + 2)}${parts2.join("|")}${raw.slice(close)}`;
  }
  const labelStart = raw.indexOf("[");
  const labelEnd = findClosingBracket(raw, labelStart, "[", "]");
  if (labelStart < 0 || labelEnd < 0) return raw;
  const parts = splitPipeParts(raw.slice(labelStart + 1, labelEnd));
  if (parts.length <= 1 || !isSizeToken((_b = parts[parts.length - 1]) != null ? _b : "")) return raw;
  parts.pop();
  return `${raw.slice(0, labelStart + 1)}${parts.join("|")}${raw.slice(labelEnd)}`;
}
function setReferenceLabel(raw, syntax, label) {
  var _a, _b;
  if (syntax === "wiki" || syntax === "excalidraw") {
    const open = raw.indexOf("[[");
    const close = raw.lastIndexOf("]] ".trim());
    if (open < 0 || close < open) return raw;
    const parts2 = splitPipeParts(raw.slice(open + 2, close));
    const target = parts2.shift();
    if (!target) return raw;
    const size2 = parts2.length > 0 && isSizeToken((_a = parts2[parts2.length - 1]) != null ? _a : "") ? parts2.pop() : void 0;
    const escaped2 = escapeReferenceLabel(label, true);
    const next2 = [target];
    if (escaped2) next2.push(escaped2);
    if (size2) next2.push(size2);
    return `${raw.slice(0, open + 2)}${next2.join("|")}${raw.slice(close)}`;
  }
  const labelStart = raw.indexOf("[");
  const labelEnd = findClosingBracket(raw, labelStart, "[", "]");
  if (labelStart < 0 || labelEnd < 0) return raw;
  const parts = splitPipeParts(raw.slice(labelStart + 1, labelEnd));
  const size = parts.length > 1 && isSizeToken((_b = parts[parts.length - 1]) != null ? _b : "") ? parts.pop() : void 0;
  const escaped = escapeReferenceLabel(label, false);
  const next = size ? `${escaped}|${size}` : escaped;
  return `${raw.slice(0, labelStart + 1)}${next}${raw.slice(labelEnd)}`;
}
function readReferenceDisplay(raw, syntax) {
  var _a, _b;
  let parts = null;
  if (syntax === "wiki" || syntax === "excalidraw") {
    const open = raw.indexOf("[[");
    const close = raw.lastIndexOf("]] ".trim());
    if (open < 0 || close < open) return { title: "" };
    parts = splitPipeParts(raw.slice(open + 2, close));
    parts.shift();
  } else {
    const labelStart = raw.indexOf("[");
    const labelEnd = findClosingBracket(raw, labelStart, "[", "]");
    if (labelStart < 0 || labelEnd < 0) return { title: "" };
    parts = splitPipeParts(raw.slice(labelStart + 1, labelEnd));
  }
  const size = parts.length > 0 && isSizeToken((_a = parts[parts.length - 1]) != null ? _a : "") ? parseSizeToken((_b = parts.pop()) != null ? _b : "") : {};
  return {
    title: unescapeReferenceLabel(parts.join("|")),
    ...size
  };
}
function referenceMatchesPath(reference, path) {
  if (isRemoteTarget(reference.rawTarget) || isRemoteTarget(path)) {
    return unwrapTarget(reference.rawTarget) === unwrapTarget(path);
  }
  if (reference.resolvedPath && pathEquals(reference.resolvedPath, path)) return true;
  const rawPath = normalizeTarget(reference.rawTarget);
  const normalizedPath = normalizeVaultPath(path);
  return pathEquals(rawPath, normalizedPath) || basename(rawPath).toLowerCase() === basename(normalizedPath).toLowerCase();
}
function normalizeTarget(rawTarget) {
  const value = splitSubpath(rawTarget.trim().replace(/^<|>$/g, "")).path;
  try {
    return normalizeVaultPath(decodeURI(value));
  } catch (e) {
    return normalizeVaultPath(value);
  }
}
function readWikiReference(content, index, sourcePath, syntaxOverride) {
  var _a, _b;
  const embedded = content[index] === "!" && content.startsWith("[[", index + 1);
  const open = embedded ? index + 1 : index;
  if (!content.startsWith("[[", open)) return null;
  const close = content.indexOf("]]", open + 2);
  if (close < 0 || content.slice(open + 2, close).includes("\n")) return null;
  const end = close + 2;
  const raw = content.slice(index, end);
  const inner = content.slice(open + 2, close);
  const rawTarget = (_b = (_a = inner.split("|", 1)[0]) == null ? void 0 : _a.trim()) != null ? _b : "";
  if (!rawTarget) return null;
  return {
    syntax: syntaxOverride != null ? syntaxOverride : "wiki",
    sourcePath,
    raw,
    rawTarget,
    resolvedPath: null,
    start: index,
    end,
    embedded
  };
}
function readMarkdownReference(content, index, sourcePath, syntaxOverride) {
  const embedded = content[index] === "!" && content[index + 1] === "[";
  const open = embedded ? index + 1 : index;
  if (content[open] !== "[" || content[open + 1] === "[") return null;
  const labelEnd = findClosingBracket(content, open, "[", "]");
  if (labelEnd < 0 || content[labelEnd + 1] !== "(") return null;
  const destinationEnd = findClosingBracket(content, labelEnd + 1, "(", ")");
  if (destinationEnd < 0) return null;
  const end = destinationEnd + 1;
  const raw = content.slice(index, end);
  const destination = locateMarkdownDestination(raw);
  if (!(destination == null ? void 0 : destination.value)) return null;
  return {
    syntax: syntaxOverride != null ? syntaxOverride : "markdown",
    sourcePath,
    raw,
    rawTarget: destination.value,
    resolvedPath: null,
    start: index,
    end,
    embedded
  };
}
function isRemoteTarget(value) {
  return /^https?:\/\//i.test(unwrapTarget(value));
}
function unwrapTarget(value) {
  return value.trim().replace(/^<|>$/g, "");
}
function locateMarkdownDestination(raw) {
  var _a, _b, _c;
  const labelStart = raw.indexOf("[");
  const labelEnd = findClosingBracket(raw, labelStart, "[", "]");
  if (labelEnd < 0 || raw[labelEnd + 1] !== "(") return null;
  let start = labelEnd + 2;
  while (/\s/.test((_a = raw[start]) != null ? _a : "")) start += 1;
  if (raw[start] === "<") {
    const end2 = raw.indexOf(">", start + 1);
    if (end2 < 0) return null;
    return { start, end: end2 + 1, value: raw.slice(start + 1, end2), angleWrapped: true };
  }
  let end = raw.length - 1;
  while (end > start && /\s/.test((_b = raw[end - 1]) != null ? _b : "")) end -= 1;
  const body = raw.slice(start, end);
  const title = /\s+(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\((?:[^()\\]|\\.)*\))\s*$/.exec(body);
  if ((title == null ? void 0 : title.index) !== void 0) {
    end = start + title.index;
    while (end > start && /\s/.test((_c = raw[end - 1]) != null ? _c : "")) end -= 1;
  }
  return end > start ? { start, end, value: raw.slice(start, end), angleWrapped: false } : null;
}
function findClosingBracket(content, start, open, close) {
  if (start < 0 || content[start] !== open) return -1;
  let depth = 0;
  for (let index = start; index < content.length; index += 1) {
    const char = content[index];
    if (char === "\\") {
      index += 1;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}
function splitSubpath(target) {
  const hash = target.indexOf("#");
  return hash < 0 ? { path: target, suffix: "" } : { path: target.slice(0, hash), suffix: target.slice(hash) };
}
function formatSize(width, height) {
  const validWidth = width !== void 0 && Number.isFinite(width) && width > 0 ? Math.round(width) : void 0;
  const validHeight = height !== void 0 && Number.isFinite(height) && height > 0 ? Math.round(height) : void 0;
  if (validWidth && validHeight) return `${validWidth}x${validHeight}`;
  if (validWidth) return `${validWidth}`;
  if (validHeight) return `0x${validHeight}`;
  return "";
}
function parseSizeToken(value) {
  const match = /^(\d+)(?:px)?(?:x(\d+)(?:px)?)?$/i.exec(value.trim());
  if (!match) return {};
  const width = Number(match[1]);
  const height = match[2] === void 0 ? void 0 : Number(match[2]);
  return {
    ...width > 0 ? { width } : {},
    ...height !== void 0 && height > 0 ? { height } : {}
  };
}
function splitPipeParts(value) {
  const parts = [];
  let start = 0;
  for (let index = 0; index < value.length; index += 1) {
    if (value[index] === "\\") {
      index += 1;
      continue;
    }
    if (value[index] !== "|") continue;
    parts.push(value.slice(start, index));
    start = index + 1;
  }
  parts.push(value.slice(start));
  return parts;
}
function escapeReferenceLabel(value, wiki) {
  const escaped = value.trim().replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\]/g, "\\]");
  return wiki ? escaped.replace(/\[/g, "\\[") : escaped;
}
function unescapeReferenceLabel(value) {
  return value.replace(/\\([\\|\[\]])/g, "$1");
}
function readFenceMarker(content, index) {
  let cursor = index;
  while (content[cursor] === " " && cursor - index < 4) cursor += 1;
  const char = content[cursor];
  if (char !== "`" && char !== "~") return null;
  const count = countRun(content, cursor, char);
  return count >= 3 ? char.repeat(count) : null;
}
function countRun(content, index, char) {
  let count = 0;
  while (content[index + count] === char) count += 1;
  return count;
}
function isLineStart(content, index) {
  return index === 0 || content[index - 1] === "\n";
}
function lineEnd(content, index) {
  const end = content.indexOf("\n", index);
  return end < 0 ? content.length : end + 1;
}

// src/references/markdown-adapter.ts
var MarkdownReferenceAdapter = class {
  constructor() {
    __publicField(this, "kind", "markdown");
  }
  supports(path) {
    return isPlainMarkdownPath(path);
  }
  scan(sourcePath, content, context) {
    const cached = context.cachedReferences;
    const references = (cached == null ? void 0 : cached.length) ? scanCachedReferences(sourcePath, content, cached) : scanMarkdownReferences(sourcePath, content);
    return references.map((reference) => ({
      ...reference,
      resolvedPath: context.resolveLink(reference.rawTarget, sourcePath)
    }));
  }
  mutate(sourcePath, content, mutation, context) {
    var _a, _b;
    const references = scanMarkdownReferences(sourcePath, content).map((reference) => ({
      ...reference,
      resolvedPath: context.resolveLink(reference.rawTarget, sourcePath)
    }));
    const nextMutation = mutation.newPath ? {
      ...mutation,
      newPath: (_b = (_a = context.shortestLinkText) == null ? void 0 : _a.call(context, mutation.newPath, sourcePath)) != null ? _b : mutation.newPath
    } : mutation;
    return mutateMarkdownReferences(content, references, nextMutation);
  }
};
function scanCachedReferences(sourcePath, content, cached) {
  const fallback = scanMarkdownReferences(sourcePath, content);
  const byRange = new Map(fallback.map((reference) => [`${reference.start}:${reference.end}`, reference]));
  const result = [];
  for (const item of cached) {
    const raw = content.slice(item.start, item.end) || item.original;
    const fallbackReference = byRange.get(`${item.start}:${item.end}`);
    result.push({
      syntax: raw.includes("[[") ? "wiki" : "markdown",
      sourcePath,
      raw,
      rawTarget: normalizeTarget(item.link),
      resolvedPath: null,
      start: item.start,
      end: item.end,
      embedded: item.embedded,
      ...fallbackReference ? { rawTarget: fallbackReference.rawTarget } : {}
    });
  }
  return result;
}

// src/references/canvas-adapter.ts
var CanvasReferenceAdapter = class {
  constructor() {
    __publicField(this, "kind", "canvas");
    __publicField(this, "markdown", new MarkdownReferenceAdapter());
  }
  supports(path) {
    return path.toLowerCase().endsWith(".canvas");
  }
  scan(sourcePath, content, context) {
    const document2 = parseCanvas(content);
    const references = [];
    for (const node of document2.nodes) {
      if (node.type === "file" && node.file) {
        references.push({
          syntax: "canvas",
          sourcePath,
          raw: node.file,
          rawTarget: node.file,
          resolvedPath: context.resolveLink(node.file, sourcePath),
          start: 0,
          end: 0,
          embedded: true,
          nodeId: node.id
        });
      }
      if (node.type === "text" && node.text) {
        references.push(...this.markdown.scan(sourcePath, node.text, { resolveLink: context.resolveLink }));
      }
    }
    return references;
  }
  mutate(sourcePath, content, mutation, context) {
    const document2 = parseCanvas(content);
    const removedNodeIds = /* @__PURE__ */ new Set();
    const nextNodes = [];
    for (const node of document2.nodes) {
      if (node.type === "file" && node.file) {
        const resolved = context.resolveLink(node.file, sourcePath);
        const matches = resolved && pathEquals(resolved, mutation.oldPath) || pathEquals(node.file, mutation.oldPath);
        const nodeMatches = !mutation.nodeId || mutation.nodeId === node.id;
        if (matches && nodeMatches && mutation.remove) {
          removedNodeIds.add(node.id);
          continue;
        }
        if (matches && nodeMatches && mutation.newPath) node.file = mutation.newPath;
        if (matches && nodeMatches && mutation.width !== void 0) node.width = Math.max(1, Math.round(mutation.width));
        if (matches && nodeMatches && mutation.height !== void 0) node.height = Math.max(1, Math.round(mutation.height));
      }
      if (node.type === "text" && node.text) {
        node.text = this.markdown.mutate(sourcePath, node.text, mutation, {
          resolveLink: context.resolveLink,
          shortestLinkText: context.shortestLinkText
        });
      }
      nextNodes.push(node);
    }
    document2.nodes = nextNodes;
    if (removedNodeIds.size > 0) {
      document2.edges = document2.edges.filter(
        (edge) => !removedNodeIds.has(edge.fromNode) && !removedNodeIds.has(edge.toNode)
      );
    }
    return stringifyCanvas(document2, content);
  }
};
function parseCanvas(content) {
  const parsed = JSON.parse(content);
  return {
    ...parsed,
    nodes: Array.isArray(parsed.nodes) ? parsed.nodes : [],
    edges: Array.isArray(parsed.edges) ? parsed.edges : []
  };
}
function stringifyCanvas(document2, original) {
  var _a, _b;
  if (!original.includes("\n")) return JSON.stringify(document2);
  const indentation = (_b = (_a = /^([ \t]+)"/m.exec(original)) == null ? void 0 : _a[1]) != null ? _b : "  ";
  const space = indentation.includes("	") ? "	" : Math.min(8, indentation.length);
  return `${JSON.stringify(document2, null, space)}
`;
}

// src/references/excalidraw-adapter.ts
var import_lz_string = __toESM(require_lz_string());
var ExcalidrawReferenceAdapter = class {
  constructor() {
    __publicField(this, "kind", "excalidraw");
    __publicField(this, "markdown", new MarkdownReferenceAdapter());
  }
  supports(path) {
    return path.toLowerCase().endsWith(".excalidraw.md");
  }
  scan(sourcePath, content, context) {
    return scanMarkdownReferences(sourcePath, content, "excalidraw").map((reference) => ({
      ...reference,
      resolvedPath: context.resolveLink(reference.rawTarget, sourcePath)
    }));
  }
  mutate(sourcePath, content, mutation, context) {
    if (!mutation.remove) {
      return this.markdown.mutate(sourcePath, content, mutation, context);
    }
    const matchingIds = new Set(
      parseEmbeddedFileEntries(content).filter((entry) => {
        const resolved = context.resolveLink(entry.rawTarget, sourcePath);
        return resolved && pathEquals(resolved, mutation.oldPath) || pathEquals(entry.rawTarget, mutation.oldPath);
      }).map((entry) => entry.fileId)
    );
    let result = this.markdown.mutate(sourcePath, content, mutation, context);
    if (matchingIds.size === 0) return result;
    result = removeEmbeddedFileLines(result, matchingIds);
    return removeSceneImages(result, matchingIds);
  }
};
function parseEmbeddedFileEntries(content) {
  var _a, _b;
  const section = findSection(content, "## Embedded Files");
  if (!section) return [];
  const entries = [];
  const linePattern = /^([a-f0-9]{8,}):\s*(.+)$/gim;
  for (const match of section.content.matchAll(linePattern)) {
    const rawLine = match[0];
    const value = (_a = match[2]) != null ? _a : "";
    const reference = scanMarkdownReferences("", value, "excalidraw")[0];
    if (!reference || match.index === void 0) continue;
    const start = section.start + match.index;
    entries.push({
      fileId: (_b = match[1]) != null ? _b : "",
      rawTarget: reference.rawTarget,
      start,
      end: start + rawLine.length
    });
  }
  return entries;
}
function removeEmbeddedFileLines(content, ids) {
  const section = findSection(content, "## Embedded Files");
  if (!section) return content;
  const next = section.content.split(/(?<=\n)/).filter((line) => {
    var _a;
    const id = (_a = /^([a-f0-9]{8,}):/i.exec(line)) == null ? void 0 : _a[1];
    return !id || !ids.has(id);
  }).join("");
  return `${content.slice(0, section.start)}${next}${content.slice(section.end)}`;
}
function removeSceneImages(content, ids) {
  var _a, _b, _c, _d;
  const fencePattern = /```compressed-json\s*\n([\s\S]*?)```/i;
  const match = fencePattern.exec(content);
  if (!match || match.index === void 0) return content;
  const compressed = ((_a = match[1]) != null ? _a : "").replace(/\s+/g, "");
  const decompressed = import_lz_string.default.decompressFromBase64(compressed);
  if (!decompressed) throw new Error("Unable to decompress Excalidraw scene");
  const scene = JSON.parse(decompressed);
  if (Array.isArray(scene.elements)) {
    scene.elements = scene.elements.filter((element) => !element.fileId || !ids.has(element.fileId));
  }
  if (scene.files) {
    for (const id of ids) delete scene.files[id];
  }
  const nextCompressed = wrapBase64(import_lz_string.default.compressToBase64(JSON.stringify(scene)));
  const bodyStart = match.index + match[0].indexOf((_b = match[1]) != null ? _b : "");
  const bodyEnd = bodyStart + ((_d = (_c = match[1]) == null ? void 0 : _c.length) != null ? _d : 0);
  return `${content.slice(0, bodyStart)}${nextCompressed}
${content.slice(bodyEnd)}`;
}
function findSection(content, heading) {
  var _a;
  const headingIndex = content.indexOf(heading);
  if (headingIndex < 0) return null;
  const start = content.indexOf("\n", headingIndex + heading.length);
  if (start < 0) return null;
  const nextHeading = /\n##\s+/g;
  nextHeading.lastIndex = start + 1;
  const next = nextHeading.exec(content);
  const end = (_a = next == null ? void 0 : next.index) != null ? _a : content.length;
  return { start: start + 1, end, content: content.slice(start + 1, end) };
}
function wrapBase64(value, width = 120) {
  const lines = [];
  for (let index = 0; index < value.length; index += width) lines.push(value.slice(index, index + width));
  return lines.join("\n");
}

// src/references/reference-service.ts
var ReferenceService = class {
  constructor(app, index) {
    this.app = app;
    this.index = index;
    __publicField(this, "adapters", [
      new ExcalidrawReferenceAdapter(),
      new CanvasReferenceAdapter(),
      new MarkdownReferenceAdapter()
    ]);
    __publicField(this, "onMutated", null);
  }
  setMutationListener(listener) {
    this.onMutated = listener;
  }
  adapterFor(path) {
    var _a;
    return (_a = this.adapters.find((adapter) => adapter.supports(path))) != null ? _a : null;
  }
  async scanFile(file) {
    const adapter = this.adapterFor(file.path);
    if (!adapter) return [];
    const content = await this.app.vault.cachedRead(file);
    return adapter.scan(file.path, content, this.contextFor(file));
  }
  async mutateFile(file, mutation) {
    const adapter = this.adapterFor(file.path);
    if (!adapter) return false;
    let changed = false;
    await this.app.vault.process(file, (content) => {
      const next = adapter.mutate(file.path, content, mutation, this.contextFor(file));
      changed = next !== content;
      return next;
    });
    if (changed && this.onMutated) await this.onMutated(file);
    return changed;
  }
  async mutateReference(file, hint, mutation) {
    if (file.extension !== "md") return this.mutateFile(file, mutation);
    let changed = false;
    await this.app.vault.process(file, (content) => {
      var _a;
      const selected = this.selectReference(file.path, content, hint, mutation);
      if (!selected) return content;
      const currentPath = (_a = selected.resolvedPath) != null ? _a : selected.rawTarget;
      const next = mutateMarkdownReferences(content, [selected], { ...mutation, oldPath: currentPath });
      changed = next !== content;
      return next;
    });
    if (changed && this.onMutated) await this.onMutated(file);
    return changed;
  }
  async mutateEverywhere(mutation) {
    const notePaths = new Set(this.index.referencesForAsset(mutation.oldPath).map((reference) => reference.notePath));
    return this.mutateNotePaths(notePaths, mutation);
  }
  async mutateNotePaths(notePaths, mutation) {
    const changed = [];
    for (const notePath of notePaths) {
      const file = this.app.vault.getFileByPath(notePath);
      if (!file) continue;
      if (await this.mutateFile(file, mutation)) changed.push(file);
    }
    return changed;
  }
  async rewritePath(oldPath, newPath) {
    return this.mutateEverywhere({ oldPath, newPath });
  }
  async removePath(oldPath) {
    return this.mutateEverywhere({ oldPath, remove: true });
  }
  referencesAtOffset(sourcePath, content, offset) {
    var _a;
    return (_a = this.referencesInContent(sourcePath, content).find((reference) => offset >= reference.start && offset <= reference.end)) != null ? _a : null;
  }
  referencesInContent(sourcePath, content) {
    const context = this.contextForPath(sourcePath);
    return scanMarkdownReferences(sourcePath, content).map((reference) => ({
      ...reference,
      resolvedPath: context.resolveLink(reference.rawTarget, sourcePath)
    }));
  }
  referencesForPathInContent(sourcePath, content, path) {
    return this.referencesInContent(sourcePath, content).filter((reference) => referenceMatchesPath(reference, path));
  }
  selectReference(sourcePath, content, hint, mutation) {
    var _a, _b;
    const references = this.referencesInContent(sourcePath, content);
    const exact = references.find(
      (reference) => reference.start === hint.start && reference.end === hint.end && reference.raw === hint.raw
    );
    if (exact) return exact;
    const paths = [mutation.oldPath, mutation.newPath, hint.resolvedPath, hint.rawTarget].filter((path) => Boolean(path));
    const display = readReferenceDisplay(hint.raw, hint.syntax);
    const candidates = references.filter((reference) => reference.embedded === hint.embedded).filter((reference) => paths.some((path) => referenceMatchesPath(reference, path))).map((reference) => {
      const candidateDisplay = readReferenceDisplay(reference.raw, reference.syntax);
      const sameDisplay = candidateDisplay.title === display.title && candidateDisplay.width === display.width && candidateDisplay.height === display.height;
      return {
        reference,
        score: (reference.syntax === hint.syntax ? 4 : 0) + (reference.raw === hint.raw ? 8 : 0) + (sameDisplay ? 16 : 0) - Math.abs(reference.start - hint.start) / Math.max(1, content.length)
      };
    }).sort((left, right) => right.score - left.score || left.reference.start - right.reference.start);
    return (_b = (_a = candidates[0]) == null ? void 0 : _a.reference) != null ? _b : null;
  }
  createReferenceId(assetPath, noteId, syntax) {
    return `ref_${stableHash(`${noteId}\0${normalizeTarget(assetPath)}\0${syntax}`)}`;
  }
  contextFor(file) {
    const cache = file.extension === "md" ? this.app.metadataCache.getFileCache(file) : null;
    return {
      ...this.contextForPath(file.path),
      ...cache ? { cachedReferences: cachedReferences(cache) } : {}
    };
  }
  contextForPath(sourcePath) {
    return {
      resolveLink: (rawTarget, source) => {
        var _a;
        const link = stripAliasAndSubpath(rawTarget);
        const target = this.app.metadataCache.getFirstLinkpathDest(link, source || sourcePath);
        return (_a = target == null ? void 0 : target.path) != null ? _a : null;
      },
      shortestLinkText: (targetPath, source) => {
        const target = this.app.vault.getFileByPath(targetPath);
        if (!target) return targetPath;
        return this.app.metadataCache.fileToLinktext(target, source || sourcePath, true) || targetPath;
      }
    };
  }
};
function cachedReferences(cache) {
  var _a, _b, _c, _d, _e, _f;
  const result = [];
  for (const [embedded, items] of [
    [true, (_a = cache.embeds) != null ? _a : []],
    [false, (_b = cache.links) != null ? _b : []]
  ]) {
    for (const item of items) {
      const start = (_d = (_c = item.position) == null ? void 0 : _c.start) == null ? void 0 : _d.offset;
      const end = (_f = (_e = item.position) == null ? void 0 : _e.end) == null ? void 0 : _f.offset;
      if (typeof start !== "number" || typeof end !== "number") continue;
      result.push({ link: item.link, original: item.original, start, end, embedded });
    }
  }
  return result.sort((left, right) => left.start - right.start);
}
function stripAliasAndSubpath(value) {
  const alias = value.indexOf("|");
  const target = alias < 0 ? value : value.slice(0, alias);
  const hash = target.indexOf("#");
  return normalizeTarget(hash < 0 ? target : target.slice(0, hash));
}

// src/operations/transaction-coordinator.ts
var TransactionCoordinator = class {
  constructor(metaStore, repository) {
    this.metaStore = metaStore;
    this.repository = repository;
    __publicField(this, "queue", Promise.resolve());
    __publicField(this, "mutedPaths", /* @__PURE__ */ new Map());
  }
  enqueue(kind, affectedPaths, action) {
    const execute = async () => this.execute(kind, affectedPaths, action);
    const result = this.queue.then(execute, execute);
    this.queue = result.then(
      () => void 0,
      () => void 0
    );
    return result;
  }
  isMuted(path) {
    const normalized = normalizeVaultPath(path);
    for (const mutedPath of this.mutedPaths.keys()) {
      if (pathStartsWith(normalized, mutedPath) || pathStartsWith(mutedPath, normalized)) return true;
    }
    return false;
  }
  async recoverPending(reconcile) {
    const snapshot = await this.metaStore.snapshot();
    const pending = snapshot.operations.filter((operation) => operation.status === "pending" || operation.status === "failed");
    for (const journal of pending) {
      try {
        await reconcile(journal);
        journal.status = "recovered";
        journal.phase = "reconciled";
        journal.updatedAt = Date.now();
        await this.repository.putOperation(journal);
        await this.metaStore.removeOperation(journal.id);
      } catch (error) {
        journal.status = "failed";
        journal.error = errorMessage(error);
        journal.updatedAt = Date.now();
        await this.metaStore.writeOperation(journal);
        await this.repository.putOperation(journal);
      }
    }
    return pending.length;
  }
  async execute(kind, affectedPaths, action) {
    const now = Date.now();
    const journal = {
      schemaVersion: META_SCHEMA_VERSION,
      id: createId("op"),
      kind,
      status: "pending",
      phase: "journal",
      affectedPaths: affectedPaths.map(normalizeVaultPath),
      startedAt: now,
      updatedAt: now
    };
    await this.metaStore.writeOperation(journal);
    await this.repository.putOperation(journal);
    const context = {
      journal,
      setPhase: async (phase) => {
        journal.phase = phase;
        journal.updatedAt = Date.now();
        await this.metaStore.writeOperation(journal);
        await this.repository.putOperation(journal);
      },
      mute: async (paths, mutedAction) => this.withMuted(paths, mutedAction)
    };
    try {
      const result = await action(context);
      journal.status = "committed";
      journal.phase = "complete";
      journal.updatedAt = Date.now();
      await this.repository.putOperation(journal);
      await this.metaStore.removeOperation(journal.id);
      return result;
    } catch (error) {
      journal.status = "failed";
      journal.error = errorMessage(error);
      journal.updatedAt = Date.now();
      await this.metaStore.writeOperation(journal);
      await this.repository.putOperation(journal);
      throw error;
    }
  }
  async withMuted(paths, action) {
    var _a;
    const normalized = paths.map(normalizeVaultPath);
    for (const path of normalized) {
      this.mutedPaths.set(path, ((_a = this.mutedPaths.get(path)) != null ? _a : 0) + 1);
    }
    try {
      return await action();
    } finally {
      globalThis.setTimeout(() => {
        var _a2;
        for (const path of normalized) {
          const count = (_a2 = this.mutedPaths.get(path)) != null ? _a2 : 0;
          if (count <= 1) this.mutedPaths.delete(path);
          else this.mutedPaths.set(path, count - 1);
        }
      }, 250);
    }
  }
};
function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

// src/data/index-coordinator.ts
var IndexCoordinator = class {
  constructor(app, repository, index, metaStore, references) {
    this.app = app;
    this.repository = repository;
    this.index = index;
    this.metaStore = metaStore;
    this.references = references;
  }
  async initialize(forceFullScan = false, allowAdoption = true, options = {}) {
    var _a;
    await this.metaStore.ensureAssetsRoot();
    const meta = await this.metaStore.snapshot();
    const metaReconciled = await this.reconcileOwnerIds(meta);
    let snapshot = await this.repository.snapshot();
    const hydrate = hasDurableData(meta) && (metaReconciled || cacheNeedsRoleMigration(snapshot) || !cacheMatchesMeta(snapshot, meta));
    if (hydrate) {
      await this.repository.clearDerivedData();
      await this.hydrateFromMeta(meta);
      snapshot = await this.repository.snapshot();
    }
    this.index.load(snapshot);
    await this.ensureRootFolderMeta();
    const containers = this.app.vault.getFiles().filter((file) => isReferenceContainerPath(file.path));
    const containerPaths = new Set(containers.map((file) => normalizeVaultPath(file.path).toLowerCase()));
    let removedNotes = 0;
    for (const note of this.index.allNotes) {
      if (!containerPaths.has(normalizeVaultPath(note.path).toLowerCase())) {
        await this.removeNoteRecord(note);
        removedNotes += 1;
      }
    }
    const hasUnmanagedPhysicalAssets = this.app.vault.getFiles().some(
      (file) => isAttachmentPath(file.path) && !this.index.assetByPath(file.path)
    );
    const rootRequiresScan = meta.root.referenceIndexVersion !== REFERENCE_INDEX_VERSION || meta.root.referenceScanComplete !== true;
    const fullScan = rootRequiresScan || shouldRunFullReferenceScan(
      forceFullScan,
      hydrate,
      hasUnmanagedPhysicalAssets,
      this.index.allNotes.length
    );
    if (fullScan) await this.metaStore.setReferenceScanComplete(false);
    let scannedNotes = 0;
    for (let containerIndex = 0; containerIndex < containers.length; containerIndex += 1) {
      throwIfAborted(options.signal);
      const file = containers[containerIndex];
      if (!file) continue;
      const previous = this.index.noteByPath(file.path);
      const changed = fullScan || !previous || previous.mtime !== file.stat.mtime || previous.size !== file.stat.size;
      if (!changed) continue;
      await this.scanNote(file, previous != null ? previous : void 0);
      scannedNotes += 1;
      (_a = options.onProgress) == null ? void 0 : _a.call(options, containerIndex + 1, containers.length);
      if (fullScan && (containerIndex + 1) % 50 === 0) await yieldToUi();
    }
    if (fullScan) await this.metaStore.setReferenceScanComplete(true);
    const adoptedAssets = allowAdoption ? await this.adoptUnmanagedAssets() : 0;
    const repairedFolders = allowAdoption ? await this.ensurePhysicalFolderMeta() : 0;
    if (allowAdoption) await this.removeOutOfBoundaryAssets();
    await this.refreshAllManagedAssetStates();
    const missingAssets = this.index.allAssets.filter((asset) => asset.state === "missing").map((asset) => asset.path);
    const issues = this.diagnoseIntegrityIssues();
    return { fullScan, scannedNotes, removedNotes, adoptedAssets, repairedFolders, missingAssets, issues };
  }
  async scanNote(file, previous = ((_a) => (_a = this.index.noteByPath(file.path)) != null ? _a : void 0)()) {
    var _a2, _b, _c;
    if (!isReferenceContainerPath(file.path)) throw new Error(`Not a reference container: ${file.path}`);
    const now = Date.now();
    const record = {
      id: (_a2 = previous == null ? void 0 : previous.id) != null ? _a2 : createId("note"),
      path: normalizeVaultPath(file.path),
      kind: noteKind(file.path),
      role: isInsideAssets(file.path) ? "visual-attachment" : "note",
      basename: removeExtension(basename(file.path)),
      mtime: file.stat.mtime,
      size: file.stat.size,
      scannedAt: now
    };
    const oldReferences = previous ? this.index.referencesForNote(previous.id) : [];
    const parsed = await this.references.scanFile(file);
    const grouped = /* @__PURE__ */ new Map();
    for (const reference of parsed) {
      if (!reference.resolvedPath) continue;
      const assetPath = normalizeVaultPath(reference.resolvedPath);
      const identity = `${assetPath.toLowerCase()}\0${reference.syntax}`;
      const existing = grouped.get(identity);
      if (existing) {
        existing.occurrenceCount += 1;
        continue;
      }
      const old = oldReferences.find(
        (candidate) => normalizeVaultPath(candidate.assetPath).toLowerCase() === assetPath.toLowerCase() && candidate.syntax === reference.syntax
      );
      grouped.set(identity, {
        id: this.references.createReferenceId(assetPath, record.id, reference.syntax),
        assetPath,
        noteId: record.id,
        notePath: record.path,
        containerRole: record.role,
        syntax: reference.syntax,
        firstSeenAt: (_c = (_b = old == null ? void 0 : old.firstSeenAt) != null ? _b : file.stat.ctime) != null ? _c : now,
        occurrenceCount: 1
      });
    }
    await this.index.upsertNote(record);
    await this.metaStore.writeNote(record);
    await this.index.replaceReferencesForNote(record.id, [...grouped.values()]);
    const affected = new Set([...oldReferences, ...grouped.values()].map((reference) => reference.assetPath));
    for (const path of affected) await this.refreshManagedAsset(path);
    return record;
  }
  async handleNoteRename(file, oldPath) {
    const next = await this.moveNotePath(file, oldPath);
    return this.scanNote(file, next);
  }
  async moveNotePath(file, oldPath) {
    const previous = this.index.noteByPath(oldPath);
    if (!previous) return this.scanNote(file);
    const conflicting = this.index.noteByPath(file.path);
    if (conflicting && conflicting.id !== previous.id) await this.removeNoteRecord(conflicting);
    await this.metaStore.moveNote(oldPath, file.path);
    const next = {
      ...previous,
      path: file.path,
      kind: noteKind(file.path),
      role: roleForPath(file.path),
      basename: removeExtension(file.name),
      mtime: file.stat.mtime,
      size: file.stat.size
    };
    await this.index.upsertNote(next);
    await this.metaStore.writeNote(next);
    return next;
  }
  async removeNote(fileOrPath) {
    const path = typeof fileOrPath === "string" ? fileOrPath : fileOrPath.path;
    const record = this.index.noteByPath(path);
    if (!record) return [];
    const affected = this.index.referencesForNote(record.id).map((reference) => reference.assetPath);
    await this.removeNoteRecord(record);
    return [...new Set(affected)];
  }
  async refreshManagedAsset(path) {
    var _a, _b, _c, _d, _e, _f;
    const asset = this.index.assetByPath(path);
    if (!asset) return;
    const references = this.index.referencesForAsset(path).map((reference) => {
      var _a2;
      return {
        noteId: reference.noteId,
        notePath: reference.notePath,
        containerRole: (_a2 = reference.containerRole) != null ? _a2 : roleForPath(reference.notePath),
        syntax: reference.syntax,
        firstSeenAt: reference.firstSeenAt
      };
    });
    const file = this.app.vault.getFileByPath(path);
    const exists = Boolean(file);
    const ownerStillExists = asset.ownerNoteId ? ((_a = this.index.noteById(asset.ownerNoteId)) == null ? void 0 : _a.role) === "note" : false;
    const ownerReferences = references.filter((reference) => reference.containerRole === "note");
    const nextOwner = ownerStillExists ? null : (_b = ownerReferences[0]) != null ? _b : null;
    const ownerNoteId = ownerStillExists ? asset.ownerNoteId : (_c = nextOwner == null ? void 0 : nextOwner.noteId) != null ? _c : null;
    const ownerNotePath = ownerStillExists ? asset.ownerNotePath : (_d = nextOwner == null ? void 0 : nextOwner.notePath) != null ? _d : null;
    const mtime = (_e = file == null ? void 0 : file.stat.mtime) != null ? _e : asset.mtime;
    const size = (_f = file == null ? void 0 : file.stat.size) != null ? _f : asset.size;
    const state = !exists ? "missing" : ownerReferences.length === 0 && (!asset.groupId || asset.groupRole === "source") ? "orphan" : asset.state === "needs-review" ? asset.state : "active";
    if (asset.ownerNoteId === ownerNoteId && asset.ownerNotePath === ownerNotePath && asset.mtime === mtime && asset.size === size && asset.state === state && sameManagedReferences(asset.references, references)) return;
    const next = {
      ...asset,
      ownerNoteId,
      ownerNotePath,
      references,
      mtime,
      size,
      state,
      updatedAt: Date.now()
    };
    await this.index.upsertAsset(next);
    await this.metaStore.writeAsset(next);
  }
  async rebuild() {
    await this.repository.clearDerivedData();
    this.index.load(await this.repository.snapshot());
    const meta = await this.metaStore.snapshot();
    await this.hydrateFromMeta(meta);
    this.index.load(await this.repository.snapshot());
    return this.initialize(true);
  }
  async repairMeta() {
    let writes = 0;
    for (const note of this.index.allNotes) {
      await this.metaStore.writeNote(note);
      writes += 1;
    }
    for (const asset of this.index.allAssets) {
      await this.metaStore.writeAsset(asset);
      writes += 1;
    }
    for (const folder of this.index.allFolders) {
      await this.metaStore.writeFolder(folder);
      writes += 1;
    }
    for (const group of this.index.allGroups) {
      await this.metaStore.writeGroup(group);
      writes += 1;
    }
    return writes;
  }
  async adoptAsset(file, ensureFolders = true) {
    var _a, _b, _c, _d;
    if (!isAttachmentPath(file.path) || this.index.assetByPath(file.path)) return false;
    const now = Date.now();
    const allReferences = this.index.referencesForAsset(file.path);
    const noteReferences = allReferences.filter((reference) => {
      var _a2;
      return ((_a2 = reference.containerRole) != null ? _a2 : roleForPath(reference.notePath)) === "note";
    });
    const owner = noteReferences[0] ? this.index.noteById(noteReferences[0].noteId) : null;
    const group = this.index.allGroups.find((candidate) => candidate.memberPaths.some((path) => key2(path) === key2(file.path)));
    const groupRole = group ? key2(group.sourcePath) === key2(file.path) ? "source" : key2(group.previewPath) === key2(file.path) ? "preview" : "dependency" : void 0;
    const asset = {
      schemaVersion: META_SCHEMA_VERSION,
      id: createId("asset"),
      path: normalizeVaultPath(file.path),
      ownerNoteId: (owner == null ? void 0 : owner.role) === "note" ? owner.id : null,
      ownerNotePath: (owner == null ? void 0 : owner.role) === "note" ? owner.path : null,
      firstSeenAt: (_c = (_b = (_a = noteReferences[0]) == null ? void 0 : _a.firstSeenAt) != null ? _b : file.stat.ctime) != null ? _c : now,
      createdAt: (_d = file.stat.ctime) != null ? _d : now,
      updatedAt: now,
      mtime: file.stat.mtime,
      size: file.stat.size,
      state: noteReferences.length > 0 || group && groupRole !== "source" ? "active" : "orphan",
      references: allReferences.map((reference) => {
        var _a2;
        return {
          noteId: reference.noteId,
          notePath: reference.notePath,
          containerRole: (_a2 = reference.containerRole) != null ? _a2 : roleForPath(reference.notePath),
          syntax: reference.syntax,
          firstSeenAt: reference.firstSeenAt
        };
      }),
      ...group ? { groupId: group.id, groupRole } : {}
    };
    await this.index.upsertAsset(asset);
    await this.metaStore.writeAsset(asset);
    if (ensureFolders) await this.ensurePhysicalFolderMeta();
    return true;
  }
  async hydrateFromMeta(meta) {
    var _a, _b, _c;
    for (const note of meta.notes) await this.repository.putNote(note);
    const referencesByNote = /* @__PURE__ */ new Map();
    const membersByGroup = /* @__PURE__ */ new Map();
    for (const asset of meta.assets) {
      await this.repository.putAsset(asset);
      for (const reference of asset.references) {
        const key3 = `${reference.noteId}\0${reference.syntax}`;
        const records = (_a = referencesByNote.get(reference.noteId)) != null ? _a : [];
        if (records.some((record) => `${record.noteId}\0${record.syntax}` === key3 && record.assetPath === asset.path)) continue;
        records.push({
          id: `ref_${stableHash(`${reference.noteId}\0${asset.path}\0${reference.syntax}`)}`,
          assetPath: asset.path,
          occurrenceCount: 1,
          ...reference,
          containerRole: (_b = reference.containerRole) != null ? _b : roleForPath(reference.notePath)
        });
        referencesByNote.set(reference.noteId, records);
      }
      if (asset.groupId && asset.groupRole) {
        const records = (_c = membersByGroup.get(asset.groupId)) != null ? _c : [];
        records.push({
          id: `member_${stableHash(`${asset.groupId}\0${asset.id}\0${asset.path}`)}`,
          groupId: asset.groupId,
          assetId: asset.id,
          path: asset.path,
          role: asset.groupRole
        });
        membersByGroup.set(asset.groupId, records);
      }
    }
    for (const [noteId, records] of referencesByNote) await this.repository.replaceReferencesForNote(noteId, records);
    for (const folder of meta.folders) await this.repository.putFolder(folder);
    for (const group of meta.groups) await this.repository.putGroup(group);
    for (const [groupId, records] of membersByGroup) await this.repository.replaceGroupMembers(groupId, records);
    for (const operation of meta.operations) await this.repository.putOperation(operation);
  }
  async reconcileOwnerIds(meta) {
    let reconciled = false;
    const notesByPath = new Map(meta.notes.map((note) => [normalizeVaultPath(note.path).toLowerCase(), note]));
    for (const note of meta.notes) {
      const role = roleForPath(note.path);
      if (note.role !== role) {
        note.role = role;
        await this.metaStore.writeNote(note);
        reconciled = true;
      }
    }
    const groupsById = new Map(meta.groups.map((group) => [group.id, group]));
    for (const asset of meta.assets) {
      let changed = asset.schemaVersion !== META_SCHEMA_VERSION;
      asset.schemaVersion = META_SCHEMA_VERSION;
      const group = asset.groupId ? groupsById.get(asset.groupId) : void 0;
      const expectedPath = group ? expectedGroupMemberPath(group, asset) : null;
      if (expectedPath && key2(expectedPath) !== key2(asset.path)) {
        const oldPath = asset.path;
        asset.path = expectedPath;
        const file = this.app.vault.getFileByPath(expectedPath);
        if (file) {
          asset.mtime = file.stat.mtime;
          asset.size = file.stat.size;
        }
        await this.metaStore.moveAsset(oldPath, expectedPath);
        changed = true;
      }
      if (group && (asset.ownerNoteId !== group.ownerNoteId || asset.ownerNotePath !== group.ownerNotePath)) {
        asset.ownerNoteId = group.ownerNoteId;
        asset.ownerNotePath = group.ownerNotePath;
        changed = true;
      }
      const owner = asset.ownerNotePath ? notesByPath.get(normalizeVaultPath(asset.ownerNotePath).toLowerCase()) : void 0;
      if (owner && asset.ownerNoteId !== owner.id) {
        asset.ownerNoteId = owner.id;
        changed = true;
      }
      for (const reference of asset.references) {
        const referenceRole = roleForPath(reference.notePath);
        if (reference.containerRole !== referenceRole) {
          reference.containerRole = referenceRole;
          changed = true;
        }
        const note = notesByPath.get(normalizeVaultPath(reference.notePath).toLowerCase());
        if (note && reference.noteId !== note.id) {
          reference.noteId = note.id;
          changed = true;
        }
      }
      if (changed) await this.metaStore.writeAsset(asset);
      reconciled || (reconciled = changed);
    }
    for (const folder of meta.folders) {
      let changed = folder.schemaVersion !== META_SCHEMA_VERSION;
      folder.schemaVersion = META_SCHEMA_VERSION;
      const group = folder.groupId ? groupsById.get(folder.groupId) : void 0;
      if (group && key2(folder.path) !== key2(group.rootPath)) {
        const oldPath = folder.path;
        folder.path = group.rootPath;
        await this.metaStore.moveFolder(oldPath, folder.path);
        changed = true;
      }
      if (group) {
        changed || (changed = folder.ownerNoteId !== group.ownerNoteId || folder.ownerNotePath !== group.ownerNotePath);
        folder.ownerNoteId = group.ownerNoteId;
        folder.ownerNotePath = group.ownerNotePath;
      }
      const owner = folder.ownerNotePath ? notesByPath.get(normalizeVaultPath(folder.ownerNotePath).toLowerCase()) : void 0;
      if (owner && folder.ownerNoteId !== owner.id) {
        folder.ownerNoteId = owner.id;
        changed = true;
      }
      if (changed) await this.metaStore.writeFolder(folder);
      reconciled || (reconciled = changed);
    }
    for (const group of meta.groups) {
      if (group.schemaVersion !== META_SCHEMA_VERSION) {
        group.schemaVersion = META_SCHEMA_VERSION;
        await this.metaStore.writeGroup(group);
        reconciled = true;
      }
      const owner = notesByPath.get(normalizeVaultPath(group.ownerNotePath).toLowerCase());
      if (!owner || group.ownerNoteId === owner.id) continue;
      group.ownerNoteId = owner.id;
      await this.metaStore.writeGroup(group);
      reconciled = true;
    }
    return reconciled;
  }
  async refreshAllManagedAssetStates() {
    for (const asset of this.index.allAssets) await this.refreshManagedAsset(asset.path);
  }
  async adoptUnmanagedAssets() {
    let adopted = 0;
    for (const file of this.app.vault.getFiles()) {
      if (await this.adoptAsset(file, false)) adopted += 1;
    }
    return adopted;
  }
  async ensurePhysicalFolderMeta() {
    var _a, _b, _c;
    const root = this.app.vault.getFolderByPath(ASSETS_ROOT);
    if (!root) return 0;
    let repaired = 0;
    for (const folder of collectFolders(root)) {
      if (isInsideMeta(folder.path) || this.index.folderByPath(folder.path)) continue;
      const group = this.index.allGroups.find((candidate) => key2(candidate.rootPath) === key2(folder.path));
      const assets = this.index.allAssets.filter((asset) => pathStartsWith(asset.path, folder.path));
      const ownerIds = new Set(assets.map((asset) => asset.ownerNoteId).filter((id) => Boolean(id)));
      const owner = ownerIds.size === 1 ? this.index.noteById((_a = [...ownerIds][0]) != null ? _a : "") : null;
      const depth = normalizeVaultPath(folder.path).split("/").length;
      const record = {
        schemaVersion: META_SCHEMA_VERSION,
        id: createId("folder"),
        path: folder.path,
        kind: folder.path === ASSETS_ROOT ? "assets-root" : group ? "visual-group" : depth === 2 && folder.name.startsWith("NoteAssets_") ? "note-assets" : "ordinary",
        ownerNoteId: (owner == null ? void 0 : owner.role) === "note" ? owner.id : (_b = group == null ? void 0 : group.ownerNoteId) != null ? _b : null,
        ownerNotePath: (owner == null ? void 0 : owner.role) === "note" ? owner.path : (_c = group == null ? void 0 : group.ownerNotePath) != null ? _c : null,
        ...group ? { groupId: group.id } : {},
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      await this.index.upsertFolder(record);
      await this.metaStore.writeFolder(record);
      repaired += 1;
    }
    return repaired;
  }
  async removeOutOfBoundaryAssets() {
    for (const asset of [...this.index.allAssets]) {
      if (isAttachmentPath(asset.path)) continue;
      await this.index.removeAsset(asset.id);
      await this.metaStore.removeAsset(asset.path);
    }
  }
  async removeNoteRecord(record) {
    const references = this.index.referencesForNote(record.id);
    await this.index.replaceReferencesForNote(record.id, []);
    await this.index.removeNote(record.id);
    await this.metaStore.removeNote(record.path);
    for (const path of new Set(references.map((reference) => reference.assetPath))) await this.refreshManagedAsset(path);
  }
  async ensureRootFolderMeta() {
    const existing = this.index.folderByPath(ASSETS_ROOT);
    const now = Date.now();
    const root = existing != null ? existing : {
      schemaVersion: META_SCHEMA_VERSION,
      id: createId("folder"),
      path: ASSETS_ROOT,
      kind: "assets-root",
      ownerNoteId: null,
      ownerNotePath: null,
      createdAt: now,
      updatedAt: now
    };
    await this.index.upsertFolder(root);
    await this.metaStore.writeFolder(root);
  }
  diagnoseIntegrityIssues() {
    const issues = /* @__PURE__ */ new Map();
    const add2 = (path, reason) => {
      issues.set(`${key2(path)}\0${reason}`, { path, reason });
    };
    for (const group of this.index.allGroups) {
      if (!isAttachmentPath(group.sourcePath)) add2(group.sourcePath, "Visual attachment group source is outside Assets");
      for (const path of group.memberPaths) {
        if (!this.index.assetByPath(path)) add2(path, "Visual attachment group member has no asset record");
        if (!this.app.vault.getFileByPath(path)) add2(path, "Visual attachment group member is missing");
      }
    }
    for (const asset of this.index.allAssets) {
      if (asset.groupId && !this.index.groupById(asset.groupId)) {
        add2(asset.path, "Attachment references a missing visual group record");
      }
    }
    return [...issues.values()];
  }
};
function noteKind(path) {
  const lower = path.toLowerCase();
  if (lower.endsWith(".excalidraw.md")) return "excalidraw";
  if (lower.endsWith(".canvas")) return "canvas";
  return "markdown";
}
function roleForPath(path) {
  return isInsideAssets(path) ? "visual-attachment" : "note";
}
function collectFolders(root) {
  const result = [root];
  for (const child of root.children) if (isFolder(child)) result.push(...collectFolders(child));
  return result;
}
function isFolder(file) {
  return "children" in file && Array.isArray(file.children);
}
function hasDurableData(meta) {
  return meta.notes.length > 0 || meta.assets.length > 0 || meta.folders.length > 0 || meta.groups.length > 0;
}
function cacheMatchesMeta(snapshot, meta) {
  if (!samePathIdentities(snapshot.notes, meta.notes, (record) => record.path)) return false;
  if (!samePathIdentities(snapshot.assets, meta.assets, (record) => record.path)) return false;
  if (!samePathIdentities(snapshot.folders, meta.folders, (record) => record.path)) return false;
  if (!samePathIdentities(snapshot.groups, meta.groups, (record) => record.rootPath)) return false;
  const cachedReferences2 = snapshot.references.map(
    (reference) => {
      var _a;
      return `${key2(reference.assetPath)}\0${reference.noteId}\0${(_a = reference.containerRole) != null ? _a : roleForPath(reference.notePath)}\0${reference.syntax}`;
    }
  );
  const durableReferences = meta.assets.flatMap(
    (asset) => asset.references.map((reference) => {
      var _a;
      return `${key2(asset.path)}\0${reference.noteId}\0${(_a = reference.containerRole) != null ? _a : roleForPath(reference.notePath)}\0${reference.syntax}`;
    })
  );
  if (!containsAllStrings(cachedReferences2, durableReferences)) return false;
  const cachedMembers = snapshot.groupMembers.map(
    (member) => `${member.groupId}\0${member.assetId}\0${key2(member.path)}\0${member.role}`
  );
  const durableMembers = meta.assets.filter((asset) => asset.groupId && asset.groupRole).map((asset) => `${asset.groupId}\0${asset.id}\0${key2(asset.path)}\0${asset.groupRole}`);
  if (!sameStrings(cachedMembers, durableMembers)) return false;
  const cachedOperations = snapshot.operations.map((operation) => `${operation.id}\0${operation.status}\0${operation.phase}`);
  const durableOperations = meta.operations.map((operation) => `${operation.id}\0${operation.status}\0${operation.phase}`);
  return sameStrings(cachedOperations, durableOperations);
}
function cacheNeedsRoleMigration(snapshot) {
  return snapshot.notes.some((note) => note.role !== "note" && note.role !== "visual-attachment") || snapshot.references.some(
    (reference) => reference.containerRole !== "note" && reference.containerRole !== "visual-attachment"
  );
}
function sameManagedReferences(left, right) {
  if (left.length !== right.length) return false;
  const identity = (reference) => {
    var _a;
    return [
      reference.noteId,
      key2(reference.notePath),
      (_a = reference.containerRole) != null ? _a : roleForPath(reference.notePath),
      reference.syntax,
      reference.firstSeenAt
    ].join("\0");
  };
  return sameStrings(left.map(identity), right.map(identity));
}
function shouldRunFullReferenceScan(forced, cacheHydratedFromMeta, hasUnmanagedPhysicalAssets, cachedContainerCount) {
  return forced || cacheHydratedFromMeta || hasUnmanagedPhysicalAssets || cachedContainerCount === 0;
}
function throwIfAborted(signal) {
  if (!(signal == null ? void 0 : signal.aborted)) return;
  const error = new Error("Reference scan canceled");
  error.name = "AbortError";
  throw error;
}
async function yieldToUi() {
  await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
}
function samePathIdentities(cached, durable, path) {
  if (cached.length !== durable.length) return false;
  const durableByPath = new Map(durable.map((record) => [key2(path(record)), record.id]));
  return cached.every((record) => durableByPath.get(key2(path(record))) === record.id);
}
function sameStrings(left, right) {
  if (left.length !== right.length) return false;
  left.sort();
  right.sort();
  return left.every((value, index) => value === right[index]);
}
function containsAllStrings(values, required) {
  const available = new Set(values);
  return required.every((value) => available.has(value));
}
function key2(path) {
  return normalizeVaultPath(path).toLowerCase();
}
function expectedGroupMemberPath(group, asset) {
  var _a;
  if (asset.groupRole === "source") return group.sourcePath;
  if (asset.groupRole === "preview") return group.previewPath;
  if (asset.groupRole !== "dependency") return null;
  const dependencies = group.memberPaths.filter(
    (path) => key2(path) !== key2(group.sourcePath) && key2(path) !== key2(group.previewPath)
  );
  return (_a = dependencies.find((path) => basename(path) === basename(asset.path))) != null ? _a : dependencies.length === 1 ? dependencies[0] : null;
}

// src/services/folder-service.ts
var import_obsidian = require("obsidian");
var FolderService = class {
  constructor(app, index, metaStore) {
    this.app = app;
    this.index = index;
    this.metaStore = metaStore;
  }
  async ensureNoteAssetsFolder(note) {
    if (note.role !== "note") throw new Error(`Attachment owner must be a Note: ${note.path}`);
    const direct = `${ASSETS_ROOT}/${noteAssetsFolderName(note.basename)}`;
    const directMeta = this.index.folderByPath(direct);
    const directFolder = this.app.vault.getAbstractFileByPath(direct);
    const path = !directFolder && !directMeta || (directMeta == null ? void 0 : directMeta.ownerNoteId) === note.id ? direct : `${ASSETS_ROOT}/${noteAssetsFolderName(note.basename, shortId(note.id))}`;
    await this.ensureFolder(path, "note-assets", note.id, note.path);
    return path;
  }
  async ensureFolder(path, kind = "ordinary", ownerNoteId = null, ownerNotePath = null, groupId) {
    var _a, _b, _c, _d, _e;
    const normalized = normalizeVaultPath(path);
    if (!isInsideAssets(normalized) || isInsideMeta(normalized)) {
      throw new Error(`Managed folder must be inside ${ASSETS_ROOT}: ${normalized}`);
    }
    const segments = normalized.split("/");
    let current = "";
    for (const segment of segments) {
      current = current ? `${current}/${segment}` : segment;
      if (!this.app.vault.getAbstractFileByPath(current)) await this.app.vault.createFolder(current);
      const existing = this.index.folderByPath(current);
      const isTarget = current === normalized;
      const now = Date.now();
      const meta = {
        schemaVersion: META_SCHEMA_VERSION,
        id: (_a = existing == null ? void 0 : existing.id) != null ? _a : createId("folder"),
        path: current,
        kind: current === ASSETS_ROOT ? "assets-root" : isTarget ? kind : (_b = existing == null ? void 0 : existing.kind) != null ? _b : "ordinary",
        ownerNoteId: isTarget ? ownerNoteId : (_c = existing == null ? void 0 : existing.ownerNoteId) != null ? _c : null,
        ownerNotePath: isTarget ? ownerNotePath : (_d = existing == null ? void 0 : existing.ownerNotePath) != null ? _d : null,
        ...isTarget && groupId ? { groupId } : (existing == null ? void 0 : existing.groupId) ? { groupId: existing.groupId } : {},
        createdAt: (_e = existing == null ? void 0 : existing.createdAt) != null ? _e : now,
        updatedAt: now
      };
      await this.index.upsertFolder(meta);
      await this.metaStore.writeFolder(meta);
    }
    const result = this.index.folderByPath(normalized);
    if (!result) throw new Error(`Unable to create folder meta: ${normalized}`);
    return result;
  }
  folderForNote(noteId) {
    var _a;
    return (_a = this.index.allFolders.find((folder) => folder.kind === "note-assets" && folder.ownerNoteId === noteId)) != null ? _a : null;
  }
  noteForDestination(path) {
    var _a;
    const parent = this.index.allFolders.filter((folder) => folder.kind === "note-assets" && pathStartsWith(path, folder.path)).sort((left, right) => right.path.length - left.path.length)[0];
    const managedOwner = (parent == null ? void 0 : parent.ownerNoteId) ? this.index.noteById(parent.ownerNoteId) : null;
    if ((managedOwner == null ? void 0 : managedOwner.role) === "note") return managedOwner;
    const noteFolder = normalizeVaultPath(path).split("/").find((segment) => segment.startsWith("NoteAssets_"));
    if (!noteFolder) return null;
    const expectedBasename = noteFolder.slice("NoteAssets_".length).replace(/_[a-z0-9]{6}$/i, "");
    const candidates = this.index.allNotes.filter(
      (note) => note.role === "note" && note.basename === expectedBasename
    );
    return candidates.length === 1 ? (_a = candidates[0]) != null ? _a : null : null;
  }
  async cleanupManagedEmptyFolders(startPath = ASSETS_ROOT) {
    const normalized = normalizeVaultPath(startPath);
    const root = this.app.vault.getAbstractFileByPath(normalized);
    if (!(root instanceof import_obsidian.TFolder)) return [];
    const folders = collectFolders2(root).filter((folder) => folder.path !== ASSETS_ROOT && !isInsideMeta(folder.path)).sort((left, right) => right.path.split("/").length - left.path.split("/").length);
    const removed = [];
    for (const folder of folders) {
      const current = this.app.vault.getAbstractFileByPath(folder.path);
      if (!(current instanceof import_obsidian.TFolder) || logicalChildren(current).length > 0) continue;
      const meta = this.index.folderByPath(current.path);
      if (meta) await this.index.removeFolder(meta.id);
      await this.metaStore.removeFolder(current.path);
      await this.app.vault.delete(current, true);
      removed.push(current.path);
    }
    return removed;
  }
  async cleanupParentChain(path) {
    const removed = [];
    let currentPath = dirname(path);
    while (currentPath && currentPath !== ASSETS_ROOT && isInsideAssets(currentPath)) {
      const current = this.app.vault.getAbstractFileByPath(currentPath);
      if (!(current instanceof import_obsidian.TFolder) || logicalChildren(current).length > 0) break;
      const meta = this.index.folderByPath(currentPath);
      if (meta) await this.index.removeFolder(meta.id);
      await this.metaStore.removeFolder(currentPath);
      await this.app.vault.delete(current, true);
      removed.push(currentPath);
      currentPath = dirname(currentPath);
    }
    return removed;
  }
  async auditEmptyFolders(rootPath) {
    const normalized = normalizeVaultPath(rootPath);
    const root = normalized ? this.app.vault.getAbstractFileByPath(normalized) : this.app.vault.getRoot();
    if (!(root instanceof import_obsidian.TFolder)) return [];
    const emptyFolders = [];
    collectLogicalEmptyFolders(root, root.path, emptyFolders);
    return emptyFolders;
  }
  async deleteEmptyFolder(path, mode) {
    const folder = this.app.vault.getFolderByPath(path);
    if (!folder || hasLogicalFile(folder)) return false;
    if (mode === "permanent") await this.app.vault.delete(folder, true);
    else await this.app.vault.trash(folder, mode === "system-trash");
    if (isInsideAssets(path)) {
      for (const meta of this.index.allFolders.filter((candidate) => pathStartsWith(candidate.path, path))) {
        await this.index.removeFolder(meta.id);
        await this.metaStore.removeFolder(meta.path);
      }
    }
    return true;
  }
};
function collectFolders2(root) {
  const result = [root];
  for (const child of root.children) {
    if (child instanceof import_obsidian.TFolder) result.push(...collectFolders2(child));
  }
  return result;
}
function logicalChildren(folder) {
  return folder.children.filter((child) => !isInsideMeta(child.path));
}
function hasLogicalFile(folder) {
  for (const child of logicalChildren(folder)) {
    if (!(child instanceof import_obsidian.TFolder) || hasLogicalFile(child)) return true;
  }
  return false;
}
function collectLogicalEmptyFolders(folder, rootPath, result) {
  let containsFile = false;
  for (const child of logicalChildren(folder)) {
    if (child instanceof import_obsidian.TFolder) {
      if (collectLogicalEmptyFolders(child, rootPath, result)) containsFile = true;
    } else {
      containsFile = true;
    }
  }
  if (!containsFile && folder.path !== rootPath && folder.path !== META_ROOT && !pathStartsWith(folder.path, META_ROOT)) {
    result.push(folder.path);
  }
  return containsFile;
}

// src/services/attachment-service.ts
var import_obsidian3 = require("obsidian");

// src/utils/time.ts
function formatTimestamp(date = /* @__PURE__ */ new Date()) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join("");
}
function pad(value) {
  return value.toString().padStart(2, "0");
}

// src/services/attachment-naming.ts
function attachmentBaseName(noteBasename, timestamp = formatTimestamp()) {
  const note = sanitizeFilename(noteBasename, "Note").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return `${note || "Note"}-${timestamp}`;
}

// src/services/remote-resource.ts
var import_obsidian2 = require("obsidian");
async function fetchRemoteResource(url) {
  var _a, _b;
  const response = await (0, import_obsidian2.requestUrl)({ url });
  if (response.status >= 400) throw new Error(`Remote attachment request failed: HTTP ${response.status}`);
  const mime = ((_b = (_a = headerValue(response.headers, "content-type")) == null ? void 0 : _a.split(";", 1)[0]) == null ? void 0 : _b.trim()) || mimeFromUrl(url);
  return {
    buffer: response.arrayBuffer,
    filename: remoteFilename(url, mime),
    mime
  };
}
function isRemoteUrl(value) {
  return /^https?:\/\//i.test(value.trim());
}
function remoteFilename(url, mime) {
  let name = "remote-attachment";
  try {
    name = decodeURIComponent(basename(new URL(url).pathname)) || name;
  } catch (e) {
  }
  const safe = sanitizeFilename(name, "remote-attachment");
  if (extension(safe)) return safe;
  return `${safe}.${extensionFromMime(mime)}`;
}
function headerValue(headers, name) {
  const entry = Object.entries(headers).find(([key3]) => key3.toLowerCase() === name);
  return entry == null ? void 0 : entry[1];
}
function mimeFromUrl(url) {
  try {
    const ext = extension(new URL(url).pathname);
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "svg") return "image/svg+xml";
    if (ext === "webp") return "image/webp";
    if (ext === "gif") return "image/gif";
    if (ext === "avif") return "image/avif";
  } catch (e) {
  }
  return "image/png";
}
function extensionFromMime(mime) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/svg+xml") return "svg";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/avif") return "avif";
  if (mime === "application/pdf") return "pdf";
  return "png";
}

// src/services/attachment-service.ts
async function deleteAbstractFile(app, file, mode) {
  if (mode === "permanent") {
    await app.vault.delete(file, true);
    return;
  }
  await app.vault.trash(file, mode === "system-trash");
}
var AttachmentService = class {
  constructor(app, index, metaStore, coordinator, references, folders, indexCoordinator) {
    this.app = app;
    this.index = index;
    this.metaStore = metaStore;
    this.coordinator = coordinator;
    this.references = references;
    this.folders = folders;
    this.indexCoordinator = indexCoordinator;
  }
  async ingestExternal(file, owner) {
    const folder = await this.folders.ensureNoteAssetsFolder(owner);
    const path = await this.nextAttachmentPath(owner, extension(file.name), folder);
    const created = await this.app.vault.createBinary(path, await file.arrayBuffer());
    await this.registerAsset(created, owner);
    return created;
  }
  async ingestRemote(url, owner) {
    const resource = await fetchRemoteResource(url);
    return this.ingestExternal(new File([resource.buffer], resource.filename, { type: resource.mime }), owner);
  }
  async setAsAttachment(file, owner) {
    if (this.index.assetByPath(file.path)) return file;
    const folder = await this.folders.ensureNoteAssetsFolder(owner);
    const oldPath = file.path;
    const notePaths = this.index.referencesForAsset(oldPath).map((reference) => reference.notePath);
    return this.coordinator.enqueue("set-as-attachment", [oldPath, folder], async (context) => {
      const destination = await this.nextAttachmentPath(owner, file.extension, folder);
      context.journal.affectedPaths.push(destination);
      await context.setPhase("rewrite-references");
      await this.references.mutateNotePaths(notePaths, { oldPath, newPath: destination });
      try {
        await context.setPhase("move-file");
        await context.mute([oldPath, destination], () => this.app.vault.rename(file, destination));
      } catch (error) {
        await this.references.mutateNotePaths(notePaths, { oldPath: destination, newPath: oldPath });
        throw error;
      }
      const moved = this.requireFile(destination);
      await this.rescanNotePaths(notePaths);
      await context.setPhase("write-meta");
      await this.registerAsset(moved, owner, oldPath);
      return moved;
    });
  }
  async rename(path, requestedName) {
    const asset = this.index.assetByPath(path);
    if (!asset) throw new Error("This file is not managed");
    const group = asset.groupId ? this.index.groupById(asset.groupId) : null;
    if (group) return this.renameGroup(group.id, requestedName);
    const safe = sanitizeFilename(requestedName, removeExtension(basename(path)));
    const ext = basename(path).slice(removeExtension(basename(path)).length);
    const destination = await this.uniquePath(`${dirname(path)}/${safe}${ext}`);
    await this.moveRegular(path, destination, asset.ownerNoteId, asset.ownerNotePath);
    return destination;
  }
  async deleteManaged(path, choices = [], mode = "obsidian-trash") {
    const asset = this.index.assetByPath(path);
    if (!asset) throw new Error("This file is not managed");
    const group = asset.groupId ? this.index.groupById(asset.groupId) : null;
    if (group) {
      await this.deleteGroup(group.id, choices, mode);
      return;
    }
    const notePaths = this.index.referencesForAsset(path).map((reference) => reference.notePath);
    await this.coordinator.enqueue("delete-attachment", [path, ...notePaths], async (context) => {
      await context.setPhase("remove-references");
      await this.references.mutateNotePaths(notePaths, { oldPath: path, remove: true });
      const file = this.app.vault.getFileByPath(path);
      if (file) {
        await context.setPhase("trash-file");
        await context.mute([path], () => deleteAbstractFile(this.app, file, mode));
      }
      await this.index.removeAsset(asset.id);
      await this.metaStore.removeAsset(path);
      await this.folders.cleanupParentChain(path);
    });
  }
  async transferOwnerIfNeeded(path) {
    const asset = this.index.assetByPath(path);
    if (!asset || asset.state === "missing" || !asset.ownerNoteId) return false;
    const owner = this.index.noteById(asset.ownerNoteId);
    if (!owner) return false;
    const ownerFolder = await this.folders.ensureNoteAssetsFolder(owner);
    if (pathStartsWith(path, ownerFolder)) return false;
    const group = asset.groupId ? this.index.groupById(asset.groupId) : null;
    if (group) {
      if (group.sourcePath !== path) return false;
      const destinationRoot = await this.uniqueFolderPath(`${ownerFolder}/${basename(group.rootPath)}`);
      await this.moveGroupRoot(group.id, destinationRoot, owner);
      return true;
    }
    await this.moveRegular(path, `${ownerFolder}/${basename(path)}`, owner.id, owner.path);
    return true;
  }
  async handleExternalRename(file, oldPath) {
    if (this.coordinator.isMuted(oldPath) || this.coordinator.isMuted(file.path)) return;
    const groupAtRoot = this.index.groupByRootPath(oldPath);
    if (file instanceof import_obsidian3.TFolder && groupAtRoot) {
      await this.handleManualGroupMove(groupAtRoot.id, file.path, oldPath);
      return;
    }
    if (!(file instanceof import_obsidian3.TFile)) return;
    const asset = this.index.assetByPath(oldPath);
    if (!asset) return;
    if (asset.groupId) {
      await this.rollbackIllegalMove(file, oldPath, "Visual attachment members can only be moved as a group");
      return;
    }
    if (!isInsideAssets(file.path)) {
      await this.detachAsset(asset, oldPath, file.path);
      new import_obsidian3.Notice(`Attachment is no longer managed: ${file.path}`);
      return;
    }
    if (this.index.allGroups.some((group) => pathStartsWith(file.path, group.rootPath))) {
      await this.rollbackIllegalMove(file, oldPath, "Regular attachments cannot be moved into a visual attachment group");
      return;
    }
    const destinationOwner = this.folders.noteForDestination(file.path);
    const referencedByDestination = destinationOwner ? this.index.referencesForAsset(oldPath).some((reference) => reference.noteId === destinationOwner.id) : false;
    if (!destinationOwner || !referencedByDestination && destinationOwner.id !== asset.ownerNoteId) {
      await this.rollbackIllegalMove(file, oldPath, "Attachments may only move to a note that already references them");
      return;
    }
    const notePaths = this.index.referencesForAsset(oldPath).map((reference) => reference.notePath);
    await this.references.mutateNotePaths(notePaths, { oldPath, newPath: file.path });
    await this.updateMovedAsset(asset, oldPath, file.path, destinationOwner);
    new import_obsidian3.Notice(`Attachment moved; owner is now ${destinationOwner.basename}`);
  }
  async handleExternalDelete(path) {
    if (this.coordinator.isMuted(path)) return false;
    const asset = this.index.assetByPath(path);
    if (!asset) return false;
    const next = { ...asset, state: "missing", updatedAt: Date.now() };
    await this.index.upsertAsset(next);
    await this.metaStore.writeAsset(next);
    return true;
  }
  async handleNoteRename(note, oldBasename) {
    for (const asset of this.index.allAssets.filter((candidate) => candidate.ownerNoteId === note.id)) {
      const next = { ...asset, ownerNotePath: note.path, updatedAt: Date.now() };
      await this.index.upsertAsset(next);
      await this.metaStore.writeAsset(next);
    }
    for (const folderMeta of this.index.allFolders.filter((candidate) => candidate.ownerNoteId === note.id)) {
      const next = { ...folderMeta, ownerNotePath: note.path, updatedAt: Date.now() };
      await this.index.upsertFolder(next);
      await this.metaStore.writeFolder(next);
    }
    for (const group of this.index.allGroups.filter((candidate) => candidate.ownerNoteId === note.id)) {
      const next = { ...group, ownerNotePath: note.path, updatedAt: Date.now() };
      await this.index.upsertGroup(next);
      await this.metaStore.writeGroup(next);
    }
    if (note.basename === oldBasename) return false;
    const folder = this.folders.folderForNote(note.id);
    if (!folder) return false;
    const desired = `${dirname(folder.path)}/NoteAssets_${sanitizeFilename(note.basename)}`;
    const destination = this.app.vault.getAbstractFileByPath(desired) ? `${desired}_${shortId(note.id)}` : desired;
    await this.moveManagedTree(folder.path, destination, note);
    return true;
  }
  async registerAsset(file, owner, previousPath) {
    var _a, _b, _c;
    const now = Date.now();
    const previous = previousPath ? this.index.assetByPath(previousPath) : this.index.assetByPath(file.path);
    const references = this.index.referencesForAsset(previousPath != null ? previousPath : file.path).map((reference) => ({
      noteId: reference.noteId,
      notePath: reference.notePath,
      containerRole: reference.containerRole,
      syntax: reference.syntax,
      firstSeenAt: reference.firstSeenAt
    }));
    const asset = {
      schemaVersion: META_SCHEMA_VERSION,
      id: (_a = previous == null ? void 0 : previous.id) != null ? _a : createId("asset"),
      path: file.path,
      ownerNoteId: owner.id,
      ownerNotePath: owner.path,
      firstSeenAt: (_b = previous == null ? void 0 : previous.firstSeenAt) != null ? _b : now,
      createdAt: (_c = previous == null ? void 0 : previous.createdAt) != null ? _c : now,
      updatedAt: now,
      mtime: file.stat.mtime,
      size: file.stat.size,
      state: "active",
      references
    };
    if (previousPath && !pathEquals(previousPath, file.path)) {
      await this.metaStore.moveAsset(previousPath, file.path);
      if (previous) await this.index.removeAsset(previous.id);
    }
    await this.index.upsertAsset(asset);
    await this.metaStore.writeAsset(asset);
    return asset;
  }
  async registerUnowned(file, state = "needs-review") {
    var _a, _b, _c;
    const now = Date.now();
    const existing = this.index.assetByPath(file.path);
    const asset = {
      schemaVersion: META_SCHEMA_VERSION,
      id: (_a = existing == null ? void 0 : existing.id) != null ? _a : createId("asset"),
      path: file.path,
      ownerNoteId: null,
      ownerNotePath: null,
      firstSeenAt: (_b = existing == null ? void 0 : existing.firstSeenAt) != null ? _b : now,
      createdAt: (_c = existing == null ? void 0 : existing.createdAt) != null ? _c : now,
      updatedAt: now,
      mtime: file.stat.mtime,
      size: file.stat.size,
      state,
      references: this.index.referencesForAsset(file.path).map((reference) => ({
        noteId: reference.noteId,
        notePath: reference.notePath,
        containerRole: reference.containerRole,
        syntax: reference.syntax,
        firstSeenAt: reference.firstSeenAt
      }))
    };
    await this.index.upsertAsset(asset);
    await this.metaStore.writeAsset(asset);
    return asset;
  }
  async moveRegular(path, destinationPath, ownerNoteId, ownerNotePath) {
    const file = this.requireFile(path);
    const asset = this.index.assetByPath(path);
    if (!asset) throw new Error(`Managed asset not found: ${path}`);
    const destination = await this.uniquePath(destinationPath);
    const notePaths = this.index.referencesForAsset(path).map((reference) => reference.notePath);
    await this.coordinator.enqueue("move-attachment", [path, destination], async (context) => {
      await context.setPhase("rewrite-references");
      await this.references.mutateNotePaths(notePaths, { oldPath: path, newPath: destination });
      try {
        await context.setPhase("move-file");
        await context.mute([path, destination], () => this.app.vault.rename(file, destination));
      } catch (error) {
        await this.references.mutateNotePaths(notePaths, { oldPath: destination, newPath: path });
        throw error;
      }
      await this.metaStore.moveAsset(path, destination);
      const moved = this.requireFile(destination);
      const next = {
        ...asset,
        path: destination,
        ownerNoteId,
        ownerNotePath,
        mtime: moved.stat.mtime,
        size: moved.stat.size,
        updatedAt: Date.now()
      };
      await this.index.upsertAsset(next);
      await this.metaStore.writeAsset(next);
      await this.rescanNotePaths(notePaths);
      await this.folders.cleanupParentChain(path);
    });
  }
  async renameGroup(groupId, requestedName) {
    var _a, _b;
    const group = this.index.groupById(groupId);
    if (!group) throw new Error("Visual attachment group not found");
    const owner = this.index.noteById(group.ownerNoteId);
    if (!owner) throw new Error("Visual attachment owner is missing");
    const safe = sanitizeFilename(requestedName, removeExtension(basename(group.sourcePath)));
    const destinationRoot = await this.uniqueFolderPath(`${dirname(group.rootPath)}/${safe}`);
    await this.moveGroupRoot(groupId, destinationRoot, owner, safe);
    return (_b = (_a = this.index.groupById(groupId)) == null ? void 0 : _a.sourcePath) != null ? _b : group.sourcePath;
  }
  async moveGroupRoot(groupId, destinationRoot, owner, renameBase) {
    const group = this.index.groupById(groupId);
    const folder = group ? this.app.vault.getFolderByPath(group.rootPath) : null;
    if (!group || !folder) throw new Error("Visual attachment group folder is missing");
    const mappings = this.groupMappings(group, destinationRoot, renameBase);
    const affectedNotes = /* @__PURE__ */ new Set();
    affectedNotes.add(group.sourcePath);
    for (const [oldPath] of mappings) {
      for (const reference of this.index.referencesForAsset(oldPath)) affectedNotes.add(reference.notePath);
    }
    await this.coordinator.enqueue("move-visual-group", [group.rootPath, destinationRoot], async (context) => {
      await context.setPhase("rewrite-references");
      for (const [oldPath, newPath] of mappings) {
        await this.references.mutateNotePaths(affectedNotes, { oldPath, newPath });
      }
      await context.setPhase("move-group");
      await context.mute([group.rootPath, destinationRoot], () => this.app.vault.rename(folder, destinationRoot));
      for (const [oldPath, mappedPath] of mappings) {
        const afterRootMove = oldPath.replace(group.rootPath, destinationRoot);
        if (!pathEquals(afterRootMove, mappedPath)) {
          const member = this.requireFile(afterRootMove);
          await context.mute([afterRootMove, mappedPath], () => this.app.vault.rename(member, mappedPath));
        }
      }
      await this.updateGroupMappings(groupId, mappings, destinationRoot, owner);
      await this.rescanNotePaths([...affectedNotes].map((path) => {
        var _a;
        return (_a = mappings.get(path)) != null ? _a : path;
      }));
      await this.folders.cleanupParentChain(group.rootPath);
    });
  }
  groupMappings(group, destinationRoot, renameBase) {
    const mappings = /* @__PURE__ */ new Map();
    for (const path of group.memberPaths) mappings.set(path, path.replace(group.rootPath, destinationRoot));
    if (renameBase) {
      const sourceSuffix = basename(group.sourcePath).slice(removeExtension(basename(group.sourcePath)).length);
      mappings.set(group.sourcePath, `${destinationRoot}/${renameBase}${sourceSuffix}`);
      mappings.set(group.previewPath, `${destinationRoot}/${renameBase}.preview.png`);
    }
    return mappings;
  }
  async updateGroupMappings(groupId, mappings, rootPath, owner) {
    var _a, _b, _c, _d;
    const group = this.index.groupById(groupId);
    if (!group) return;
    const nextSourcePath = (_a = mappings.get(group.sourcePath)) != null ? _a : group.sourcePath;
    if (!pathEquals(group.sourcePath, nextSourcePath)) {
      await this.indexCoordinator.moveNotePath(this.requireFile(nextSourcePath), group.sourcePath);
    }
    const members = this.index.groupMembers(groupId);
    for (const member of members) {
      const nextPath = (_b = mappings.get(member.path)) != null ? _b : member.path;
      const asset = this.index.assetById(member.assetId);
      if (asset) {
        await this.metaStore.moveAsset(asset.path, nextPath);
        const file = this.requireFile(nextPath);
        const nextAsset = { ...asset, path: nextPath, ownerNoteId: owner.id, ownerNotePath: owner.path, mtime: file.stat.mtime, size: file.stat.size, updatedAt: Date.now() };
        await this.index.upsertAsset(nextAsset);
        await this.metaStore.writeAsset(nextAsset);
      }
    }
    await this.index.replaceGroupMembers(
      groupId,
      members.map((member) => {
        var _a2;
        return { ...member, path: (_a2 = mappings.get(member.path)) != null ? _a2 : member.path };
      })
    );
    await this.metaStore.moveGroup(group.rootPath, rootPath);
    const next = {
      ...group,
      rootPath,
      sourcePath: (_c = mappings.get(group.sourcePath)) != null ? _c : group.sourcePath,
      previewPath: (_d = mappings.get(group.previewPath)) != null ? _d : group.previewPath,
      memberPaths: group.memberPaths.map((path) => {
        var _a2;
        return (_a2 = mappings.get(path)) != null ? _a2 : path;
      }),
      ownerNoteId: owner.id,
      ownerNotePath: owner.path,
      updatedAt: Date.now(),
      revision: createId("rev")
    };
    await this.index.upsertGroup(next);
    await this.metaStore.writeGroup(next);
    const folderMeta = this.index.folderByPath(group.rootPath);
    if (folderMeta) {
      await this.metaStore.moveFolder(group.rootPath, rootPath);
      const nextFolder = { ...folderMeta, path: rootPath, ownerNoteId: owner.id, ownerNotePath: owner.path, updatedAt: Date.now() };
      await this.index.upsertFolder(nextFolder);
      await this.metaStore.writeFolder(nextFolder);
    }
  }
  async moveManagedTree(oldRoot, newRoot, owner) {
    const regularAssets = this.index.allAssets.filter((asset) => pathStartsWith(asset.path, oldRoot) && !asset.groupId);
    const groups = this.index.allGroups.filter((group) => pathStartsWith(group.rootPath, oldRoot));
    for (const asset of regularAssets) {
      await this.moveRegular(asset.path, asset.path.replace(oldRoot, newRoot), owner.id, owner.path);
    }
    for (const group of groups) {
      await this.moveGroupRoot(group.id, group.rootPath.replace(oldRoot, newRoot), owner);
    }
    const oldFolder = this.app.vault.getFolderByPath(oldRoot);
    if (oldFolder && oldFolder.children.length === 0) await this.app.vault.delete(oldFolder, true);
  }
  async deleteGroup(groupId, choices, mode) {
    var _a, _b;
    const group = this.index.groupById(groupId);
    if (!group) return;
    const choiceMap = new Map(choices.map((choice) => [choice.path, choice]));
    const members = this.index.groupMembers(groupId);
    const deletePaths = /* @__PURE__ */ new Set([group.sourcePath, group.previewPath]);
    const extract = /* @__PURE__ */ new Map();
    for (const member of members) {
      if (member.role !== "dependency") continue;
      const references = this.index.referencesForAsset(member.path).filter(
        (reference) => reference.containerRole === "note" && reference.notePath !== group.sourcePath
      );
      const choice = choiceMap.get(member.path);
      if ((choice == null ? void 0 : choice.deleteWithGroup) || references.length === 0) {
        deletePaths.add(member.path);
        continue;
      }
      const owner = (choice == null ? void 0 : choice.ownerNoteId) ? this.index.noteById(choice.ownerNoteId) : this.index.noteById((_b = (_a = references[0]) == null ? void 0 : _a.noteId) != null ? _b : "");
      if (owner) extract.set(member.path, owner);
      else deletePaths.add(member.path);
    }
    for (const [path, owner] of extract) {
      const folder = await this.folders.ensureNoteAssetsFolder(owner);
      await this.moveRegular(path, `${folder}/${basename(path)}`, owner.id, owner.path);
      const moved = this.index.allAssets.find((asset) => {
        var _a2;
        return asset.id === ((_a2 = this.index.groupMemberByPath(path)) == null ? void 0 : _a2.assetId);
      });
      if (moved) {
        const detached = { ...moved, groupId: void 0, groupRole: void 0, updatedAt: Date.now() };
        await this.index.upsertAsset(detached);
        await this.metaStore.writeAsset(detached);
      }
    }
    await this.coordinator.enqueue("delete-visual-group", [...group.memberPaths], async (context) => {
      await context.setPhase("remove-references");
      for (const path of deletePaths) {
        const notePaths = this.index.referencesForAsset(path).map((reference) => reference.notePath);
        await this.references.mutateNotePaths(notePaths, { oldPath: path, remove: true });
      }
      await context.setPhase("trash-group");
      const root = this.app.vault.getFolderByPath(group.rootPath);
      if (root) await context.mute([group.rootPath], () => deleteAbstractFile(this.app, root, mode));
      for (const member of members) {
        const asset = this.index.assetById(member.assetId);
        if (asset && !extract.has(member.path)) await this.index.removeAsset(asset.id);
        if (!extract.has(member.path)) await this.metaStore.removeAsset(member.path);
      }
      await this.index.removeGroup(groupId);
      await this.metaStore.removeGroup(group.rootPath);
      await this.folders.cleanupParentChain(group.rootPath);
    });
  }
  async handleManualGroupMove(groupId, newRoot, oldRoot) {
    const group = this.index.groupById(groupId);
    if (!group) return;
    const mappings = this.groupMappings(group, newRoot);
    const affectedNotes = /* @__PURE__ */ new Set([group.ownerNotePath]);
    for (const [oldPath, newPath] of mappings) {
      for (const reference of this.index.referencesForAsset(oldPath)) affectedNotes.add(reference.notePath);
      for (const reference of this.index.referencesForAsset(newPath)) affectedNotes.add(reference.notePath);
    }
    const destinationComplete = [...mappings.values()].every((path) => Boolean(this.app.vault.getFileByPath(path)));
    if (!destinationComplete) {
      const pathsStillAtOrigin = [...mappings].filter(([oldPath]) => Boolean(this.app.vault.getFileByPath(oldPath)));
      if (pathsStillAtOrigin.length > 0) {
        await this.coordinator.enqueue(
          "reconcile-partial-visual-group-move",
          [oldRoot, newRoot, ...affectedNotes],
          async (context) => {
            await context.setPhase("restore-references");
            for (const [oldPath, newPath] of pathsStillAtOrigin) {
              await this.references.mutateNotePaths(affectedNotes, { oldPath: newPath, newPath: oldPath });
            }
            await this.rescanNotePaths(affectedNotes);
          }
        );
      }
      new import_obsidian3.Notice("Visual attachment group move is incomplete; existing sources and references were preserved");
      return;
    }
    if (!isInsideAssets(newRoot)) {
      await this.coordinator.enqueue("detach-moved-visual-group", [oldRoot, newRoot, ...affectedNotes], async (context) => {
        var _a;
        await context.setPhase("rewrite-references");
        for (const [oldPath, newPath] of mappings) {
          await this.references.mutateNotePaths(affectedNotes, { oldPath, newPath });
        }
        try {
          const newSourcePath = (_a = mappings.get(group.sourcePath)) != null ? _a : group.sourcePath;
          const newSource = this.app.vault.getFileByPath(newSourcePath);
          if (newSource) await this.indexCoordinator.moveNotePath(newSource, group.sourcePath);
          await this.detachGroup(groupId, oldRoot);
          await this.rescanNotePaths(affectedNotes);
        } catch (error) {
          await context.setPhase("rollback-references");
          for (const [oldPath, newPath] of mappings) {
            await this.references.mutateNotePaths(affectedNotes, { oldPath: newPath, newPath: oldPath });
          }
          await this.rescanNotePaths(affectedNotes);
          throw error;
        }
      });
      new import_obsidian3.Notice(`Visual attachment group is no longer managed: ${newRoot}`);
      return;
    }
    const owner = this.folders.noteForDestination(newRoot);
    const referenced = owner && this.index.referencesForAsset(group.sourcePath).some((reference) => reference.noteId === owner.id);
    if (!owner || !referenced && owner.id !== group.ownerNoteId) {
      const folder = this.app.vault.getFolderByPath(newRoot);
      if (folder) await this.coordinator.enqueue("rollback-illegal-group-move", [newRoot, oldRoot], (context) => context.mute([newRoot, oldRoot], () => this.app.vault.rename(folder, oldRoot)));
      new import_obsidian3.Notice("Visual attachment groups may only move to a note that already references them");
      return;
    }
    await this.coordinator.enqueue("reconcile-external-visual-group-move", [oldRoot, newRoot, ...affectedNotes], async (context) => {
      await context.setPhase("rewrite-references");
      for (const [oldPath, newPath] of mappings) {
        await this.references.mutateNotePaths(affectedNotes, { oldPath, newPath });
      }
      try {
        await context.setPhase("update-meta");
        await this.updateGroupMappings(groupId, mappings, newRoot, owner);
        await this.rescanNotePaths(affectedNotes);
      } catch (error) {
        await context.setPhase("rollback-references");
        for (const [oldPath, newPath] of mappings) {
          await this.references.mutateNotePaths(affectedNotes, { oldPath: newPath, newPath: oldPath });
        }
        await this.rescanNotePaths(affectedNotes);
        throw error;
      }
    });
    new import_obsidian3.Notice(`Visual attachment moved; owner is now ${owner.basename}`);
  }
  async detachGroup(groupId, oldRoot) {
    const group = this.index.groupById(groupId);
    if (!group) return;
    for (const member of this.index.groupMembers(groupId)) {
      const asset = this.index.assetById(member.assetId);
      if (!asset) continue;
      await this.index.removeAsset(asset.id);
      await this.metaStore.removeAsset(member.path);
    }
    await this.index.removeGroup(groupId);
    await this.metaStore.removeGroup(oldRoot);
  }
  async detachAsset(asset, oldPath, newPath) {
    const notes = this.index.referencesForAsset(oldPath).map((reference) => reference.notePath);
    await this.references.mutateNotePaths(notes, { oldPath, newPath });
    await this.index.removeAsset(asset.id);
    await this.metaStore.removeAsset(oldPath);
  }
  async updateMovedAsset(asset, oldPath, newPath, owner) {
    await this.metaStore.moveAsset(oldPath, newPath);
    const file = this.requireFile(newPath);
    await this.index.upsertAsset({ ...asset, path: newPath, ownerNoteId: owner.id, ownerNotePath: owner.path, mtime: file.stat.mtime, size: file.stat.size, updatedAt: Date.now() });
  }
  async rollbackIllegalMove(file, oldPath, message2) {
    const movedPath = file.path;
    const notePaths = this.index.referencesForAsset(oldPath).map((reference) => reference.notePath);
    await this.coordinator.enqueue("rollback-illegal-move", [movedPath, oldPath], async (context) => {
      await context.mute([movedPath, oldPath], () => this.app.vault.rename(file, oldPath));
      await this.references.mutateNotePaths(notePaths, { oldPath: movedPath, newPath: oldPath });
    });
    new import_obsidian3.Notice(message2);
  }
  async nextAttachmentPath(owner, fileExtension, folder) {
    const ext = fileExtension ? `.${fileExtension.toLowerCase()}` : "";
    const base = attachmentBaseName(owner.basename);
    let candidate = `${folder}/${base}${ext}`;
    let counter = 2;
    while (this.app.vault.getAbstractFileByPath(candidate)) candidate = `${folder}/${base}-${counter++}${ext}`;
    if (counter > 99) candidate = `${folder}/${base}-${shortId(createId("collision"))}${ext}`;
    return candidate;
  }
  async uniquePath(path) {
    const normalized = normalizeVaultPath(path);
    if (!this.app.vault.getAbstractFileByPath(normalized)) return normalized;
    const ext = extension(normalized);
    const suffix = ext ? `.${ext}` : "";
    const stem = suffix ? basename(normalized).slice(0, -suffix.length) : basename(normalized);
    const folder = dirname(normalized);
    let counter = 2;
    let candidate = normalized;
    while (this.app.vault.getAbstractFileByPath(candidate)) candidate = `${folder}/${stem} ${counter++}${suffix}`;
    return candidate;
  }
  async uniqueFolderPath(path) {
    const normalized = normalizeVaultPath(path);
    if (!this.app.vault.getAbstractFileByPath(normalized)) return normalized;
    let counter = 2;
    let candidate = normalized;
    while (this.app.vault.getAbstractFileByPath(candidate)) candidate = `${normalized} ${counter++}`;
    return candidate;
  }
  requireFile(path) {
    const file = this.app.vault.getFileByPath(path);
    if (!file) throw new Error(`File not found: ${path}`);
    return file;
  }
  async rescanNotePaths(paths) {
    for (const path of new Set(paths)) {
      const note = this.app.vault.getFileByPath(path);
      if (note) await this.indexCoordinator.scanNote(note);
    }
  }
};

// src/visual/visual-service.ts
var import_obsidian4 = require("obsidian");

// src/visual/canvas-renderer.ts
var PADDING = 48;
var MAX_DIMENSION = 4096;
var CANVAS_PREVIEW_RENDERER_VERSION = 2;
async function renderCanvasPreview(app, file) {
  const document2 = parseCanvas(await app.vault.cachedRead(file));
  const images = await loadNodeImages(app, file, document2);
  const bounds = canvasBounds(document2);
  const scale = Math.min(2, MAX_DIMENSION / Math.max(bounds.width + PADDING * 2, bounds.height + PADDING * 2));
  const canvas = globalThis.document.createElement("canvas");
  canvas.width = Math.max(1, Math.ceil((bounds.width + PADDING * 2) * scale));
  canvas.height = Math.max(1, Math.ceil((bounds.height + PADDING * 2) * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable");
  const palette = canvasPalette(app, file);
  context.scale(scale, scale);
  context.translate(PADDING - bounds.minX, PADDING - bounds.minY);
  drawGrid(context, bounds, palette.dots);
  drawEdges(context, document2, palette.edge);
  for (const node of document2.nodes) drawNode(context, node, images.get(node.id), palette);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  canvas.remove();
  if (!blob) throw new Error("Unable to encode Canvas preview");
  return blob.arrayBuffer();
}
function canvasBounds(document2) {
  if (document2.nodes.length === 0) return { minX: 0, minY: 0, width: 800, height: 500 };
  const minX = Math.min(...document2.nodes.map((node) => node.x));
  const minY = Math.min(...document2.nodes.map((node) => node.y));
  const maxX = Math.max(...document2.nodes.map((node) => node.x + node.width));
  const maxY = Math.max(...document2.nodes.map((node) => node.y + node.height));
  return { minX, minY, width: Math.max(1, maxX - minX), height: Math.max(1, maxY - minY) };
}
function drawGrid(context, bounds, color) {
  const spacing = 24;
  const minX = Math.floor((bounds.minX - PADDING) / spacing) * spacing;
  const minY = Math.floor((bounds.minY - PADDING) / spacing) * spacing;
  const maxX = bounds.minX + bounds.width + PADDING;
  const maxY = bounds.minY + bounds.height + PADDING;
  context.save();
  context.fillStyle = color;
  context.globalAlpha = 0.45;
  for (let x = minX; x <= maxX; x += spacing) {
    for (let y = minY; y <= maxY; y += spacing) {
      context.beginPath();
      context.arc(x, y, 1, 0, Math.PI * 2);
      context.fill();
    }
  }
  context.restore();
}
function canvasThemeFingerprint(app, file) {
  return stableHash(JSON.stringify(canvasPalette(app, file)));
}
function drawEdges(context, document2, color) {
  const nodes = new Map(document2.nodes.map((node) => [node.id, node]));
  context.strokeStyle = color;
  context.lineWidth = 2;
  for (const edge of document2.edges) {
    const from = nodes.get(edge.fromNode);
    const to = nodes.get(edge.toNode);
    if (!from || !to) continue;
    context.beginPath();
    context.moveTo(from.x + from.width / 2, from.y + from.height / 2);
    context.lineTo(to.x + to.width / 2, to.y + to.height / 2);
    context.stroke();
  }
}
function drawNode(context, node, image, palette) {
  var _a, _b, _c, _d;
  context.save();
  context.fillStyle = palette.node;
  context.globalAlpha = node.type === "group" ? 0.12 : 1;
  context.strokeStyle = colorFor(node.color, palette);
  context.lineWidth = node.type === "group" ? 1 : 2;
  roundedRect(context, node.x, node.y, node.width, node.height, 8);
  context.fill();
  context.globalAlpha = 1;
  context.stroke();
  if (node.type !== "group") {
    context.beginPath();
    context.rect(node.x + 12, node.y + 12, Math.max(1, node.width - 24), Math.max(1, node.height - 24));
    context.clip();
    if (image) {
      drawContainedImage(context, image, node.x + 12, node.y + 12, Math.max(1, node.width - 24), Math.max(1, node.height - 24));
    } else {
      context.fillStyle = palette.text;
      context.font = "16px sans-serif";
      context.textBaseline = "top";
      const label = (_d = (_c = (_b = (_a = node.text) != null ? _a : node.label) != null ? _b : node.file) != null ? _c : node.url) != null ? _d : "";
      drawWrappedText(context, label, node.x + 16, node.y + 16, Math.max(40, node.width - 32), 22, Math.max(1, Math.floor((node.height - 32) / 22)));
    }
  }
  context.restore();
}
async function loadNodeImages(app, source, document2) {
  const result = /* @__PURE__ */ new Map();
  await Promise.all(
    document2.nodes.map(async (node) => {
      if (node.type !== "file" || !node.file || !IMAGE_EXTENSIONS.has(extension(node.file))) return;
      const file = app.metadataCache.getFirstLinkpathDest(node.file, source.path);
      if (!file) return;
      const image = new Image();
      image.src = app.vault.getResourcePath(file);
      try {
        await waitForImage(image, node.file);
        result.set(node.id, image);
      } catch (e) {
      }
    })
  );
  return result;
}
function waitForImage(image, path, timeoutMs = 3e3) {
  const load = typeof image.decode === "function" ? image.decode() : new Promise((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Unable to load ${path}`));
  });
  return new Promise((resolve, reject) => {
    const timer = globalThis.setTimeout(
      () => reject(new Error(`Timed out loading ${path}`)),
      timeoutMs
    );
    load.then(
      () => {
        globalThis.clearTimeout(timer);
        resolve();
      },
      (error) => {
        globalThis.clearTimeout(timer);
        reject(error);
      }
    );
  });
}
function drawContainedImage(context, image, x, y, width, height) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}
function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
      if (lines.length >= maxLines) break;
    } else {
      line = candidate;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  lines.forEach((value, index) => context.fillText(value, x, y + index * lineHeight, maxWidth));
}
function roundedRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}
function canvasPalette(app, file) {
  const anchor = canvasThemeAnchor(app, file);
  const fallbacks = {
    "1": "#ef4444",
    "2": "#f97316",
    "3": "#eab308",
    "4": "#22c55e",
    "5": "#06b6d4",
    "6": "#8b5cf6"
  };
  return {
    node: resolveCssColor(anchor, "var(--background-primary)", "#f8fafc"),
    text: resolveCssColor(anchor, "var(--text-normal)", "#20242b"),
    border: resolveCssColor(anchor, "var(--background-modifier-border)", "#94a3b8"),
    edge: resolveCssColor(anchor, "var(--text-faint)", "#7a8290"),
    dots: resolveCssColor(anchor, "var(--text-faint)", "#7a8290"),
    colors: Object.fromEntries(
      Object.entries(fallbacks).map(([id, fallback]) => [
        id,
        resolveCssColor(anchor, `rgb(var(--canvas-color-${id}))`, fallback)
      ])
    )
  };
}
function canvasThemeAnchor(app, file) {
  var _a, _b;
  for (const leaf of app.workspace.getLeavesOfType("canvas")) {
    const view = leaf.view;
    if (((_a = view.file) == null ? void 0 : _a.path) === file.path && ((_b = view.canvas) == null ? void 0 : _b.canvasEl)) return view.canvas.canvasEl;
  }
  return document.body;
}
function resolveCssColor(anchor, expression, fallback) {
  const probe = document.createElement("span");
  probe.style.color = expression;
  probe.style.display = "none";
  anchor.append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved || fallback;
}
function colorFor(color, palette) {
  var _a;
  return color && ((_a = palette.colors[color]) != null ? _a : color) || palette.border;
}

// src/visual/excalidraw-options.ts
function excalidrawImageInsertOptions(imageFile) {
  return {
    topX: 0,
    topY: 0,
    imageFile,
    scale: false,
    anchor: false
  };
}

// src/visual/visual-service.ts
var VisualService = class {
  constructor(app, index, coordinator, references, metaStore, folders, indexCoordinator) {
    this.app = app;
    this.index = index;
    this.coordinator = coordinator;
    this.references = references;
    this.metaStore = metaStore;
    this.folders = folders;
    this.indexCoordinator = indexCoordinator;
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "previewRefreshStates", /* @__PURE__ */ new Map());
  }
  resolveVisual(sourcePath) {
    const normalizedSourcePath = normalizeVaultPath(sourcePath);
    const group = this.index.groupBySourcePath(normalizedSourcePath);
    if (group) {
      return {
        kind: group.kind,
        sourcePath: group.sourcePath,
        previewPath: group.previewPath,
        revision: group.revision,
        role: isAttachmentPath(group.sourcePath) ? "attachment" : "note"
      };
    }
    if (!isAttachmentPath(normalizedSourcePath)) return null;
    const lower = normalizedSourcePath.toLowerCase();
    const kind = lower.endsWith(".canvas") ? "canvas" : lower.endsWith(".excalidraw.md") ? "excalidraw" : null;
    if (!kind) return null;
    const source = this.app.vault.getFileByPath(normalizedSourcePath);
    if (!source) return null;
    const previewPath = `${dirname(normalizedSourcePath)}/${removeExtension(source.name)}.preview.png`;
    const preview = this.app.vault.getFileByPath(previewPath);
    if (!preview) return null;
    return {
      kind,
      sourcePath: source.path,
      previewPath: preview.path,
      revision: `recovered-${stableHash([
        source.path,
        source.stat.mtime,
        source.stat.size,
        preview.stat.mtime,
        preview.stat.size
      ].join(":"))}`,
      role: "attachment"
    };
  }
  onVisualChanged(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  announceAll() {
    for (const group of this.index.allGroups) this.emit(group.sourcePath);
  }
  async setCanvasAsAttachment(file, owner) {
    if (!file.path.toLowerCase().endsWith(".canvas")) throw new Error("Only Canvas files are supported");
    const oldPath = file.path;
    const dependencies = await this.collectLocalDependencies(file);
    const groupRoot = await this.createGroupRoot(owner, removeExtension(file.name));
    const sourcePath = await this.uniquePath(`${groupRoot}/${sanitizeFilename(file.name)}`);
    const previewPath = `${groupRoot}/${removeExtension(basename(sourcePath))}.preview.png`;
    return this.coordinator.enqueue("canvas-set-as-attachment", [oldPath, groupRoot], async (context) => {
      const dependencyPaths = await this.moveDependencies(dependencies, groupRoot, owner, context);
      await context.setPhase("rewrite-references");
      const changedNotes = await this.references.rewritePath(oldPath, sourcePath);
      try {
        await context.setPhase("move-source");
        await context.mute([oldPath, sourcePath], () => this.app.vault.rename(file, sourcePath));
      } catch (error) {
        await this.references.rewritePath(sourcePath, oldPath);
        throw error;
      }
      const source = this.requireFile(sourcePath);
      await this.indexCoordinator.moveNotePath(source, oldPath);
      await this.rescanNotes(changedNotes);
      await context.setPhase("render-preview");
      const preview = await renderCanvasPreview(this.app, source);
      await this.writeBinary(previewPath, preview);
      return this.registerGroup(context, "canvas", owner, groupRoot, sourcePath, previewPath, dependencyPaths);
    });
  }
  async adoptExistingVisual(file, owner) {
    const kind = file.path.toLowerCase().endsWith(".canvas") ? "canvas" : "excalidraw";
    const existingAsset = this.index.assetByPath(file.path);
    const dependencies = await this.collectLocalDependencies(file);
    const groupRoot = await this.createGroupRoot(owner, removeExtension(file.name));
    const sourcePath = await this.uniquePath(`${groupRoot}/${file.name}`);
    const previewPath = `${groupRoot}/${removeExtension(file.name)}.preview.png`;
    return this.coordinator.enqueue("adopt-visual-attachment", [file.path, groupRoot], async (context) => {
      const dependencyPaths = await this.moveDependencies(dependencies, groupRoot, owner, context);
      const oldPath = file.path;
      const notePaths = this.index.referencesForAsset(oldPath).map((reference) => reference.notePath);
      await this.references.mutateNotePaths(notePaths, { oldPath, newPath: sourcePath });
      await context.mute([oldPath, sourcePath], () => this.app.vault.rename(file, sourcePath));
      await this.rescanNotePaths(notePaths);
      const source = this.requireFile(sourcePath);
      await this.indexCoordinator.moveNotePath(source, oldPath);
      if (existingAsset) {
        await this.metaStore.moveAsset(oldPath, sourcePath);
        await this.index.removeAsset(existingAsset.id);
        const movedAsset = {
          ...existingAsset,
          path: sourcePath,
          ownerNoteId: owner.id,
          ownerNotePath: owner.path,
          mtime: source.stat.mtime,
          size: source.stat.size,
          updatedAt: Date.now()
        };
        await this.index.upsertAsset(movedAsset);
        await this.metaStore.writeAsset(movedAsset);
      }
      const bytes = kind === "canvas" ? await renderCanvasPreview(this.app, source) : await this.renderExcalidrawPreview(source.path);
      await this.writeBinary(previewPath, bytes);
      return this.registerGroup(context, kind, owner, groupRoot, sourcePath, previewPath, dependencyPaths);
    });
  }
  async repairExistingVisualInPlace(file, owner) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!isAttachmentPath(file.path)) throw new Error("Passive visual repair is limited to Assets paths");
    const directGroup = this.index.groupBySourcePath(file.path);
    const rootGroup = this.index.groupByRootPath(dirname(file.path));
    const existingGroup = directGroup != null ? directGroup : rootGroup && pathEquals(rootGroup.sourcePath, file.path) ? rootGroup : null;
    if (rootGroup && !existingGroup) return null;
    const kind = (_a = existingGroup == null ? void 0 : existingGroup.kind) != null ? _a : file.path.toLowerCase().endsWith(".canvas") ? "canvas" : "excalidraw";
    if (!await this.hasValidVisualPayload(file, kind)) return null;
    const rootPath = (_b = existingGroup == null ? void 0 : existingGroup.rootPath) != null ? _b : dirname(file.path);
    const previewPath = (_c = existingGroup == null ? void 0 : existingGroup.previewPath) != null ? _c : `${rootPath}/${removeExtension(file.name)}.preview.png`;
    const references = await this.references.scanFile(file);
    const dependencyPaths = /* @__PURE__ */ new Set();
    const localizationPlans = /* @__PURE__ */ new Map();
    const reservedTargetPaths = /* @__PURE__ */ new Set();
    const missingKnownDependencies = ((_d = existingGroup == null ? void 0 : existingGroup.memberPaths) != null ? _d : []).filter(
      (memberPath) => memberPath !== file.path && memberPath !== previewPath && !this.app.vault.getFileByPath(memberPath)
    );
    if (missingKnownDependencies.length > 0) return null;
    for (const memberPath of (_e = existingGroup == null ? void 0 : existingGroup.memberPaths) != null ? _e : []) {
      if (memberPath === file.path || memberPath === previewPath) continue;
      if (dirname(memberPath) === rootPath && this.app.vault.getFileByPath(memberPath)) {
        dependencyPaths.add(memberPath);
      }
    }
    for (const reference of references) {
      if (!reference.resolvedPath) return null;
      const dependency = this.app.vault.getFileByPath(reference.resolvedPath);
      if (!dependency) return null;
      if (dependency.path === file.path) continue;
      const lower = dependency.path.toLowerCase();
      if (lower.endsWith(".md") || lower.endsWith(".canvas")) continue;
      if (dirname(dependency.path) === rootPath) {
        dependencyPaths.add(dependency.path);
        continue;
      }
      const existingPlan = localizationPlans.get(dependency.path);
      if (existingPlan) {
        dependencyPaths.add(existingPlan.targetPath);
        continue;
      }
      const siblingPath = `${rootPath}/${basename(dependency.path)}`;
      const sibling = this.app.vault.getFileByPath(siblingPath);
      const useExistingSibling = sibling ? await this.filesHaveSameBytes(dependency, sibling) : false;
      const targetPath = useExistingSibling ? siblingPath : this.uniqueAvailablePath(siblingPath, reservedTargetPaths);
      localizationPlans.set(dependency.path, {
        source: dependency,
        targetPath,
        copy: !useExistingSibling
      });
      reservedTargetPaths.add(targetPath);
      dependencyPaths.add(targetPath);
    }
    const preview = this.app.vault.getFileByPath(previewPath);
    const desiredPaths = [file.path, previewPath, ...dependencyPaths];
    const existingPaths = new Set((_f = existingGroup == null ? void 0 : existingGroup.memberPaths) != null ? _f : []);
    const groupIsCurrent = Boolean(
      existingGroup && preview && localizationPlans.size === 0 && existingPaths.size === desiredPaths.length && desiredPaths.every((path) => existingPaths.has(path)) && desiredPaths.every((path) => {
        var _a2;
        return ((_a2 = this.index.assetByPath(path)) == null ? void 0 : _a2.groupId) === existingGroup.id;
      })
    );
    if (groupIsCurrent && existingGroup) return existingGroup;
    const stableGroupId = (_g = existingGroup == null ? void 0 : existingGroup.id) != null ? _g : `group_${stableHash(file.path.toLowerCase())}`;
    const affectedPaths = [
      file.path,
      previewPath,
      ...[...localizationPlans.values()].flatMap((plan) => [plan.source.path, plan.targetPath])
    ];
    return this.coordinator.enqueue("repair-visual-attachment-in-place", affectedPaths, async (context) => {
      if (localizationPlans.size > 0) {
        await context.setPhase("localize-dependencies");
        for (const plan of localizationPlans.values()) {
          if (plan.copy) {
            const bytes = await this.app.vault.readBinary(plan.source);
            await context.mute([plan.targetPath], () => this.writeBinary(plan.targetPath, bytes));
          }
          await context.mute(
            [file.path],
            () => this.references.mutateFile(file, { oldPath: plan.source.path, newPath: plan.targetPath })
          );
        }
      }
      let currentPreview = this.app.vault.getFileByPath(previewPath);
      if (!currentPreview) {
        await context.setPhase("render-preview");
        const bytes = kind === "canvas" ? await renderCanvasPreview(this.app, file) : await this.renderExcalidrawPreview(file.path);
        await context.mute([previewPath], () => this.writeBinary(previewPath, bytes));
        currentPreview = this.requireFile(previewPath);
      }
      return this.registerGroup(
        context,
        kind,
        owner,
        rootPath,
        file.path,
        currentPreview.path,
        [...dependencyPaths],
        {
          groupId: stableGroupId,
          stableIds: !existingGroup,
          createdAt: existingGroup == null ? void 0 : existingGroup.createdAt,
          notify: false
        }
      );
    });
  }
  async convertImageToExcalidraw(file, owner) {
    const automate = this.getExcalidrawAutomate();
    if (!automate) throw new Error("ExcalidrawAutomate is unavailable. Enable the Excalidraw plugin first.");
    const oldPath = file.path;
    const groupRoot = await this.createGroupRoot(owner, removeExtension(file.name));
    const dependencyPath = await this.uniquePath(`${groupRoot}/${sanitizeFilename(file.name)}`);
    const drawingName = sanitizeFilename(removeExtension(file.name));
    const expectedSourcePath = `${groupRoot}/${drawingName}.excalidraw.md`;
    const previewPath = `${groupRoot}/${drawingName}.preview.png`;
    const existingAsset = this.index.assetByPath(oldPath);
    return this.coordinator.enqueue("convert-to-excalidraw-attachment", [oldPath, groupRoot], async (context) => {
      var _a;
      await context.setPhase("move-original");
      await context.mute([oldPath, dependencyPath], () => this.app.vault.rename(file, dependencyPath));
      const dependency = this.requireFile(dependencyPath);
      try {
        (_a = automate.reset) == null ? void 0 : _a.call(automate);
        await automate.addImage(excalidrawImageInsertOptions(dependency));
        const created = normalizeVaultPath(
          await automate.create({
            filename: drawingName,
            foldername: groupRoot,
            silent: true,
            frontmatterKeys: { "excalidraw-plugin": "parsed" }
          })
        );
        const sourcePath = created || expectedSourcePath;
        this.requireFile(sourcePath);
        await context.setPhase("render-preview");
        await this.writeBinary(previewPath, await this.renderExcalidrawPreview(sourcePath));
        await context.setPhase("rewrite-references");
        await this.references.rewritePath(oldPath, sourcePath);
        if (existingAsset) {
          await this.index.removeAsset(existingAsset.id);
          await this.metaStore.removeAsset(oldPath);
        }
        return this.registerGroup(context, "excalidraw", owner, groupRoot, sourcePath, previewPath, [dependencyPath]);
      } catch (error) {
        const moved = this.app.vault.getFileByPath(dependencyPath);
        if (moved && !this.app.vault.getAbstractFileByPath(oldPath)) {
          await context.mute([dependencyPath, oldPath], () => this.app.vault.rename(moved, oldPath));
        }
        throw error;
      }
    });
  }
  async adoptCreatedGroupDependency(file, source) {
    if (!this.index.groupBySourcePath(source.path)) {
      throw new Error("The visual source is not a managed attachment group");
    }
    const oldPath = file.path;
    const movedPath = await this.coordinator.enqueue(
      "adopt-visual-group-dependency",
      [source.path, oldPath],
      async (context) => {
        var _a;
        const group = this.index.groupBySourcePath(source.path);
        if (!group) throw new Error("The visual source is no longer a managed attachment group");
        const owner = this.index.noteById(group.ownerNoteId);
        const suffix = extension(file.path);
        const dependencyName = `${attachmentBaseName((_a = owner == null ? void 0 : owner.basename) != null ? _a : removeExtension(source.name))}${suffix ? `.${suffix}` : ""}`;
        const target = await this.uniquePath(`${group.rootPath}/${dependencyName}`);
        context.journal.affectedPaths.push(target);
        await context.setPhase("rewrite-references");
        const changed = await this.references.mutateFile(source, { oldPath, newPath: target });
        if (!changed) throw new Error(`Visual source no longer references ${oldPath}`);
        try {
          await context.setPhase("move-file");
          await context.mute([oldPath, target], () => this.app.vault.rename(file, target));
        } catch (error) {
          await this.references.mutateFile(source, { oldPath: target, newPath: oldPath });
          throw error;
        }
        await this.indexCoordinator.scanNote(source);
        await context.setPhase("write-meta");
        const moved = this.requireFile(target);
        const now = Date.now();
        const asset = {
          schemaVersion: META_SCHEMA_VERSION,
          id: createId("asset"),
          path: target,
          ownerNoteId: group.ownerNoteId,
          ownerNotePath: group.ownerNotePath,
          firstSeenAt: now,
          createdAt: now,
          updatedAt: now,
          mtime: moved.stat.mtime,
          size: moved.stat.size,
          state: "active",
          references: this.index.referencesForAsset(target),
          groupId: group.id,
          groupRole: "dependency"
        };
        await this.index.upsertAsset(asset);
        await this.metaStore.writeAsset(asset);
        const members = [
          ...this.index.groupMembers(group.id),
          { id: createId("member"), groupId: group.id, assetId: asset.id, path: target, role: "dependency" }
        ];
        await this.index.replaceGroupMembers(group.id, members);
        const nextGroup = {
          ...group,
          memberPaths: [.../* @__PURE__ */ new Set([...group.memberPaths, target])],
          revision: createId("rev"),
          updatedAt: now
        };
        await this.index.upsertGroup(nextGroup);
        await this.metaStore.writeGroup(nextGroup);
        return target;
      }
    );
    try {
      await this.refreshPreview(source.path);
    } catch (error) {
      console.error("XD visual preview refresh failed after dependency adoption", error);
      new import_obsidian4.Notice(`Dependency stored, but the visual preview could not be refreshed: ${error instanceof Error ? error.message : String(error)}`);
    }
    return movedPath;
  }
  refreshPreview(sourcePath) {
    const path = normalizeVaultPath(sourcePath);
    let state = this.previewRefreshStates.get(path);
    if (!state) {
      state = { requested: 0, completed: 0, promise: null };
      this.previewRefreshStates.set(path, state);
    }
    state.requested += 1;
    if (!state.promise) {
      state.promise = this.runPreviewRefreshLoop(path, state).finally(() => {
        state.promise = null;
        if (this.previewRefreshStates.get(path) === state) this.previewRefreshStates.delete(path);
      });
    }
    return state.promise;
  }
  async setAsNote(source, targetFolder) {
    const oldSourcePath = source.path;
    const group = this.index.groupBySourcePath(oldSourcePath);
    if (!group) throw new Error("This file is not a managed visual attachment");
    const members = this.index.groupMembers(group.id);
    const sourceNotePaths = this.index.referencesForAsset(oldSourcePath).map((reference) => reference.notePath);
    const normalizedTarget = normalizeVaultPath(targetFolder);
    if (normalizedTarget && !this.app.vault.getFolderByPath(normalizedTarget)) throw new Error(`Target folder does not exist: ${normalizedTarget}`);
    const destination = await this.uniquePath(`${normalizedTarget}/${basename(oldSourcePath)}`);
    await this.coordinator.enqueue("visual-set-as-note", [group.rootPath, destination], async (context) => {
      await context.setPhase("rewrite-references");
      await this.references.rewritePath(oldSourcePath, destination);
      await context.setPhase("move-source");
      await context.mute([oldSourcePath, destination], () => this.app.vault.rename(source, destination));
      await this.rescanNotePaths(sourceNotePaths);
      const noteFile = this.requireFile(destination);
      const movedNote = await this.indexCoordinator.moveNotePath(noteFile, oldSourcePath);
      await this.removeManagedPath(group.previewPath);
      const sourceAsset = this.index.assetByPath(oldSourcePath);
      if (sourceAsset) await this.index.removeAsset(sourceAsset.id);
      await this.metaStore.removeAsset(oldSourcePath);
      const note = await this.indexCoordinator.scanNote(noteFile, movedNote);
      const noteAssets = await this.folders.ensureNoteAssetsFolder(note);
      for (const member of members) {
        if (member.role !== "dependency") continue;
        const dependency = this.app.vault.getFileByPath(member.path);
        if (!dependency) continue;
        const target = await this.uniquePath(`${noteAssets}/${basename(member.path)}`);
        const notePaths = this.index.referencesForAsset(member.path).map((reference) => reference.notePath);
        await this.references.mutateNotePaths(notePaths, { oldPath: member.path, newPath: target });
        await context.mute([member.path, target], () => this.app.vault.rename(dependency, target));
        const asset = this.index.assetById(member.assetId);
        if (asset) {
          await this.metaStore.moveAsset(member.path, target);
          const moved = this.requireFile(target);
          const next = {
            ...asset,
            path: target,
            ownerNoteId: note.id,
            ownerNotePath: note.path,
            groupId: void 0,
            groupRole: void 0,
            mtime: moved.stat.mtime,
            size: moved.stat.size,
            updatedAt: Date.now()
          };
          await this.index.upsertAsset(next);
          await this.metaStore.writeAsset(next);
        }
      }
      await this.index.removeGroup(group.id);
      await this.metaStore.removeGroup(group.rootPath);
      await this.folders.cleanupParentChain(group.rootPath);
    });
    this.emit(destination);
    return destination;
  }
  async registerGroup(context, kind, owner, rootPath, sourcePath, previewPath, dependencies, options = {}) {
    var _a, _b, _c, _d, _e;
    await context.setPhase("write-meta");
    const now = Date.now();
    const groupId = (_a = options.groupId) != null ? _a : createId("group");
    const paths = [sourcePath, previewPath, ...dependencies];
    const group = {
      schemaVersion: META_SCHEMA_VERSION,
      id: groupId,
      kind,
      rootPath,
      sourcePath,
      previewPath,
      memberPaths: paths,
      ownerNoteId: owner.id,
      ownerNotePath: owner.path,
      revision: options.stableIds ? `rev_${stableHash(paths.join("\0").toLowerCase())}` : createId("rev"),
      createdAt: (_b = options.createdAt) != null ? _b : now,
      updatedAt: now
    };
    await this.folders.ensureFolder(rootPath, "visual-group", owner.id, owner.path, groupId);
    const memberRecords = [];
    for (const path of paths) {
      const role = path === sourcePath ? "source" : path === previewPath ? "preview" : "dependency";
      const file = this.requireFile(path);
      const existing = this.index.assetByPath(path);
      const assetId = options.stableIds ? `asset_${stableHash(path.toLowerCase())}` : (_c = existing == null ? void 0 : existing.id) != null ? _c : createId("asset");
      if (existing && existing.id !== assetId) await this.index.removeAsset(existing.id);
      const asset = {
        schemaVersion: META_SCHEMA_VERSION,
        id: assetId,
        path,
        ownerNoteId: owner.id,
        ownerNotePath: owner.path,
        firstSeenAt: (_d = existing == null ? void 0 : existing.firstSeenAt) != null ? _d : now,
        createdAt: (_e = existing == null ? void 0 : existing.createdAt) != null ? _e : now,
        updatedAt: now,
        mtime: file.stat.mtime,
        size: file.stat.size,
        state: "active",
        references: path === sourcePath ? this.index.referencesForAsset(path) : [],
        groupId,
        groupRole: role
      };
      await this.index.upsertAsset(asset);
      await this.metaStore.writeAsset(asset);
      memberRecords.push({
        id: options.stableIds ? `member_${stableHash(`${groupId}\0${path}`.toLowerCase())}` : createId("member"),
        groupId,
        assetId: asset.id,
        path,
        role
      });
    }
    await this.index.upsertGroup(group);
    await this.index.replaceGroupMembers(groupId, memberRecords);
    await this.metaStore.writeGroup(group);
    await this.indexCoordinator.scanNote(this.requireFile(sourcePath));
    this.emit(sourcePath);
    if (options.notify !== false) new import_obsidian4.Notice(`${kind === "canvas" ? "Canvas" : "Excalidraw"} attachment created`);
    return group;
  }
  async createGroupRoot(owner, name) {
    const noteFolder = await this.folders.ensureNoteAssetsFolder(owner);
    let path = `${noteFolder}/${sanitizeFilename(name, "Visual Attachment")}`;
    let suffix = 2;
    while (this.app.vault.getAbstractFileByPath(path)) path = `${noteFolder}/${sanitizeFilename(name)} ${suffix++}`;
    await this.folders.ensureFolder(path, "visual-group", owner.id, owner.path);
    return path;
  }
  getExcalidrawAutomate() {
    var _a, _b, _c, _d;
    const plugin = (_a = this.app.plugins) == null ? void 0 : _a.getPlugin("obsidian-excalidraw-plugin");
    return (_d = (_c = (_b = plugin == null ? void 0 : plugin.getEA) == null ? void 0 : _b.call(plugin)) != null ? _c : plugin == null ? void 0 : plugin.ea) != null ? _d : null;
  }
  async renderExcalidrawPreview(sourcePath) {
    var _a;
    const automate = this.getExcalidrawAutomate();
    if (!automate) throw new Error("ExcalidrawAutomate is unavailable");
    await this.waitForExcalidrawDependencies(sourcePath);
    (_a = automate.reset) == null ? void 0 : _a.call(automate);
    return binaryFromUnknown(await automate.createPNG(sourcePath));
  }
  async runPreviewRefreshLoop(sourcePath, state) {
    while (state.completed < state.requested) {
      const request = state.requested;
      const group = this.index.groupBySourcePath(sourcePath);
      const source = this.app.vault.getFileByPath(sourcePath);
      if (!group || !source) {
        state.completed = request;
        continue;
      }
      const bytes = group.kind === "canvas" ? await renderCanvasPreview(this.app, source) : await this.renderExcalidrawPreview(source.path);
      if (request !== state.requested) {
        state.completed = request;
        continue;
      }
      const currentGroup = this.index.groupBySourcePath(sourcePath);
      if (!currentGroup) {
        state.completed = request;
        continue;
      }
      await this.writeBinary(currentGroup.previewPath, bytes);
      const next = { ...currentGroup, revision: createId("rev"), updatedAt: Date.now() };
      await this.index.upsertGroup(next);
      await this.metaStore.writeGroup(next);
      this.emit(sourcePath);
      state.completed = request;
    }
  }
  async waitForExcalidrawDependencies(sourcePath) {
    const source = this.app.vault.getFileByPath(sourcePath);
    if (!source) return;
    let stableSignature = "";
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const content = await this.app.vault.cachedRead(source);
      const entries = parseEmbeddedFileEntries(content);
      if (!entries.length) return;
      const resolved = entries.map((entry) => {
        const file = this.app.metadataCache.getFirstLinkpathDest(entry.rawTarget, source.path);
        return file && this.app.vault.getFileByPath(file.path) ? file.path : "";
      });
      const signature = resolved.join("\0");
      if (resolved.every(Boolean) && signature === stableSignature) return;
      stableSignature = resolved.every(Boolean) ? signature : "";
      await delay(120);
    }
  }
  async collectLocalDependencies(source) {
    const parsed = await this.references.scanFile(source);
    const paths = new Set(parsed.map((reference) => reference.resolvedPath).filter((path) => Boolean(path)));
    const dependencies = [];
    for (const path of paths) {
      const file = this.app.vault.getFileByPath(path);
      if (!file || file.path === source.path) continue;
      const lower = file.path.toLowerCase();
      if (lower.endsWith(".md") || lower.endsWith(".canvas")) continue;
      dependencies.push(file);
    }
    return dependencies;
  }
  async moveDependencies(dependencies, groupRoot, owner, context) {
    const movedPaths = [];
    for (const dependency of dependencies) {
      const oldPath = dependency.path;
      const target = await this.uniquePath(`${groupRoot}/${basename(oldPath)}`);
      if (oldPath === target) {
        movedPaths.push(target);
        continue;
      }
      const notePaths = this.index.referencesForAsset(oldPath).map((reference) => reference.notePath);
      const existing = this.index.assetByPath(oldPath);
      await context.mute([oldPath, target], () => this.app.vault.rename(dependency, target));
      await this.references.mutateNotePaths(notePaths, { oldPath, newPath: target });
      if (existing) {
        await this.metaStore.moveAsset(oldPath, target);
        const moved = this.requireFile(target);
        await this.index.upsertAsset({
          ...existing,
          path: target,
          ownerNoteId: owner.id,
          ownerNotePath: owner.path,
          mtime: moved.stat.mtime,
          size: moved.stat.size,
          updatedAt: Date.now()
        });
      }
      movedPaths.push(target);
    }
    return movedPaths;
  }
  async uniquePath(path) {
    const normalized = normalizeVaultPath(path);
    if (!this.app.vault.getAbstractFileByPath(normalized)) return normalized;
    const name = basename(normalized);
    const folder = dirname(normalized);
    const dot = name.lastIndexOf(".");
    const stem = dot < 0 ? name : name.slice(0, dot);
    const extension2 = dot < 0 ? "" : name.slice(dot);
    let counter = 2;
    let candidate = normalized;
    while (this.app.vault.getAbstractFileByPath(candidate)) candidate = `${folder}/${stem} ${counter++}${extension2}`;
    return candidate;
  }
  uniqueAvailablePath(path, reservedPaths) {
    const normalized = normalizeVaultPath(path);
    if (!this.app.vault.getAbstractFileByPath(normalized) && !reservedPaths.has(normalized)) return normalized;
    const name = basename(normalized);
    const folder = dirname(normalized);
    const dot = name.lastIndexOf(".");
    const stem = dot < 0 ? name : name.slice(0, dot);
    const fileExtension = dot < 0 ? "" : name.slice(dot);
    let counter = 2;
    let candidate = normalized;
    while (this.app.vault.getAbstractFileByPath(candidate) || reservedPaths.has(candidate)) {
      candidate = `${folder}/${stem} ${counter++}${fileExtension}`;
    }
    return candidate;
  }
  async filesHaveSameBytes(left, right) {
    if (left.stat.size !== right.stat.size) return false;
    const [leftBytes, rightBytes] = await Promise.all([
      this.app.vault.readBinary(left),
      this.app.vault.readBinary(right)
    ]);
    const leftView = new Uint8Array(leftBytes);
    const rightView = new Uint8Array(rightBytes);
    if (leftView.byteLength !== rightView.byteLength) return false;
    for (let index = 0; index < leftView.byteLength; index += 1) {
      if (leftView[index] !== rightView[index]) return false;
    }
    return true;
  }
  async hasValidVisualPayload(file, kind) {
    if (file.stat.size <= 0) return false;
    if (typeof this.app.vault.cachedRead !== "function") return true;
    try {
      const content = await this.app.vault.cachedRead(file);
      if (kind === "canvas") {
        const document2 = JSON.parse(content);
        return Array.isArray(document2.nodes) && Array.isArray(document2.edges);
      }
      return /## Drawing\s*[\s\S]*?```(?:compressed-json|json)\s+\S[\s\S]*?```/i.test(content);
    } catch (e) {
      return false;
    }
  }
  requireFile(path) {
    const file = this.app.vault.getFileByPath(path);
    if (!file) throw new Error(`File not found: ${path}`);
    return file;
  }
  async writeBinary(path, data) {
    const existing = this.app.vault.getFileByPath(path);
    if (existing) await this.app.vault.modifyBinary(existing, data);
    else await this.app.vault.createBinary(path, data);
  }
  async removeManagedPath(path) {
    const file = this.app.vault.getFileByPath(path);
    if (file) await this.app.vault.delete(file, true);
    const asset = this.index.assetByPath(path);
    if (asset) await this.index.removeAsset(asset.id);
    await this.metaStore.removeAsset(path);
  }
  emit(path) {
    for (const listener of this.listeners) listener(path);
  }
  async rescanNotes(files) {
    for (const file of files) await this.indexCoordinator.scanNote(file);
  }
  async rescanNotePaths(paths) {
    for (const path of new Set(paths)) {
      const file = this.app.vault.getFileByPath(path);
      if (file) await this.indexCoordinator.scanNote(file);
    }
  }
};
async function binaryFromUnknown(value) {
  if (value instanceof ArrayBuffer) return value;
  if (value instanceof Blob) return value.arrayBuffer();
  if (ArrayBuffer.isView(value)) return value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength);
  if (typeof value === "string" && value.startsWith("data:")) {
    return (await fetch(value)).arrayBuffer();
  }
  throw new Error("ExcalidrawAutomate returned an unsupported PNG payload");
}
function delay(milliseconds) {
  return new Promise((resolve) => globalThis.setTimeout(resolve, milliseconds));
}

// src/services/clipboard-service.ts
var import_obsidian5 = require("obsidian");
var ClipboardService = class {
  constructor(app, visuals) {
    this.app = app;
    this.visuals = visuals;
  }
  async copyAttachment(path) {
    var _a;
    const visual = this.visuals.resolveVisual(path);
    const copyPath = (_a = visual == null ? void 0 : visual.previewPath) != null ? _a : path;
    const file = this.app.vault.getFileByPath(copyPath);
    if (!file) throw new Error(`Attachment not found: ${copyPath}`);
    if (IMAGE_EXTENSIONS.has(extension(copyPath)) || visual) {
      await this.copyImage(copyPath);
      new import_obsidian5.Notice("Attachment image copied");
      return;
    }
    if (import_obsidian5.Platform.isDesktopApp && (import_obsidian5.Platform.isWin || import_obsidian5.Platform.isMacOS)) {
      await this.copyDesktopFile(copyPath);
      new import_obsidian5.Notice("Attachment file copied");
      return;
    }
    await this.shareOrCopyLink(copyPath);
  }
  async copyRemoteAttachment(url) {
    var _a, _b;
    const resource = await fetchRemoteResource(url);
    const blob = new Blob([resource.buffer], { type: resource.mime });
    if (typeof ClipboardItem !== "undefined" && ((_a = navigator.clipboard) == null ? void 0 : _a.write)) {
      const clipboardBlob = await clipboardImageBlob(blob);
      await navigator.clipboard.write([new ClipboardItem({ [clipboardBlob.type]: clipboardBlob })]);
      new import_obsidian5.Notice("Attachment image copied");
      return;
    }
    const file = new File([blob], resource.filename, { type: resource.mime });
    if (navigator.share && ((_b = navigator.canShare) == null ? void 0 : _b.call(navigator, { files: [file] }))) {
      await navigator.share({ files: [file], title: resource.filename });
      return;
    }
    await navigator.clipboard.writeText(url);
    new import_obsidian5.Notice("Attachment URL copied");
  }
  async copyLink(url) {
    await navigator.clipboard.writeText(url);
    new import_obsidian5.Notice("Link copied");
  }
  async copyImage(path) {
    var _a;
    const binary = await this.app.vault.adapter.readBinary(path);
    const mime = mimeFor(path);
    const blob = new Blob([binary], { type: mime });
    if (typeof ClipboardItem !== "undefined" && ((_a = navigator.clipboard) == null ? void 0 : _a.write)) {
      const clipboardBlob = await clipboardImageBlob(blob);
      await navigator.clipboard.write([new ClipboardItem({ [clipboardBlob.type]: clipboardBlob })]);
      return;
    }
    await this.shareOrCopyLink(path, blob);
  }
  async copyDesktopFile(path) {
    var _a;
    const adapter = this.app.vault.adapter;
    if (typeof adapter.getFullPath !== "function") throw new Error("Desktop vault path is unavailable");
    const fullPath = adapter.getFullPath(path);
    const childProcess = (_a = window.require) == null ? void 0 : _a.call(window, "child_process");
    if (!childProcess) throw new Error("Desktop process adapter is unavailable");
    if (import_obsidian5.Platform.isWin) {
      const literal = fullPath.replace(/'/g, "''");
      await spawnAndWait(childProcess, "powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", `Set-Clipboard -LiteralPath '${literal}'`]);
      return;
    }
    const applePath = fullPath.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    await spawnAndWait(childProcess, "/usr/bin/osascript", ["-e", `set the clipboard to (POSIX file "${applePath}")`]);
  }
  async shareOrCopyLink(path, blob) {
    var _a;
    const file = blob ? new File([blob], basename(path), { type: blob.type }) : new File([await this.app.vault.adapter.readBinary(path)], basename(path));
    if (navigator.share && ((_a = navigator.canShare) == null ? void 0 : _a.call(navigator, { files: [file] }))) {
      await navigator.share({ files: [file], title: basename(path) });
      return;
    }
    const link = `obsidian://open?vault=${encodeURIComponent(this.app.vault.getName())}&file=${encodeURIComponent(path)}`;
    await navigator.clipboard.writeText(link);
    new import_obsidian5.Notice("Vault link copied");
  }
};
async function clipboardImageBlob(blob) {
  if (blob.type === "image/png" || typeof createImageBitmap !== "function") return blob;
  const bitmap = await createImageBitmap(blob);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to create image clipboard canvas");
    context.drawImage(bitmap, 0, 0);
    return await new Promise((resolve, reject) => {
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error("Unable to encode clipboard image")), "image/png");
    });
  } finally {
    bitmap.close();
  }
}
function spawnAndWait(childProcess, command, args) {
  return new Promise((resolve, reject) => {
    const process = childProcess.spawn(command, args, { windowsHide: true });
    process.once("error", reject);
    process.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code != null ? code : "unknown"}`)));
  });
}
function mimeFor(path) {
  const ext = extension(path);
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "svg") return "image/svg+xml";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  return "image/png";
}

// src/services/external-link-service.ts
var import_obsidian6 = require("obsidian");
var ExternalLinkService = class {
  async open(url) {
    const target = externalHttpUrl(url);
    if (import_obsidian6.Platform.isDesktopApp) {
      const shell = electronShell();
      if (shell) {
        await shell.openExternal(target);
        return;
      }
    }
    const opened = window.open(target, "_blank", "noopener,noreferrer");
    if (!opened) throw new Error("Unable to open the browser on this device");
  }
};
function externalHttpUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only HTTP and HTTPS links can be opened in the browser");
  }
  return url.toString();
}
function electronShell() {
  var _a;
  const require2 = window.require;
  if (!require2) return null;
  try {
    return (_a = require2("electron").shell) != null ? _a : null;
  } catch (e) {
    return null;
  }
}

// src/services/desktop-youtube-context-menu.ts
var import_obsidian7 = require("obsidian");

// src/utils/remote-url.ts
function youtubeVideoId(value) {
  var _a, _b;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host === "releases.obsidian.md" && url.pathname === "/youtube") return url.searchParams.get("v");
    if (host === "youtu.be") return (_a = url.pathname.split("/").filter(Boolean)[0]) != null ? _a : null;
    if (!["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) return null;
    if (url.pathname === "/watch") return url.searchParams.get("v");
    const match = /^\/(?:embed|shorts|live)\/([^/?#]+)/.exec(url.pathname);
    return (_b = match == null ? void 0 : match[1]) != null ? _b : null;
  } catch (e) {
    return null;
  }
}
function normalizeBrowserUrl(value) {
  var _a;
  const videoId = youtubeVideoId(value);
  if (!videoId) return value;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const proxy = host === "releases.obsidian.md" && url.pathname === "/youtube";
    const embedded = url.pathname.startsWith("/embed/") || host === "youtube-nocookie.com";
    if (!proxy && !embedded) return value;
    const start = (_a = url.searchParams.get("start")) != null ? _a : url.searchParams.get("t");
    const watch = new URL("https://www.youtube.com/watch");
    watch.searchParams.set("v", videoId);
    if (start) watch.searchParams.set("t", /^\d+$/.test(start) ? `${start}s` : start);
    return watch.toString();
  } catch (e) {
    return value;
  }
}

// src/utils/youtube-frame.ts
function findYoutubeFrame(document2, context) {
  var _a, _b;
  const frames = [...document2.querySelectorAll("iframe[src]")].map((frame) => {
    var _a2;
    return { frame, videoId: youtubeVideoId((_a2 = frame.getAttribute("src")) != null ? _a2 : "") };
  }).filter((candidate) => Boolean(candidate.videoId));
  const atPoint = frames.find(({ frame }) => containsPoint(frame.getBoundingClientRect(), context.x, context.y));
  if (atPoint) return atPoint.frame;
  const eventVideoId = [context.frameURL, context.srcURL, context.linkURL, context.pageURL].map((value) => value ? youtubeVideoId(value) : null).find((value) => Boolean(value));
  return eventVideoId ? (_b = (_a = frames.find((candidate) => candidate.videoId === eventVideoId)) == null ? void 0 : _a.frame) != null ? _b : null : null;
}
function containsPoint(rect, x, y) {
  return rect.width > 0 && rect.height > 0 && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// src/services/desktop-youtube-context-menu.ts
function registerDesktopYoutubeContextMenu(handler) {
  if (!import_obsidian7.Platform.isDesktopApp) return () => void 0;
  const host = window;
  const existing = host.__xdAttachmentManagerYoutubeBridge;
  if (existing) {
    existing.handler = handler;
    return () => {
      if (existing.handler === handler) existing.handler = null;
    };
  }
  const webContents = currentWebContents();
  if (!webContents) return () => void 0;
  const bridge = { handler };
  host.__xdAttachmentManagerYoutubeBridge = bridge;
  const listener = (event, context) => {
    const frame = findYoutubeFrame(document, context);
    const currentHandler = bridge.handler;
    if (!frame || !currentHandler) return;
    if (!currentHandler(frame, { x: context.x, y: context.y })) return;
    event.preventDefault();
  };
  webContents.on("context-menu", listener);
  return () => {
    if (bridge.handler === handler) bridge.handler = null;
  };
}
function currentWebContents() {
  var _a, _b, _c, _d;
  const require2 = window.require;
  if (!require2) return null;
  try {
    const remote = require2("@electron/remote");
    const contents = (_a = remote.getCurrentWebContents) == null ? void 0 : _a.call(remote);
    if (contents) return contents;
  } catch (e) {
  }
  try {
    return (_d = (_c = (_b = require2("electron").remote) == null ? void 0 : _b.getCurrentWebContents) == null ? void 0 : _c.call(_b)) != null ? _d : null;
  } catch (e) {
    return null;
  }
}

// src/services/cleanup-service.ts
var TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
  "canvas",
  "css",
  "csv",
  "html",
  "js",
  "json",
  "md",
  "svg",
  "ts",
  "tsv",
  "txt",
  "xml",
  "yaml",
  "yml"
]);
var CLEANUP_BATCH_SIZE = 250;
var CleanupService = class {
  constructor(app, index, attachments, folders) {
    this.app = app;
    this.index = index;
    this.attachments = attachments;
    this.folders = folders;
  }
  async scan(rootPath, options = {}) {
    var _a, _b, _c;
    const root = normalizeVaultPath(rootPath);
    const excludes = ((_a = options.excludes) != null ? _a : []).map(normalizeVaultPath).filter(Boolean);
    const files = this.app.vault.getFiles().filter(
      (file) => inScope(file.path, root, excludes) && !isDerivedPreviewPath(file.path)
    );
    const items = [];
    for (const asset of this.index.allAssets) {
      if (asset.state !== "orphan" || !inScope(asset.path, root, excludes)) continue;
      if (isDerivedPreviewPath(asset.path)) continue;
      if (asset.groupId && asset.groupRole !== "source") continue;
      const file = this.app.vault.getFileByPath(asset.path);
      if (!file) continue;
      const group = asset.groupId ? this.index.groupById(asset.groupId) : null;
      items.push(cleanupItem(
        file.path,
        "orphan",
        "attachment",
        file.stat.size,
        defaultCleanupSelection("orphan", file.path),
        orphanDetail(Boolean(group)),
        group == null ? void 0 : group.previewPath
      ));
    }
    const emptyGroups = /* @__PURE__ */ new Set();
    for (let index = 0; index < files.length; index += 1) {
      if ((_b = options.signal) == null ? void 0 : _b.aborted) {
        return { rootPath: root, items, scannedFiles: index, scannedFolders: 0, canceled: true };
      }
      const file = files[index];
      if (!file) continue;
      if (await this.isEmpty(file)) {
        const member = this.index.groupMemberByPath(file.path);
        const group = member ? this.index.groupById(member.groupId) : null;
        if (group) {
          if (!emptyGroups.has(group.id)) {
            emptyGroups.add(group.id);
            items.push(cleanupItem(
              group.sourcePath,
              "empty",
              "attachment",
              file.stat.size,
              defaultCleanupSelection("empty", group.sourcePath),
              `Visual attachment group contains an empty member: ${file.path}`,
              group.previewPath
            ));
          }
        } else {
          items.push(cleanupItem(
            file.path,
            "empty",
            cleanupEntityType(file.path),
            file.stat.size,
            defaultCleanupSelection("empty", file.path),
            "File is empty"
          ));
        }
      }
      const completed = index + 1;
      if (completed % CLEANUP_BATCH_SIZE === 0 || completed === files.length) {
        (_c = options.onProgress) == null ? void 0 : _c.call(options, completed, files.length);
        await yieldToUi2();
      }
    }
    const emptyFolders = (await this.folders.auditEmptyFolders(root)).filter(
      (path) => inScope(path, root, excludes) && !excludes.some((exclude) => pathStartsWith(exclude, path))
    );
    for (const path of emptyFolders) {
      items.push(cleanupItem(path, "empty-folder", "folder", 0, defaultCleanupSelection("empty-folder", path), "Folder contains no files"));
    }
    return { rootPath: root, items, scannedFiles: files.length, scannedFolders: emptyFolders.length, canceled: false };
  }
  async clean(items, mode) {
    let deleted = 0;
    const failed = [];
    const files = /* @__PURE__ */ new Map();
    const folders = /* @__PURE__ */ new Map();
    for (const item of items.filter((candidate) => candidate.selected)) {
      const target = item.category === "empty-folder" ? folders : files;
      target.set(normalizeVaultPath(item.path).toLowerCase(), item);
    }
    for (const item of files.values()) {
      try {
        const managed = this.index.assetByPath(item.path);
        if (managed) {
          await this.attachments.deleteManaged(item.path, [], mode);
        } else {
          const file = this.app.vault.getFileByPath(item.path);
          if (!file) continue;
          await deleteCleanupFile(this.app, file, mode);
        }
        deleted += 1;
      } catch (e) {
        failed.push(item.path);
      }
    }
    const orderedFolders = [...folders.values()].sort(
      (left, right) => right.path.split("/").length - left.path.split("/").length
    );
    for (const item of orderedFolders) {
      try {
        if (await this.folders.deleteEmptyFolder(item.path, mode)) deleted += 1;
      } catch (e) {
        failed.push(item.path);
      }
    }
    return { deleted, failed };
  }
  async isEmpty(file) {
    if (file.stat.size === 0) return true;
    if (!TEXT_EXTENSIONS.has(extension(file.path))) return false;
    try {
      return (await this.app.vault.cachedRead(file)).trim().length === 0;
    } catch (e) {
      return false;
    }
  }
};
function cleanupEntityType(path) {
  if (isAttachmentPath(path)) return "attachment";
  if (isNotePath(path)) return "note";
  return "file";
}
function inScope(path, rootPath, excludes) {
  if (isInsideMeta(path)) return false;
  const normalized = normalizeVaultPath(path);
  if (rootPath && !pathStartsWith(normalized, rootPath)) return false;
  return !excludes.some((exclude) => pathStartsWith(normalized, exclude));
}
function defaultCleanupSelection(category, path) {
  return category === "empty-folder" && isAttachmentPath(path);
}
function isDerivedPreviewPath(path) {
  return normalizeVaultPath(path).toLowerCase().endsWith(".preview.png");
}
function orphanDetail(isVisualGroup) {
  if (isVisualGroup) return "Visual attachment group has no Note references";
  return "Attachment has no Note references";
}
function cleanupItem(path, category, entityType, size, selected, detail, previewPath) {
  return {
    id: createId("cleanup"),
    path,
    ...previewPath ? { previewPath } : {},
    category,
    entityType,
    selected,
    size,
    detail
  };
}
async function deleteCleanupFile(app, file, mode) {
  if (mode === "permanent") {
    await app.vault.delete(file, true);
    return;
  }
  await app.vault.trash(file, mode === "system-trash");
}
async function yieldToUi2() {
  if (typeof MessageChannel === "undefined") {
    await Promise.resolve();
    return;
  }
  await new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = () => {
      channel.port1.close();
      channel.port2.close();
      resolve();
    };
    channel.port2.postMessage(void 0);
  });
}

// src/services/migration-service.ts
var import_obsidian8 = require("obsidian");
var MigrationService = class {
  constructor(app, index, attachments, folders, visuals) {
    this.app = app;
    this.index = index;
    this.attachments = attachments;
    this.folders = folders;
    this.visuals = visuals;
  }
  enabledLegacyPlugins() {
    var _a, _b;
    const enabled = (_b = (_a = this.app.plugins) == null ? void 0 : _a.enabledPlugins) != null ? _b : /* @__PURE__ */ new Set();
    return LEGACY_PLUGIN_IDS.filter((id) => enabled.has(id));
  }
  async migrate() {
    var _a, _b;
    const startedAt = Date.now();
    const report = {
      startedAt,
      completedAt: 0,
      managedAssets: 0,
      visualGroups: 0,
      adoptedAssets: 0,
      issues: []
    };
    const assetsRoot = this.app.vault.getFolderByPath(ASSETS_ROOT);
    if (assetsRoot) {
      for (const folder of collectFolders3(assetsRoot)) {
        if (isInsideMeta(folder.path)) continue;
        const owner = this.inferOwnerForFolder(folder.path);
        await this.folders.ensureFolder(
          folder.path,
          folder.path === ASSETS_ROOT ? "assets-root" : folder.path.split("/").length === 2 && folder.name.startsWith("NoteAssets_") ? "note-assets" : "ordinary",
          (_a = owner == null ? void 0 : owner.id) != null ? _a : null,
          (_b = owner == null ? void 0 : owner.path) != null ? _b : null
        );
      }
      const files = collectFiles(assetsRoot).filter((file) => !isInsideMeta(file.path)).sort((left, right) => Number(isVisualSourcePath(right.path)) - Number(isVisualSourcePath(left.path)));
      for (const file of files) {
        const existing = this.index.assetByPath(file.path);
        const owner = this.inferOwner(file.path);
        if (isVisualSourcePath(file.path) && !this.index.groupBySourcePath(file.path) && owner) {
          try {
            const group = await this.visuals.repairExistingVisualInPlace(file, owner);
            if (group) report.visualGroups += 1;
          } catch (error) {
            if (!existing) await this.attachments.registerUnowned(file, "orphan");
            report.issues.push({ path: file.path, reason: `Visual migration failed: ${errorMessage2(error)}` });
          }
        } else if (!existing && owner) {
          await this.attachments.registerAsset(file, owner);
          report.managedAssets += 1;
          report.adoptedAssets += 1;
        } else if (!existing) {
          await this.attachments.registerUnowned(file, "orphan");
          report.adoptedAssets += 1;
        }
      }
    }
    report.completedAt = Date.now();
    return report;
  }
  inferOwner(assetPath) {
    const references = this.index.referencesForAsset(assetPath).map((reference) => this.index.noteById(reference.noteId)).filter((note) => Boolean((note == null ? void 0 : note.role) === "note"));
    if (references[0]) return references[0];
    const folderOwner = this.inferOwnerForFolder(dirname(assetPath));
    return (folderOwner == null ? void 0 : folderOwner.role) === "note" ? folderOwner : null;
  }
  inferOwnerForFolder(folderPath) {
    var _a;
    const noteFolder = folderPath.split("/").find((segment) => segment.startsWith("NoteAssets_"));
    if (!noteFolder) return null;
    const expected = noteFolder.slice("NoteAssets_".length).replace(/_[a-z0-9]{6}$/i, "");
    const candidates = this.index.allNotes.filter((note) => note.role === "note" && note.basename === expected);
    return candidates.length === 1 ? (_a = candidates[0]) != null ? _a : null : null;
  }
};
function collectFolders3(root) {
  const result = [root];
  for (const child of root.children) if (child instanceof import_obsidian8.TFolder) result.push(...collectFolders3(child));
  return result;
}
function collectFiles(root) {
  const result = [];
  for (const child of root.children) {
    if (child instanceof import_obsidian8.TFile) result.push(child);
    else if (child instanceof import_obsidian8.TFolder) result.push(...collectFiles(child));
  }
  return result;
}
function errorMessage2(error) {
  return error instanceof Error ? error.message : String(error);
}

// src/services/ingest-service.ts
var import_obsidian9 = require("obsidian");

// src/services/link-format.ts
function formatAttachmentLink(file, syntax, shortestTarget = basename(file.path)) {
  const target = shortestTarget || basename(file.path);
  const embedded = EMBEDDABLE_EXTENSIONS.has(extension(file.path));
  if (syntax === "wiki") return `${embedded ? "!" : ""}[[${target}]]`;
  const label = basename(file.path).replace(/[\[\]]/g, "");
  const destination = encodeURI(target).replace(/#/g, "%23");
  return `${embedded ? "!" : ""}[${label}](${destination})`;
}

// src/services/ingest-service.ts
var IngestService = class {
  constructor(app, attachments, indexCoordinator, settings) {
    this.app = app;
    this.attachments = attachments;
    this.indexCoordinator = indexCoordinator;
    this.settings = settings;
  }
  async handlePaste(event, editor, info) {
    var _a;
    await this.handleFiles((_a = event.clipboardData) == null ? void 0 : _a.files, event, editor, info);
  }
  async handleDrop(event, editor, info) {
    var _a;
    await this.handleFiles((_a = event.dataTransfer) == null ? void 0 : _a.files, event, editor, info);
  }
  async handleFiles(fileList, event, editor, info) {
    const files = fileList ? [...fileList].filter((file) => file.size > 0 || file.name) : [];
    const source = info.file;
    if (files.length === 0 || !source || !isNotePath(source.path)) return;
    event.preventDefault();
    event.stopPropagation();
    try {
      const note = await this.indexCoordinator.scanNote(source);
      const created = [];
      for (const file of files) created.push(await this.attachments.ingestExternal(file, note));
      const links = created.map((file) => formatAttachmentLink(
        file,
        this.settings.defaultLinkFormat,
        this.app.metadataCache.fileToLinktext(file, source.path, true)
      )).join("\n");
      editor.replaceSelection(links);
      await this.indexCoordinator.scanNote(source);
      new import_obsidian9.Notice(`${created.length} attachment(s) imported as ${this.settings.defaultLinkFormat === "wiki" ? "Wiki" : "Markdown"} links`);
    } catch (error) {
      console.error("XD Attachment Manager: import failed", error);
      new import_obsidian9.Notice(error instanceof Error ? error.message : String(error));
    }
  }
};

// src/ui/menu-service.ts
var import_obsidian11 = require("obsidian");

// src/ui/modals.ts
var import_obsidian10 = require("obsidian");
var PromiseModal = class extends import_obsidian10.Modal {
  constructor() {
    super(...arguments);
    __publicField(this, "settled", false);
    __publicField(this, "resolveValue");
    __publicField(this, "result", new Promise((resolve) => {
      this.resolveValue = resolve;
    }));
  }
  settle(value) {
    if (this.settled) return;
    this.settled = true;
    this.resolveValue(value);
    this.close();
  }
  settleOnClose(value) {
    if (this.settled) return;
    this.settled = true;
    this.resolveValue(value);
  }
};
var TextPromptModal = class extends PromiseModal {
  constructor(app, titleText, initialValue = "", placeholder = "", allowEmpty = false) {
    super(app);
    this.titleText = titleText;
    this.placeholder = placeholder;
    this.allowEmpty = allowEmpty;
    __publicField(this, "value");
    this.value = initialValue;
  }
  onOpen() {
    this.modalEl.addClass("xd-attachment-manager-modal");
    this.titleEl.setText(this.titleText);
    new import_obsidian10.Setting(this.contentEl).addText((text) => {
      text.setValue(this.value).setPlaceholder(this.placeholder).onChange((value) => this.value = value);
      text.inputEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") this.submit();
      });
      globalThis.setTimeout(() => text.inputEl.select(), 0);
    });
    this.addButtons(() => this.submit());
  }
  onClose() {
    this.contentEl.empty();
    this.settleOnClose(null);
  }
  submit() {
    const value = this.value.trim();
    if (value || this.allowEmpty) this.settle(value);
  }
  addButtons(confirm) {
    new import_obsidian10.Setting(this.contentEl).addButton((button) => button.setButtonText("Cancel").onClick(() => this.settle(null))).addButton((button) => button.setCta().setButtonText("OK").onClick(confirm));
  }
};
var ConfirmImpactModal = class extends PromiseModal {
  constructor(app, titleText, paths, actionText) {
    super(app);
    this.titleText = titleText;
    this.paths = paths;
    this.actionText = actionText;
  }
  onOpen() {
    this.modalEl.addClass("xd-attachment-manager-modal");
    this.titleEl.setText(this.titleText);
    this.contentEl.createEl("p", { text: `${this.paths.length} path(s) will be affected.` });
    const list = this.contentEl.createDiv({ cls: "xd-attachment-manager-impact-list" });
    for (const path of this.paths) list.createDiv({ cls: "xd-attachment-manager-impact-path", text: path });
    new import_obsidian10.Setting(this.contentEl).addButton((button) => button.setButtonText("Cancel").onClick(() => this.settle(false))).addButton((button) => button.setWarning().setButtonText(this.actionText).onClick(() => this.settle(true)));
  }
  onClose() {
    this.contentEl.empty();
    this.settleOnClose(false);
  }
};
var DeleteManagedAttachmentModal = class extends PromiseModal {
  constructor(app, paths, supportsSystemTrash) {
    super(app);
    this.paths = paths;
    this.supportsSystemTrash = supportsSystemTrash;
  }
  onOpen() {
    this.modalEl.addClass("xd-attachment-manager-modal");
    this.titleEl.setText("Delete Managed Attachment");
    this.contentEl.createEl("p", { text: `${this.paths.length} path(s) will be affected.` });
    const list = this.contentEl.createDiv({ cls: "xd-attachment-manager-impact-list" });
    for (const path of this.paths) list.createDiv({ cls: "xd-attachment-manager-impact-path", text: path });
    addDeleteModeButtons(this.contentEl, this.supportsSystemTrash, (mode) => this.settle(mode));
  }
  onClose() {
    this.contentEl.empty();
    this.settleOnClose(null);
  }
};
var GroupDeleteModal = class extends PromiseModal {
  constructor(app, affectedPaths, options, supportsSystemTrash) {
    super(app);
    this.affectedPaths = affectedPaths;
    this.options = options;
    this.supportsSystemTrash = supportsSystemTrash;
    __publicField(this, "choices");
    this.choices = options.map((option) => {
      var _a;
      return { path: option.path, deleteWithGroup: false, ownerNoteId: (_a = option.owners[0]) == null ? void 0 : _a.id };
    });
  }
  onOpen() {
    this.modalEl.addClass("xd-attachment-manager-modal");
    this.titleEl.setText("Delete Visual Attachment Group");
    this.contentEl.createEl("p", { text: "Referenced dependencies are extracted by default. Choose any that should be deleted with the group." });
    const list = this.contentEl.createDiv({ cls: "xd-attachment-manager-impact-list" });
    for (const path of this.affectedPaths) list.createDiv({ cls: "xd-attachment-manager-impact-path", text: path });
    for (const option of this.options) {
      const choice = this.choices.find((candidate) => candidate.path === option.path);
      if (!choice) continue;
      new import_obsidian10.Setting(this.contentEl).setName(option.path).setDesc("Referenced outside the visual group").addToggle((toggle) => toggle.setTooltip("Delete with group").setValue(false).onChange((value) => choice.deleteWithGroup = value)).addDropdown((dropdown) => {
        var _a;
        for (const owner of option.owners) dropdown.addOption(owner.id, owner.label);
        dropdown.setValue((_a = choice.ownerNoteId) != null ? _a : "").onChange((value) => choice.ownerNoteId = value);
      });
    }
    addDeleteModeButtons(this.contentEl, this.supportsSystemTrash, (mode) => {
      this.settle(mode ? { choices: this.choices, mode } : null);
    });
  }
  onClose() {
    this.contentEl.empty();
    this.settleOnClose(null);
  }
};
function addDeleteModeButtons(parent, supportsSystemTrash, choose) {
  const footer = parent.createDiv({ cls: "xd-attachment-manager-button-row" });
  footer.createEl("button", { text: "Cancel" }).addEventListener("click", () => choose(null));
  const obsidianTrash = footer.createEl("button", { text: "Trash (Obsidian)" });
  obsidianTrash.addClass("mod-cta");
  obsidianTrash.addEventListener("click", () => choose("obsidian-trash"));
  if (supportsSystemTrash) {
    footer.createEl("button", { text: "Trash (System)" }).addEventListener("click", () => choose("system-trash"));
  }
  const permanent = footer.createEl("button", { text: "Delete" });
  permanent.addClass("mod-warning");
  permanent.addEventListener("click", () => choose("permanent"));
}
var CLEANUP_CATEGORIES = ["orphan", "empty", "empty-folder"];
var CLEANUP_LABELS = {
  orphan: "Orphans",
  empty: "Empty",
  "empty-folder": "Empty Folders"
};
var CleanupResultsModal = class extends PromiseModal {
  constructor(app, items, rootPath, configuredPath, supportsSystemTrash) {
    super(app);
    this.items = items;
    this.rootPath = rootPath;
    this.configuredPath = configuredPath;
    this.supportsSystemTrash = supportsSystemTrash;
    __publicField(this, "inputsByPath", /* @__PURE__ */ new Map());
    __publicField(this, "categoryHeaders", /* @__PURE__ */ new Map());
    __publicField(this, "actionButtons", []);
  }
  onOpen() {
    this.modalEl.addClass("xd-attachment-manager-modal", "xd-attachment-cleanup-modal");
    this.titleEl.setText("XD Attachment Cleanup");
    this.renderScope();
    const list = this.contentEl.createDiv({ cls: "xd-attachment-cleanup-results" });
    if (this.items.length === 0) list.createEl("p", { cls: "xd-attachment-cleanup-empty", text: "No cleanup items found." });
    for (const category of CLEANUP_CATEGORIES) this.renderCategory(list, category);
    this.renderFooter();
    this.syncControls();
  }
  onClose() {
    this.contentEl.empty();
    this.settleOnClose(null);
  }
  renderScope() {
    const bar = this.contentEl.createDiv({ cls: "xd-attachment-cleanup-scope" });
    const select = bar.createEl("select", { attr: { "aria-label": "Cleanup scope" } });
    select.createEl("option", { value: "assets", text: "Assets" });
    select.createEl("option", { value: "directory", text: "Specified directory" });
    select.createEl("option", { value: "vault", text: "Full vault" });
    const normalized = normalizeVaultPath(this.rootPath);
    select.value = normalized === "Assets" ? "assets" : normalized ? "directory" : "vault";
    const path = bar.createEl("input", {
      type: "text",
      value: normalized && normalized !== "Assets" ? normalized : this.configuredPath,
      attr: { "aria-label": "Specified cleanup directory", placeholder: "Folder path" }
    });
    const scan = bar.createEl("button", { text: "Scan" });
    const updatePathVisibility = () => path.toggleClass("is-hidden", select.value !== "directory");
    select.addEventListener("change", updatePathVisibility);
    scan.addEventListener("click", () => {
      const rootPath = select.value === "vault" ? "" : select.value === "assets" ? "Assets" : normalizeVaultPath(path.value);
      this.settle({ kind: "rescan", rootPath });
    });
    updatePathVisibility();
  }
  renderCategory(parent, category) {
    const categoryItems = this.items.filter((item) => item.category === category);
    if (categoryItems.length === 0) return;
    const section = parent.createDiv({ cls: "xd-attachment-cleanup-section" });
    const header = section.createDiv({ cls: "xd-attachment-cleanup-section-header" });
    const checkbox = header.createEl("input", { type: "checkbox", attr: { "aria-label": `Select all ${CLEANUP_LABELS[category]}` } });
    header.createDiv({ cls: "xd-attachment-cleanup-section-title", text: CLEANUP_LABELS[category] });
    const count = header.createDiv({ cls: "xd-attachment-cleanup-section-count" });
    checkbox.addEventListener("change", () => {
      for (const item of categoryItems) this.setSelectedForPath(item.path, checkbox.checked);
      this.syncControls();
    });
    this.categoryHeaders.set(category, { input: checkbox, count });
    for (const item of categoryItems) this.renderItem(section, item);
  }
  renderItem(parent, item) {
    var _a, _b;
    const row = parent.createDiv({ cls: "xd-attachment-cleanup-row" });
    const checkbox = row.createEl("input", { type: "checkbox", attr: { "aria-label": `Select ${item.path}` } });
    checkbox.checked = item.selected;
    const key3 = normalizeVaultPath(item.path).toLowerCase();
    const inputs = (_a = this.inputsByPath.get(key3)) != null ? _a : [];
    inputs.push(checkbox);
    this.inputsByPath.set(key3, inputs);
    checkbox.addEventListener("change", () => {
      this.setSelectedForPath(item.path, checkbox.checked);
      this.syncControls();
    });
    const info = row.createDiv({ cls: "xd-attachment-cleanup-row-info" });
    info.createDiv({ cls: "xd-attachment-cleanup-path", text: item.path });
    const meta = info.createDiv({ cls: "xd-attachment-cleanup-meta" });
    meta.createSpan({ cls: `xd-attachment-cleanup-type is-${item.entityType}`, text: entityLabel(item.entityType) });
    if (item.size > 0) meta.createSpan({ text: formatBytes(item.size) });
    meta.createSpan({ text: item.detail });
    const file = this.app.vault.getFileByPath(item.path);
    const previewFile = this.app.vault.getFileByPath((_b = item.previewPath) != null ? _b : item.path);
    if (previewFile && IMAGE_EXTENSIONS.has(extension(previewFile.path))) {
      const preview = row.createDiv({ cls: "xd-attachment-cleanup-preview" });
      preview.createEl("img", { attr: { src: this.app.vault.getResourcePath(previewFile), alt: "" } });
    }
    if (file) {
      const open = row.createEl("button", { cls: "clickable-icon xd-attachment-cleanup-open", attr: { "aria-label": "Open file" } });
      (0, import_obsidian10.setIcon)(open, "external-link");
      open.addEventListener("click", () => void this.app.workspace.getLeaf(false).openFile(file));
    }
  }
  renderFooter() {
    const footer = this.contentEl.createDiv({ cls: "xd-attachment-cleanup-footer" });
    footer.createEl("button", { text: "Cancel" }).addEventListener("click", () => this.settle(null));
    this.addActionButton(footer, "Trash (Obsidian)", "obsidian-trash", true);
    if (this.supportsSystemTrash) this.addActionButton(footer, "Trash (System)", "system-trash", false);
    this.addActionButton(footer, "Delete", "permanent", false, true);
  }
  addActionButton(parent, label, mode, cta, warning = false) {
    const button = parent.createEl("button", { text: label });
    if (cta) button.addClass("mod-cta");
    if (warning) button.addClass("mod-warning");
    button.addEventListener("click", () => this.settle({
      kind: "clean",
      items: this.items.filter((item) => item.selected),
      mode
    }));
    this.actionButtons.push(button);
  }
  setSelectedForPath(path, selected) {
    var _a;
    const key3 = normalizeVaultPath(path).toLowerCase();
    for (const item of this.items) if (normalizeVaultPath(item.path).toLowerCase() === key3) item.selected = selected;
    for (const input of (_a = this.inputsByPath.get(key3)) != null ? _a : []) input.checked = selected;
  }
  syncControls() {
    for (const category of CLEANUP_CATEGORIES) {
      const header = this.categoryHeaders.get(category);
      if (!header) continue;
      const items = this.items.filter((item) => item.category === category);
      const selected = items.filter((item) => item.selected).length;
      header.input.checked = selected === items.length;
      header.input.indeterminate = selected > 0 && selected < items.length;
      header.count.setText(`${selected} / ${items.length}`);
    }
    const hasSelection = this.items.some((item) => item.selected);
    for (const button of this.actionButtons) button.disabled = !hasSelection;
  }
};
var CleanupProgressModal = class extends import_obsidian10.Modal {
  constructor() {
    super(...arguments);
    __publicField(this, "controller", new AbortController());
    __publicField(this, "progressEl", null);
    __publicField(this, "statusEl", null);
    __publicField(this, "finished", false);
  }
  onOpen() {
    this.modalEl.addClass("xd-attachment-manager-modal");
    this.titleEl.setText("Scanning Cleanup Items");
    this.statusEl = this.contentEl.createEl("p", { text: "Preparing..." });
    this.progressEl = this.contentEl.createEl("progress", { cls: "xd-attachment-manager-progress" });
    new import_obsidian10.Setting(this.contentEl).addButton(
      (button) => button.setWarning().setButtonText("Cancel").onClick(() => {
        this.controller.abort();
        this.close();
      })
    );
  }
  update(completed, total) {
    if (!this.progressEl || !this.statusEl) return;
    this.progressEl.max = Math.max(1, total);
    this.progressEl.value = completed;
    this.statusEl.setText(`${completed} / ${total}`);
  }
  finish() {
    this.finished = true;
    this.close();
  }
  onClose() {
    if (!this.finished) this.controller.abort();
    this.contentEl.empty();
  }
};
var MigrationReportModal = class extends import_obsidian10.Modal {
  constructor(app, report) {
    super(app);
    this.report = report;
  }
  onOpen() {
    this.modalEl.addClass("xd-attachment-manager-modal");
    this.titleEl.setText("Attachment Migration Report");
    this.contentEl.createEl("p", {
      text: `${this.report.managedAssets} managed assets, ${this.report.adoptedAssets} adopted assets, ${this.report.visualGroups} visual groups.`
    });
    const list = this.contentEl.createDiv({ cls: "xd-attachment-manager-impact-list" });
    if (this.report.issues.length === 0) list.createEl("p", { text: "No review items." });
    for (const issue of this.report.issues) {
      const row = list.createDiv();
      row.createDiv({ cls: "xd-attachment-manager-impact-path", text: issue.path });
      row.createDiv({ text: issue.reason });
    }
    new import_obsidian10.Setting(this.contentEl).addButton((button) => button.setCta().setButtonText("Close").onClick(() => this.close()));
  }
  onClose() {
    this.contentEl.empty();
  }
};
var IntegrityReportModal = class extends import_obsidian10.Modal {
  constructor(app, report) {
    super(app);
    this.report = report;
  }
  onOpen() {
    this.modalEl.addClass("xd-attachment-manager-modal");
    this.titleEl.setText("Attachment Integrity Report");
    this.contentEl.createEl("p", {
      text: `${this.report.adoptedAssets} asset(s) adopted, ${this.report.repairedFolders} folder meta record(s) repaired, ${this.report.missingAssets.length} missing attachment(s).`
    });
    const list = this.contentEl.createDiv({ cls: "xd-attachment-manager-impact-list" });
    for (const path of this.report.missingAssets) list.createDiv({ cls: "xd-attachment-manager-impact-path", text: `Missing: ${path}` });
    for (const issue of this.report.issues) {
      const row = list.createDiv();
      row.createDiv({ cls: "xd-attachment-manager-impact-path", text: issue.path });
      row.createDiv({ text: issue.reason });
    }
    if (this.report.missingAssets.length === 0 && this.report.issues.length === 0) list.createEl("p", { text: "No unresolved integrity issues." });
    new import_obsidian10.Setting(this.contentEl).addButton((button) => button.setCta().setButtonText("Close").onClick(() => this.close()));
  }
  onClose() {
    this.contentEl.empty();
  }
};
function entityLabel(type) {
  if (type === "attachment") return "Attachment";
  if (type === "note") return "Note";
  if (type === "folder") return "Folder";
  return "File";
}
function formatBytes(size) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

// src/ui/menu-service.ts
var ATTACHMENT_MENU_SECTION = "xd-attachment-manager";
var ATTACHMENT_DANGER_SECTION = "xd-attachment-manager-danger";
var NATIVE_ACTION_TITLES = {
  copy: [/^Copy$/i, /^复制$/, /^複製$/],
  "copy-image": [/^Copy image$/i, /^复制图片$/, /^複製圖片$/],
  cut: [/^Cut$/i, /^剪切$/, /^剪下$/],
  "delete-image": [/^Delete image$/i, /^删除图片$/, /^刪除圖片$/],
  "open-default": [/^Open in default app(?:lication)?$/i, /^使用默认应用打开$/, /^使用預設應用程式開啟$/],
  rename: [/^Rename$/i, /^重命名$/, /^重新命名$/],
  "reset-size": [/^Reset size$/i, /^重置大小$/, /^重設大小$/],
  "show-in-folder": [
    /^Show in system explorer$/i,
    /^Show in Explorer$/i,
    /^Show in Finder$/i,
    /^在系统资源管理器中显示$/,
    /^在系統檔案總管中顯示$/,
    /^在 Finder 中顯示$/
  ]
};
var MenuService = class {
  constructor(app, index, references, attachments, clipboard, externalLinks, visuals, canMutate = () => true) {
    this.app = app;
    this.index = index;
    this.references = references;
    this.attachments = attachments;
    this.clipboard = clipboard;
    this.externalLinks = externalLinks;
    this.visuals = visuals;
    this.canMutate = canMutate;
    __publicField(this, "decoratedMenus", /* @__PURE__ */ new WeakSet());
    __publicField(this, "orderedMenus", /* @__PURE__ */ new WeakSet());
    __publicField(this, "nativeReplacements", /* @__PURE__ */ new WeakMap());
  }
  addFileMenu(menu, file, sourceNote = this.app.workspace.getActiveFile()) {
    if (!this.claimMenu(menu)) return;
    const context = sourceNote ? this.resolveActiveReference(sourceNote, file.path) : null;
    this.addAttachmentMenu(menu, file, sourceNote != null ? sourceNote : void 0, context == null ? void 0 : context.editor, context == null ? void 0 : context.reference);
  }
  addEditorMenu(menu, editor, view, domTarget) {
    if (!this.claimMenu(menu)) return;
    const file = view.file;
    if (!file) return;
    const domFile = this.resolveDomTarget(domTarget != null ? domTarget : null, file.path);
    if (domFile) {
      const context = this.resolveDomReference(domTarget != null ? domTarget : null, file, domFile.path, editor);
      this.addAttachmentMenu(menu, domFile, file, context == null ? void 0 : context.editor, context == null ? void 0 : context.reference);
      return;
    }
    const domRemote = this.resolveRemoteDomTarget(domTarget != null ? domTarget : null);
    if (domRemote) {
      const context = this.resolveDomReference(domTarget != null ? domTarget : null, file, domRemote.url, editor);
      this.addRemoteAttachmentMenu(menu, domRemote, file, context == null ? void 0 : context.editor, context == null ? void 0 : context.reference);
      return;
    }
    const offset = editor.posToOffset(editor.getCursor());
    const reference = this.references.referencesAtOffset(file.path, editor.getValue(), offset);
    if (reference == null ? void 0 : reference.resolvedPath) {
      const target = this.app.vault.getFileByPath(reference.resolvedPath);
      if (target) {
        this.addAttachmentMenu(menu, target, file, editor, reference);
        return;
      }
    }
    if ((reference == null ? void 0 : reference.embedded) && isRemoteUrl(reference.rawTarget)) {
      this.addRemoteAttachmentMenu(
        menu,
        {
          url: normalizeBrowserUrl(reference.rawTarget),
          label: readReferenceDisplay(reference.raw, reference.syntax).title || "Remote resource",
          kind: youtubeVideoId(reference.rawTarget) ? "youtube" : "image"
        },
        file,
        editor,
        reference
      );
    }
  }
  addDomMenu(menu, target, sourceNote = this.app.workspace.getActiveFile()) {
    var _a, _b;
    if (!this.claimMenu(menu)) return false;
    const initialItemCount = this.menuItemCount(menu);
    const targetView = this.markdownViewForTarget(target);
    const readingMode = target instanceof Element && Boolean(target.closest(".markdown-preview-view"));
    const targetNote = (_a = targetView == null ? void 0 : targetView.file) != null ? _a : sourceNote;
    const file = this.resolveDomTarget(target, (_b = targetNote == null ? void 0 : targetNote.path) != null ? _b : "");
    if (file) {
      const context2 = targetNote ? this.resolveDomReference(target, targetNote, file.path) : null;
      this.addAttachmentMenu(menu, file, targetNote != null ? targetNote : void 0, context2 == null ? void 0 : context2.editor, context2 == null ? void 0 : context2.reference, readingMode);
      return this.menuItemCount(menu) > initialItemCount;
    }
    const remote = this.resolveRemoteDomTarget(target);
    if (!remote || !targetNote) return false;
    const context = this.resolveDomReference(target, targetNote, remote.url);
    this.addRemoteAttachmentMenu(menu, remote, targetNote, context == null ? void 0 : context.editor, context == null ? void 0 : context.reference, readingMode);
    return this.menuItemCount(menu) > initialItemCount;
  }
  addAttachmentMenu(menu, file, sourceNote, editor, reference, readingMode = false) {
    const managed = this.index.assetByPath(file.path);
    const sourceContainer = sourceNote ? this.index.noteByPath(sourceNote.path) : null;
    const sourceGroup = sourceNote ? this.index.groupBySourcePath(sourceNote.path) : null;
    const owner = (sourceContainer == null ? void 0 : sourceContainer.role) === "note" ? sourceContainer : sourceGroup ? this.index.noteById(sourceGroup.ownerNoteId) : null;
    if (managed) {
      const canMutate = this.canMutate();
      if (canMutate && !readingMode) {
        const referenceNote = sourceNote && reference ? sourceNote : void 0;
        const display = reference ? readReferenceDisplay(reference.raw, reference.syntax) : null;
        const sizeEnabled = Boolean(referenceNote && (reference == null ? void 0 : reference.embedded) && this.isDisplayable(file.path));
        this.addInlineProperties(menu, {
          name: removeExtension(file.name),
          ...display ? { title: display.title, width: display.width, height: display.height } : {},
          editor,
          ratioSource: file.path,
          sizeEnabled,
          commit: async (value) => {
            const originalPath = file.path;
            let currentPath = file.path;
            if (value.name && value.name !== removeExtension(file.name)) {
              currentPath = await this.attachments.rename(file.path, value.name);
            }
            if (referenceNote && reference && display) {
              const mutation = {
                oldPath: originalPath,
                ...currentPath !== originalPath ? { newPath: currentPath } : {}
              };
              let displayChanged = false;
              if (value.title !== void 0 && value.title !== display.title) {
                mutation.label = value.title;
                displayChanged = true;
              }
              if (value.resetSize) {
                mutation.resetSize = true;
                displayChanged = true;
              } else if (value.width !== display.width || value.height !== display.height) {
                mutation.width = value.width;
                mutation.height = value.height;
                displayChanged = true;
              }
              if (displayChanged) {
                await this.mutateCurrentReference(referenceNote, mutation, reference, editor);
              }
            }
            new import_obsidian11.Notice("Attachment updated");
          }
        });
        this.replaceNativeAction(menu, "rename");
        if (sizeEnabled && referenceNote && ((display == null ? void 0 : display.width) !== void 0 || (display == null ? void 0 : display.height) !== void 0)) {
          this.addMenuItem(
            menu,
            (item) => item.setTitle("Reset Size").setIcon("rotate-ccw").onClick(() => this.run(async () => {
              await this.resetLocalReferenceSize(file.path, referenceNote, editor, reference);
              new import_obsidian11.Notice("Attachment size reset");
            }))
          );
          this.replaceNativeAction(menu, "reset-size");
        }
      }
      if (canMutate) {
        this.addMenuItem(
          menu,
          (item) => item.setTitle("Cut").setIcon("scissors").onClick(() => this.run(async () => {
            await this.clipboard.copyAttachment(file.path);
            if (sourceNote && reference) {
              await this.mutateCurrentReference(sourceNote, { oldPath: file.path, remove: true }, reference, editor);
            } else if (sourceNote && this.index.referencesForAsset(file.path).some((candidate) => candidate.notePath === sourceNote.path)) {
              await this.references.mutateFile(sourceNote, { oldPath: file.path, remove: true, nodeId: reference == null ? void 0 : reference.nodeId });
            }
          }))
        );
        this.replaceNativeAction(menu, "cut");
      }
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Copy Attachment").setIcon("copy").onClick(() => this.run(() => this.clipboard.copyAttachment(file.path)))
      );
      this.replaceNativeAction(menu, "copy");
      this.replaceNativeAction(menu, "copy-image");
      this.addDesktopFileActions(menu, file);
      if (!canMutate) return;
      const visual = this.visuals.resolveVisual(file.path);
      const managedOwner = managed.ownerNoteId ? this.index.noteById(managed.ownerNoteId) : owner;
      if (!readingMode && !managed.groupId && IMAGE_EXTENSIONS.has(extension(file.path)) && managedOwner) {
        this.addMenuItem(
          menu,
          (item) => item.setTitle("Convert to Excalidraw Attachment").setIcon("square-pen").onClick(() => this.run(() => this.visuals.convertImageToExcalidraw(file, managedOwner)))
        );
      }
      if (!readingMode && visual) {
        this.addMenuItem(
          menu,
          (item) => item.setTitle("Set as Note").setIcon("file-input").onClick(() => this.run(async () => {
            if (await this.setAsNote(file)) new import_obsidian11.Notice("Visual attachment converted to a note");
          }))
        );
      }
      this.addDangerMenuItem(
        menu,
        (item) => item.setTitle("Delete Attachment").setIcon("trash-2").setWarning(true).onClick(() => this.run(() => this.delete(file.path)))
      );
      this.replaceNativeAction(menu, "delete-image");
      return;
    }
    this.addDesktopFileActions(menu, file);
    if (!this.canMutate() || readingMode) return;
    if (!isVisualSourcePath(file.path) && owner) {
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Set as Attachment").setIcon("package-plus").onClick(() => this.run(async () => {
          const managed2 = await this.attachments.setAsAttachment(file, owner);
          new import_obsidian11.Notice(`Attachment stored: ${managed2.path}`);
        }))
      );
    }
    if (IMAGE_EXTENSIONS.has(extension(file.path)) && owner) {
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Convert to Excalidraw Attachment").setIcon("square-pen").onClick(() => this.run(() => this.visuals.convertImageToExcalidraw(file, owner)))
      );
    }
    if (isVisualSourcePath(file.path) && owner) {
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Set as Attachment").setIcon("package-plus").onClick(
          () => this.run(
            () => file.path.toLowerCase().endsWith(".canvas") ? this.visuals.setCanvasAsAttachment(file, owner) : this.visuals.adoptExistingVisual(file, owner)
          )
        )
      );
    }
  }
  addRemoteAttachmentMenu(menu, remote, sourceNote, editor, reference, readingMode = false) {
    var _a;
    const owner = this.index.noteByPath(sourceNote.path);
    const linkUrl = normalizeBrowserUrl((_a = reference == null ? void 0 : reference.rawTarget) != null ? _a : remote.url);
    const display = reference ? readReferenceDisplay(reference.raw, reference.syntax) : { title: remote.label };
    if (this.canMutate() && !readingMode) {
      this.addInlineProperties(menu, {
        title: display.title,
        width: display.width,
        height: display.height,
        editor,
        ratioSource: remote.url,
        sizeEnabled: true,
        commit: async (value) => {
          const mutation = { oldPath: remote.url };
          let changed = false;
          if (value.title !== void 0 && value.title !== display.title) {
            mutation.label = value.title;
            changed = true;
          }
          if (value.resetSize) {
            mutation.resetSize = true;
            changed = true;
          } else if (value.width !== display.width || value.height !== display.height) {
            mutation.width = value.width;
            mutation.height = value.height;
            changed = true;
          }
          if (changed) await this.mutateRemoteReference(sourceNote, remote.url, mutation, editor, reference);
          new import_obsidian11.Notice("Attachment updated");
        }
      });
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Reset Size").setIcon("rotate-ccw").onClick(() => this.run(() => this.mutateRemoteReference(
          sourceNote,
          remote.url,
          { oldPath: remote.url, resetSize: true },
          editor,
          reference
        ).then(() => new import_obsidian11.Notice("Attachment size reset"))))
      );
      this.replaceNativeAction(menu, "reset-size");
    }
    if (this.canMutate()) {
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Cut").setIcon("scissors").onClick(() => this.run(async () => {
          if (remote.kind === "image") await this.clipboard.copyRemoteAttachment(remote.url);
          else await this.clipboard.copyLink(linkUrl);
          await this.mutateRemoteReference(
            sourceNote,
            remote.url,
            { oldPath: remote.url, remove: true },
            editor,
            reference
          );
        }))
      );
      this.replaceNativeAction(menu, "cut");
    }
    if (remote.kind === "image") {
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Copy Attachment").setIcon("copy").onClick(() => this.run(() => this.clipboard.copyRemoteAttachment(remote.url)))
      );
      this.replaceNativeAction(menu, "copy");
      this.replaceNativeAction(menu, "copy-image");
    }
    this.addMenuItem(
      menu,
      (item) => item.setTitle("Copy Link").setIcon("link").onClick(() => this.run(() => this.clipboard.copyLink(linkUrl)))
    );
    this.addMenuItem(
      menu,
      (item) => item.setTitle("Open in Browser").setIcon("globe").onClick(() => this.run(() => this.externalLinks.open(linkUrl)))
    );
    if (!readingMode && this.canMutate() && owner && remote.kind === "image") {
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Set as Attachment").setIcon("package-plus").onClick(() => this.run(async () => {
          const created = await this.attachments.ingestRemote(remote.url, owner);
          await this.references.mutateFile(sourceNote, { oldPath: remote.url, newPath: created.path });
          new import_obsidian11.Notice("Remote image saved as a managed attachment");
        }))
      );
      this.addMenuItem(
        menu,
        (item) => item.setTitle("Convert to Excalidraw Attachment").setIcon("square-pen").onClick(() => this.run(async () => {
          const created = await this.attachments.ingestRemote(remote.url, owner);
          await this.references.mutateFile(sourceNote, { oldPath: remote.url, newPath: created.path });
          await this.visuals.convertImageToExcalidraw(created, owner);
        }))
      );
    }
    if (!readingMode && this.canMutate()) {
      this.addDangerMenuItem(
        menu,
        (item) => item.setTitle("Delete Link").setIcon("unlink").setWarning(true).onClick(() => this.run(() => this.mutateRemoteReference(
          sourceNote,
          remote.url,
          { oldPath: remote.url, remove: true },
          editor,
          reference
        )))
      );
      this.replaceNativeAction(menu, "delete-image");
    }
  }
  addInlineProperties(menu, options) {
    const originalName = options.name;
    const originalTitle = options.title;
    this.addMenuItem(menu, (item) => {
      item.setIsLabel(true);
      const itemDom = item.dom;
      itemDom.replaceChildren();
      itemDom.addClass("xd-attachment-manager-inline-item");
      const panel = document.createElement("div");
      panel.className = "xd-attachment-manager-inline-properties";
      itemDom.append(panel);
      const fields = document.createElement("div");
      fields.className = "xd-attachment-manager-inline-fields";
      panel.append(fields);
      const nameInput = originalName === void 0 ? null : this.addInlineTextRow(fields, "file-pen-line", "Name", "Attachment name", originalName);
      const titleInput = originalTitle === void 0 ? null : this.addInlineTextRow(fields, "tag", "Title", "Attachment title", originalTitle);
      let widthInput = null;
      let heightInput = null;
      let lockButton = null;
      let ratio;
      let ratioLocked = !(options.width !== void 0 && options.height === void 0 || options.width === void 0 && options.height !== void 0);
      if (options.sizeEnabled) {
        const sizeRow = document.createElement("div");
        sizeRow.className = "xd-attachment-manager-inline-row";
        fields.append(sizeRow);
        const sizeIcon = document.createElement("span");
        sizeIcon.className = "xd-attachment-manager-inline-icon";
        (0, import_obsidian11.setIcon)(sizeIcon, "scaling");
        sizeRow.append(sizeIcon);
        const sizeLabel = document.createElement("label");
        sizeLabel.textContent = "Size:";
        sizeRow.append(sizeLabel);
        const sizeControls = document.createElement("div");
        sizeControls.className = "xd-attachment-manager-size-controls";
        sizeRow.append(sizeControls);
        widthInput = this.createSizeInput("W", "Width");
        heightInput = this.createSizeInput("H", "Height");
        widthInput.value = options.width === void 0 ? "" : String(options.width);
        heightInput.value = options.height === void 0 ? "" : String(options.height);
        const multiply = document.createElement("span");
        multiply.className = "xd-attachment-manager-size-multiply";
        multiply.textContent = "x";
        lockButton = this.createIconButton("lock-keyhole", "Keep aspect ratio");
        lockButton.toggleClass("is-active", ratioLocked);
        lockButton.setAttribute("aria-pressed", String(ratioLocked));
        sizeControls.append(widthInput, multiply, heightInput, lockButton);
        const syncHeight = () => {
          var _a;
          const width = positiveNumber((_a = widthInput == null ? void 0 : widthInput.value) != null ? _a : "");
          if (ratioLocked && ratio && width !== void 0 && heightInput) heightInput.value = String(Math.max(1, Math.round(width / ratio)));
        };
        const syncWidth = () => {
          var _a;
          const height = positiveNumber((_a = heightInput == null ? void 0 : heightInput.value) != null ? _a : "");
          if (ratioLocked && ratio && height !== void 0 && widthInput) widthInput.value = String(Math.max(1, Math.round(height * ratio)));
        };
        widthInput.addEventListener("input", syncHeight);
        heightInput.addEventListener("input", syncWidth);
        lockButton.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          ratioLocked = !ratioLocked;
          lockButton == null ? void 0 : lockButton.toggleClass("is-active", ratioLocked);
          lockButton == null ? void 0 : lockButton.setAttribute("aria-pressed", String(ratioLocked));
          if (ratioLocked) syncHeight();
        });
        void this.imageRatio(options.ratioSource).then((value) => {
          ratio = value;
          if (!ratio && lockButton) {
            lockButton.disabled = true;
            lockButton.title = "Aspect ratio is unavailable";
          }
        });
      }
      const confirm = this.createIconButton("check", "Apply attachment changes");
      confirm.addClass("xd-attachment-manager-inline-confirm");
      panel.append(confirm);
      let committing = false;
      const commit = async () => {
        var _a, _b;
        if (committing) return;
        committing = true;
        const viewport = this.captureEditorViewport(options.editor);
        const requestedName = nameInput == null ? void 0 : nameInput.value.trim();
        const requestedTitle = titleInput == null ? void 0 : titleInput.value.trim();
        const width = positiveNumber((_a = widthInput == null ? void 0 : widthInput.value) != null ? _a : "");
        const height = positiveNumber((_b = heightInput == null ? void 0 : heightInput.value) != null ? _b : "");
        try {
          await options.commit({
            ...originalName !== void 0 ? { name: requestedName || originalName } : {},
            ...originalTitle !== void 0 ? { title: requestedTitle != null ? requestedTitle : originalTitle } : {},
            width,
            height,
            resetSize: options.sizeEnabled && width === void 0 && height === void 0 && (options.width !== void 0 || options.height !== void 0)
          });
          menu.hide();
          this.restoreEditorViewport(viewport);
        } catch (error) {
          committing = false;
          throw error;
        }
      };
      confirm.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        void this.run(commit);
      });
      const menuScope = menu.scope;
      const nativeEnter = menuScope.keys.find((handler) => handler.key === "Enter" && handler.modifiers === "");
      if (nativeEnter) {
        menuScope.unregister(nativeEnter);
        menuScope.register([], "Enter", (event, context) => {
          const activeInput = document.activeElement;
          if (!(activeInput instanceof HTMLInputElement) || !panel.contains(activeInput)) {
            return nativeEnter.func(event, context);
          }
          if (event.isComposing && activeInput.type !== "number") return false;
          event.preventDefault();
          event.stopImmediatePropagation();
          void this.run(commit);
          return false;
        });
      }
      const handleKeyboard = (event) => {
        if (!panel.contains(event.target)) return;
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopImmediatePropagation();
          menu.hide();
          return;
        }
        if (!(event.target instanceof HTMLInputElement) || !isEnterKey(event)) return;
        if (event.isComposing && event.target.type !== "number") return;
        event.preventDefault();
        event.stopImmediatePropagation();
        void this.run(commit);
      };
      const handleNumericKeyup = (event) => {
        if (!(event.target instanceof HTMLInputElement) || event.target.type !== "number" || !panel.contains(event.target) || !isEnterKey(event)) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        void this.run(commit);
      };
      window.addEventListener("keydown", handleKeyboard, true);
      window.addEventListener("keyup", handleNumericKeyup, true);
      menu.onHide(() => {
        window.removeEventListener("keydown", handleKeyboard, true);
        window.removeEventListener("keyup", handleNumericKeyup, true);
      });
      for (const eventName of ["pointerdown", "mousedown", "mouseup", "click", "dblclick", "touchstart"]) {
        panel.addEventListener(eventName, (event) => event.stopPropagation());
      }
    });
  }
  captureEditorViewport(editor) {
    const codeMirror = editor == null ? void 0 : editor.cm;
    const scrollDOM = codeMirror == null ? void 0 : codeMirror.scrollDOM;
    if (!(scrollDOM instanceof HTMLElement)) return null;
    return {
      ...(codeMirror == null ? void 0 : codeMirror.contentDOM) instanceof HTMLElement ? { contentDOM: codeMirror.contentDOM } : {},
      scrollDOM,
      scrollLeft: scrollDOM.scrollLeft,
      scrollTop: scrollDOM.scrollTop
    };
  }
  restoreEditorViewport(snapshot) {
    if (!snapshot) return;
    const restoreScroll = () => {
      if (!snapshot.scrollDOM.isConnected) return;
      snapshot.scrollDOM.scrollLeft = snapshot.scrollLeft;
      snapshot.scrollDOM.scrollTop = snapshot.scrollTop;
    };
    globalThis.queueMicrotask(() => {
      var _a;
      (_a = snapshot.contentDOM) == null ? void 0 : _a.focus({ preventScroll: true });
      restoreScroll();
      window.requestAnimationFrame(() => {
        restoreScroll();
        window.requestAnimationFrame(restoreScroll);
      });
    });
  }
  addMenuItem(menu, configure) {
    this.installMenuOrdering(menu);
    this.prioritizeMenuSection(menu);
    menu.addItem((item) => {
      item.setSection(ATTACHMENT_MENU_SECTION);
      configure(item);
    });
  }
  addDangerMenuItem(menu, configure) {
    this.installMenuOrdering(menu);
    menu.addItem((item) => {
      item.setSection(ATTACHMENT_DANGER_SECTION);
      configure(item);
    });
    this.placeDangerSectionLast(menu);
    globalThis.queueMicrotask(() => this.placeDangerSectionLast(menu));
  }
  prioritizeMenuSection(menu) {
    const sections = menu.sections;
    if (!Array.isArray(sections)) return;
    const current = sections.indexOf(ATTACHMENT_MENU_SECTION);
    if (current >= 0) sections.splice(current, 1);
    sections.unshift(ATTACHMENT_MENU_SECTION);
  }
  placeDangerSectionLast(menu) {
    const sections = menu.sections;
    if (!Array.isArray(sections)) return;
    const current = sections.indexOf(ATTACHMENT_DANGER_SECTION);
    if (current >= 0) sections.splice(current, 1);
    sections.push(ATTACHMENT_DANGER_SECTION);
  }
  installMenuOrdering(menu) {
    if (this.orderedMenus.has(menu)) return;
    const internal = menu;
    if (typeof internal.sort !== "function") return;
    const originalSort = internal.sort.bind(menu);
    internal.sort = () => {
      this.suppressReplacedNativeActions(menu);
      this.collectMenuSections(menu);
      this.prioritizeMenuSection(menu);
      this.placeDangerSectionLast(menu);
      originalSort();
    };
    this.orderedMenus.add(menu);
  }
  collectMenuSections(menu) {
    const internal = menu;
    if (!Array.isArray(internal.items) || !Array.isArray(internal.sections)) return;
    for (const item of internal.items) {
      const section = item.section;
      if (typeof section === "string" && !internal.sections.includes(section)) internal.sections.push(section);
    }
    if (!internal.sections.includes("")) internal.sections.push("");
  }
  claimMenu(menu) {
    if (this.decoratedMenus.has(menu)) return false;
    this.decoratedMenus.add(menu);
    return true;
  }
  menuItemCount(menu) {
    const items = menu.items;
    return Array.isArray(items) ? items.length : 0;
  }
  addDesktopFileActions(menu, file) {
    if (!import_obsidian11.Platform.isDesktopApp) return;
    this.addMenuItem(
      menu,
      (item) => item.setTitle(import_obsidian11.Platform.isMacOS ? "Show in Finder" : "Show in Explorer").setIcon("folder-search").onClick(() => this.showInExplorer(file))
    );
    this.replaceNativeAction(menu, "show-in-folder");
    this.addMenuItem(
      menu,
      (item) => item.setTitle("Open in Default App").setIcon("external-link").onClick(() => this.openInDefaultApp(file))
    );
    this.replaceNativeAction(menu, "open-default");
  }
  showInExplorer(file) {
    const app = this.app;
    if (typeof app.showInFolder !== "function") {
      new import_obsidian11.Notice("Show in Explorer is unavailable on this device");
      return;
    }
    app.showInFolder(file.path);
  }
  openInDefaultApp(file) {
    const app = this.app;
    if (typeof app.openWithDefaultApp !== "function") {
      new import_obsidian11.Notice("Open in Default App is unavailable on this device");
      return;
    }
    app.openWithDefaultApp(file.path);
  }
  async resetLocalReferenceSize(path, sourceNote, editor, reference) {
    const mutation = { oldPath: path, resetSize: true };
    if (reference) {
      await this.mutateCurrentReference(sourceNote, mutation, reference, editor);
      return;
    }
    await this.references.mutateFile(sourceNote, mutation);
  }
  replaceNativeAction(menu, replacement) {
    var _a;
    const replacements = (_a = this.nativeReplacements.get(menu)) != null ? _a : /* @__PURE__ */ new Set();
    replacements.add(replacement);
    this.nativeReplacements.set(menu, replacements);
  }
  suppressReplacedNativeActions(menu) {
    const replacements = this.nativeReplacements.get(menu);
    const internal = menu;
    if (!(replacements == null ? void 0 : replacements.size) || !Array.isArray(internal.items)) return;
    internal.items = internal.items.filter((item) => {
      if (item.section === ATTACHMENT_MENU_SECTION || item.section === ATTACHMENT_DANGER_SECTION) return true;
      const title = menuItemTitle(item);
      if (!title) return true;
      return ![...replacements].some(
        (replacement) => NATIVE_ACTION_TITLES[replacement].some((pattern) => pattern.test(title))
      );
    });
  }
  addInlineTextRow(parent, icon, label, placeholder, value) {
    const row = document.createElement("div");
    row.className = "xd-attachment-manager-inline-row";
    parent.append(row);
    const iconElement = document.createElement("span");
    iconElement.className = "xd-attachment-manager-inline-icon";
    (0, import_obsidian11.setIcon)(iconElement, icon);
    row.append(iconElement);
    const labelElement = document.createElement("label");
    labelElement.textContent = `${label}:`;
    row.append(labelElement);
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.value = value;
    input.setAttribute("aria-label", label);
    row.append(input);
    return input;
  }
  createSizeInput(placeholder, label) {
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.step = "1";
    input.inputMode = "numeric";
    input.placeholder = placeholder;
    input.setAttribute("aria-label", label);
    return input;
  }
  createIconButton(icon, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "clickable-icon xd-attachment-manager-inline-button";
    button.title = label;
    button.setAttribute("aria-label", label);
    (0, import_obsidian11.setIcon)(button, icon);
    return button;
  }
  async setAsNote(file) {
    const modal = new TextPromptModal(this.app, "Set Visual Attachment as Note", "", "Target note folder (blank for root)", true);
    modal.open();
    const folder = await modal.result;
    if (folder === null) return false;
    await this.visuals.setAsNote(file, folder);
    return true;
  }
  async delete(path) {
    const asset = this.index.assetByPath(path);
    if (!asset) return;
    const group = asset.groupId ? this.index.groupById(asset.groupId) : null;
    const affected = group ? [...group.memberPaths, ...new Set(group.memberPaths.flatMap((member) => this.index.referencesForAsset(member).map((reference) => reference.notePath)))] : [path, ...this.index.referencesForAsset(path).map((reference) => reference.notePath)];
    if (group) {
      const options = this.index.groupMembers(group.id).filter((member) => member.role === "dependency").map((member) => ({
        path: member.path,
        owners: this.index.referencesForAsset(member.path).filter(
          (reference) => reference.containerRole === "note" && reference.notePath !== group.sourcePath
        ).map((reference) => {
          var _a, _b;
          return {
            id: reference.noteId,
            label: (_b = (_a = this.index.noteById(reference.noteId)) == null ? void 0 : _a.basename) != null ? _b : reference.notePath
          };
        })
      })).filter((option) => option.owners.length > 0);
      const groupModal = new GroupDeleteModal(this.app, affected, options, import_obsidian11.Platform.isDesktopApp);
      groupModal.open();
      const result = await groupModal.result;
      if (result && await this.confirmPermanentDelete(result.mode, affected, "Visual Attachment Group")) {
        await this.attachments.deleteManaged(path, result.choices, result.mode);
        new import_obsidian11.Notice(deleteResultNotice("Visual attachment", result.mode));
      }
      return;
    }
    const modal = new DeleteManagedAttachmentModal(this.app, affected, import_obsidian11.Platform.isDesktopApp);
    modal.open();
    const mode = await modal.result;
    if (mode && await this.confirmPermanentDelete(mode, affected, "Managed Attachment")) {
      await this.attachments.deleteManaged(path, [], mode);
      new import_obsidian11.Notice(deleteResultNotice("Attachment", mode));
    }
  }
  async confirmPermanentDelete(mode, affected, subject) {
    if (mode !== "permanent") return true;
    const confirmation = new ConfirmImpactModal(
      this.app,
      `Permanently Delete ${subject}`,
      affected,
      "Delete Permanently"
    );
    confirmation.open();
    return confirmation.result;
  }
  resolveActiveReference(sourceNote, targetPath) {
    const view = this.markdownViews().find((candidate) => {
      var _a;
      return ((_a = candidate.file) == null ? void 0 : _a.path) === sourceNote.path;
    });
    if (!view) return null;
    const matches = this.references.referencesForPathInContent(sourceNote.path, view.editor.getValue(), targetPath).filter((reference) => reference.embedded);
    if (matches.length !== 1) return null;
    return {
      reference: matches[0],
      ...view.getMode() === "source" ? { editor: view.editor } : {}
    };
  }
  resolveDomReference(target, sourceNote, targetPath, editorOverride) {
    var _a;
    if (!(target instanceof Element)) return null;
    const view = (_a = this.markdownViewForTarget(target)) != null ? _a : this.markdownViews().find((candidate) => {
      var _a2;
      return ((_a2 = candidate.file) == null ? void 0 : _a2.path) === sourceNote.path;
    });
    const contentEditor = editorOverride != null ? editorOverride : view == null ? void 0 : view.editor;
    if (!contentEditor) return null;
    const content = contentEditor.getValue();
    let candidates = this.references.referencesForPathInContent(sourceNote.path, content, targetPath).filter((reference) => reference.embedded);
    const videoId = youtubeVideoId(targetPath);
    if (candidates.length === 0 && videoId) {
      candidates = this.references.referencesInContent(sourceNote.path, content).filter((reference) => reference.embedded && youtubeVideoId(reference.rawTarget) === videoId);
    }
    if (candidates.length === 0) return null;
    const domDisplay = this.domReferenceDisplay(target);
    const cursorOffset = editorOverride ? editorOverride.posToOffset(editorOverride.getCursor()) : void 0;
    const scored = candidates.map((reference) => {
      const display = readReferenceDisplay(reference.raw, reference.syntax);
      let score = 0;
      if (domDisplay.title !== void 0) score += display.title === domDisplay.title ? 16 : -16;
      if (domDisplay.width !== void 0) score += display.width === domDisplay.width ? 8 : -8;
      if (domDisplay.height !== void 0) score += display.height === domDisplay.height ? 8 : -8;
      if (cursorOffset !== void 0) {
        if (cursorOffset >= reference.start && cursorOffset <= reference.end) score += 32;
        score -= Math.abs(reference.start - cursorOffset) / Math.max(1, content.length);
      }
      return { reference, score };
    }).sort((left, right) => right.score - left.score || left.reference.start - right.reference.start);
    if (scored.length > 1 && scored[0].score === scored[1].score) return null;
    const mutationEditor = editorOverride != null ? editorOverride : (view == null ? void 0 : view.getMode()) === "source" ? view.editor : void 0;
    return {
      reference: scored[0].reference,
      ...mutationEditor ? { editor: mutationEditor } : {}
    };
  }
  domReferenceDisplay(target) {
    var _a, _b, _c, _d, _e, _f, _g;
    const host = target.closest(
      "[data-xdvc-visual-source], .excalidraw-embedded-img[fileSource], .internal-embed[src], .markdown-embed[src]"
    );
    const image = (_a = target.closest("img")) != null ? _a : host == null ? void 0 : host.querySelector("img");
    const title = (_c = (_b = host == null ? void 0 : host.getAttribute("alt")) != null ? _b : image == null ? void 0 : image.getAttribute("alt")) != null ? _c : void 0;
    const width = positiveNumber((_e = (_d = host == null ? void 0 : host.getAttribute("width")) != null ? _d : image == null ? void 0 : image.getAttribute("width")) != null ? _e : "");
    const height = positiveNumber((_g = (_f = host == null ? void 0 : host.getAttribute("height")) != null ? _f : image == null ? void 0 : image.getAttribute("height")) != null ? _g : "");
    return {
      ...title !== void 0 ? { title: labelWithoutSize(title, "") } : {},
      ...width !== void 0 ? { width } : {},
      ...height !== void 0 ? { height } : {}
    };
  }
  markdownViewForTarget(target) {
    var _a;
    if (!(target instanceof Element)) return null;
    return (_a = this.markdownViews().find((view) => view.containerEl.contains(target))) != null ? _a : null;
  }
  markdownViews() {
    return this.app.workspace.getLeavesOfType("markdown").map((leaf) => leaf.view).filter((view) => Boolean(view.file));
  }
  async mutateCurrentReference(sourceNote, mutation, hint, editor) {
    var _a;
    if (!editor) {
      const changed = await this.references.mutateReference(sourceNote, hint, mutation);
      if (!changed) throw new Error("The attachment reference changed; reopen the menu and try again");
      return;
    }
    const content = editor.getValue();
    const selected = this.references.selectReference(sourceNote.path, content, hint, mutation);
    if (!selected) throw new Error("The attachment reference changed; reopen the menu and try again");
    const currentPath = (_a = selected.resolvedPath) != null ? _a : selected.rawTarget;
    const replacement = mutateMarkdownReferences(
      selected.raw,
      [{ ...selected, start: 0, end: selected.raw.length }],
      { ...mutation, oldPath: currentPath }
    );
    if (replacement === selected.raw) return;
    editor.replaceRange(replacement, editor.offsetToPos(selected.start), editor.offsetToPos(selected.end));
  }
  resolveDomTarget(target, sourcePath) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    if (!(target instanceof Element)) return null;
    const visualHost = target.closest("[data-xdvc-visual-source], .excalidraw-embedded-img[fileSource]");
    const element = visualHost != null ? visualHost : target.closest(
      "[fileSource], [data-href], [data-src], [data-path], .internal-embed[src], .markdown-embed[src], img[src], video[src], audio[src], a.internal-link"
    );
    if (!element) return null;
    const raw = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = element.dataset.xdvcVisualSource) != null ? _a : element.dataset.href) != null ? _b : element.dataset.src) != null ? _c : element.dataset.path) != null ? _d : element.getAttribute("fileSource")) != null ? _e : element.getAttribute("src")) != null ? _f : element.getAttribute("href")) != null ? _g : element.getAttribute("alt")) != null ? _h : "";
    for (const candidate of linkCandidates(raw)) {
      const linked = this.app.metadataCache.getFirstLinkpathDest(candidate, sourcePath);
      if (linked) return linked;
      const direct = this.app.vault.getFileByPath(candidate);
      if (direct) return direct;
    }
    const src = (_i = element.getAttribute("src")) == null ? void 0 : _i.split(/[?#]/)[0];
    if (!src) return null;
    return (_j = this.app.vault.getFiles().find((file) => this.app.vault.getResourcePath(file).split(/[?#]/)[0] === src)) != null ? _j : null;
  }
  resolveRemoteDomTarget(target) {
    var _a, _b, _c;
    if (!(target instanceof Element)) return null;
    const selector = "img[src], iframe[src], webview[src], [data-src], [data-href], [data-url]";
    const direct = target.closest(selector);
    const host = target.closest(
      ".image-embed, .internal-embed, .markdown-embed, .cm-embed-block, .external-embed, p:has(> iframe.external-embed)"
    );
    const element = direct != null ? direct : host == null ? void 0 : host.querySelector(selector);
    if (!element) return null;
    const values = [
      element.dataset.src,
      element.dataset.href,
      element.dataset.url,
      element.getAttribute("src"),
      element.getAttribute("href")
    ];
    const rawUrl = values.find((value) => Boolean(value && isRemoteUrl(value)));
    if (!rawUrl) return null;
    const kind = element.matches("img") ? "image" : youtubeVideoId(rawUrl) ? "youtube" : "other";
    return {
      url: normalizeBrowserUrl(rawUrl),
      label: labelWithoutSize(
        (_c = (_b = (_a = element.getAttribute("alt")) != null ? _a : element.getAttribute("title")) != null ? _b : element.getAttribute("aria-label")) != null ? _c : kind === "youtube" ? "YouTube video" : "Remote resource"
      ),
      kind
    };
  }
  async mutateRemoteReference(sourceNote, url, mutation, editor, reference) {
    if (reference) {
      await this.mutateCurrentReference(sourceNote, { ...mutation, oldPath: url }, reference, editor);
      return;
    }
    await this.references.mutateFile(sourceNote, { ...mutation, oldPath: url });
  }
  isDisplayable(path) {
    return EMBEDDABLE_EXTENSIONS.has(extension(path)) || Boolean(this.visuals.resolveVisual(path));
  }
  async imageRatio(path) {
    var _a;
    const remote = isRemoteUrl(path);
    const visual = remote ? null : this.visuals.resolveVisual(path);
    const file = remote ? null : this.app.vault.getFileByPath((_a = visual == null ? void 0 : visual.previewPath) != null ? _a : path);
    if (!remote && (!file || !IMAGE_EXTENSIONS.has(extension(file.path)))) return void 0;
    const image = new Image();
    image.src = remote ? path : this.app.vault.getResourcePath(file);
    try {
      if (typeof image.decode === "function") await image.decode();
      else await new Promise((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Unable to read image dimensions"));
      });
      return image.naturalWidth > 0 && image.naturalHeight > 0 ? image.naturalWidth / image.naturalHeight : void 0;
    } catch (e) {
      return void 0;
    }
  }
  async run(action) {
    try {
      await action();
    } catch (error) {
      console.error("XD Attachment Manager", error);
      new import_obsidian11.Notice(error instanceof Error ? error.message : String(error));
    }
  }
};
function positiveNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : void 0;
}
function isEnterKey(event) {
  return event.key === "Enter" || event.code === "Enter" || event.code === "NumpadEnter";
}
function deleteResultNotice(subject, mode) {
  if (mode === "obsidian-trash") return `${subject} moved to Obsidian Trash`;
  if (mode === "system-trash") return `${subject} moved to System Trash`;
  return `${subject} deleted permanently`;
}
function labelWithoutSize(value, fallback = "Remote image") {
  var _a;
  const parts = value.split("|");
  if (parts.length > 1 && isSizeToken((_a = parts[parts.length - 1]) != null ? _a : "")) parts.pop();
  return parts.join("|").trim() || fallback;
}
function menuItemTitle(item) {
  var _a, _b, _c, _d;
  if (typeof item.title === "string") return item.title.trim();
  return (_d = (_c = (_b = (_a = item.dom) == null ? void 0 : _a.querySelector(".menu-item-title")) == null ? void 0 : _b.textContent) == null ? void 0 : _c.trim()) != null ? _d : "";
}
function linkCandidates(value) {
  const trimmed = value.trim().replace(/^<|>$/g, "");
  const alias = trimmed.indexOf("|");
  const withoutAlias = alias < 0 ? trimmed : trimmed.slice(0, alias);
  const hash = withoutAlias.indexOf("#");
  const clean = (hash < 0 ? withoutAlias : withoutAlias.slice(0, hash)).trim();
  if (!clean) return [];
  try {
    const decoded = decodeURIComponent(clean);
    return decoded === clean ? [clean] : [clean, decoded];
  } catch (e) {
    return [clean];
  }
}

// src/ui/menu-deduplicator.ts
var ATTACHMENT_MENU_SELECTOR = '.menu:has([data-section="xd-attachment-manager"])';
function collapseDuplicateAttachmentMenus(root) {
  const menus = [...root.querySelectorAll(ATTACHMENT_MENU_SELECTOR)];
  if (menus.length < 2) return 0;
  for (const menu of menus.slice(0, -1)) menu.remove();
  return menus.length - 1;
}
function removeAttachmentMenus(root) {
  const menus = [...root.querySelectorAll(ATTACHMENT_MENU_SELECTOR)];
  for (const menu of menus) menu.remove();
  return menus.length;
}
function observeAttachmentMenus(document2) {
  let pending = false;
  const observer = new MutationObserver(() => {
    if (pending) return;
    pending = true;
    queueMicrotask(() => {
      pending = false;
      collapseDuplicateAttachmentMenus(document2);
    });
  });
  observer.observe(document2.body, { childList: true, subtree: true });
  collapseDuplicateAttachmentMenus(document2);
  return () => observer.disconnect();
}

// src/settings.ts
var import_obsidian12 = require("obsidian");
var DEFAULT_SETTINGS = {
  schemaVersion: META_SCHEMA_VERSION,
  canvasPreviewRendererVersion: 0,
  defaultLinkFormat: DEFAULT_LINK_FORMAT,
  emptyFolderDebounceMs: DEFAULT_EMPTY_FOLDER_DEBOUNCE_MS,
  auditPath: "Assets",
  auditExcludes: [".obsidian", ".trash"],
  migrationCompleted: false,
  migrationReport: null,
  integrityReport: null,
  notificationDurationMs: 5e3
};
var XDAttachmentManagerSettingTab = class extends import_obsidian12.PluginSettingTab {
  constructor(app, plugin, controller) {
    super(app, plugin);
    this.controller = controller;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "XD Attachment Manager" });
    new import_obsidian12.Setting(containerEl).setName("\u9ED8\u8BA4\u65B0\u94FE\u63A5\u683C\u5F0F").setDesc("\u6240\u6709\u65B0\u7C98\u8D34\u548C\u5BFC\u5165\u90FD\u4F7F\u7528\u8BE5\u683C\u5F0F\uFF1B\u9ED8\u8BA4 Wiki \u53CC\u94FE\uFF0C\u5E76\u4F7F\u7528 Obsidian \u6700\u77ED\u53EF\u6D88\u6B67\u8DEF\u5F84\u3002\u5DF2\u6709\u5F15\u7528\u6539\u5199\u65F6\u4ECD\u4FDD\u7559\u539F\u683C\u5F0F\u3002").addDropdown(
      (dropdown) => dropdown.addOption("wiki", "Wiki \u53CC\u94FE").addOption("markdown", "Markdown \u94FE\u63A5").setValue(this.controller.settings.defaultLinkFormat).onChange(async (value) => {
        this.controller.settings.defaultLinkFormat = value === "markdown" ? "markdown" : "wiki";
        await this.controller.saveSettings();
      })
    );
    new import_obsidian12.Setting(containerEl).setName("\u6307\u5B9A\u6E05\u7406\u76EE\u5F55").setDesc("\u76EE\u5F55\u4EE5 Vault \u6839\u76EE\u5F55\u4E3A\u57FA\u51C6\uFF0C\u5E76\u5728\u7EDF\u4E00 Cleanup \u4E2D\u663E\u793A Orphans\u3001Empty \u548C Empty Folders\u3002").addText(
      (text) => text.setValue(this.controller.settings.auditPath).setPlaceholder("Assets").onChange(async (value) => {
        this.controller.settings.auditPath = value.trim();
        await this.controller.saveSettings();
      })
    ).addButton(
      (button) => button.setButtonText("\u68C0\u67E5/\u6E05\u7406").onClick(() => this.controller.runCleanup(this.controller.settings.auditPath))
    );
    new import_obsidian12.Setting(containerEl).setName("\u5168\u5E93 Cleanup").setDesc("Empty \u548C Empty Folders \u68C0\u67E5\u5168\u5E93\uFF1BOrphans \u59CB\u7EC8\u53EA\u68C0\u67E5 Assets\u3002\u6240\u6709\u9879\u76EE\u5148\u9884\u89C8\u518D\u9009\u62E9\u3002").addButton((button) => button.setButtonText("\u68C0\u67E5\u5168\u5E93").onClick(() => this.controller.runCleanup("")));
    new import_obsidian12.Setting(containerEl).setName("\u91CD\u5EFA\u7D22\u5F15").setDesc("\u4E22\u5F03\u672C\u673A IndexedDB \u7F13\u5B58\uFF0C\u4ECE Vault \u6587\u4EF6\u3001\u5F15\u7528\u548C .meta \u4E8B\u5B9E\u6E90\u91CD\u5EFA\u3002").addButton((button) => button.setWarning().setButtonText("\u91CD\u5EFA").onClick(() => this.controller.rebuildIndex()));
    new import_obsidian12.Setting(containerEl).setName("\u4FEE\u590D meta").setDesc("\u4ECE\u5F53\u524D\u5185\u5B58\u7D22\u5F15\u91CD\u65B0\u5199\u5165\u7F3A\u5931\u6216\u635F\u574F\u7684\u7248\u672C\u5316 .meta \u6587\u4EF6\u3002").addButton((button) => button.setButtonText("\u4FEE\u590D").onClick(() => this.controller.repairMeta()));
    new import_obsidian12.Setting(containerEl).setName("\u8FC1\u79FB\u62A5\u544A").setDesc("\u67E5\u770B\u9996\u6B21\u8FC1\u79FB\u4E2D\u4FDD\u7559\u539F\u4F4D\u3001\u9700\u8981\u4EBA\u5DE5\u786E\u8BA4\u7684\u9879\u76EE\u3002").addButton(
      (button) => button.setButtonText("\u67E5\u770B\u62A5\u544A").setDisabled(!this.controller.settings.migrationReport).onClick(() => this.controller.showMigrationReport())
    );
    new import_obsidian12.Setting(containerEl).setName("\u5B8C\u6574\u6027\u62A5\u544A").setDesc("\u67E5\u770B\u81EA\u52A8\u7EB3\u7BA1\u3001folder meta \u4FEE\u590D\u548C\u4ECD\u7136\u7F3A\u5931\u7684\u9644\u4EF6\uFF1B\u8FD9\u4E9B\u5185\u90E8\u95EE\u9898\u4E0D\u4F1A\u8FDB\u5165 Cleanup \u5220\u9664\u5217\u8868\u3002").addButton(
      (button) => button.setButtonText("\u67E5\u770B\u62A5\u544A").setDisabled(!this.controller.settings.integrityReport).onClick(() => this.controller.showIntegrityReport())
    );
  }
};

// src/visual/canvas-note-preview-service.ts
var import_obsidian13 = require("obsidian");
var DESKTOP_CACHE_BYTES = 256 * 1024 * 1024;
var MOBILE_CACHE_BYTES = 64 * 1024 * 1024;
var DESKTOP_CACHE_RECORDS = 400;
var MOBILE_CACHE_RECORDS = 120;
var CanvasNotePreviewService = class {
  constructor(app, index, repository, references) {
    this.app = app;
    this.index = index;
    this.repository = repository;
    this.references = references;
    __publicField(this, "activeByNoteId", /* @__PURE__ */ new Map());
    __publicField(this, "jobs", /* @__PURE__ */ new Map());
    __publicField(this, "epochs", /* @__PURE__ */ new Map());
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "closed", false);
  }
  resolveVisual(sourcePath) {
    if (this.closed) return null;
    if (this.index.groupBySourcePath(sourcePath)) return null;
    const file = this.app.vault.getFileByPath(sourcePath);
    const note = this.index.noteByPath(sourcePath);
    if (!file || !note || note.kind !== "canvas" || note.role !== "note") return null;
    const active = this.activeByNoteId.get(note.id);
    if (active && pathEquals(active.sourcePath, file.path) && active.sourceMtime === file.stat.mtime) {
      return active.descriptor;
    }
    if (active) this.revokeActive(note.id);
    const themeFingerprint = canvasThemeFingerprint(this.app, file);
    this.schedulePreview(file, note, themeFingerprint);
    return null;
  }
  onVisualChanged(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  announceAll() {
    for (const note of this.index.allNotes) {
      if (note.kind === "canvas" && note.role === "note" && !this.index.groupBySourcePath(note.path)) this.emit(note.path);
    }
  }
  invalidateSource(path, deletePersistent = true) {
    var _a, _b;
    const note = this.index.noteByPath(path);
    const noteId = (_b = note == null ? void 0 : note.id) != null ? _b : (_a = this.activeForPath(path)) == null ? void 0 : _a.noteId;
    if (!noteId) return;
    this.bumpEpoch(noteId);
    this.jobs.delete(noteId);
    this.revokeActive(noteId);
    if (deletePersistent) {
      void this.repository.deleteVisualPreviewsForNote(noteId).catch((error) => {
        console.error("XD Canvas Note preview cache cleanup failed", error);
      });
    }
    this.emit(path);
  }
  invalidateDependency(path) {
    const noteIds = new Set(
      this.index.referencesForAsset(path).map((reference) => this.index.noteById(reference.noteId)).filter((note) => Boolean(note && note.kind === "canvas" && note.role === "note")).filter((note) => !this.index.groupBySourcePath(note.path)).map((note) => note.id)
    );
    for (const noteId of noteIds) {
      const note = this.index.noteById(noteId);
      if (note) this.invalidateSource(note.path);
    }
  }
  removeNote(path, noteId) {
    var _a, _b, _c;
    const id = (_c = noteId != null ? noteId : (_a = this.index.noteByPath(path)) == null ? void 0 : _a.id) != null ? _c : (_b = this.activeForPath(path)) == null ? void 0 : _b.noteId;
    if (!id) return;
    this.bumpEpoch(id);
    this.jobs.delete(id);
    this.revokeActive(id);
    void this.repository.deleteVisualPreviewsForNote(id).catch((error) => {
      console.error("XD Canvas Note preview cache deletion failed", error);
    });
    this.emit(path);
  }
  invalidateTheme() {
    const noteIds = /* @__PURE__ */ new Set([...this.activeByNoteId.keys(), ...this.jobs.keys()]);
    const paths = [...noteIds].map((noteId) => {
      var _a, _b, _c;
      return (_c = (_a = this.index.noteById(noteId)) == null ? void 0 : _a.path) != null ? _c : (_b = this.activeByNoteId.get(noteId)) == null ? void 0 : _b.sourcePath;
    }).filter((path) => Boolean(path));
    for (const noteId of noteIds) {
      this.bumpEpoch(noteId);
      this.jobs.delete(noteId);
      this.revokeActive(noteId);
    }
    for (const path of paths) this.emit(path);
  }
  close() {
    this.closed = true;
    for (const noteId of /* @__PURE__ */ new Set([...this.activeByNoteId.keys(), ...this.jobs.keys()])) this.bumpEpoch(noteId);
    this.jobs.clear();
    for (const noteId of [...this.activeByNoteId.keys()]) this.revokeActive(noteId);
    this.listeners.clear();
  }
  schedulePreview(file, note, themeFingerprint) {
    var _a;
    if (this.closed || this.jobs.has(note.id)) return;
    const epoch = (_a = this.epochs.get(note.id)) != null ? _a : 0;
    const job = this.preparePreview(file, note, themeFingerprint, epoch).catch((error) => console.error("XD Canvas Note preview generation failed", error)).finally(() => {
      if (this.jobs.get(note.id) === job) this.jobs.delete(note.id);
    });
    this.jobs.set(note.id, job);
  }
  async preparePreview(file, note, themeFingerprint, epoch) {
    const dependencyRevision = await this.dependencyRevision(file);
    if (!this.isCurrent(note.id, epoch, file.path)) return;
    const cacheId = `canvas-note_${stableHash(`${note.id}\0${themeFingerprint}\0${CANVAS_PREVIEW_RENDERER_VERSION}`)}`;
    const revision = stableHash(
      `${file.stat.mtime}\0${file.stat.size}\0${dependencyRevision}\0${themeFingerprint}\0${CANVAS_PREVIEW_RENDERER_VERSION}`
    );
    const cached = await this.repository.getVisualPreview(cacheId);
    if (!this.isCurrent(note.id, epoch, file.path)) return;
    let record;
    if (cached && cached.sourceMtime === file.stat.mtime && cached.sourcePath === file.path && cached.dependencyRevision === dependencyRevision && cached.themeFingerprint === themeFingerprint && cached.rendererVersion === CANVAS_PREVIEW_RENDERER_VERSION) {
      record = { ...cached, lastAccessedAt: Date.now() };
      await this.repository.putVisualPreview(record);
    } else {
      const bytes = await renderCanvasPreview(this.app, file);
      if (!this.isCurrent(note.id, epoch, file.path)) return;
      const now = Date.now();
      const blob = new Blob([bytes], { type: "image/png" });
      record = {
        id: cacheId,
        noteId: note.id,
        sourcePath: file.path,
        sourceMtime: file.stat.mtime,
        dependencyRevision,
        themeFingerprint,
        rendererVersion: CANVAS_PREVIEW_RENDERER_VERSION,
        blob,
        byteSize: blob.size,
        createdAt: now,
        lastAccessedAt: now
      };
      await this.repository.putVisualPreview(record);
    }
    if (!this.isCurrent(note.id, epoch, file.path)) return;
    if (typeof URL.createObjectURL !== "function") return;
    const objectUrl = URL.createObjectURL(record.blob);
    const descriptor = {
      kind: "canvas",
      sourcePath: file.path,
      previewUrl: objectUrl,
      revision,
      role: "note"
    };
    this.revokeActive(note.id);
    this.activeByNoteId.set(note.id, {
      cacheId,
      noteId: note.id,
      sourcePath: file.path,
      sourceMtime: file.stat.mtime,
      themeFingerprint,
      objectUrl,
      descriptor
    });
    await this.pruneCache(cacheId);
    this.emit(file.path);
  }
  async dependencyRevision(file) {
    const parsed = await this.references.scanFile(file);
    const paths = [...new Set(parsed.map((reference) => reference.resolvedPath).filter((path) => Boolean(path)))];
    const parts = paths.map((path) => this.app.vault.getFileByPath(path)).filter((dependency) => Boolean(dependency)).map((dependency) => `${dependency.path}\0${dependency.stat.mtime}\0${dependency.stat.size}`).sort();
    return stableHash(parts.join(""));
  }
  async pruneCache(keepId) {
    const maxBytes = import_obsidian13.Platform.isMobile ? MOBILE_CACHE_BYTES : DESKTOP_CACHE_BYTES;
    const maxRecords = import_obsidian13.Platform.isMobile ? MOBILE_CACHE_RECORDS : DESKTOP_CACHE_RECORDS;
    await this.repository.pruneVisualPreviews(maxBytes, maxRecords, [keepId]);
  }
  isCurrent(noteId, epoch, path) {
    var _a;
    const file = this.app.vault.getFileByPath(path);
    const note = this.index.noteById(noteId);
    return Boolean(
      file && !this.closed && note && note.kind === "canvas" && pathEquals(note.path, path) && ((_a = this.epochs.get(noteId)) != null ? _a : 0) === epoch && !this.index.groupBySourcePath(path)
    );
  }
  bumpEpoch(noteId) {
    var _a;
    this.epochs.set(noteId, ((_a = this.epochs.get(noteId)) != null ? _a : 0) + 1);
  }
  activeForPath(path) {
    var _a;
    return (_a = [...this.activeByNoteId.values()].find((active) => pathEquals(active.sourcePath, path))) != null ? _a : null;
  }
  revokeActive(noteId) {
    const active = this.activeByNoteId.get(noteId);
    if (!active) return;
    if (typeof URL.revokeObjectURL === "function") URL.revokeObjectURL(active.objectUrl);
    this.activeByNoteId.delete(noteId);
  }
  emit(path) {
    for (const listener of this.listeners) listener(path);
  }
};

// src/main.ts
var XDAttachmentManagerPlugin = class extends import_obsidian14.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings", { ...DEFAULT_SETTINGS });
    __publicField(this, "repository", null);
    __publicField(this, "index");
    __publicField(this, "metaStore");
    __publicField(this, "referenceService");
    __publicField(this, "coordinator");
    __publicField(this, "indexCoordinator");
    __publicField(this, "folderService");
    __publicField(this, "attachmentService");
    __publicField(this, "visualService");
    __publicField(this, "canvasNotePreviewService");
    __publicField(this, "cleanupService");
    __publicField(this, "migrationService");
    __publicField(this, "ingestService");
    __publicField(this, "menuService");
    __publicField(this, "mutationsPaused", true);
    __publicField(this, "scanTimers", /* @__PURE__ */ new Map());
    __publicField(this, "assetAdoptionTimers", /* @__PURE__ */ new Map());
    __publicField(this, "previewTimers", /* @__PURE__ */ new Map());
    __publicField(this, "visualDiscoveryTimers", /* @__PURE__ */ new Map());
    __publicField(this, "pendingVisualDependencies", /* @__PURE__ */ new Map());
    __publicField(this, "canvasPreviewRefreshTimer", null);
    __publicField(this, "canvasPreviewRefreshShouldPersistVersion", false);
    __publicField(this, "touchTimer", null);
    __publicField(this, "runtimeStarted", false);
    __publicField(this, "unloaded", false);
    __publicField(this, "contextMenuTarget", null);
    __publicField(this, "contextMenuTargetTimer", null);
    __publicField(this, "desktopYoutubeMenu", null);
    __publicField(this, "handledContextMenus", /* @__PURE__ */ new WeakSet());
  }
  async onload() {
    this.settings = normalizeSettings(await this.loadData());
    this.metaStore = new MetaStore(this.app.vault.adapter);
    const rootMeta = await this.metaStore.initialize();
    const repository = await createRepository(rootMeta.vaultId);
    this.repository = repository;
    this.index = new HotIndex(repository);
    this.referenceService = new ReferenceService(this.app, this.index);
    this.coordinator = new TransactionCoordinator(this.metaStore, repository);
    this.indexCoordinator = new IndexCoordinator(
      this.app,
      repository,
      this.index,
      this.metaStore,
      this.referenceService
    );
    this.folderService = new FolderService(this.app, this.index, this.metaStore);
    this.attachmentService = new AttachmentService(
      this.app,
      this.index,
      this.metaStore,
      this.coordinator,
      this.referenceService,
      this.folderService,
      this.indexCoordinator
    );
    this.visualService = new VisualService(
      this.app,
      this.index,
      this.coordinator,
      this.referenceService,
      this.metaStore,
      this.folderService,
      this.indexCoordinator
    );
    this.canvasNotePreviewService = new CanvasNotePreviewService(
      this.app,
      this.index,
      repository,
      this.referenceService
    );
    const clipboard = new ClipboardService(this.app, this.visualService);
    const externalLinks = new ExternalLinkService();
    this.cleanupService = new CleanupService(this.app, this.index, this.attachmentService, this.folderService);
    this.migrationService = new MigrationService(
      this.app,
      this.index,
      this.attachmentService,
      this.folderService,
      this.visualService
    );
    this.ingestService = new IngestService(this.app, this.attachmentService, this.indexCoordinator, this.settings);
    this.menuService = new MenuService(
      this.app,
      this.index,
      this.referenceService,
      this.attachmentService,
      clipboard,
      externalLinks,
      this.visualService,
      () => !this.mutationsPaused
    );
    this.registerRibbonActions();
    this.referenceService.setMutationListener(async (file) => {
      if (isReferenceContainerPath(file.path)) await this.indexCoordinator.scanNote(file);
    });
    this.addSettingTab(new XDAttachmentManagerSettingTab(this.app, this, this));
    this.register(() => this.clearTimers());
    this.app.workspace.onLayoutReady(() => {
      void this.startRuntime();
    });
  }
  async startRuntime() {
    var _a;
    if (this.runtimeStarted || this.unloaded) return;
    this.runtimeStarted = true;
    try {
      const legacy = this.migrationService.enabledLegacyPlugins();
      this.mutationsPaused = legacy.length > 0;
      const initialized = await this.indexCoordinator.initialize(false, !this.mutationsPaused);
      await this.updateIntegrityReport(initialized);
      const recovered = await this.coordinator.recoverPending(async () => {
        await this.indexCoordinator.initialize(true, !this.mutationsPaused);
      });
      if (legacy.length > 0) {
        new import_obsidian14.Notice(`XD Attachment Manager paused: disable ${legacy.join(", ")} first.`, 0);
      } else if (!this.settings.migrationCompleted) {
        const report = await this.migrationService.migrate();
        this.settings.migrationCompleted = true;
        this.settings.migrationReport = report;
        await this.saveSettings();
        new MigrationReportModal(this.app, report).open();
      }
      if (this.unloaded) return;
      if (!this.mutationsPaused) {
        const visualRepairs = await this.repairVisualAttachmentGroups();
        if (visualRepairs > 0) {
          await this.updateIntegrityReport(await this.indexCoordinator.initialize(false));
          new import_obsidian14.Notice(`Recovered ${visualRepairs} visual attachment group(s) in place`, this.settings.notificationDurationMs);
        }
      }
      this.registerEvents();
      this.registerCommands();
      this.visualService.announceAll();
      this.canvasNotePreviewService.announceAll();
      if (this.settings.canvasPreviewRendererVersion < CANVAS_PREVIEW_RENDERER_VERSION) {
        this.scheduleCanvasPreviewRefresh(true);
      }
      console.info("XD Attachment Manager loaded", { ...initialized, recovered, persistentCache: (_a = this.repository) == null ? void 0 : _a.persistent });
    } catch (error) {
      this.mutationsPaused = true;
      console.error("XD Attachment Manager initialization failed", error);
      new import_obsidian14.Notice(`XD Attachment Manager failed to initialize: ${message(error)}`, 1e4);
    }
  }
  onunload() {
    var _a, _b;
    this.unloaded = true;
    this.clearTimers();
    (_a = this.canvasNotePreviewService) == null ? void 0 : _a.close();
    (_b = this.repository) == null ? void 0 : _b.close();
  }
  resolveVisual(sourcePath) {
    var _a, _b, _c, _d;
    return (_d = (_c = (_a = this.visualService) == null ? void 0 : _a.resolveVisual(sourcePath)) != null ? _c : (_b = this.canvasNotePreviewService) == null ? void 0 : _b.resolveVisual(sourcePath)) != null ? _d : null;
  }
  onVisualChanged(listener) {
    const unsubscribeGroup = this.visualService.onVisualChanged(listener);
    const unsubscribeNote = this.canvasNotePreviewService.onVisualChanged(listener);
    return () => {
      unsubscribeGroup();
      unsubscribeNote();
    };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async runCleanup(path) {
    let rootPath = path;
    while (true) {
      const progress = new CleanupProgressModal(this.app);
      progress.open();
      try {
        const result = await this.cleanupService.scan(rootPath, {
          excludes: this.settings.auditExcludes,
          signal: progress.controller.signal,
          onProgress: (completed, total) => progress.update(completed, total)
        });
        progress.finish();
        if (result.canceled) return;
        const modal = new CleanupResultsModal(
          this.app,
          result.items,
          rootPath,
          this.settings.auditPath || "Assets",
          import_obsidian14.Platform.isDesktopApp
        );
        modal.open();
        const action = await modal.result;
        if (!action) return;
        if (action.kind === "rescan") {
          rootPath = action.rootPath;
          continue;
        }
        if (action.items.length === 0) return;
        if (this.mutationsPaused) {
          new import_obsidian14.Notice("Cleanup is paused until the legacy attachment plugins are disabled", this.settings.notificationDurationMs);
          return;
        }
        if (action.mode === "permanent") {
          const confirmation = new ConfirmImpactModal(
            this.app,
            "Permanently Delete Cleanup Items",
            [...new Set(action.items.map((item) => item.path))],
            "Delete Permanently"
          );
          confirmation.open();
          if (!await confirmation.result) return;
        }
        const cleaned = await this.cleanupService.clean(action.items, action.mode);
        new import_obsidian14.Notice(`Cleaned ${cleaned.deleted} item(s)${cleaned.failed.length ? `; ${cleaned.failed.length} failed` : ""}`);
        return;
      } catch (error) {
        progress.finish();
        if (error instanceof Error && error.name === "AbortError") return;
        new import_obsidian14.Notice(`Cleanup failed: ${message(error)}`);
        return;
      }
    }
  }
  async rebuildIndex() {
    if (this.mutationsPaused) {
      new import_obsidian14.Notice("Index rebuild is paused until the legacy attachment plugins are disabled", this.settings.notificationDurationMs);
      return;
    }
    const result = await this.indexCoordinator.rebuild();
    await this.updateIntegrityReport(result);
    new import_obsidian14.Notice(`Index rebuilt: ${result.scannedNotes} note(s) scanned`);
  }
  async repairMeta() {
    if (this.mutationsPaused) {
      new import_obsidian14.Notice("Meta repair is paused until the legacy attachment plugins are disabled", this.settings.notificationDurationMs);
      return;
    }
    const writes = await this.indexCoordinator.repairMeta();
    const result = await this.indexCoordinator.initialize(false);
    await this.updateIntegrityReport(result);
    new import_obsidian14.Notice(`Repaired ${writes} meta record(s)`);
  }
  showMigrationReport() {
    if (this.settings.migrationReport) new MigrationReportModal(this.app, this.settings.migrationReport).open();
  }
  showIntegrityReport() {
    if (this.settings.integrityReport) new IntegrityReportModal(this.app, this.settings.integrityReport).open();
  }
  async updateIntegrityReport(result) {
    var _a, _b, _c, _d;
    const previousMissing = (_b = (_a = this.settings.integrityReport) == null ? void 0 : _a.missingAssets) != null ? _b : [];
    const previousIssues = (_d = (_c = this.settings.integrityReport) == null ? void 0 : _c.issues) != null ? _d : [];
    const report = {
      generatedAt: Date.now(),
      adoptedAssets: result.adoptedAssets,
      repairedFolders: result.repairedFolders,
      missingAssets: result.missingAssets,
      issues: result.issues
    };
    this.settings.integrityReport = report;
    await this.saveSettings();
    if (result.adoptedAssets > 0 || result.repairedFolders > 0) {
      new import_obsidian14.Notice(
        `Attachment integrity repaired: ${result.adoptedAssets} asset(s) adopted, ${result.repairedFolders} folder record(s) restored`,
        this.settings.notificationDurationMs
      );
    } else if (result.missingAssets.length > 0 && result.missingAssets.join("\0") !== previousMissing.join("\0")) {
      new import_obsidian14.Notice(`${result.missingAssets.length} managed attachment(s) are missing; references were preserved`, this.settings.notificationDurationMs);
    } else if (result.issues.length > 0 && result.issues.map((issue) => `${issue.path}\0${issue.reason}`).join("") !== previousIssues.map((issue) => `${issue.path}\0${issue.reason}`).join("")) {
      new import_obsidian14.Notice(`${result.issues.length} attachment integrity issue(s) need review`, this.settings.notificationDurationMs);
    }
  }
  async repairVisualAttachmentGroups() {
    var _a, _b, _c;
    let repaired = 0;
    for (const asset of [...this.index.allAssets]) {
      if (asset.state === "missing" || !isVisualSourcePath(asset.path)) continue;
      const file = this.app.vault.getFileByPath(asset.path);
      const existingGroup = this.index.groupBySourcePath(asset.path);
      const ownerId = (_b = (_a = asset.ownerNoteId) != null ? _a : existingGroup == null ? void 0 : existingGroup.ownerNoteId) != null ? _b : null;
      const owner = (_c = ownerId ? this.index.noteById(ownerId) : null) != null ? _c : this.folderService.noteForDestination(asset.path);
      if (!file || (owner == null ? void 0 : owner.role) !== "note") continue;
      try {
        const group = await this.visualService.repairExistingVisualInPlace(file, owner);
        if (group && (!existingGroup || group.revision !== existingGroup.revision)) repaired += 1;
      } catch (error) {
        console.error(`XD visual attachment repair failed: ${asset.path}`, error);
      }
    }
    return repaired;
  }
  registerEvents() {
    if (import_obsidian14.Platform.isDesktopApp) this.register(observeAttachmentMenus(document));
    this.register(registerDesktopYoutubeContextMenu((frame, position) => {
      var _a;
      removeAttachmentMenus(document);
      (_a = this.desktopYoutubeMenu) == null ? void 0 : _a.hide();
      const menu = new import_obsidian14.Menu();
      if (!this.menuService.addDomMenu(menu, frame)) return false;
      menu.showAtPosition(position);
      this.desktopYoutubeMenu = menu;
      return true;
    }));
    this.registerDomEvent(document, "contextmenu", (event) => {
      this.contextMenuTarget = event.target;
      if (this.contextMenuTargetTimer) globalThis.clearTimeout(this.contextMenuTargetTimer);
      this.contextMenuTargetTimer = globalThis.setTimeout(() => {
        this.contextMenuTarget = null;
        this.contextMenuTargetTimer = null;
      }, 1500);
      if (!(event.target instanceof Element) || !isRenderedAttachmentTarget(event.target)) return;
      const menu = import_obsidian14.Menu.forEvent(event);
      this.menuService.addDomMenu(menu, event.target);
      this.handledContextMenus.add(event);
      this.contextMenuTarget = null;
      if (this.contextMenuTargetTimer) {
        globalThis.clearTimeout(this.contextMenuTargetTimer);
        this.contextMenuTargetTimer = null;
      }
    }, { capture: true });
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, abstractFile) => {
        if (abstractFile instanceof import_obsidian14.TFile && !isInsideMeta(abstractFile.path)) this.menuService.addFileMenu(menu, abstractFile);
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor, info) => {
        const target = this.contextMenuTarget;
        this.contextMenuTarget = null;
        if (this.contextMenuTargetTimer) {
          globalThis.clearTimeout(this.contextMenuTargetTimer);
          this.contextMenuTargetTimer = null;
        }
        if (info instanceof import_obsidian14.MarkdownView) this.menuService.addEditorMenu(menu, editor, info, target);
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-paste", (event, editor, info) => {
        if (!this.mutationsPaused) void this.ingestService.handlePaste(event, editor, info);
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-drop", (event, editor, info) => {
        if (!this.mutationsPaused) void this.ingestService.handleDrop(event, editor, info);
      })
    );
    this.registerEvent(this.app.workspace.on("file-open", (file) => {
      if (!this.mutationsPaused && file && isVisualSourcePath(file.path)) this.scheduleVisualDependencyDiscovery(file);
    }));
    this.registerEvent(this.app.workspace.on("css-change", () => {
      this.canvasNotePreviewService.invalidateTheme();
      this.scheduleCanvasPreviewRefresh();
    }));
    this.registerEvent(this.app.vault.on("create", (file) => this.onCreate(file)));
    this.registerEvent(this.app.vault.on("modify", (file) => this.onModify(file)));
    this.registerEvent(this.app.vault.on("delete", (file) => void this.onDelete(file)));
    this.registerEvent(this.app.vault.on("rename", (file, oldPath) => void this.onRename(file, oldPath)));
    this.registerDomEvent(document, "contextmenu", (event) => {
      if (this.handledContextMenus.has(event)) return;
      if (event.target instanceof Element && event.target.closest(".nav-files-container, .cm-editor")) return;
      const menu = new import_obsidian14.Menu();
      if (this.menuService.addDomMenu(menu, event.target)) menu.showAtMouseEvent(event);
    });
    this.registerDomEvent(document, "touchstart", (event) => this.onTouchStart(event), { passive: true });
    this.registerDomEvent(document, "touchmove", () => this.clearTouchTimer(), { passive: true });
    this.registerDomEvent(document, "touchend", () => this.clearTouchTimer(), { passive: true });
  }
  registerCommands() {
    this.addCommand({ id: "attachment-cleanup", name: "Attachment Cleanup", callback: () => void this.runCleanup("Assets") });
    this.addCommand({ id: "rebuild-index", name: "Rebuild attachment index", callback: () => void this.rebuildIndex() });
    this.addCommand({ id: "repair-meta", name: "Repair attachment meta", callback: () => void this.repairMeta() });
  }
  registerRibbonActions() {
    const cleanup = this.addRibbonIcon("trash", "XD Attachment Manager: Attachment Cleanup", () => {
      void this.runCleanup("Assets");
    });
    cleanup.addClass("xd-attachment-manager-ribbon-action", "xd-attachment-manager-ribbon-cleanup");
  }
  onCreate(file) {
    if (file instanceof import_obsidian14.TFile) {
      if (isReferenceContainerPath(file.path)) this.scheduleScan(file);
      if (!this.mutationsPaused && isAttachmentPath(file.path) && !this.coordinator.isMuted(file.path)) {
        this.scheduleAssetAdoption(file);
      }
      const active = this.app.workspace.getActiveFile();
      if (!this.mutationsPaused && active && isVisualSourcePath(active.path) && isVisualDependencyCandidate(file.path)) {
        this.scheduleVisualDependencyAdoption(file, active);
      }
    }
  }
  onModify(file) {
    if (!(file instanceof import_obsidian14.TFile) || isInsideMeta(file.path)) return;
    if (isReferenceContainerPath(file.path)) this.scheduleScan(file);
    if (this.index.groupBySourcePath(file.path)) {
      this.schedulePreview(file.path);
    } else if (file.extension === "canvas") {
      this.canvasNotePreviewService.invalidateSource(file.path);
    }
    this.canvasNotePreviewService.invalidateDependency(file.path);
    if (!this.mutationsPaused && isVisualSourcePath(file.path)) this.scheduleVisualDependencyDiscovery(file);
  }
  async onDelete(file) {
    if (isInsideMeta(file.path)) return;
    if (file instanceof import_obsidian14.TFile) {
      const deletedNote = isReferenceContainerPath(file.path) ? this.index.noteByPath(file.path) : null;
      this.canvasNotePreviewService.invalidateDependency(file.path);
      if ((deletedNote == null ? void 0 : deletedNote.kind) === "canvas") {
        this.canvasNotePreviewService.removeNote(file.path, deletedNote.id);
      }
      if (isReferenceContainerPath(file.path)) {
        const affected = await this.indexCoordinator.removeNote(file.path);
        let transferred = 0;
        if ((deletedNote == null ? void 0 : deletedNote.role) === "note") {
          for (const path of affected) if (await this.attachmentService.transferOwnerIfNeeded(path)) transferred += 1;
        }
        if (transferred > 0) new import_obsidian14.Notice(`Transferred ${transferred} attachment owner(s)`);
      }
      if (await this.attachmentService.handleExternalDelete(file.path)) {
        new import_obsidian14.Notice(`Attachment is missing; references were preserved: ${file.path}`, this.settings.notificationDurationMs);
      }
    }
  }
  async onRename(file, oldPath) {
    if (isInsideMeta(oldPath) || isInsideMeta(file.path)) return;
    if (this.coordinator.isMuted(oldPath) || this.coordinator.isMuted(file.path)) return;
    const oldNote = this.index.noteByPath(oldPath);
    this.canvasNotePreviewService.invalidateDependency(oldPath);
    if ((oldNote == null ? void 0 : oldNote.kind) === "canvas") this.canvasNotePreviewService.invalidateSource(oldPath);
    if (file instanceof import_obsidian14.TFile && (oldNote == null ? void 0 : oldNote.role) === "note") {
      if (isReferenceContainerPath(file.path)) {
        const note = await this.indexCoordinator.handleNoteRename(file, oldPath);
        if (note.role === "note") {
          const moved = await this.attachmentService.handleNoteRename(note, oldNote.basename);
          if (moved) new import_obsidian14.Notice(`Attachment folder renamed for ${note.basename}`);
        }
      } else {
        const affected = await this.indexCoordinator.removeNote(oldPath);
        for (const path of affected) await this.attachmentService.transferOwnerIfNeeded(path);
      }
    }
    await this.attachmentService.handleExternalRename(file, oldPath);
    if (file instanceof import_obsidian14.TFile && isAttachmentPath(file.path) && !this.index.assetByPath(file.path)) {
      this.scheduleAssetAdoption(file);
    }
    if (file instanceof import_obsidian14.TFile && isReferenceContainerPath(file.path) && !this.index.noteByPath(file.path)) {
      this.scheduleScan(file);
    }
    this.canvasNotePreviewService.invalidateDependency(file.path);
    if (file instanceof import_obsidian14.TFile && file.extension === "canvas") {
      this.canvasNotePreviewService.invalidateSource(file.path, false);
    }
  }
  scheduleScan(file) {
    const existing = this.scanTimers.get(file.path);
    if (existing !== void 0) globalThis.clearTimeout(existing);
    const timer = globalThis.setTimeout(() => {
      this.scanTimers.delete(file.path);
      const current = this.app.vault.getFileByPath(file.path);
      if (current) void this.indexCoordinator.scanNote(current).catch((error) => console.error("XD Attachment scan failed", error));
    }, 250);
    this.scanTimers.set(file.path, timer);
  }
  scheduleAssetAdoption(file) {
    const existing = this.assetAdoptionTimers.get(file.path);
    if (existing !== void 0) globalThis.clearTimeout(existing);
    const timer = globalThis.setTimeout(() => {
      this.assetAdoptionTimers.delete(file.path);
      const current = this.app.vault.getFileByPath(file.path);
      if (!current) return;
      const existingAsset = this.index.assetByPath(current.path);
      if (existingAsset) {
        void (async () => {
          if (existingAsset.state === "missing") {
            await this.indexCoordinator.refreshManagedAsset(current.path);
            new import_obsidian14.Notice(`Missing attachment restored: ${current.path}`, this.settings.notificationDurationMs);
          }
          await this.repairVisualAttachmentGroups();
        })().catch((error) => console.error("XD attachment restore reconciliation failed", error));
        return;
      }
      void this.indexCoordinator.adoptAsset(current).then(async (adopted) => {
        if (!adopted) return;
        new import_obsidian14.Notice(`Attachment added to management: ${current.path}`, this.settings.notificationDurationMs);
        await this.repairVisualAttachmentGroups();
      }).catch((error) => console.error("XD attachment adoption failed", error));
    }, 500);
    this.assetAdoptionTimers.set(file.path, timer);
  }
  schedulePreview(path) {
    const existing = this.previewTimers.get(path);
    if (existing !== void 0) globalThis.clearTimeout(existing);
    const timer = globalThis.setTimeout(() => {
      this.previewTimers.delete(path);
      void this.visualService.refreshPreview(path).catch((error) => console.error("XD visual preview failed", error));
    }, 900);
    this.previewTimers.set(path, timer);
  }
  scheduleCanvasPreviewRefresh(persistRendererVersion = false) {
    this.canvasPreviewRefreshShouldPersistVersion || (this.canvasPreviewRefreshShouldPersistVersion = persistRendererVersion);
    if (this.canvasPreviewRefreshTimer !== null) globalThis.clearTimeout(this.canvasPreviewRefreshTimer);
    this.canvasPreviewRefreshTimer = globalThis.setTimeout(() => {
      this.canvasPreviewRefreshTimer = null;
      const shouldPersistVersion = this.canvasPreviewRefreshShouldPersistVersion;
      this.canvasPreviewRefreshShouldPersistVersion = false;
      void this.refreshKnownCanvasPreviews(shouldPersistVersion);
    }, 1500);
  }
  async refreshKnownCanvasPreviews(persistRendererVersion) {
    for (const group of this.index.allGroups) {
      if (this.unloaded) return;
      if (group.kind !== "canvas") continue;
      try {
        await this.visualService.refreshPreview(group.sourcePath);
      } catch (error) {
        console.error("XD Canvas theme preview refresh failed", error);
      }
      await new Promise((resolve) => globalThis.setTimeout(resolve, 25));
    }
    if (persistRendererVersion && !this.unloaded) {
      this.settings.canvasPreviewRendererVersion = CANVAS_PREVIEW_RENDERER_VERSION;
      await this.saveSettings();
    }
  }
  scheduleVisualDependencyDiscovery(source) {
    const existing = this.visualDiscoveryTimers.get(source.path);
    if (existing !== void 0) globalThis.clearTimeout(existing);
    const timer = globalThis.setTimeout(() => {
      this.visualDiscoveryTimers.delete(source.path);
      const current = this.app.vault.getFileByPath(source.path);
      if (current) void this.discoverVisualDependencies(current);
    }, 700);
    this.visualDiscoveryTimers.set(source.path, timer);
  }
  async discoverVisualDependencies(source) {
    try {
      const references = await this.referenceService.scanFile(source);
      for (const reference of references) {
        if (!reference.resolvedPath || !isVisualDependencyCandidate(reference.resolvedPath)) continue;
        const file = this.app.vault.getFileByPath(reference.resolvedPath);
        if (file) this.scheduleVisualDependencyAdoption(file, source);
      }
    } catch (error) {
      console.error("XD visual dependency discovery failed", error);
    }
  }
  scheduleVisualDependencyAdoption(file, source) {
    var _a;
    const existing = this.pendingVisualDependencies.get(file.path);
    if ((existing == null ? void 0 : existing.timer) !== void 0) globalThis.clearTimeout(existing.timer);
    if ((existing == null ? void 0 : existing.saveTimer) !== void 0) globalThis.clearTimeout(existing.saveTimer);
    const pending = {
      sourcePath: source.path,
      attempts: (_a = existing == null ? void 0 : existing.attempts) != null ? _a : 0
    };
    if (source.path.toLowerCase().endsWith(".canvas")) {
      pending.saveTimer = globalThis.setTimeout(() => {
        pending.saveTimer = void 0;
        const current = this.app.vault.getFileByPath(source.path);
        if (current) this.requestCanvasSave(current);
      }, 250);
    }
    pending.timer = globalThis.setTimeout(() => void this.tryAdoptVisualDependency(file.path), 700);
    this.pendingVisualDependencies.set(file.path, pending);
  }
  requestCanvasSave(source) {
    var _a, _b, _c;
    const view = (_a = this.app.workspace.activeLeaf) == null ? void 0 : _a.view;
    if (!(view == null ? void 0 : view.file) || !pathEquals(view.file.path, source.path)) return;
    try {
      const result = typeof view.requestSave === "function" ? view.requestSave() : (_c = (_b = view.canvas) == null ? void 0 : _b.requestSave) == null ? void 0 : _c.call(_b);
      if (result && typeof result.then === "function") {
        void Promise.resolve(result).catch((error) => console.error("XD Canvas save request failed", error));
      }
    } catch (error) {
      console.error("XD Canvas save request failed", error);
    }
  }
  async tryAdoptVisualDependency(path) {
    const pending = this.pendingVisualDependencies.get(path);
    if (!pending || this.mutationsPaused) return;
    const file = this.app.vault.getFileByPath(path);
    const source = this.app.vault.getFileByPath(pending.sourcePath);
    if (!file || !source) {
      this.pendingVisualDependencies.delete(path);
      return;
    }
    try {
      const references = await this.referenceService.scanFile(source);
      const referenced = references.some(
        (reference) => reference.resolvedPath && pathEquals(reference.resolvedPath, file.path) || pathEquals(reference.rawTarget, file.path)
      );
      if (!referenced) {
        this.retryVisualDependency(path, pending);
        return;
      }
      this.pendingVisualDependencies.delete(path);
      const group = this.index.groupBySourcePath(source.path);
      let destination;
      if (group) {
        destination = await this.visualService.adoptCreatedGroupDependency(file, source);
      } else {
        const note = await this.indexCoordinator.scanNote(source);
        destination = (await this.attachmentService.setAsAttachment(file, note)).path;
      }
      new import_obsidian14.Notice(
        `Stored visual attachment dependency: ${destination}`,
        this.settings.notificationDurationMs
      );
    } catch (error) {
      this.pendingVisualDependencies.delete(path);
      console.error("XD visual dependency adoption failed", error);
      new import_obsidian14.Notice(`Unable to store pasted visual attachment: ${message(error)}`, this.settings.notificationDurationMs);
    }
  }
  retryVisualDependency(path, pending) {
    pending.attempts += 1;
    if (pending.attempts >= 8) {
      this.pendingVisualDependencies.delete(path);
      return;
    }
    pending.timer = globalThis.setTimeout(() => void this.tryAdoptVisualDependency(path), 600);
    this.pendingVisualDependencies.set(path, pending);
  }
  onTouchStart(event) {
    this.clearTouchTimer();
    const touch = event.touches[0];
    if (!touch) return;
    const target = event.target;
    if (target instanceof Element && target.closest(".nav-files-container")) return;
    this.touchTimer = globalThis.setTimeout(() => {
      this.touchTimer = null;
      const menu = new import_obsidian14.Menu();
      if (this.menuService.addDomMenu(menu, target)) menu.showAtPosition({ x: touch.clientX, y: touch.clientY });
    }, 600);
  }
  clearTouchTimer() {
    if (this.touchTimer !== null) globalThis.clearTimeout(this.touchTimer);
    this.touchTimer = null;
  }
  clearTimers() {
    var _a;
    for (const timer of this.scanTimers.values()) globalThis.clearTimeout(timer);
    for (const timer of this.assetAdoptionTimers.values()) globalThis.clearTimeout(timer);
    for (const timer of this.previewTimers.values()) globalThis.clearTimeout(timer);
    for (const timer of this.visualDiscoveryTimers.values()) globalThis.clearTimeout(timer);
    for (const pending of this.pendingVisualDependencies.values()) {
      if (pending.timer !== void 0) globalThis.clearTimeout(pending.timer);
      if (pending.saveTimer !== void 0) globalThis.clearTimeout(pending.saveTimer);
    }
    this.scanTimers.clear();
    this.assetAdoptionTimers.clear();
    this.previewTimers.clear();
    this.visualDiscoveryTimers.clear();
    this.pendingVisualDependencies.clear();
    if (this.canvasPreviewRefreshTimer !== null) globalThis.clearTimeout(this.canvasPreviewRefreshTimer);
    this.canvasPreviewRefreshTimer = null;
    this.canvasPreviewRefreshShouldPersistVersion = false;
    if (this.contextMenuTargetTimer !== null) globalThis.clearTimeout(this.contextMenuTargetTimer);
    this.contextMenuTargetTimer = null;
    this.contextMenuTarget = null;
    (_a = this.desktopYoutubeMenu) == null ? void 0 : _a.hide();
    this.desktopYoutubeMenu = null;
    this.clearTouchTimer();
  }
};
function isVisualDependencyCandidate(path) {
  const lower = path.toLowerCase();
  return !isInsideAssets(path) && !isInsideMeta(path) && !lower.endsWith(".md") && !lower.endsWith(".canvas");
}
function isRenderedAttachmentTarget(target) {
  if (target.closest(".nav-files-container")) return false;
  if (!target.closest(".cm-editor, .markdown-preview-view")) return false;
  return Boolean(target.closest(
    "img, video, audio, iframe.external-embed, webview, .external-embed, .image-embed, .excalidraw-embedded-img, .excalidraw-svg, [data-xdvc-visual-source], p:has(> iframe.external-embed)"
  ));
}
function message(error) {
  return error instanceof Error ? error.message : String(error);
}
function normalizeSettings(loaded) {
  var _a, _b, _c;
  const settings = {
    ...DEFAULT_SETTINGS,
    ...loaded,
    schemaVersion: DEFAULT_SETTINGS.schemaVersion,
    integrityReport: (_a = loaded == null ? void 0 : loaded.integrityReport) != null ? _a : null
  };
  if (settings.migrationReport) {
    const report = settings.migrationReport;
    settings.migrationReport = {
      startedAt: report.startedAt,
      completedAt: report.completedAt,
      managedAssets: report.managedAssets,
      visualGroups: report.visualGroups,
      adoptedAssets: (_b = report.adoptedAssets) != null ? _b : 0,
      issues: (_c = report.issues) != null ? _c : []
    };
  }
  return settings;
}
