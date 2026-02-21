var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
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

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module2) {
    "use strict";
    (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop2() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop2, noop2) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module2 && module2[requireString]).call(
              module2,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
          return resolveDispatcher().useMemoCache(size);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = fnName;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = deprecatedAPIs;
      exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop2, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports.useActionState = function(action, initialState2, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState2,
          permalink
        );
      };
      exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports.useId = function() {
        return resolveDispatcher().useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer2) {
        return resolveDispatcher().useOptimistic(passthrough, reducer2);
      };
      exports.useReducer = function(reducer2, initialArg, init) {
        return resolveDispatcher().useReducer(reducer2, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports.useState = function(initialState2) {
        return resolveDispatcher().useState(initialState2);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports.version = "19.2.3";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module2) {
    "use strict";
    if (false) {
      module2.exports = null;
    } else {
      module2.exports = require_react_development();
    }
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React2 = require_react(), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React2 = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React2.react_stack_bottom_frame.bind(
        React2,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module2) {
    "use strict";
    if (false) {
      module2.exports = null;
    } else {
      module2.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/@uploadthing/react/dist/index.js
var index_exports = {};
__export(index_exports, {
  UploadButton: () => UploadButton,
  UploadDropzone: () => UploadDropzone,
  Uploader: () => Uploader,
  generateReactHelpers: () => generateReactHelpers,
  generateUploadButton: () => generateUploadButton,
  generateUploadDropzone: () => generateUploadDropzone,
  generateUploader: () => generateUploader,
  useDropzone: () => useDropzone
});
module.exports = __toCommonJS(index_exports);

// node_modules/effect/dist/esm/Function.js
var isFunction = (input) => typeof input === "function";
var dual = function(arity, body) {
  if (typeof arity === "function") {
    return function() {
      if (arity(arguments)) {
        return body.apply(this, arguments);
      }
      return (self) => body(self, ...arguments);
    };
  }
  switch (arity) {
    case 0:
    case 1:
      throw new RangeError(`Invalid arity ${arity}`);
    case 2:
      return function(a, b) {
        if (arguments.length >= 2) {
          return body(a, b);
        }
        return function(self) {
          return body(self, a);
        };
      };
    case 3:
      return function(a, b, c) {
        if (arguments.length >= 3) {
          return body(a, b, c);
        }
        return function(self) {
          return body(self, a, b);
        };
      };
    case 4:
      return function(a, b, c, d) {
        if (arguments.length >= 4) {
          return body(a, b, c, d);
        }
        return function(self) {
          return body(self, a, b, c);
        };
      };
    case 5:
      return function(a, b, c, d, e) {
        if (arguments.length >= 5) {
          return body(a, b, c, d, e);
        }
        return function(self) {
          return body(self, a, b, c, d);
        };
      };
    default:
      return function() {
        if (arguments.length >= arity) {
          return body.apply(this, arguments);
        }
        const args2 = arguments;
        return function(self) {
          return body(self, ...args2);
        };
      };
  }
};
var identity = (a) => a;
var unsafeCoerce = identity;
var constant = (value) => () => value;
var constUndefined = /* @__PURE__ */ constant(void 0);
var constVoid = constUndefined;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default: {
      let ret = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}

// node_modules/effect/dist/esm/GlobalValue.js
var globalStoreId = `effect/GlobalValue`;
var globalStore;
var globalValue = (id, compute) => {
  if (!globalStore) {
    globalThis[globalStoreId] ??= /* @__PURE__ */ new Map();
    globalStore = globalThis[globalStoreId];
  }
  if (!globalStore.has(id)) {
    globalStore.set(id, compute());
  }
  return globalStore.get(id);
};

// node_modules/effect/dist/esm/Predicate.js
var isString = (input) => typeof input === "string";
var isNumber = (input) => typeof input === "number";
var isFunction2 = isFunction;
var isRecordOrArray = (input) => typeof input === "object" && input !== null;
var isObject = (input) => isRecordOrArray(input) || isFunction2(input);
var hasProperty = /* @__PURE__ */ dual(2, (self, property) => isObject(self) && property in self);
var isTagged = /* @__PURE__ */ dual(2, (self, tag) => hasProperty(self, "_tag") && self["_tag"] === tag);
var isRecord = (input) => isRecordOrArray(input) && !Array.isArray(input);

// node_modules/effect/dist/esm/internal/errors.js
var getBugErrorMessage = (message) => `BUG: ${message} - please report an issue at https://github.com/Effect-TS/effect/issues`;

// node_modules/effect/dist/esm/Utils.js
var GenKindTypeId = /* @__PURE__ */ Symbol.for("effect/Gen/GenKind");
var GenKindImpl = class {
  value;
  constructor(value) {
    this.value = value;
  }
  /**
   * @since 2.0.0
   */
  get _F() {
    return identity;
  }
  /**
   * @since 2.0.0
   */
  get _R() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  get _O() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  get _E() {
    return (_) => _;
  }
  /**
   * @since 2.0.0
   */
  [GenKindTypeId] = GenKindTypeId;
  /**
   * @since 2.0.0
   */
  [Symbol.iterator]() {
    return new SingleShotGen(this);
  }
};
var SingleShotGen = class _SingleShotGen {
  self;
  called = false;
  constructor(self) {
    this.self = self;
  }
  /**
   * @since 2.0.0
   */
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  /**
   * @since 2.0.0
   */
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  /**
   * @since 2.0.0
   */
  throw(e) {
    throw e;
  }
  /**
   * @since 2.0.0
   */
  [Symbol.iterator]() {
    return new _SingleShotGen(this.self);
  }
};
var MUL_HI = 1481765933 >>> 0;
var MUL_LO = 1284865837 >>> 0;
var YieldWrapTypeId = /* @__PURE__ */ Symbol.for("effect/Utils/YieldWrap");
var YieldWrap = class {
  /**
   * @since 3.0.6
   */
  #value;
  constructor(value) {
    this.#value = value;
  }
  /**
   * @since 3.0.6
   */
  [YieldWrapTypeId]() {
    return this.#value;
  }
};
function yieldWrapGet(self) {
  if (typeof self === "object" && self !== null && YieldWrapTypeId in self) {
    return self[YieldWrapTypeId]();
  }
  throw new Error(getBugErrorMessage("yieldWrapGet"));
}
var structuralRegionState = /* @__PURE__ */ globalValue("effect/Utils/isStructuralRegion", () => ({
  enabled: false,
  tester: void 0
}));
var standard = {
  effect_internal_function: (body) => {
    return body();
  }
};
var forced = {
  effect_internal_function: (body) => {
    try {
      return body();
    } finally {
    }
  }
};
var isNotOptimizedAway = /* @__PURE__ */ standard.effect_internal_function(() => new Error().stack)?.includes("effect_internal_function") === true;
var internalCall = isNotOptimizedAway ? standard.effect_internal_function : forced.effect_internal_function;
var genConstructor = function* () {
}.constructor;

// node_modules/effect/dist/esm/Hash.js
var randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
var symbol = /* @__PURE__ */ Symbol.for("effect/Hash");
var hash = (self) => {
  if (structuralRegionState.enabled === true) {
    return 0;
  }
  switch (typeof self) {
    case "number":
      return number(self);
    case "bigint":
      return string(self.toString(10));
    case "boolean":
      return string(String(self));
    case "symbol":
      return string(String(self));
    case "string":
      return string(self);
    case "undefined":
      return string("undefined");
    case "function":
    case "object": {
      if (self === null) {
        return string("null");
      } else if (self instanceof Date) {
        return hash(self.toISOString());
      } else if (self instanceof URL) {
        return hash(self.href);
      } else if (isHash(self)) {
        return self[symbol]();
      } else {
        return random(self);
      }
    }
    default:
      throw new Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
  }
};
var random = (self) => {
  if (!randomHashCache.has(self)) {
    randomHashCache.set(self, number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
  }
  return randomHashCache.get(self);
};
var combine = (b) => (self) => self * 53 ^ b;
var optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
var isHash = (u) => hasProperty(u, symbol);
var number = (n) => {
  if (n !== n || n === Infinity) {
    return 0;
  }
  let h = n | 0;
  if (h !== n) {
    h ^= n * 4294967295;
  }
  while (n > 4294967295) {
    h ^= n /= 4294967295;
  }
  return optimize(h);
};
var string = (str) => {
  let h = 5381, i = str.length;
  while (i) {
    h = h * 33 ^ str.charCodeAt(--i);
  }
  return optimize(h);
};
var structureKeys = (o, keys) => {
  let h = 12289;
  for (let i = 0; i < keys.length; i++) {
    h ^= pipe(string(keys[i]), combine(hash(o[keys[i]])));
  }
  return optimize(h);
};
var structure = (o) => structureKeys(o, Object.keys(o));
var cached = function() {
  if (arguments.length === 1) {
    const self2 = arguments[0];
    return function(hash3) {
      Object.defineProperty(self2, symbol, {
        value() {
          return hash3;
        },
        enumerable: false
      });
      return hash3;
    };
  }
  const self = arguments[0];
  const hash2 = arguments[1];
  Object.defineProperty(self, symbol, {
    value() {
      return hash2;
    },
    enumerable: false
  });
  return hash2;
};

// node_modules/effect/dist/esm/Equal.js
var symbol2 = /* @__PURE__ */ Symbol.for("effect/Equal");
function equals() {
  if (arguments.length === 1) {
    return (self) => compareBoth(self, arguments[0]);
  }
  return compareBoth(arguments[0], arguments[1]);
}
function compareBoth(self, that) {
  if (self === that) {
    return true;
  }
  const selfType = typeof self;
  if (selfType !== typeof that) {
    return false;
  }
  if (selfType === "object" || selfType === "function") {
    if (self !== null && that !== null) {
      if (isEqual(self) && isEqual(that)) {
        if (hash(self) === hash(that) && self[symbol2](that)) {
          return true;
        } else {
          return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
        }
      } else if (self instanceof Date && that instanceof Date) {
        return self.toISOString() === that.toISOString();
      } else if (self instanceof URL && that instanceof URL) {
        return self.href === that.href;
      }
    }
    if (structuralRegionState.enabled) {
      if (Array.isArray(self) && Array.isArray(that)) {
        return self.length === that.length && self.every((v, i) => compareBoth(v, that[i]));
      }
      if (Object.getPrototypeOf(self) === Object.prototype && Object.getPrototypeOf(self) === Object.prototype) {
        const keysSelf = Object.keys(self);
        const keysThat = Object.keys(that);
        if (keysSelf.length === keysThat.length) {
          for (const key of keysSelf) {
            if (!(key in that && compareBoth(self[key], that[key]))) {
              return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
            }
          }
          return true;
        }
      }
      return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
    }
  }
  return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
}
var isEqual = (u) => hasProperty(u, symbol2);

// node_modules/effect/dist/esm/Inspectable.js
var NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var toJSON = (x) => {
  try {
    if (hasProperty(x, "toJSON") && isFunction2(x["toJSON"]) && x["toJSON"].length === 0) {
      return x.toJSON();
    } else if (Array.isArray(x)) {
      return x.map(toJSON);
    }
  } catch {
    return {};
  }
  return redact(x);
};
var format = (x) => JSON.stringify(x, null, 2);
var BaseProto = {
  toJSON() {
    return toJSON(this);
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format(this.toJSON());
  }
};
var Class = class {
  /**
   * @since 2.0.0
   */
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  /**
   * @since 2.0.0
   */
  toString() {
    return format(this.toJSON());
  }
};
var toStringUnknown = (u, whitespace = 2) => {
  if (typeof u === "string") {
    return u;
  }
  try {
    return typeof u === "object" ? stringifyCircular(u, whitespace) : String(u);
  } catch {
    return String(u);
  }
};
var stringifyCircular = (obj, whitespace) => {
  let cache = [];
  const retVal = JSON.stringify(obj, (_key, value) => typeof value === "object" && value !== null ? cache.includes(value) ? void 0 : cache.push(value) && (redactableState.fiberRefs !== void 0 && isRedactable(value) ? value[symbolRedactable](redactableState.fiberRefs) : value) : value, whitespace);
  cache = void 0;
  return retVal;
};
var symbolRedactable = /* @__PURE__ */ Symbol.for("effect/Inspectable/Redactable");
var isRedactable = (u) => typeof u === "object" && u !== null && symbolRedactable in u;
var redactableState = /* @__PURE__ */ globalValue("effect/Inspectable/redactableState", () => ({
  fiberRefs: void 0
}));
var redact = (u) => {
  if (isRedactable(u) && redactableState.fiberRefs !== void 0) {
    return u[symbolRedactable](redactableState.fiberRefs);
  }
  return u;
};

// node_modules/effect/dist/esm/Pipeable.js
var pipeArguments = (self, args2) => {
  switch (args2.length) {
    case 0:
      return self;
    case 1:
      return args2[0](self);
    case 2:
      return args2[1](args2[0](self));
    case 3:
      return args2[2](args2[1](args2[0](self)));
    case 4:
      return args2[3](args2[2](args2[1](args2[0](self))));
    case 5:
      return args2[4](args2[3](args2[2](args2[1](args2[0](self)))));
    case 6:
      return args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self))))));
    case 7:
      return args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self)))))));
    case 8:
      return args2[7](args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self))))))));
    case 9:
      return args2[8](args2[7](args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self)))))))));
    default: {
      let ret = self;
      for (let i = 0, len = args2.length; i < len; i++) {
        ret = args2[i](ret);
      }
      return ret;
    }
  }
};

// node_modules/effect/dist/esm/internal/opCodes/effect.js
var OP_COMMIT = "Commit";

// node_modules/effect/dist/esm/internal/version.js
var moduleVersion = "3.17.7";
var getCurrentVersion = () => moduleVersion;

// node_modules/effect/dist/esm/internal/effectable.js
var EffectTypeId = /* @__PURE__ */ Symbol.for("effect/Effect");
var StreamTypeId = /* @__PURE__ */ Symbol.for("effect/Stream");
var SinkTypeId = /* @__PURE__ */ Symbol.for("effect/Sink");
var ChannelTypeId = /* @__PURE__ */ Symbol.for("effect/Channel");
var effectVariance = {
  /* c8 ignore next */
  _R: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _,
  _V: /* @__PURE__ */ getCurrentVersion()
};
var sinkVariance = {
  /* c8 ignore next */
  _A: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _L: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
var channelVariance = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _InErr: (_) => _,
  /* c8 ignore next */
  _InElem: (_) => _,
  /* c8 ignore next */
  _InDone: (_) => _,
  /* c8 ignore next */
  _OutErr: (_) => _,
  /* c8 ignore next */
  _OutElem: (_) => _,
  /* c8 ignore next */
  _OutDone: (_) => _
};
var EffectPrototype = {
  [EffectTypeId]: effectVariance,
  [StreamTypeId]: effectVariance,
  [SinkTypeId]: sinkVariance,
  [ChannelTypeId]: channelVariance,
  [symbol2](that) {
    return this === that;
  },
  [symbol]() {
    return cached(this, random(this));
  },
  [Symbol.iterator]() {
    return new SingleShotGen(new YieldWrap(this));
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
var StructuralPrototype = {
  [symbol]() {
    return cached(this, structure(this));
  },
  [symbol2](that) {
    const selfKeys = Object.keys(this);
    const thatKeys = Object.keys(that);
    if (selfKeys.length !== thatKeys.length) {
      return false;
    }
    for (const key of selfKeys) {
      if (!(key in that && equals(this[key], that[key]))) {
        return false;
      }
    }
    return true;
  }
};
var CommitPrototype = {
  ...EffectPrototype,
  _op: OP_COMMIT
};
var StructuralCommitPrototype = {
  ...CommitPrototype,
  ...StructuralPrototype
};

// node_modules/effect/dist/esm/Array.js
var fromIterable = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
var ensure = (self) => Array.isArray(self) ? self : [self];

// node_modules/effect/dist/esm/internal/context.js
var TagTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Tag");
var ReferenceTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Reference");
var STMSymbolKey = "effect/STM";
var STMTypeId = /* @__PURE__ */ Symbol.for(STMSymbolKey);
var TagProto = {
  ...EffectPrototype,
  _op: "Tag",
  [STMTypeId]: effectVariance,
  [TagTypeId]: {
    _Service: (_) => _,
    _Identifier: (_) => _
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Tag",
      key: this.key,
      stack: this.stack
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  of(self) {
    return self;
  },
  context(self) {
    return make(this, self);
  }
};
var ReferenceProto = {
  ...TagProto,
  [ReferenceTypeId]: ReferenceTypeId
};
var Tag = (id) => () => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const creationError = new Error();
  Error.stackTraceLimit = limit;
  function TagClass() {
  }
  Object.setPrototypeOf(TagClass, TagProto);
  TagClass.key = id;
  Object.defineProperty(TagClass, "stack", {
    get() {
      return creationError.stack;
    }
  });
  return TagClass;
};
var Reference = () => (id, options) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const creationError = new Error();
  Error.stackTraceLimit = limit;
  function ReferenceClass() {
  }
  Object.setPrototypeOf(ReferenceClass, ReferenceProto);
  ReferenceClass.key = id;
  ReferenceClass.defaultValue = options.defaultValue;
  Object.defineProperty(ReferenceClass, "stack", {
    get() {
      return creationError.stack;
    }
  });
  return ReferenceClass;
};
var TypeId = /* @__PURE__ */ Symbol.for("effect/Context");
var ContextProto = {
  [TypeId]: {
    _Services: (_) => _
  },
  [symbol2](that) {
    if (isContext(that)) {
      if (this.unsafeMap.size === that.unsafeMap.size) {
        for (const k of this.unsafeMap.keys()) {
          if (!that.unsafeMap.has(k) || !equals(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  },
  [symbol]() {
    return cached(this, number(this.unsafeMap.size));
  },
  pipe() {
    return pipeArguments(this, arguments);
  },
  toString() {
    return format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Context",
      services: Array.from(this.unsafeMap).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
var makeContext = (unsafeMap) => {
  const context = Object.create(ContextProto);
  context.unsafeMap = unsafeMap;
  return context;
};
var serviceNotFoundError = (tag) => {
  const error = new Error(`Service not found${tag.key ? `: ${String(tag.key)}` : ""}`);
  if (tag.stack) {
    const lines = tag.stack.split("\n");
    if (lines.length > 2) {
      const afterAt = lines[2].match(/at (.*)/);
      if (afterAt) {
        error.message = error.message + ` (defined at ${afterAt[1]})`;
      }
    }
  }
  if (error.stack) {
    const lines = error.stack.split("\n");
    lines.splice(1, 3);
    error.stack = lines.join("\n");
  }
  return error;
};
var isContext = (u) => hasProperty(u, TypeId);
var make = (tag, service2) => makeContext(/* @__PURE__ */ new Map([[tag.key, service2]]));
var add = /* @__PURE__ */ dual(3, (self, tag, service2) => {
  const map2 = new Map(self.unsafeMap);
  map2.set(tag.key, service2);
  return makeContext(map2);
});
var defaultValueCache = /* @__PURE__ */ globalValue("effect/Context/defaultValueCache", () => /* @__PURE__ */ new Map());
var getDefaultValue = (tag) => {
  if (defaultValueCache.has(tag.key)) {
    return defaultValueCache.get(tag.key);
  }
  const value = tag.defaultValue();
  defaultValueCache.set(tag.key, value);
  return value;
};
var unsafeGetReference = (self, tag) => {
  return self.unsafeMap.has(tag.key) ? self.unsafeMap.get(tag.key) : getDefaultValue(tag);
};
var unsafeGet = /* @__PURE__ */ dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag.key)) {
    if (ReferenceTypeId in tag) return getDefaultValue(tag);
    throw serviceNotFoundError(tag);
  }
  return self.unsafeMap.get(tag.key);
});

// node_modules/effect/dist/esm/Context.js
var add2 = add;
var unsafeGet2 = unsafeGet;
var Tag2 = Tag;
var Reference2 = Reference;

// node_modules/effect/dist/esm/Effectable.js
var EffectPrototype2 = EffectPrototype;

// node_modules/effect/dist/esm/Micro.js
var TypeId2 = /* @__PURE__ */ Symbol.for("effect/Micro");
var MicroExitTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroExit");
var isMicro = (u) => typeof u === "object" && u !== null && TypeId2 in u;
var MicroCauseTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroCause");
var microCauseVariance = {
  _E: identity
};
var MicroCauseImpl = class extends globalThis.Error {
  _tag;
  traces;
  [MicroCauseTypeId];
  constructor(_tag, originalError, traces) {
    const causeName = `MicroCause.${_tag}`;
    let name;
    let message;
    let stack;
    if (originalError instanceof globalThis.Error) {
      name = `(${causeName}) ${originalError.name}`;
      message = originalError.message;
      const messageLines = message.split("\n").length;
      stack = originalError.stack ? `(${causeName}) ${originalError.stack.split("\n").slice(0, messageLines + 3).join("\n")}` : `${name}: ${message}`;
    } else {
      name = causeName;
      message = toStringUnknown(originalError, 0);
      stack = `${name}: ${message}`;
    }
    if (traces.length > 0) {
      stack += `
    ${traces.join("\n    ")}`;
    }
    super(message);
    this._tag = _tag;
    this.traces = traces;
    this[MicroCauseTypeId] = microCauseVariance;
    this.name = name;
    this.stack = stack;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toString() {
    return this.stack;
  }
  [NodeInspectSymbol]() {
    return this.stack;
  }
};
var Fail = class extends MicroCauseImpl {
  error;
  constructor(error, traces = []) {
    super("Fail", error, traces);
    this.error = error;
  }
};
var causeFail = (error, traces = []) => new Fail(error, traces);
var Die = class extends MicroCauseImpl {
  defect;
  constructor(defect, traces = []) {
    super("Die", defect, traces);
    this.defect = defect;
  }
};
var causeDie = (defect, traces = []) => new Die(defect, traces);
var Interrupt = class extends MicroCauseImpl {
  constructor(traces = []) {
    super("Interrupt", "interrupted", traces);
  }
};
var causeInterrupt = (traces = []) => new Interrupt(traces);
var causeIsFail = (self) => self._tag === "Fail";
var causeIsInterrupt = (self) => self._tag === "Interrupt";
var causeSquash = (self) => self._tag === "Fail" ? self.error : self._tag === "Die" ? self.defect : self;
var causeWithTrace = /* @__PURE__ */ dual(2, (self, trace) => {
  const traces = [...self.traces, trace];
  switch (self._tag) {
    case "Die":
      return causeDie(self.defect, traces);
    case "Interrupt":
      return causeInterrupt(traces);
    case "Fail":
      return causeFail(self.error, traces);
  }
});
var MicroFiberTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroFiber");
var fiberVariance = {
  _A: identity,
  _E: identity
};
var MicroFiberImpl = class {
  context;
  interruptible;
  [MicroFiberTypeId];
  _stack = [];
  _observers = [];
  _exit;
  _children;
  currentOpCount = 0;
  constructor(context, interruptible2 = true) {
    this.context = context;
    this.interruptible = interruptible2;
    this[MicroFiberTypeId] = fiberVariance;
  }
  getRef(ref) {
    return unsafeGetReference(this.context, ref);
  }
  addObserver(cb) {
    if (this._exit) {
      cb(this._exit);
      return constVoid;
    }
    this._observers.push(cb);
    return () => {
      const index = this._observers.indexOf(cb);
      if (index >= 0) {
        this._observers.splice(index, 1);
      }
    };
  }
  _interrupted = false;
  unsafeInterrupt() {
    if (this._exit) {
      return;
    }
    this._interrupted = true;
    if (this.interruptible) {
      this.evaluate(exitInterrupt);
    }
  }
  unsafePoll() {
    return this._exit;
  }
  evaluate(effect) {
    if (this._exit) {
      return;
    } else if (this._yielded !== void 0) {
      const yielded = this._yielded;
      this._yielded = void 0;
      yielded();
    }
    const exit2 = this.runLoop(effect);
    if (exit2 === Yield) {
      return;
    }
    const interruptChildren = fiberMiddleware.interruptChildren && fiberMiddleware.interruptChildren(this);
    if (interruptChildren !== void 0) {
      return this.evaluate(flatMap(interruptChildren, () => exit2));
    }
    this._exit = exit2;
    for (let i = 0; i < this._observers.length; i++) {
      this._observers[i](exit2);
    }
    this._observers.length = 0;
  }
  runLoop(effect) {
    let yielding = false;
    let current = effect;
    this.currentOpCount = 0;
    try {
      while (true) {
        this.currentOpCount++;
        if (!yielding && this.getRef(CurrentScheduler).shouldYield(this)) {
          yielding = true;
          const prev = current;
          current = flatMap(yieldNow, () => prev);
        }
        current = current[evaluate](this);
        if (current === Yield) {
          const yielded = this._yielded;
          if (MicroExitTypeId in yielded) {
            this._yielded = void 0;
            return yielded;
          }
          return Yield;
        }
      }
    } catch (error) {
      if (!hasProperty(current, evaluate)) {
        return exitDie(`MicroFiber.runLoop: Not a valid effect: ${String(current)}`);
      }
      return exitDie(error);
    }
  }
  getCont(symbol3) {
    while (true) {
      const op = this._stack.pop();
      if (!op) return void 0;
      const cont = op[ensureCont] && op[ensureCont](this);
      if (cont) return {
        [symbol3]: cont
      };
      if (op[symbol3]) return op;
    }
  }
  // cancel the yielded operation, or for the yielded exit value
  _yielded = void 0;
  yieldWith(value) {
    this._yielded = value;
    return Yield;
  }
  children() {
    return this._children ??= /* @__PURE__ */ new Set();
  }
};
var fiberMiddleware = /* @__PURE__ */ globalValue("effect/Micro/fiberMiddleware", () => ({
  interruptChildren: void 0
}));
var fiberInterruptAll = (fibers) => suspend(() => {
  for (const fiber of fibers) fiber.unsafeInterrupt();
  const iter = fibers[Symbol.iterator]();
  const wait = suspend(() => {
    let result = iter.next();
    while (!result.done) {
      if (result.value.unsafePoll()) {
        result = iter.next();
        continue;
      }
      const fiber = result.value;
      return async((resume) => {
        fiber.addObserver((_) => {
          resume(wait);
        });
      });
    }
    return exitVoid;
  });
  return wait;
});
var identifier = /* @__PURE__ */ Symbol.for("effect/Micro/identifier");
var args = /* @__PURE__ */ Symbol.for("effect/Micro/args");
var evaluate = /* @__PURE__ */ Symbol.for("effect/Micro/evaluate");
var successCont = /* @__PURE__ */ Symbol.for("effect/Micro/successCont");
var failureCont = /* @__PURE__ */ Symbol.for("effect/Micro/failureCont");
var ensureCont = /* @__PURE__ */ Symbol.for("effect/Micro/ensureCont");
var Yield = /* @__PURE__ */ Symbol.for("effect/Micro/Yield");
var microVariance = {
  _A: identity,
  _E: identity,
  _R: identity
};
var MicroProto = {
  ...EffectPrototype2,
  _op: "Micro",
  [TypeId2]: microVariance,
  pipe() {
    return pipeArguments(this, arguments);
  },
  [Symbol.iterator]() {
    return new SingleShotGen(new YieldWrap(this));
  },
  toJSON() {
    return {
      _id: "Micro",
      op: this[identifier],
      ...args in this ? {
        args: this[args]
      } : void 0
    };
  },
  toString() {
    return format(this);
  },
  [NodeInspectSymbol]() {
    return format(this);
  }
};
function defaultEvaluate(_fiber) {
  return exitDie(`Micro.evaluate: Not implemented`);
}
var makePrimitiveProto = (options) => ({
  ...MicroProto,
  [identifier]: options.op,
  [evaluate]: options.eval ?? defaultEvaluate,
  [successCont]: options.contA,
  [failureCont]: options.contE,
  [ensureCont]: options.ensure
});
var makePrimitive = (options) => {
  const Proto = makePrimitiveProto(options);
  return function() {
    const self = Object.create(Proto);
    self[args] = options.single === false ? arguments : arguments[0];
    return self;
  };
};
var makeExit = (options) => {
  const Proto = {
    ...makePrimitiveProto(options),
    [MicroExitTypeId]: MicroExitTypeId,
    _tag: options.op,
    get [options.prop]() {
      return this[args];
    },
    toJSON() {
      return {
        _id: "MicroExit",
        _tag: options.op,
        [options.prop]: this[args]
      };
    },
    [symbol2](that) {
      return isMicroExit(that) && that._tag === options.op && equals(this[args], that[args]);
    },
    [symbol]() {
      return cached(this, combine(string(options.op))(hash(this[args])));
    }
  };
  return function(value) {
    const self = Object.create(Proto);
    self[args] = value;
    self[successCont] = void 0;
    self[failureCont] = void 0;
    self[ensureCont] = void 0;
    return self;
  };
};
var succeed = /* @__PURE__ */ makeExit({
  op: "Success",
  prop: "value",
  eval(fiber) {
    const cont = fiber.getCont(successCont);
    return cont ? cont[successCont](this[args], fiber) : fiber.yieldWith(this);
  }
});
var failCause = /* @__PURE__ */ makeExit({
  op: "Failure",
  prop: "cause",
  eval(fiber) {
    let cont = fiber.getCont(failureCont);
    while (causeIsInterrupt(this[args]) && cont && fiber.interruptible) {
      cont = fiber.getCont(failureCont);
    }
    return cont ? cont[failureCont](this[args], fiber) : fiber.yieldWith(this);
  }
});
var fail = (error) => failCause(causeFail(error));
var sync = /* @__PURE__ */ makePrimitive({
  op: "Sync",
  eval(fiber) {
    const value = this[args]();
    const cont = fiber.getCont(successCont);
    return cont ? cont[successCont](value, fiber) : fiber.yieldWith(exitSucceed(value));
  }
});
var suspend = /* @__PURE__ */ makePrimitive({
  op: "Suspend",
  eval(_fiber) {
    return this[args]();
  }
});
var yieldNowWith = /* @__PURE__ */ makePrimitive({
  op: "Yield",
  eval(fiber) {
    let resumed = false;
    fiber.getRef(CurrentScheduler).scheduleTask(() => {
      if (resumed) return;
      fiber.evaluate(exitVoid);
    }, this[args] ?? 0);
    return fiber.yieldWith(() => {
      resumed = true;
    });
  }
});
var yieldNow = /* @__PURE__ */ yieldNowWith(0);
var die = (defect) => exitDie(defect);
var void_ = /* @__PURE__ */ succeed(void 0);
var try_ = (options) => suspend(() => {
  try {
    return succeed(options.try());
  } catch (err) {
    return fail(options.catch(err));
  }
});
var promise = (evaluate2) => asyncOptions(function(resume, signal) {
  evaluate2(signal).then((a) => resume(succeed(a)), (e) => resume(die(e)));
}, evaluate2.length !== 0);
var tryPromise = (options) => asyncOptions(function(resume, signal) {
  try {
    options.try(signal).then((a) => resume(succeed(a)), (e) => resume(fail(options.catch(e))));
  } catch (err) {
    resume(fail(options.catch(err)));
  }
}, options.try.length !== 0);
var withMicroFiber = /* @__PURE__ */ makePrimitive({
  op: "WithMicroFiber",
  eval(fiber) {
    return this[args](fiber);
  }
});
var asyncOptions = /* @__PURE__ */ makePrimitive({
  op: "Async",
  single: false,
  eval(fiber) {
    const register = this[args][0];
    let resumed = false;
    let yielded = false;
    const controller = this[args][1] ? new AbortController() : void 0;
    const onCancel = register((effect) => {
      if (resumed) return;
      resumed = true;
      if (yielded) {
        fiber.evaluate(effect);
      } else {
        yielded = effect;
      }
    }, controller?.signal);
    if (yielded !== false) return yielded;
    yielded = true;
    fiber._yielded = () => {
      resumed = true;
    };
    if (controller === void 0 && onCancel === void 0) {
      return Yield;
    }
    fiber._stack.push(asyncFinalizer(() => {
      resumed = true;
      controller?.abort();
      return onCancel ?? exitVoid;
    }));
    return Yield;
  }
});
var asyncFinalizer = /* @__PURE__ */ makePrimitive({
  op: "AsyncFinalizer",
  ensure(fiber) {
    if (fiber.interruptible) {
      fiber.interruptible = false;
      fiber._stack.push(setInterruptible(true));
    }
  },
  contE(cause, _fiber) {
    return causeIsInterrupt(cause) ? flatMap(this[args](), () => failCause(cause)) : failCause(cause);
  }
});
var async = (register) => asyncOptions(register, register.length >= 2);
var gen = (...args2) => suspend(() => fromIterator(args2.length === 1 ? args2[0]() : args2[1].call(args2[0])));
var fromIterator = /* @__PURE__ */ makePrimitive({
  op: "Iterator",
  contA(value, fiber) {
    const state = this[args].next(value);
    if (state.done) return succeed(state.value);
    fiber._stack.push(this);
    return yieldWrapGet(state.value);
  },
  eval(fiber) {
    return this[successCont](void 0, fiber);
  }
});
var as = /* @__PURE__ */ dual(2, (self, value) => map(self, (_) => value));
var andThen = /* @__PURE__ */ dual(2, (self, f) => flatMap(self, (a) => {
  const value = isMicro(f) ? f : typeof f === "function" ? f(a) : f;
  return isMicro(value) ? value : succeed(value);
}));
var tap = /* @__PURE__ */ dual(2, (self, f) => flatMap(self, (a) => {
  const value = isMicro(f) ? f : typeof f === "function" ? f(a) : f;
  return isMicro(value) ? as(value, a) : succeed(a);
}));
var exit = (self) => matchCause(self, {
  onFailure: exitFailCause,
  onSuccess: exitSucceed
});
var flatMap = /* @__PURE__ */ dual(2, (self, f) => {
  const onSuccess = Object.create(OnSuccessProto);
  onSuccess[args] = self;
  onSuccess[successCont] = f;
  return onSuccess;
});
var OnSuccessProto = /* @__PURE__ */ makePrimitiveProto({
  op: "OnSuccess",
  eval(fiber) {
    fiber._stack.push(this);
    return this[args];
  }
});
var map = /* @__PURE__ */ dual(2, (self, f) => flatMap(self, (a) => succeed(f(a))));
var isMicroExit = (u) => hasProperty(u, MicroExitTypeId);
var exitSucceed = succeed;
var exitFailCause = failCause;
var exitInterrupt = /* @__PURE__ */ exitFailCause(/* @__PURE__ */ causeInterrupt());
var exitDie = (defect) => exitFailCause(causeDie(defect));
var exitIsFailure = (self) => self._tag === "Failure";
var exitVoid = /* @__PURE__ */ exitSucceed(void 0);
var exitVoidAll = (exits) => {
  for (const exit2 of exits) {
    if (exit2._tag === "Failure") {
      return exit2;
    }
  }
  return exitVoid;
};
var setImmediate = "setImmediate" in globalThis ? globalThis.setImmediate : (f) => setTimeout(f, 0);
var MicroSchedulerDefault = class {
  tasks = [];
  running = false;
  /**
   * @since 3.5.9
   */
  scheduleTask(task, _priority) {
    this.tasks.push(task);
    if (!this.running) {
      this.running = true;
      setImmediate(this.afterScheduled);
    }
  }
  /**
   * @since 3.5.9
   */
  afterScheduled = () => {
    this.running = false;
    this.runTasks();
  };
  /**
   * @since 3.5.9
   */
  runTasks() {
    const tasks = this.tasks;
    this.tasks = [];
    for (let i = 0, len = tasks.length; i < len; i++) {
      tasks[i]();
    }
  }
  /**
   * @since 3.5.9
   */
  shouldYield(fiber) {
    return fiber.currentOpCount >= fiber.getRef(MaxOpsBeforeYield);
  }
  /**
   * @since 3.5.9
   */
  flush() {
    while (this.tasks.length > 0) {
      this.runTasks();
    }
  }
};
var service = (tag) => withMicroFiber((fiber) => succeed(unsafeGet2(fiber.context, tag)));
var updateContext = /* @__PURE__ */ dual(2, (self, f) => withMicroFiber((fiber) => {
  const prev = fiber.context;
  fiber.context = f(prev);
  return onExit(self, () => {
    fiber.context = prev;
    return void_;
  });
}));
var provideService = /* @__PURE__ */ dual(3, (self, tag, service2) => updateContext(self, add2(tag, service2)));
var MaxOpsBeforeYield = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentMaxOpsBeforeYield", {
  defaultValue: () => 2048
})) {
};
var CurrentConcurrency = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentConcurrency", {
  defaultValue: () => "unbounded"
})) {
};
var CurrentScheduler = class extends (/* @__PURE__ */ Reference2()("effect/Micro/currentScheduler", {
  defaultValue: () => new MicroSchedulerDefault()
})) {
};
var filterOrFail = /* @__PURE__ */ dual((args2) => isMicro(args2[0]), (self, refinement, orFailWith) => flatMap(self, (a) => refinement(a) ? succeed(a) : fail(orFailWith(a))));
var catchAllCause = /* @__PURE__ */ dual(2, (self, f) => {
  const onFailure = Object.create(OnFailureProto);
  onFailure[args] = self;
  onFailure[failureCont] = f;
  return onFailure;
});
var OnFailureProto = /* @__PURE__ */ makePrimitiveProto({
  op: "OnFailure",
  eval(fiber) {
    fiber._stack.push(this);
    return this[args];
  }
});
var catchCauseIf = /* @__PURE__ */ dual(3, (self, predicate, f) => catchAllCause(self, (cause) => predicate(cause) ? f(cause) : failCause(cause)));
var tapErrorCauseIf = /* @__PURE__ */ dual(3, (self, refinement, f) => catchCauseIf(self, refinement, (cause) => andThen(f(cause), failCause(cause))));
var tapError = /* @__PURE__ */ dual(2, (self, f) => tapErrorCauseIf(self, causeIsFail, (fail2) => f(fail2.error)));
var catchIf = /* @__PURE__ */ dual(3, (self, predicate, f) => catchCauseIf(self, (f2) => causeIsFail(f2) && predicate(f2.error), (fail2) => f(fail2.error)));
var catchTag = /* @__PURE__ */ dual(3, (self, k, f) => catchIf(self, isTagged(k), f));
var withTrace = function() {
  const prevLimit = globalThis.Error.stackTraceLimit;
  globalThis.Error.stackTraceLimit = 2;
  const error = new globalThis.Error();
  globalThis.Error.stackTraceLimit = prevLimit;
  function generate(name, cause) {
    const stack = error.stack;
    if (!stack) {
      return cause;
    }
    const line = stack.split("\n")[2]?.trim().replace(/^at /, "");
    if (!line) {
      return cause;
    }
    const lineMatch = line.match(/\((.*)\)$/);
    return causeWithTrace(cause, `at ${name} (${lineMatch ? lineMatch[1] : line})`);
  }
  const f = (name) => (self) => onError(self, (cause) => failCause(generate(name, cause)));
  if (arguments.length === 2) {
    return f(arguments[1])(arguments[0]);
  }
  return f(arguments[0]);
};
var matchCauseEffect = /* @__PURE__ */ dual(2, (self, options) => {
  const primitive = Object.create(OnSuccessAndFailureProto);
  primitive[args] = self;
  primitive[successCont] = options.onSuccess;
  primitive[failureCont] = options.onFailure;
  return primitive;
});
var OnSuccessAndFailureProto = /* @__PURE__ */ makePrimitiveProto({
  op: "OnSuccessAndFailure",
  eval(fiber) {
    fiber._stack.push(this);
    return this[args];
  }
});
var matchCause = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect(self, {
  onFailure: (cause) => sync(() => options.onFailure(cause)),
  onSuccess: (value) => sync(() => options.onSuccess(value))
}));
var MicroScopeTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroScope");
var MicroScopeImpl = class _MicroScopeImpl {
  [MicroScopeTypeId];
  state = {
    _tag: "Open",
    finalizers: /* @__PURE__ */ new Set()
  };
  constructor() {
    this[MicroScopeTypeId] = MicroScopeTypeId;
  }
  unsafeAddFinalizer(finalizer) {
    if (this.state._tag === "Open") {
      this.state.finalizers.add(finalizer);
    }
  }
  addFinalizer(finalizer) {
    return suspend(() => {
      if (this.state._tag === "Open") {
        this.state.finalizers.add(finalizer);
        return void_;
      }
      return finalizer(this.state.exit);
    });
  }
  unsafeRemoveFinalizer(finalizer) {
    if (this.state._tag === "Open") {
      this.state.finalizers.delete(finalizer);
    }
  }
  close(microExit) {
    return suspend(() => {
      if (this.state._tag === "Open") {
        const finalizers = Array.from(this.state.finalizers).reverse();
        this.state = {
          _tag: "Closed",
          exit: microExit
        };
        return flatMap(forEach(finalizers, (finalizer) => exit(finalizer(microExit))), exitVoidAll);
      }
      return void_;
    });
  }
  get fork() {
    return sync(() => {
      const newScope = new _MicroScopeImpl();
      if (this.state._tag === "Closed") {
        newScope.state = this.state;
        return newScope;
      }
      function fin(exit2) {
        return newScope.close(exit2);
      }
      this.state.finalizers.add(fin);
      newScope.unsafeAddFinalizer((_) => sync(() => this.unsafeRemoveFinalizer(fin)));
      return newScope;
    });
  }
};
var onExit = /* @__PURE__ */ dual(2, (self, f) => uninterruptibleMask((restore) => matchCauseEffect(restore(self), {
  onFailure: (cause) => flatMap(f(exitFailCause(cause)), () => failCause(cause)),
  onSuccess: (a) => flatMap(f(exitSucceed(a)), () => succeed(a))
})));
var onExitIf = /* @__PURE__ */ dual(3, (self, refinement, f) => onExit(self, (exit2) => refinement(exit2) ? f(exit2) : exitVoid));
var onError = /* @__PURE__ */ dual(2, (self, f) => onExitIf(self, exitIsFailure, (exit2) => f(exit2.cause)));
var setInterruptible = /* @__PURE__ */ makePrimitive({
  op: "SetInterruptible",
  ensure(fiber) {
    fiber.interruptible = this[args];
    if (fiber._interrupted && fiber.interruptible) {
      return () => exitInterrupt;
    }
  }
});
var interruptible = (self) => withMicroFiber((fiber) => {
  if (fiber.interruptible) return self;
  fiber.interruptible = true;
  fiber._stack.push(setInterruptible(false));
  if (fiber._interrupted) return exitInterrupt;
  return self;
});
var uninterruptibleMask = (f) => withMicroFiber((fiber) => {
  if (!fiber.interruptible) return f(identity);
  fiber.interruptible = false;
  fiber._stack.push(setInterruptible(true));
  return f(interruptible);
});
var whileLoop = /* @__PURE__ */ makePrimitive({
  op: "While",
  contA(value, fiber) {
    this[args].step(value);
    if (this[args].while()) {
      fiber._stack.push(this);
      return this[args].body();
    }
    return exitVoid;
  },
  eval(fiber) {
    if (this[args].while()) {
      fiber._stack.push(this);
      return this[args].body();
    }
    return exitVoid;
  }
});
var forEach = (iterable, f, options) => withMicroFiber((parent) => {
  const concurrencyOption = options?.concurrency === "inherit" ? parent.getRef(CurrentConcurrency) : options?.concurrency ?? 1;
  const concurrency = concurrencyOption === "unbounded" ? Number.POSITIVE_INFINITY : Math.max(1, concurrencyOption);
  const items = fromIterable(iterable);
  let length = items.length;
  if (length === 0) {
    return options?.discard ? void_ : succeed([]);
  }
  const out = options?.discard ? void 0 : new Array(length);
  let index = 0;
  if (concurrency === 1) {
    return as(whileLoop({
      while: () => index < items.length,
      body: () => f(items[index], index),
      step: out ? (b) => out[index++] = b : (_) => index++
    }), out);
  }
  return async((resume) => {
    const fibers = /* @__PURE__ */ new Set();
    let result = void 0;
    let inProgress = 0;
    let doneCount = 0;
    let pumping = false;
    let interrupted = false;
    function pump() {
      pumping = true;
      while (inProgress < concurrency && index < length) {
        const currentIndex = index;
        const item = items[currentIndex];
        index++;
        inProgress++;
        try {
          const child = unsafeFork(parent, f(item, currentIndex), true, true);
          fibers.add(child);
          child.addObserver((exit2) => {
            fibers.delete(child);
            if (interrupted) {
              return;
            } else if (exit2._tag === "Failure") {
              if (result === void 0) {
                result = exit2;
                length = index;
                fibers.forEach((fiber) => fiber.unsafeInterrupt());
              }
            } else if (out !== void 0) {
              out[currentIndex] = exit2.value;
            }
            doneCount++;
            inProgress--;
            if (doneCount === length) {
              resume(result ?? succeed(out));
            } else if (!pumping && inProgress < concurrency) {
              pump();
            }
          });
        } catch (err) {
          result = exitDie(err);
          length = index;
          fibers.forEach((fiber) => fiber.unsafeInterrupt());
        }
      }
      pumping = false;
    }
    pump();
    return suspend(() => {
      interrupted = true;
      index = length;
      return fiberInterruptAll(fibers);
    });
  });
});
var unsafeFork = (parent, effect, immediate = false, daemon = false) => {
  const child = new MicroFiberImpl(parent.context, parent.interruptible);
  if (!daemon) {
    parent.children().add(child);
    child.addObserver(() => parent.children().delete(child));
  }
  if (immediate) {
    child.evaluate(effect);
  } else {
    parent.getRef(CurrentScheduler).scheduleTask(() => child.evaluate(effect), 0);
  }
  return child;
};
var runFork = (effect, options) => {
  const fiber = new MicroFiberImpl(CurrentScheduler.context(options?.scheduler ?? new MicroSchedulerDefault()));
  fiber.evaluate(effect);
  if (options?.signal) {
    if (options.signal.aborted) {
      fiber.unsafeInterrupt();
    } else {
      const abort = () => fiber.unsafeInterrupt();
      options.signal.addEventListener("abort", abort, {
        once: true
      });
      fiber.addObserver(() => options.signal.removeEventListener("abort", abort));
    }
  }
  return fiber;
};
var runPromiseExit = (effect, options) => new Promise((resolve, _reject) => {
  const handle = runFork(effect, options);
  handle.addObserver(resolve);
});
var runPromise = (effect, options) => runPromiseExit(effect, options).then((exit2) => {
  if (exit2._tag === "Failure") {
    throw exit2.cause;
  }
  return exit2.value;
});
var runSyncExit = (effect) => {
  const scheduler = new MicroSchedulerDefault();
  const fiber = runFork(effect, {
    scheduler
  });
  scheduler.flush();
  return fiber._exit ?? exitDie(fiber);
};
var runSync = (effect) => {
  const exit2 = runSyncExit(effect);
  if (exit2._tag === "Failure") throw exit2.cause;
  return exit2.value;
};
var YieldableError = /* @__PURE__ */ (function() {
  class YieldableError2 extends globalThis.Error {
  }
  Object.assign(YieldableError2.prototype, MicroProto, StructuralPrototype, {
    [identifier]: "Failure",
    [evaluate]() {
      return fail(this);
    },
    toString() {
      return this.message ? `${this.name}: ${this.message}` : this.name;
    },
    toJSON() {
      return {
        ...this
      };
    },
    [NodeInspectSymbol]() {
      const stack = this.stack;
      if (stack) {
        return `${this.toString()}
${stack.split("\n").slice(1).join("\n")}`;
      }
      return this.toString();
    }
  });
  return YieldableError2;
})();
var Error2 = /* @__PURE__ */ (function() {
  return class extends YieldableError {
    constructor(args2) {
      super();
      if (args2) {
        Object.assign(this, args2);
      }
    }
  };
})();
var TaggedError = (tag) => {
  class Base2 extends Error2 {
    _tag = tag;
  }
  ;
  Base2.prototype.name = tag;
  return Base2;
};

// node_modules/@uploadthing/mime-types/dist/audio-abtNcU0_.js
var audio = {
  "audio/3gpp": {
    source: "iana",
    extensions: ["3gpp"]
  },
  "audio/adpcm": {
    source: "apache",
    extensions: ["adp"]
  },
  "audio/amr": {
    source: "iana",
    extensions: ["amr"]
  },
  "audio/basic": {
    source: "iana",
    extensions: ["au", "snd"]
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: ["mxmf"]
  },
  "audio/mp4": {
    source: "iana",
    extensions: ["m4a", "mp4a"]
  },
  "audio/mpeg": {
    source: "iana",
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/ogg": {
    source: "iana",
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/s3m": {
    source: "apache",
    extensions: ["s3m"]
  },
  "audio/silk": {
    source: "apache",
    extensions: ["sil"]
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: ["uva", "uvva"]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: ["eol"]
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: ["dra"]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: ["dts"]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: ["dtshd"]
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: ["lvp"]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: ["pya"]
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: ["ecelp4800"]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: ["ecelp7470"]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: ["ecelp9600"]
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: ["rip"]
  },
  "audio/webm": {
    source: "apache",
    extensions: ["weba"]
  },
  "audio/x-aac": {
    source: "apache",
    extensions: ["aac"]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    extensions: ["caf"]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: ["flac"]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: ["m4a"]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: ["mka"]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: ["m3u"]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: ["wax"]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: ["wma"]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: ["ram", "ra"]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: ["rmp"]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: ["ra"]
  },
  "audio/x-wav": {
    source: "apache",
    extensions: ["wav"]
  },
  "audio/x-gsm": {
    source: "apache",
    extensions: ["gsm"]
  },
  "audio/xm": {
    source: "apache",
    extensions: ["xm"]
  }
};

// node_modules/@uploadthing/mime-types/dist/image-C05IP6qt.js
var image = {
  "image/aces": {
    source: "iana",
    extensions: ["exr"]
  },
  "image/avci": {
    source: "iana",
    extensions: ["avci"]
  },
  "image/avcs": {
    source: "iana",
    extensions: ["avcs"]
  },
  "image/avif": {
    source: "iana",
    extensions: ["avif"]
  },
  "image/bmp": {
    source: "iana",
    extensions: ["bmp"]
  },
  "image/cgm": {
    source: "iana",
    extensions: ["cgm"]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: ["drle"]
  },
  "image/emf": {
    source: "iana",
    extensions: ["emf"]
  },
  "image/fits": {
    source: "iana",
    extensions: ["fits"]
  },
  "image/g3fax": {
    source: "iana",
    extensions: ["g3"]
  },
  "image/gif": {
    source: "iana",
    extensions: ["gif"]
  },
  "image/heic": {
    source: "iana",
    extensions: ["heic"]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: ["heics"]
  },
  "image/heif": {
    source: "iana",
    extensions: ["heif"]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: ["heifs"]
  },
  "image/hej2k": {
    source: "iana",
    extensions: ["hej2"]
  },
  "image/hsj2": {
    source: "iana",
    extensions: ["hsj2"]
  },
  "image/ief": {
    source: "iana",
    extensions: ["ief"]
  },
  "image/jls": {
    source: "iana",
    extensions: ["jls"]
  },
  "image/jp2": {
    source: "iana",
    extensions: ["jp2", "jpg2"]
  },
  "image/jpeg": {
    source: "iana",
    extensions: [
      "jpeg",
      "jpg",
      "jpe",
      "jfif",
      "pjpeg",
      "pjp"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: ["jph"]
  },
  "image/jphc": {
    source: "iana",
    extensions: ["jhc"]
  },
  "image/jpm": {
    source: "iana",
    extensions: ["jpm"]
  },
  "image/jpx": {
    source: "iana",
    extensions: ["jpx", "jpf"]
  },
  "image/jxr": {
    source: "iana",
    extensions: ["jxr"]
  },
  "image/jxra": {
    source: "iana",
    extensions: ["jxra"]
  },
  "image/jxrs": {
    source: "iana",
    extensions: ["jxrs"]
  },
  "image/jxs": {
    source: "iana",
    extensions: ["jxs"]
  },
  "image/jxsc": {
    source: "iana",
    extensions: ["jxsc"]
  },
  "image/jxsi": {
    source: "iana",
    extensions: ["jxsi"]
  },
  "image/jxss": {
    source: "iana",
    extensions: ["jxss"]
  },
  "image/ktx": {
    source: "iana",
    extensions: ["ktx"]
  },
  "image/ktx2": {
    source: "iana",
    extensions: ["ktx2"]
  },
  "image/png": {
    source: "iana",
    extensions: ["png"]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: ["btif"]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: ["pti"]
  },
  "image/sgi": {
    source: "apache",
    extensions: ["sgi"]
  },
  "image/svg+xml": {
    source: "iana",
    extensions: ["svg", "svgz"]
  },
  "image/t38": {
    source: "iana",
    extensions: ["t38"]
  },
  "image/tiff": {
    source: "iana",
    extensions: ["tif", "tiff"]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: ["tfx"]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    extensions: ["psd"]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: ["azv"]
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: ["djvu", "djv"]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: ["sub"]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: ["dwg"]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: ["dxf"]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: ["fbs"]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: ["fpx"]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: ["fst"]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: ["mmr"]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: ["rlc"]
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    extensions: ["ico"]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: ["mdi"]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: ["wdp"]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: ["npx"]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: ["b16"]
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: ["tap"]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: ["vtf"]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: ["wbmp"]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: ["xif"]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: ["pcx"]
  },
  "image/webp": {
    source: "apache",
    extensions: ["webp"]
  },
  "image/wmf": {
    source: "iana",
    extensions: ["wmf"]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: ["3ds"]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: ["ras"]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: ["cmx"]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    extensions: ["ico"]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: ["jng"]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: ["sid"]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    extensions: ["bmp"]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: ["pcx"]
  },
  "image/x-pict": {
    source: "apache",
    extensions: ["pic", "pct"]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: ["pnm"]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: ["pbm"]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: ["pgm"]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: ["ppm"]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: ["rgb"]
  },
  "image/x-tga": {
    source: "apache",
    extensions: ["tga"]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: ["xbm"]
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: ["xpm"]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: ["xwd"]
  }
};

// node_modules/@uploadthing/mime-types/dist/text-rT5siJci.js
var text = {
  "text/cache-manifest": {
    source: "iana",
    extensions: ["appcache", "manifest"]
  },
  "text/calendar": {
    source: "iana",
    extensions: ["ics", "ifb"]
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    extensions: ["css"]
  },
  "text/csv": {
    source: "iana",
    extensions: ["csv"]
  },
  "text/html": {
    source: "iana",
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/markdown": {
    source: "iana",
    extensions: ["markdown", "md"]
  },
  "text/mathml": {
    source: "nginx",
    extensions: ["mml"]
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    extensions: ["n3"]
  },
  "text/plain": {
    source: "iana",
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: ["dsc"]
  },
  "text/richtext": {
    source: "iana",
    extensions: ["rtx"]
  },
  "text/rtf": {
    source: "iana",
    extensions: ["rtf"]
  },
  "text/sgml": {
    source: "iana",
    extensions: ["sgml", "sgm"]
  },
  "text/shex": {
    source: "iana",
    extensions: ["shex"]
  },
  "text/spdx": {
    source: "iana",
    extensions: ["spdx"]
  },
  "text/tab-separated-values": {
    source: "iana",
    extensions: ["tsv"]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: ["ttl"]
  },
  "text/uri-list": {
    source: "iana",
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    extensions: ["vcard"]
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: ["curl"]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: ["dcurl"]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: ["mcurl"]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: ["scurl"]
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: ["sub"]
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: ["ged"]
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: ["fly"]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: ["flx"]
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: ["gv"]
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: ["3dml"]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: ["spot"]
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: ["jad"]
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: ["wml"]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: ["wmls"]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    extensions: ["vtt"]
  },
  "text/x-asm": {
    source: "apache",
    extensions: ["s", "asm"]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: ["htc"]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: ["java"]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: ["nfo"]
  },
  "text/x-opml": {
    source: "apache",
    extensions: ["opml"]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: ["p", "pas"]
  },
  "text/x-setext": {
    source: "apache",
    extensions: ["etx"]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: ["sfv"]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: ["uu"]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: ["vcs"]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: ["vcf"]
  },
  "text/xml": {
    source: "iana",
    extensions: ["xml"]
  }
};

// node_modules/@uploadthing/mime-types/dist/video-CGl9M1pn.js
var video = {
  "video/3gpp": {
    source: "iana",
    extensions: ["3gp", "3gpp"]
  },
  "video/3gpp2": {
    source: "iana",
    extensions: ["3g2"]
  },
  "video/h261": {
    source: "iana",
    extensions: ["h261"]
  },
  "video/h263": {
    source: "iana",
    extensions: ["h263"]
  },
  "video/h264": {
    source: "iana",
    extensions: ["h264"]
  },
  "video/iso.segment": {
    source: "iana",
    extensions: ["m4s"]
  },
  "video/jpeg": {
    source: "iana",
    extensions: ["jpgv"]
  },
  "video/jpm": {
    source: "apache",
    extensions: ["jpm", "jpgm"]
  },
  "video/mj2": {
    source: "iana",
    extensions: ["mj2", "mjp2"]
  },
  "video/mp2t": {
    source: "iana",
    extensions: ["ts"]
  },
  "video/mp4": {
    source: "iana",
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mpeg": {
    source: "iana",
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/ogg": {
    source: "iana",
    extensions: ["ogv"]
  },
  "video/quicktime": {
    source: "iana",
    extensions: ["qt", "mov"]
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: ["uvh", "uvvh"]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: ["uvm", "uvvm"]
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: ["uvp", "uvvp"]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: ["uvs", "uvvs"]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: ["uvv", "uvvv"]
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: ["dvb"]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: ["fvt"]
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: ["mxu", "m4u"]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: ["pyv"]
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: ["uvu", "uvvu"]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: ["viv"]
  },
  "video/webm": {
    source: "apache",
    extensions: ["webm"]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: ["f4v"]
  },
  "video/x-fli": {
    source: "apache",
    extensions: ["fli"]
  },
  "video/x-flv": {
    source: "apache",
    extensions: ["flv"]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: ["m4v"]
  },
  "video/x-matroska": {
    source: "apache",
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: ["mng"]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: ["asf", "asx"]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: ["vob"]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: ["wm"]
  },
  "video/x-ms-wmv": {
    source: "apache",
    extensions: ["wmv"]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: ["wmx"]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: ["wvx"]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: ["avi"]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: ["movie"]
  },
  "video/x-smv": {
    source: "apache",
    extensions: ["smv"]
  }
};

// node_modules/@uploadthing/shared/dist/index.js
var InvalidRouteConfigError = class extends TaggedError("InvalidRouteConfig") {
  constructor(type, field) {
    const reason = field ? `Expected route config to have a ${field} for key ${type} but none was found.` : `Encountered an invalid route config during backfilling. ${type} was not found.`;
    super({ reason });
  }
};
var UnknownFileTypeError = class extends TaggedError("UnknownFileType") {
  constructor(fileName) {
    const reason = `Could not determine type for ${fileName}`;
    super({ reason });
  }
};
var InvalidFileTypeError = class extends TaggedError("InvalidFileType") {
  constructor(fileType, fileName) {
    const reason = `File type ${fileType} not allowed for ${fileName}`;
    super({ reason });
  }
};
var InvalidFileSizeError = class extends TaggedError("InvalidFileSize") {
  constructor(fileSize) {
    const reason = `Invalid file size: ${fileSize}`;
    super({ reason });
  }
};
var InvalidURLError = class extends TaggedError("InvalidURL") {
  constructor(attemptedUrl) {
    super({ reason: `Failed to parse '${attemptedUrl}' as a URL.` });
  }
};
var RetryError = class extends TaggedError("RetryError") {
};
var FetchError = class extends TaggedError("FetchError") {
};
var InvalidJsonError = class extends TaggedError("InvalidJson") {
};
var BadRequestError = class extends TaggedError("BadRequestError") {
  getMessage() {
    if (isRecord(this.json)) {
      if (typeof this.json.message === "string") return this.json.message;
    }
    return this.message;
  }
};
var UploadPausedError = class extends TaggedError("UploadAborted") {
};
var UploadAbortedError = class extends TaggedError("UploadAborted") {
};
async function safeParseJSON(input) {
  const text$1 = await input.text();
  try {
    return JSON.parse(text$1);
  } catch (err) {
    console.error(`Error parsing JSON, got '${text$1}'`, err);
    return /* @__PURE__ */ new Error(`Error parsing JSON, got '${text$1}'`);
  }
}
function objectKeys(obj) {
  return Object.keys(obj);
}
function semverLite(required, toCheck) {
  const semverRegex = /(\d+)\.?(\d+)?\.?(\d+)?/;
  const requiredMatch = semverRegex.exec(required);
  if (!requiredMatch?.[0]) throw new Error(`Invalid semver requirement: ${required}`);
  const toCheckMatch = semverRegex.exec(toCheck);
  if (!toCheckMatch?.[0]) throw new Error(`Invalid semver to check: ${toCheck}`);
  const [_1, rMajor, rMinor, rPatch] = requiredMatch;
  const [_2, cMajor, cMinor, cPatch] = toCheckMatch;
  if (required.startsWith("^")) {
    if (rMajor !== cMajor) return false;
    if (rMinor && cMinor && rMinor > cMinor) return false;
    return true;
  }
  if (required.startsWith("~")) {
    if (rMajor !== cMajor) return false;
    if (rMinor !== cMinor) return false;
    return true;
  }
  return rMajor === cMajor && rMinor === cMinor && rPatch === cPatch;
}
function warnIfInvalidPeerDependency(pkg, required, toCheck) {
  if (!semverLite(required, toCheck)) console.warn(`!!!WARNING::: ${pkg} requires "uploadthing@${required}", but version "${toCheck}" is installed`);
}
var getFullApiUrl = (maybeUrl) => gen(function* () {
  const base = (() => {
    if (typeof window !== "undefined") return window.location.origin;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  const url = yield* try_({
    try: () => new URL(maybeUrl ?? "/api/uploadthing", base),
    catch: () => new InvalidURLError(maybeUrl ?? "/api/uploadthing")
  });
  if (url.pathname === "/") url.pathname = "/api/uploadthing";
  return url;
});
var resolveMaybeUrlArg = (maybeUrl) => {
  return maybeUrl instanceof URL ? maybeUrl : runSync(getFullApiUrl(maybeUrl));
};
function noop() {
}
function createIdentityProxy() {
  return new Proxy(noop, { get: (_, prop) => prop });
}
function unwrap(x, ...args2) {
  return typeof x === "function" ? x(...args2) : x;
}
var ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  INTERNAL_CLIENT_ERROR: 500,
  TOO_LARGE: 413,
  TOO_SMALL: 400,
  TOO_MANY_FILES: 400,
  KEY_TOO_LONG: 400,
  URL_GENERATION_FAILED: 500,
  UPLOAD_FAILED: 500,
  MISSING_ENV: 500,
  INVALID_SERVER_CONFIG: 500,
  FILE_LIMIT_EXCEEDED: 500
};
function messageFromUnknown(cause, fallback) {
  if (typeof cause === "string") return cause;
  if (cause instanceof Error) return cause.message;
  if (cause && typeof cause === "object" && "message" in cause && typeof cause.message === "string") return cause.message;
  return fallback ?? "An unknown error occurred";
}
var UploadThingError = class UploadThingError2 extends Error2 {
  _tag = "UploadThingError";
  name = "UploadThingError";
  cause;
  code;
  data;
  constructor(initOpts) {
    const opts = typeof initOpts === "string" ? {
      code: "INTERNAL_SERVER_ERROR",
      message: initOpts
    } : initOpts;
    const message = opts.message ?? messageFromUnknown(opts.cause, opts.code);
    super({ message });
    this.code = opts.code;
    this.data = opts.data;
    if (opts.cause instanceof Error) this.cause = opts.cause;
    else if (isRecord(opts.cause) && isNumber(opts.cause.status) && isString(opts.cause.statusText)) this.cause = /* @__PURE__ */ new Error(`Response ${opts.cause.status} ${opts.cause.statusText}`);
    else if (isString(opts.cause)) this.cause = new Error(opts.cause);
    else this.cause = opts.cause;
  }
  static toObject(error) {
    return {
      code: error.code,
      message: error.message,
      data: error.data
    };
  }
  static serialize(error) {
    return JSON.stringify(UploadThingError2.toObject(error));
  }
};
function getErrorTypeFromStatusCode(statusCode) {
  for (const [code, status] of Object.entries(ERROR_CODES)) if (status === statusCode) return code;
  return "INTERNAL_SERVER_ERROR";
}
var INTERNAL_DO_NOT_USE__fatalClientError = (e) => new UploadThingError({
  code: "INTERNAL_CLIENT_ERROR",
  message: "Something went wrong. Please report this to UploadThing.",
  cause: e
});
var FetchContext = class extends Tag2("uploadthing/Fetch")() {
};
var fetchEff = (input, init) => flatMap(service(FetchContext), (fetch) => {
  const headers = new Headers(init?.headers ?? []);
  const reqInfo = {
    url: input.toString(),
    method: init?.method,
    body: init?.body,
    headers: Object.fromEntries(headers)
  };
  return tryPromise({
    try: (signal) => fetch(input, {
      ...init,
      headers,
      signal
    }),
    catch: (error) => new FetchError({
      error: error instanceof Error ? {
        ...error,
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      input: reqInfo
    })
  }).pipe(tapError((e) => sync(() => console.error(e.input))), map((res) => Object.assign(res, { requestUrl: reqInfo.url })), withTrace("fetch"));
});
var parseResponseJson = (res) => tryPromise({
  try: async () => {
    const json = await res.json();
    return {
      json,
      ok: res.ok,
      status: res.status
    };
  },
  catch: (error) => new InvalidJsonError({
    error,
    input: res.requestUrl
  })
}).pipe(filterOrFail(({ ok }) => ok, ({ json, status }) => new BadRequestError({
  status,
  message: `Request to ${res.requestUrl} failed with status ${status}`,
  json
})), map(({ json }) => json), withTrace("parseJson"));
var roundProgress = (progress, granularity) => {
  if (granularity === "all") return progress;
  if (granularity === "fine") return Math.round(progress);
  return Math.floor(progress / 10) * 10;
};
var generateMimeTypes = (typesOrRouteConfig) => {
  const fileTypes = Array.isArray(typesOrRouteConfig) ? typesOrRouteConfig : objectKeys(typesOrRouteConfig);
  if (fileTypes.includes("blob")) return [];
  return fileTypes.map((type) => {
    if (type === "pdf") return "application/pdf";
    if (type.includes("/")) return type;
    if (type === "audio") return ["audio/*", ...objectKeys(audio)].join(", ");
    if (type === "image") return ["image/*", ...objectKeys(image)].join(", ");
    if (type === "text") return ["text/*", ...objectKeys(text)].join(", ");
    if (type === "video") return ["video/*", ...objectKeys(video)].join(", ");
    return `${type}/*`;
  });
};
var generateClientDropzoneAccept = (fileTypes) => {
  const mimeTypes = generateMimeTypes(fileTypes);
  return Object.fromEntries(mimeTypes.map((type) => [type, []]));
};
function getFilesFromClipboardEvent(event) {
  const dataTransferItems = event.clipboardData?.items;
  if (!dataTransferItems) return;
  const files = Array.from(dataTransferItems).reduce((acc, curr) => {
    const f = curr.getAsFile();
    return f ? [...acc, f] : acc;
  }, []);
  return files;
}
var generatePermittedFileTypes = (config) => {
  const fileTypes = config ? objectKeys(config) : [];
  const maxFileCount = config ? Object.values(config).map((v) => v.maxFileCount) : [];
  return {
    fileTypes,
    multiple: maxFileCount.some((v) => v && v > 1)
  };
};
var capitalizeStart = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var INTERNAL_doFormatting = (config) => {
  if (!config) return "";
  const allowedTypes = objectKeys(config);
  const formattedTypes = allowedTypes.map((f) => f === "blob" ? "file" : f);
  if (formattedTypes.length > 1) {
    const lastType = formattedTypes.pop();
    return `${formattedTypes.join("s, ")} and ${lastType}s`;
  }
  const key = allowedTypes[0];
  const formattedKey = formattedTypes[0];
  if (!key || !formattedKey) return "";
  const { maxFileSize, maxFileCount, minFileCount } = config[key];
  if (maxFileCount && maxFileCount > 1) if (minFileCount > 1) return `${minFileCount} - ${maxFileCount} ${formattedKey}s up to ${maxFileSize}`;
  else return `${formattedKey}s up to ${maxFileSize}, max ${maxFileCount}`;
  else return `${formattedKey} (${maxFileSize})`;
};
var allowedContentTextLabelGenerator = (config) => {
  return capitalizeStart(INTERNAL_doFormatting(config));
};
var styleFieldToClassName = (styleField, args2) => {
  if (typeof styleField === "string") return styleField;
  if (typeof styleField === "function") {
    const result = styleField(args2);
    if (typeof result === "string") return result;
  }
  return "";
};
var styleFieldToCssObject = (styleField, args2) => {
  if (typeof styleField === "object") return styleField;
  if (typeof styleField === "function") {
    const result = styleField(args2);
    if (typeof result === "object") return result;
  }
  return {};
};
var contentFieldToContent = (contentField, arg) => {
  if (!contentField) return null;
  if (typeof contentField !== "function") return contentField;
  if (typeof contentField === "function") {
    const result = contentField(arg);
    return result;
  }
};
var defaultClassListMerger = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
var encoder = new TextEncoder();
function accepts(file, acceptedFiles) {
  if (acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
    const fileName = file.name;
    const mimeType = file.type.toLowerCase();
    const baseMimeType = mimeType.replace(/\/.*$/, "");
    return acceptedFilesArray.some((type) => {
      const validType = type.trim().toLowerCase();
      if (validType.startsWith(".")) return fileName.toLowerCase().endsWith(validType);
      else if (validType.endsWith("/*")) return baseMimeType === validType.replace(/\/.*$/, "");
      return mimeType === validType;
    });
  }
  return true;
}
function isFileAccepted(file, accept) {
  return file.type === "application/x-moz-file" || accepts(file, accept);
}
function isEnterOrSpace(event) {
  return "key" in event && (event.key === " " || event.key === "Enter") || "keyCode" in event && (event.keyCode === 32 || event.keyCode === 13);
}
var isDefined = (v) => v != null;
function isValidSize(file, minSize, maxSize) {
  if (!isDefined(file.size)) return true;
  if (isDefined(minSize) && isDefined(maxSize)) return file.size >= minSize && file.size <= maxSize;
  if (isDefined(minSize) && file.size < minSize) return false;
  if (isDefined(maxSize) && file.size > maxSize) return false;
  return true;
}
function isValidQuantity(files, multiple, maxFiles) {
  if (!multiple && files.length > 1) return false;
  if (multiple && maxFiles >= 1 && files.length > maxFiles) return false;
  return true;
}
function allFilesAccepted({ files, accept, minSize, maxSize, multiple, maxFiles }) {
  if (!isValidQuantity(files, multiple, maxFiles)) return false;
  return files.every((file) => isFileAccepted(file, accept) && isValidSize(file, minSize, maxSize));
}
function isEventWithFiles(event) {
  if (!("dataTransfer" in event && event.dataTransfer !== null)) return !!event.target && "files" in event.target && !!event.target.files;
  return Array.prototype.some.call(event.dataTransfer?.types, (type) => type === "Files" || type === "application/x-moz-file");
}
function isIeOrEdge(ua = window.navigator.userAgent) {
  return ua.includes("MSIE ") || ua.includes("Trident/") || ua.includes("Edge/");
}
function isMIMEType(v) {
  return v === "audio/*" || v === "video/*" || v === "image/*" || v === "text/*" || /\w+\/[-+.\w]+/g.test(v);
}
function isExt(v) {
  return /^.*\.[\w]+$/.test(v);
}
function acceptPropAsAcceptAttr(accept) {
  if (isDefined(accept)) return Object.entries(accept).reduce((a, [mimeType, ext]) => [
    ...a,
    mimeType,
    ...ext
  ], []).filter((v) => isMIMEType(v) || isExt(v)).join(",");
  return void 0;
}
var initialState = {
  isFocused: false,
  isFileDialogActive: false,
  isDragActive: false,
  isDragAccept: false,
  isDragReject: false,
  acceptedFiles: []
};
function reducer(state, action) {
  switch (action.type) {
    case "focus":
      return {
        ...state,
        isFocused: true
      };
    case "blur":
      return {
        ...state,
        isFocused: false
      };
    case "openDialog":
      return {
        ...initialState,
        isFileDialogActive: true
      };
    case "closeDialog":
      return {
        ...state,
        isFileDialogActive: false
      };
    case "setDraggedFiles":
      return {
        ...state,
        ...action.payload
      };
    case "setFiles":
      return {
        ...state,
        ...action.payload
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

// node_modules/uploadthing/dist/package-DpScpvTA.js
var version = "7.7.4";

// node_modules/uploadthing/dist/ut-reporter-Dlppchbx.js
var createDeferred = () => {
  let resolve;
  let reject;
  const ac = new AbortController();
  const promise2 = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise: promise2,
    ac,
    resolve,
    reject
  };
};
var randomHexString = /* @__PURE__ */ (function() {
  const characters = "abcdef0123456789";
  const charactersLength = 16;
  return function(length) {
    let result = "";
    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  };
})();
var generateTraceHeaders = () => {
  const traceId = randomHexString(32);
  const spanId = randomHexString(16);
  const sampled = "01";
  return {
    b3: `${traceId}-${spanId}-${sampled}`,
    traceparent: `00-${traceId}-${spanId}-${sampled}`
  };
};
var createAPIRequestUrl = (config) => {
  const url = new URL(config.url);
  const queryParams = new URLSearchParams(url.search);
  queryParams.set("actionType", config.actionType);
  queryParams.set("slug", config.slug);
  url.search = queryParams.toString();
  return url;
};
var createUTReporter = (cfg) => (type, payload) => gen(function* () {
  const url = createAPIRequestUrl({
    url: cfg.url,
    slug: cfg.endpoint,
    actionType: type
  });
  const headers = new Headers(yield* promise(async () => typeof cfg.headers === "function" ? await cfg.headers() : cfg.headers));
  if (cfg.package) headers.set("x-uploadthing-package", cfg.package);
  headers.set("x-uploadthing-version", version);
  headers.set("Content-Type", "application/json");
  headers.set("b3", cfg.traceHeaders.b3);
  headers.set("traceparent", cfg.traceHeaders.traceparent);
  const response = yield* fetchEff(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers
  }).pipe(
    andThen(parseResponseJson),
    /**
    * We don't _need_ to validate the response here, just cast it for now.
    * As of now, @effect/schema includes quite a few bytes we cut out by this...
    * We have "strong typing" on the backend that ensures the shape should match.
    */
    map(unsafeCoerce),
    catchTag("FetchError", (e) => fail(new UploadThingError({
      code: "INTERNAL_CLIENT_ERROR",
      message: `Failed to report event "${type}" to UploadThing server`,
      cause: e
    }))),
    catchTag("BadRequestError", (e) => fail(new UploadThingError({
      code: getErrorTypeFromStatusCode(e.status),
      message: e.getMessage(),
      cause: e.json
    }))),
    catchTag("InvalidJson", (e) => fail(new UploadThingError({
      code: "INTERNAL_CLIENT_ERROR",
      message: "Failed to parse response from UploadThing server",
      cause: e
    })))
  );
  return response;
});

// node_modules/uploadthing/dist/deprecations-pLmw6Ytd.js
var logDeprecationWarning = (message) => {
  console.warn(`\u26A0\uFE0F [uploadthing][deprecated] ${message}`);
};

// node_modules/uploadthing/client/index.js
var uploadWithProgress = (file, rangeStart, presigned, opts) => async((resume) => {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", presigned.url, true);
  xhr.setRequestHeader("Range", `bytes=${rangeStart}-`);
  xhr.setRequestHeader("x-uploadthing-version", version);
  xhr.setRequestHeader("b3", opts.traceHeaders.b3);
  xhr.setRequestHeader("traceparent", opts.traceHeaders.traceparent);
  xhr.responseType = "json";
  let previousLoaded = 0;
  xhr.upload.addEventListener("progress", ({ loaded }) => {
    const delta = loaded - previousLoaded;
    opts.onUploadProgress?.({
      loaded,
      delta
    });
    previousLoaded = loaded;
  });
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300 && isRecord(xhr.response)) if (hasProperty(xhr.response, "error")) resume(new UploadThingError({
      code: "UPLOAD_FAILED",
      message: String(xhr.response.error),
      data: xhr.response
    }));
    else resume(succeed(xhr.response));
    else resume(new UploadThingError({
      code: "UPLOAD_FAILED",
      message: `XHR failed ${xhr.status} ${xhr.statusText}`,
      data: xhr.response
    }));
  });
  xhr.addEventListener("error", () => {
    resume(new UploadThingError({ code: "UPLOAD_FAILED" }));
  });
  const formData = new FormData();
  if ("uri" in file) formData.append("file", {
    uri: file.uri,
    type: file.type,
    name: file.name,
    ...rangeStart > 0 && { range: rangeStart }
  });
  else formData.append("file", rangeStart > 0 ? file.slice(rangeStart) : file);
  xhr.send(formData);
  return sync(() => xhr.abort());
});
var uploadFile = (file, presigned, opts) => fetchEff(presigned.url, {
  method: "HEAD",
  headers: opts.traceHeaders
}).pipe(map(({ headers }) => parseInt(headers.get("x-ut-range-start") ?? "0", 10)), tap((start) => opts.onUploadProgress?.({
  delta: start,
  loaded: start
})), flatMap((start) => uploadWithProgress(file, start, presigned, {
  traceHeaders: opts.traceHeaders,
  onUploadProgress: (progressEvent) => opts.onUploadProgress?.({
    delta: progressEvent.delta,
    loaded: progressEvent.loaded + start
  })
})), map(unsafeCoerce), map((uploadResponse) => ({
  name: file.name,
  size: file.size,
  key: presigned.key,
  lastModified: file.lastModified,
  serverData: uploadResponse.serverData,
  get url() {
    logDeprecationWarning("`file.url` is deprecated and will be removed in uploadthing v9. Use `file.ufsUrl` instead.");
    return uploadResponse.url;
  },
  get appUrl() {
    logDeprecationWarning("`file.appUrl` is deprecated and will be removed in uploadthing v9. Use `file.ufsUrl` instead.");
    return uploadResponse.appUrl;
  },
  ufsUrl: uploadResponse.ufsUrl,
  customId: presigned.customId,
  type: file.type,
  fileHash: uploadResponse.fileHash
})));
var uploadFilesInternal = (endpoint, opts) => {
  const traceHeaders = generateTraceHeaders();
  const reportEventToUT = createUTReporter({
    endpoint: String(endpoint),
    package: opts.package,
    url: opts.url,
    headers: opts.headers,
    traceHeaders
  });
  const totalSize = opts.files.reduce((acc, f) => acc + f.size, 0);
  let totalLoaded = 0;
  return flatMap(reportEventToUT("upload", {
    input: "input" in opts ? opts.input : null,
    files: opts.files.map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      lastModified: f.lastModified
    }))
  }), (presigneds) => forEach(presigneds, (presigned, i) => flatMap(sync(() => opts.onUploadBegin?.({ file: opts.files[i].name })), () => uploadFile(opts.files[i], presigned, {
    traceHeaders,
    onUploadProgress: (ev) => {
      totalLoaded += ev.delta;
      opts.onUploadProgress?.({
        file: opts.files[i],
        progress: ev.loaded / opts.files[i].size * 100,
        loaded: ev.loaded,
        delta: ev.delta,
        totalLoaded,
        totalProgress: totalLoaded / totalSize
      });
    }
  })), { concurrency: 6 }));
};
var version$1 = version;
var genUploader = (initOpts) => {
  const routeRegistry = createIdentityProxy();
  const controllableUpload = async (slug, opts) => {
    const uploads = /* @__PURE__ */ new Map();
    const endpoint = typeof slug === "function" ? slug(routeRegistry) : slug;
    const traceHeaders = generateTraceHeaders();
    const utReporter = createUTReporter({
      endpoint: String(endpoint),
      package: initOpts?.package ?? "uploadthing/client",
      url: resolveMaybeUrlArg(initOpts?.url),
      headers: opts.headers,
      traceHeaders
    });
    const fetchFn = initOpts?.fetch ?? window.fetch;
    const presigneds = await runPromise(utReporter("upload", {
      input: "input" in opts ? opts.input : null,
      files: opts.files.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
        lastModified: f.lastModified
      }))
    }).pipe(provideService(FetchContext, fetchFn)));
    const totalSize = opts.files.reduce((acc, f) => acc + f.size, 0);
    let totalLoaded = 0;
    const uploadEffect = (file, presigned) => uploadFile(file, presigned, {
      traceHeaders,
      onUploadProgress: (progressEvent) => {
        totalLoaded += progressEvent.delta;
        opts.onUploadProgress?.({
          ...progressEvent,
          file,
          progress: Math.round(progressEvent.loaded / file.size * 100),
          totalLoaded,
          totalProgress: Math.round(totalLoaded / totalSize * 100)
        });
      }
    }).pipe(provideService(FetchContext, fetchFn));
    for (const [i, p] of presigneds.entries()) {
      const file = opts.files[i];
      if (!file) continue;
      const deferred = createDeferred();
      uploads.set(file, {
        deferred,
        presigned: p
      });
      runPromiseExit(uploadEffect(file, p), { signal: deferred.ac.signal }).then((result) => {
        if (result._tag === "Success") return deferred.resolve(result.value);
        else if (result.cause._tag === "Interrupt") throw new UploadPausedError();
        throw causeSquash(result.cause);
      }).catch((err) => {
        if (err instanceof UploadPausedError) return;
        deferred.reject(err);
      });
    }
    const pauseUpload = (file) => {
      const files = ensure(file ?? opts.files);
      for (const file$1 of files) {
        const upload = uploads.get(file$1);
        if (!upload) return;
        if (upload.deferred.ac.signal.aborted) throw new UploadAbortedError();
        upload.deferred.ac.abort();
      }
    };
    const resumeUpload = (file) => {
      const files = ensure(file ?? opts.files);
      for (const file$1 of files) {
        const upload = uploads.get(file$1);
        if (!upload) throw "No upload found";
        upload.deferred.ac = new AbortController();
        runPromiseExit(uploadEffect(file$1, upload.presigned), { signal: upload.deferred.ac.signal }).then((result) => {
          if (result._tag === "Success") return upload.deferred.resolve(result.value);
          else if (result.cause._tag === "Interrupt") throw new UploadPausedError();
          throw causeSquash(result.cause);
        }).catch((err) => {
          if (err instanceof UploadPausedError) return;
          upload.deferred.reject(err);
        });
      }
    };
    const done = async (file) => {
      const promises = [];
      const files = ensure(file ?? opts.files);
      for (const file$1 of files) {
        const upload = uploads.get(file$1);
        if (!upload) throw "No upload found";
        promises.push(upload.deferred.promise);
      }
      const results = await Promise.all(promises);
      return file ? results[0] : results;
    };
    return {
      pauseUpload,
      resumeUpload,
      done
    };
  };
  const typedUploadFiles = (slug, opts) => {
    const endpoint = typeof slug === "function" ? slug(routeRegistry) : slug;
    const fetchFn = initOpts?.fetch ?? window.fetch;
    return uploadFilesInternal(endpoint, {
      ...opts,
      skipPolling: {},
      url: resolveMaybeUrlArg(initOpts?.url),
      package: initOpts?.package ?? "uploadthing/client",
      input: opts.input
    }).pipe(provideService(FetchContext, fetchFn), (effect) => runPromiseExit(effect, opts.signal && { signal: opts.signal })).then((exit2) => {
      if (exit2._tag === "Success") return exit2.value;
      else if (exit2.cause._tag === "Interrupt") throw new UploadAbortedError();
      throw causeSquash(exit2.cause);
    });
  };
  return {
    uploadFiles: typedUploadFiles,
    createUpload: controllableUpload,
    routeRegistry
  };
};

// node_modules/@uploadthing/react/dist/use-uploadthing-pxkJ3LFs.js
var import_react = __toESM(require_react(), 1);
var peerDependencies = {
  "next": "*",
  "react": "^17.0.2 || ^18.0.0 || ^19.0.0",
  "uploadthing": "^7.2.0"
};
var noop$1 = () => void 0;
var useInsertionEffect = typeof window !== "undefined" ? import_react.default.useInsertionEffect : noop$1;
function useEvent(callback) {
  const latestRef = import_react.default.useRef(useEvent_shouldNotBeInvokedBeforeMount);
  useInsertionEffect(() => {
    latestRef.current = callback;
  }, [callback]);
  const stableRef = import_react.default.useRef(null);
  stableRef.current ??= function() {
    return latestRef.current.apply(this, arguments);
  };
  return stableRef.current;
}
function useEvent_shouldNotBeInvokedBeforeMount() {
  throw new Error("INVALID_USEEVENT_INVOCATION: the callback from useEvent cannot be invoked before the component has mounted.");
}
function useFetch(fetch, url, options) {
  const cache = (0, import_react.useRef)({});
  const cancelRequest = (0, import_react.useRef)(false);
  const initialState$1 = {
    error: void 0,
    data: void 0
  };
  const fetchReducer = (state$1, action) => {
    switch (action.type) {
      case "loading":
        return { ...initialState$1 };
      case "fetched":
        return {
          ...initialState$1,
          data: action.payload
        };
      case "error":
        return {
          ...initialState$1,
          error: action.payload
        };
      default:
        return state$1;
    }
  };
  const [state, dispatch] = (0, import_react.useReducer)(fetchReducer, initialState$1);
  (0, import_react.useEffect)(() => {
    if (!url) return;
    cancelRequest.current = false;
    const fetchData = async () => {
      dispatch({ type: "loading" });
      if (cache.current[url]) {
        dispatch({
          type: "fetched",
          payload: cache.current[url]
        });
        return;
      }
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const dataOrError = await safeParseJSON(response);
        if (dataOrError instanceof Error) throw dataOrError;
        cache.current[url] = dataOrError;
        if (cancelRequest.current) return;
        dispatch({
          type: "fetched",
          payload: dataOrError
        });
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({
          type: "error",
          payload: error
        });
      }
    };
    fetchData();
    return () => {
      cancelRequest.current = true;
    };
  }, [url]);
  return state;
}
var useFetch_default = useFetch;
var useRouteConfig = (fetch, url, endpoint) => {
  const maybeServerData = globalThis.__UPLOADTHING;
  const { data } = useFetch_default(fetch, maybeServerData ? void 0 : url.href);
  return (maybeServerData ?? data)?.find((x) => x.slug === endpoint)?.config;
};
function useUploadThingInternal(url, endpoint, fetch, opts) {
  const progressGranularity = opts?.uploadProgressGranularity ?? "coarse";
  const { uploadFiles, routeRegistry } = genUploader({
    fetch,
    url,
    package: "@uploadthing/react"
  });
  const [isUploading, setUploading] = (0, import_react.useState)(false);
  const uploadProgress = (0, import_react.useRef)(0);
  const fileProgress = (0, import_react.useRef)(/* @__PURE__ */ new Map());
  const startUpload = useEvent(async (...args2) => {
    const files = await opts?.onBeforeUploadBegin?.(args2[0]) ?? args2[0];
    const input = args2[1];
    setUploading(true);
    files.forEach((f) => fileProgress.current.set(f, 0));
    opts?.onUploadProgress?.(0);
    try {
      const res = await uploadFiles(endpoint, {
        signal: opts?.signal,
        headers: opts?.headers,
        files,
        onUploadProgress: (progress) => {
          if (!opts?.onUploadProgress) return;
          fileProgress.current.set(progress.file, progress.progress);
          let sum = 0;
          fileProgress.current.forEach((p) => {
            sum += p;
          });
          const averageProgress = roundProgress(Math.min(100, sum / fileProgress.current.size), progressGranularity);
          if (averageProgress !== uploadProgress.current) {
            opts.onUploadProgress(averageProgress);
            uploadProgress.current = averageProgress;
          }
        },
        onUploadBegin({ file }) {
          if (!opts?.onUploadBegin) return;
          opts.onUploadBegin(file);
        },
        input
      });
      await opts?.onClientUploadComplete?.(res);
      return res;
    } catch (e) {
      if (e instanceof UploadAbortedError) throw e;
      let error;
      if (e instanceof UploadThingError) error = e;
      else {
        error = INTERNAL_DO_NOT_USE__fatalClientError(e);
        console.error("Something went wrong. Please contact UploadThing and provide the following cause:", error.cause instanceof Error ? error.cause.toString() : error.cause);
      }
      await opts?.onUploadError?.(error);
    } finally {
      setUploading(false);
      fileProgress.current = /* @__PURE__ */ new Map();
      uploadProgress.current = 0;
    }
  });
  const _endpoint = unwrap(endpoint, routeRegistry);
  const routeConfig = useRouteConfig(fetch, url, _endpoint);
  return {
    startUpload,
    isUploading,
    routeConfig
  };
}
var __useUploadThingInternal = useUploadThingInternal;
var generateReactHelpers = (initOpts) => {
  warnIfInvalidPeerDependency("@uploadthing/react", peerDependencies.uploadthing, version$1);
  const fetch = initOpts?.fetch ?? globalThis.fetch;
  const url = resolveMaybeUrlArg(initOpts?.url);
  const clientHelpers = genUploader({
    fetch,
    url,
    package: "@uploadthing/react"
  });
  function useUploadThing(endpoint, opts) {
    return __useUploadThingInternal(url, endpoint, fetch, opts);
  }
  function getRouteConfig(slug) {
    const maybeServerData = globalThis.__UPLOADTHING;
    const endpoint = unwrap(slug, clientHelpers.routeRegistry);
    const config = maybeServerData?.find((x) => x.slug === endpoint)?.config;
    if (!config) throw new Error(`No config found for endpoint "${endpoint.toString()}". Please make sure to use the NextSSRPlugin in your Next.js app.`);
    return config;
  }
  return {
    useUploadThing,
    ...clientHelpers,
    getRouteConfig
  };
};

// node_modules/@uploadthing/react/dist/index.js
var import_react2 = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);

// node_modules/tslib/tslib.es6.mjs
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/file-selector/dist/es5/file.js
var COMMON_MIME_TYPES = /* @__PURE__ */ new Map([
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  ["aac", "audio/aac"],
  ["abw", "application/x-abiword"],
  ["arc", "application/x-freearc"],
  ["avif", "image/avif"],
  ["avi", "video/x-msvideo"],
  ["azw", "application/vnd.amazon.ebook"],
  ["bin", "application/octet-stream"],
  ["bmp", "image/bmp"],
  ["bz", "application/x-bzip"],
  ["bz2", "application/x-bzip2"],
  ["cda", "application/x-cdf"],
  ["csh", "application/x-csh"],
  ["css", "text/css"],
  ["csv", "text/csv"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["eot", "application/vnd.ms-fontobject"],
  ["epub", "application/epub+zip"],
  ["gz", "application/gzip"],
  ["gif", "image/gif"],
  ["heic", "image/heic"],
  ["heif", "image/heif"],
  ["htm", "text/html"],
  ["html", "text/html"],
  ["ico", "image/vnd.microsoft.icon"],
  ["ics", "text/calendar"],
  ["jar", "application/java-archive"],
  ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"],
  ["js", "text/javascript"],
  ["json", "application/json"],
  ["jsonld", "application/ld+json"],
  ["mid", "audio/midi"],
  ["midi", "audio/midi"],
  ["mjs", "text/javascript"],
  ["mp3", "audio/mpeg"],
  ["mp4", "video/mp4"],
  ["mpeg", "video/mpeg"],
  ["mpkg", "application/vnd.apple.installer+xml"],
  ["odp", "application/vnd.oasis.opendocument.presentation"],
  ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
  ["odt", "application/vnd.oasis.opendocument.text"],
  ["oga", "audio/ogg"],
  ["ogv", "video/ogg"],
  ["ogx", "application/ogg"],
  ["opus", "audio/opus"],
  ["otf", "font/otf"],
  ["png", "image/png"],
  ["pdf", "application/pdf"],
  ["php", "application/x-httpd-php"],
  ["ppt", "application/vnd.ms-powerpoint"],
  ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  ["rar", "application/vnd.rar"],
  ["rtf", "application/rtf"],
  ["sh", "application/x-sh"],
  ["svg", "image/svg+xml"],
  ["swf", "application/x-shockwave-flash"],
  ["tar", "application/x-tar"],
  ["tif", "image/tiff"],
  ["tiff", "image/tiff"],
  ["ts", "video/mp2t"],
  ["ttf", "font/ttf"],
  ["txt", "text/plain"],
  ["vsd", "application/vnd.visio"],
  ["wav", "audio/wav"],
  ["weba", "audio/webm"],
  ["webm", "video/webm"],
  ["webp", "image/webp"],
  ["woff", "font/woff"],
  ["woff2", "font/woff2"],
  ["xhtml", "application/xhtml+xml"],
  ["xls", "application/vnd.ms-excel"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ["xml", "application/xml"],
  ["xul", "application/vnd.mozilla.xul+xml"],
  ["zip", "application/zip"],
  ["7z", "application/x-7z-compressed"],
  // Others
  ["mkv", "video/x-matroska"],
  ["mov", "video/quicktime"],
  ["msg", "application/vnd.ms-outlook"]
]);
function toFileWithPath(file, path) {
  var f = withMimeType(file);
  if (typeof f.path !== "string") {
    var webkitRelativePath = file.webkitRelativePath;
    Object.defineProperty(f, "path", {
      value: typeof path === "string" ? path : typeof webkitRelativePath === "string" && webkitRelativePath.length > 0 ? webkitRelativePath : file.name,
      writable: false,
      configurable: false,
      enumerable: true
    });
  }
  return f;
}
function withMimeType(file) {
  var name = file.name;
  var hasExtension = name && name.lastIndexOf(".") !== -1;
  if (hasExtension && !file.type) {
    var ext = name.split(".").pop().toLowerCase();
    var type = COMMON_MIME_TYPES.get(ext);
    if (type) {
      Object.defineProperty(file, "type", {
        value: type,
        writable: false,
        configurable: false,
        enumerable: true
      });
    }
  }
  return file;
}

// node_modules/file-selector/dist/es5/file-selector.js
var FILES_TO_IGNORE = [
  // Thumbnail cache files for macOS and Windows
  ".DS_Store",
  "Thumbs.db"
  // Windows
];
function fromEvent(evt) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      if (isObject2(evt) && isDataTransfer(evt.dataTransfer)) {
        return [2, getDataTransferFiles(evt.dataTransfer, evt.type)];
      } else if (isChangeEvt(evt)) {
        return [2, getInputFiles(evt)];
      } else if (Array.isArray(evt) && evt.every(function(item) {
        return "getFile" in item && typeof item.getFile === "function";
      })) {
        return [2, getFsHandleFiles(evt)];
      }
      return [2, []];
    });
  });
}
function isDataTransfer(value) {
  return isObject2(value);
}
function isChangeEvt(value) {
  return isObject2(value) && isObject2(value.target);
}
function isObject2(v) {
  return typeof v === "object" && v !== null;
}
function getInputFiles(evt) {
  return fromList(evt.target.files).map(function(file) {
    return toFileWithPath(file);
  });
}
function getFsHandleFiles(handles) {
  return __awaiter(this, void 0, void 0, function() {
    var files;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, Promise.all(handles.map(function(h) {
            return h.getFile();
          }))];
        case 1:
          files = _a.sent();
          return [2, files.map(function(file) {
            return toFileWithPath(file);
          })];
      }
    });
  });
}
function getDataTransferFiles(dt, type) {
  return __awaiter(this, void 0, void 0, function() {
    var items, files;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!dt.items) return [3, 2];
          items = fromList(dt.items).filter(function(item) {
            return item.kind === "file";
          });
          if (type !== "drop") {
            return [2, items];
          }
          return [4, Promise.all(items.map(toFilePromises))];
        case 1:
          files = _a.sent();
          return [2, noIgnoredFiles(flatten(files))];
        case 2:
          return [2, noIgnoredFiles(fromList(dt.files).map(function(file) {
            return toFileWithPath(file);
          }))];
      }
    });
  });
}
function noIgnoredFiles(files) {
  return files.filter(function(file) {
    return FILES_TO_IGNORE.indexOf(file.name) === -1;
  });
}
function fromList(items) {
  if (items === null) {
    return [];
  }
  var files = [];
  for (var i = 0; i < items.length; i++) {
    var file = items[i];
    files.push(file);
  }
  return files;
}
function toFilePromises(item) {
  if (typeof item.webkitGetAsEntry !== "function") {
    return fromDataTransferItem(item);
  }
  var entry = item.webkitGetAsEntry();
  if (entry && entry.isDirectory) {
    return fromDirEntry(entry);
  }
  return fromDataTransferItem(item);
}
function flatten(items) {
  return items.reduce(function(acc, files) {
    return __spreadArray(__spreadArray([], __read(acc), false), __read(Array.isArray(files) ? flatten(files) : [files]), false);
  }, []);
}
function fromDataTransferItem(item) {
  var file = item.getAsFile();
  if (!file) {
    return Promise.reject("".concat(item, " is not a File"));
  }
  var fwp = toFileWithPath(file);
  return Promise.resolve(fwp);
}
function fromEntry(entry) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
    });
  });
}
function fromDirEntry(entry) {
  var reader = entry.createReader();
  return new Promise(function(resolve, reject) {
    var entries = [];
    function readEntries() {
      var _this = this;
      reader.readEntries(function(batch) {
        return __awaiter(_this, void 0, void 0, function() {
          var files, err_1, items;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!!batch.length) return [3, 5];
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, Promise.all(entries)];
              case 2:
                files = _a.sent();
                resolve(files);
                return [3, 4];
              case 3:
                err_1 = _a.sent();
                reject(err_1);
                return [3, 4];
              case 4:
                return [3, 6];
              case 5:
                items = Promise.all(batch.map(fromEntry));
                entries.push(items);
                readEntries();
                _a.label = 6;
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, function(err) {
        reject(err);
      });
    }
    readEntries();
  });
}
function fromFileEntry(entry) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, new Promise(function(resolve, reject) {
        entry.file(function(file) {
          var fwp = toFileWithPath(file, entry.fullPath);
          resolve(fwp);
        }, function(err) {
          reject(err);
        });
      })];
    });
  });
}

// node_modules/@uploadthing/react/dist/index.js
var usePaste = (callback) => {
  const stableCallback = useEvent(callback);
  (0, import_react2.useEffect)(() => {
    const controller = new AbortController();
    window.addEventListener("paste", stableCallback, { signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, [stableCallback]);
};
function Spinner() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
    className: "z-10 block h-5 w-5 animate-spin align-middle text-white",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 576 512",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
      fill: "currentColor",
      d: "M256 32C256 14.33 270.3 0 288 0C429.4 0 544 114.6 544 256C544 302.6 531.5 346.4 509.7 384C500.9 399.3 481.3 404.6 465.1 395.7C450.7 386.9 445.5 367.3 454.3 351.1C470.6 323.8 480 291 480 255.1C480 149.1 394 63.1 288 63.1C270.3 63.1 256 49.67 256 31.1V32z"
    })
  });
}
function Cancel({ className, cn, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: cn("fill-none stroke-current stroke-2", className),
    ...props,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m4.9 4.9 14.2 14.2" })]
  });
}
function UploadButton(props) {
  const $props = props;
  const { mode = "auto", appendOnPaste = false, cn = defaultClassListMerger } = $props.config ?? {};
  const acRef = (0, import_react2.useRef)(new AbortController());
  const fileInputRef = (0, import_react2.useRef)(null);
  const [uploadProgress, setUploadProgress] = (0, import_react2.useState)($props.__internal_upload_progress ?? 0);
  const [files, setFiles] = (0, import_react2.useState)([]);
  const { startUpload, isUploading, routeConfig } = __useUploadThingInternal(resolveMaybeUrlArg($props.url), $props.endpoint, $props.fetch ?? globalThis.fetch, {
    signal: acRef.current.signal,
    headers: $props.headers,
    onClientUploadComplete: (res) => {
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFiles([]);
      $props.onClientUploadComplete?.(res);
      setUploadProgress(0);
    },
    uploadProgressGranularity: $props.uploadProgressGranularity,
    onUploadProgress: (p) => {
      setUploadProgress(p);
      $props.onUploadProgress?.(p);
    },
    onUploadError: $props.onUploadError,
    onUploadBegin: $props.onUploadBegin,
    onBeforeUploadBegin: $props.onBeforeUploadBegin
  });
  const { fileTypes, multiple } = generatePermittedFileTypes(routeConfig);
  const disabled = !!($props.__internal_button_disabled ?? $props.disabled);
  const state = (() => {
    const ready = $props.__internal_state === "ready" || fileTypes.length > 0;
    if ($props.__internal_state) return $props.__internal_state;
    if (disabled) return "disabled";
    if (!ready) return "readying";
    if (!isUploading) return "ready";
    return "uploading";
  })();
  const uploadFiles = (0, import_react2.useCallback)((files$1) => {
    const input = "input" in $props ? $props.input : void 0;
    startUpload(files$1, input).catch((e) => {
      if (e instanceof UploadAbortedError) $props.onUploadAborted?.();
      else throw e;
    });
  }, [$props, startUpload]);
  const onUploadClick = (e) => {
    if (state === "uploading") {
      e.preventDefault();
      e.stopPropagation();
      acRef.current.abort();
      acRef.current = new AbortController();
      return;
    }
    if (mode === "manual" && files.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      uploadFiles(files);
    }
  };
  const inputProps = (0, import_react2.useMemo)(() => ({
    type: "file",
    ref: fileInputRef,
    multiple,
    accept: generateMimeTypes(fileTypes).join(", "),
    onChange: (e) => {
      if (!e.target.files) return;
      const selectedFiles = Array.from(e.target.files);
      $props.onChange?.(selectedFiles);
      if (mode === "manual") {
        setFiles(selectedFiles);
        return;
      }
      uploadFiles(selectedFiles);
    },
    disabled,
    tabIndex: disabled ? -1 : 0
  }), [
    $props,
    disabled,
    fileTypes,
    mode,
    multiple,
    uploadFiles
  ]);
  usePaste((event) => {
    if (!appendOnPaste) return;
    if (document.activeElement !== fileInputRef.current) return;
    const pastedFiles = getFilesFromClipboardEvent(event);
    if (!pastedFiles) return;
    let filesToUpload = pastedFiles;
    setFiles((prev) => {
      filesToUpload = [...prev, ...pastedFiles];
      $props.onChange?.(filesToUpload);
      return filesToUpload;
    });
    if (mode === "auto") uploadFiles(files);
  });
  const styleFieldArg = (0, import_react2.useMemo)(() => ({
    ready: state !== "readying",
    isUploading: state === "uploading",
    uploadProgress,
    fileTypes,
    files
  }), [
    fileTypes,
    files,
    state,
    uploadProgress
  ]);
  const renderButton = () => {
    const customContent = contentFieldToContent($props.content?.button, styleFieldArg);
    if (customContent) return customContent;
    switch (state) {
      case "readying":
        return "Loading...";
      case "uploading":
        if (uploadProgress >= 100) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {});
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
          className: "z-50",
          children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
            className: "block group-hover:hidden",
            children: [Math.round(uploadProgress), "%"]
          }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
            cn,
            className: "hidden size-4 group-hover:block"
          })]
        });
      case "disabled":
      case "ready":
      default:
        if (mode === "manual" && files.length > 0) return `Upload ${files.length} file${files.length === 1 ? "" : "s"}`;
        return `Choose File${inputProps.multiple ? `(s)` : ``}`;
    }
  };
  const renderClearButton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
    onClick: () => {
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      $props.onChange?.([]);
    },
    className: cn("h-[1.25rem] cursor-pointer rounded border-none bg-transparent text-gray-500 transition-colors hover:bg-slate-200 hover:text-gray-600", styleFieldToClassName($props.appearance?.clearBtn, styleFieldArg)),
    style: styleFieldToCssObject($props.appearance?.clearBtn, styleFieldArg),
    "data-state": state,
    "data-ut-element": "clear-btn",
    children: contentFieldToContent($props.content?.clearBtn, styleFieldArg) ?? "Clear"
  });
  const renderAllowedContent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: cn("h-[1.25rem] text-xs leading-5 text-gray-600", styleFieldToClassName($props.appearance?.allowedContent, styleFieldArg)),
    style: styleFieldToCssObject($props.appearance?.allowedContent, styleFieldArg),
    "data-state": state,
    "data-ut-element": "allowed-content",
    children: contentFieldToContent($props.content?.allowedContent, styleFieldArg) ?? allowedContentTextLabelGenerator(routeConfig)
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: cn("flex flex-col items-center justify-center gap-1", $props.className, styleFieldToClassName($props.appearance?.container, styleFieldArg)),
    style: {
      "--progress-width": `${uploadProgress}%`,
      ...styleFieldToCssObject($props.appearance?.container, styleFieldArg)
    },
    "data-state": state,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
      className: cn("group relative flex h-10 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-md text-white after:transition-[width] after:duration-500 focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2", "disabled:pointer-events-none", "data-[state=disabled]:cursor-not-allowed data-[state=readying]:cursor-not-allowed", "data-[state=disabled]:bg-blue-400 data-[state=ready]:bg-blue-600 data-[state=readying]:bg-blue-400 data-[state=uploading]:bg-blue-400", "after:absolute after:left-0 after:h-full after:w-[var(--progress-width)] after:content-[''] data-[state=uploading]:after:bg-blue-600", styleFieldToClassName($props.appearance?.button, styleFieldArg)),
      style: styleFieldToCssObject($props.appearance?.button, styleFieldArg),
      "data-state": state,
      "data-ut-element": "button",
      onClick: onUploadClick,
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
        ...inputProps,
        className: "sr-only"
      }), renderButton()]
    }), mode === "manual" && files.length > 0 ? renderClearButton() : renderAllowedContent()]
  });
}
function UploadDropzone(props) {
  const $props = props;
  const { mode = "manual", appendOnPaste = false, cn = defaultClassListMerger } = $props.config ?? {};
  const acRef = (0, import_react2.useRef)(new AbortController());
  const [files, setFiles] = (0, import_react2.useState)([]);
  const [uploadProgress, setUploadProgress] = (0, import_react2.useState)($props.__internal_upload_progress ?? 0);
  const { startUpload, isUploading, routeConfig } = __useUploadThingInternal(resolveMaybeUrlArg($props.url), $props.endpoint, $props.fetch ?? globalThis.fetch, {
    signal: acRef.current.signal,
    headers: $props.headers,
    onClientUploadComplete: (res) => {
      setFiles([]);
      $props.onClientUploadComplete?.(res);
      setUploadProgress(0);
    },
    uploadProgressGranularity: $props.uploadProgressGranularity,
    onUploadProgress: (p) => {
      setUploadProgress(p);
      $props.onUploadProgress?.(p);
    },
    onUploadError: $props.onUploadError,
    onUploadBegin: $props.onUploadBegin,
    onBeforeUploadBegin: $props.onBeforeUploadBegin
  });
  const { fileTypes, multiple } = generatePermittedFileTypes(routeConfig);
  const disabled = !!($props.__internal_dropzone_disabled ?? $props.disabled);
  const state = (() => {
    const ready = $props.__internal_ready ?? ($props.__internal_state === "ready" || fileTypes.length > 0);
    if ($props.__internal_state) return $props.__internal_state;
    if (disabled) return "disabled";
    if (!ready) return "readying";
    if (!isUploading) return "ready";
    return "uploading";
  })();
  const uploadFiles = (0, import_react2.useCallback)((files$1) => {
    const input = "input" in $props ? $props.input : void 0;
    startUpload(files$1, input).catch((e) => {
      if (e instanceof UploadAbortedError) $props.onUploadAborted?.();
      else throw e;
    });
  }, [$props, startUpload]);
  const onUploadClick = (e) => {
    if (state === "uploading") {
      e.preventDefault();
      e.stopPropagation();
      acRef.current.abort();
      acRef.current = new AbortController();
      return;
    }
    if (mode === "manual" && files.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      uploadFiles(files);
    }
  };
  const onDrop = (0, import_react2.useCallback)((acceptedFiles) => {
    $props.onDrop?.(acceptedFiles);
    $props.onChange?.(acceptedFiles);
    setFiles(acceptedFiles);
    if (mode === "auto") uploadFiles(acceptedFiles);
  }, [
    $props,
    mode,
    uploadFiles
  ]);
  const { getRootProps, getInputProps, isDragActive, rootRef } = useDropzone({
    onDrop,
    multiple,
    accept: generateClientDropzoneAccept(fileTypes),
    disabled
  });
  usePaste((event) => {
    if (!appendOnPaste) return;
    if (document.activeElement !== rootRef.current) return;
    const pastedFiles = getFilesFromClipboardEvent(event);
    if (!pastedFiles?.length) return;
    let filesToUpload = pastedFiles;
    setFiles((prev) => {
      filesToUpload = [...prev, ...pastedFiles];
      $props.onChange?.(filesToUpload);
      return filesToUpload;
    });
    $props.onChange?.(filesToUpload);
    if (mode === "auto") uploadFiles(filesToUpload);
  });
  const styleFieldArg = (0, import_react2.useMemo)(() => ({
    ready: state !== "readying",
    isUploading: state === "uploading",
    uploadProgress,
    fileTypes,
    files,
    isDragActive
  }), [
    fileTypes,
    files,
    state,
    uploadProgress,
    isDragActive
  ]);
  const getUploadButtonContents = () => {
    const customContent = contentFieldToContent($props.content?.button, styleFieldArg);
    if (customContent) return customContent;
    switch (state) {
      case "readying":
        return "Loading...";
      case "uploading":
        if (uploadProgress >= 100) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {});
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
          className: "z-50",
          children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
            className: "block group-hover:hidden",
            children: [Math.round(uploadProgress), "%"]
          }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
            cn,
            className: "hidden size-4 group-hover:block"
          })]
        });
      case "disabled":
      case "ready":
      default:
        if (mode === "manual" && files.length > 0) return `Upload ${files.length} file${files.length === 1 ? "" : "s"}`;
        return `Choose File${multiple ? `(s)` : ``}`;
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: cn("mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center", isDragActive && "bg-blue-600/10", $props.className, styleFieldToClassName($props.appearance?.container, styleFieldArg)),
    ...getRootProps(),
    style: styleFieldToCssObject($props.appearance?.container, styleFieldArg),
    "data-state": state,
    children: [
      contentFieldToContent($props.content?.uploadIcon, styleFieldArg) ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        className: cn("mx-auto block h-12 w-12 align-middle text-gray-400", styleFieldToClassName($props.appearance?.uploadIcon, styleFieldArg)),
        style: styleFieldToCssObject($props.appearance?.uploadIcon, styleFieldArg),
        "data-ut-element": "upload-icon",
        "data-state": state,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
          fill: "currentColor",
          fillRule: "evenodd",
          d: "M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z",
          clipRule: "evenodd"
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
        className: cn("relative mt-4 flex w-64 cursor-pointer items-center justify-center text-sm font-semibold leading-6 text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500", state === "ready" ? "text-blue-600" : "text-gray-500", styleFieldToClassName($props.appearance?.label, styleFieldArg)),
        style: styleFieldToCssObject($props.appearance?.label, styleFieldArg),
        "data-ut-element": "label",
        "data-state": state,
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
          className: "sr-only",
          ...getInputProps()
        }), contentFieldToContent($props.content?.label, styleFieldArg) ?? (state === "ready" ? `Choose ${multiple ? "file(s)" : "a file"} or drag and drop` : `Loading...`)]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: cn("m-0 h-[1.25rem] text-xs leading-5 text-gray-600", styleFieldToClassName($props.appearance?.allowedContent, styleFieldArg)),
        style: styleFieldToCssObject($props.appearance?.allowedContent, styleFieldArg),
        "data-ut-element": "allowed-content",
        "data-state": state,
        children: contentFieldToContent($props.content?.allowedContent, styleFieldArg) ?? allowedContentTextLabelGenerator(routeConfig)
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
        className: cn("group relative mt-4 flex h-10 w-36 items-center justify-center overflow-hidden rounded-md border-none text-base text-white", "after:absolute after:left-0 after:h-full after:w-[var(--progress-width)] after:bg-blue-600 after:transition-[width] after:duration-500 after:content-['']", "focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2", "disabled:pointer-events-none", "data-[state=disabled]:cursor-not-allowed data-[state=readying]:cursor-not-allowed", "data-[state=disabled]:bg-blue-400 data-[state=ready]:bg-blue-600 data-[state=readying]:bg-blue-400 data-[state=uploading]:bg-blue-400", styleFieldToClassName($props.appearance?.button, styleFieldArg)),
        style: {
          "--progress-width": `${uploadProgress}%`,
          ...styleFieldToCssObject($props.appearance?.button, styleFieldArg)
        },
        onClick: onUploadClick,
        "data-ut-element": "button",
        "data-state": state,
        type: "button",
        disabled: files.length === 0 || state === "disabled",
        children: getUploadButtonContents()
      })
    ]
  });
}
function useDropzone({ accept, disabled = false, maxSize = Number.POSITIVE_INFINITY, minSize = 0, multiple = true, maxFiles = 0, onDrop }) {
  const acceptAttr = (0, import_react2.useMemo)(() => acceptPropAsAcceptAttr(accept), [accept]);
  const rootRef = (0, import_react2.useRef)(null);
  const inputRef = (0, import_react2.useRef)(null);
  const dragTargetsRef = (0, import_react2.useRef)([]);
  const [state, dispatch] = (0, import_react2.useReducer)(reducer, initialState);
  (0, import_react2.useEffect)(() => {
    const onWindowFocus = () => {
      if (state.isFileDialogActive) setTimeout(() => {
        if (inputRef.current) {
          const { files } = inputRef.current;
          if (!files?.length) dispatch({ type: "closeDialog" });
        }
      }, 300);
    };
    const controller = new AbortController();
    window.addEventListener("focus", onWindowFocus, { signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, [state.isFileDialogActive]);
  (0, import_react2.useEffect)(() => {
    const onDocumentDrop = (event) => {
      if (rootRef.current?.contains(event.target)) return;
      event.preventDefault();
      dragTargetsRef.current = [];
    };
    const onDocumentDragOver = (e) => e.preventDefault();
    const controller = new AbortController();
    document.addEventListener("dragover", onDocumentDragOver, {
      capture: false,
      signal: controller.signal
    });
    document.addEventListener("drop", onDocumentDrop, {
      capture: false,
      signal: controller.signal
    });
    return () => {
      controller.abort();
    };
  }, []);
  const onDragEnter = (0, import_react2.useCallback)((event) => {
    event.preventDefault();
    event.persist();
    dragTargetsRef.current = [...dragTargetsRef.current, event.target];
    if (isEventWithFiles(event)) Promise.resolve(fromEvent(event)).then((files) => {
      if (event.isPropagationStopped()) return;
      const fileCount = files.length;
      const isDragAccept = fileCount > 0 && allFilesAccepted({
        files,
        accept: acceptAttr,
        minSize,
        maxSize,
        multiple,
        maxFiles
      });
      const isDragReject = fileCount > 0 && !isDragAccept;
      dispatch({
        type: "setDraggedFiles",
        payload: {
          isDragAccept,
          isDragReject,
          isDragActive: true
        }
      });
    }).catch(noop);
  }, [
    acceptAttr,
    maxFiles,
    maxSize,
    minSize,
    multiple
  ]);
  const onDragOver = (0, import_react2.useCallback)((event) => {
    event.preventDefault();
    event.persist();
    const hasFiles = isEventWithFiles(event);
    if (hasFiles) try {
      event.dataTransfer.dropEffect = "copy";
    } catch {
      noop();
    }
    return false;
  }, []);
  const onDragLeave = (0, import_react2.useCallback)((event) => {
    event.preventDefault();
    event.persist();
    const targets = dragTargetsRef.current.filter((target) => rootRef.current?.contains(target));
    const targetIdx = targets.indexOf(event.target);
    if (targetIdx !== -1) targets.splice(targetIdx, 1);
    dragTargetsRef.current = targets;
    if (targets.length > 0) return;
    dispatch({
      type: "setDraggedFiles",
      payload: {
        isDragActive: false,
        isDragAccept: false,
        isDragReject: false
      }
    });
  }, []);
  const setFiles = (0, import_react2.useCallback)((files) => {
    const acceptedFiles = [];
    files.forEach((file) => {
      const accepted = isFileAccepted(file, acceptAttr);
      const sizeMatch = isValidSize(file, minSize, maxSize);
      if (accepted && sizeMatch) acceptedFiles.push(file);
    });
    if (!isValidQuantity(acceptedFiles, multiple, maxFiles)) acceptedFiles.splice(0);
    dispatch({
      type: "setFiles",
      payload: { acceptedFiles }
    });
    onDrop(acceptedFiles);
  }, [
    acceptAttr,
    maxFiles,
    maxSize,
    minSize,
    multiple,
    onDrop
  ]);
  const onDropCb = (0, import_react2.useCallback)((event) => {
    event.preventDefault();
    event.persist();
    dragTargetsRef.current = [];
    if (isEventWithFiles(event)) Promise.resolve(fromEvent(event)).then((files) => {
      if (event.isPropagationStopped()) return;
      setFiles(files);
    }).catch(noop);
    dispatch({ type: "reset" });
  }, [setFiles]);
  const openFileDialog = (0, import_react2.useCallback)(() => {
    if (inputRef.current) {
      dispatch({ type: "openDialog" });
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }, []);
  const onKeyDown = (0, import_react2.useCallback)((event) => {
    if (!rootRef.current?.isEqualNode(event.target)) return;
    if (isEnterOrSpace(event)) {
      event.preventDefault();
      openFileDialog();
    }
  }, [openFileDialog]);
  const onInputElementClick = (0, import_react2.useCallback)((e) => {
    e.stopPropagation();
    if (state.isFileDialogActive) e.preventDefault();
  }, [state.isFileDialogActive]);
  const onFocus = (0, import_react2.useCallback)(() => dispatch({ type: "focus" }), []);
  const onBlur = (0, import_react2.useCallback)(() => dispatch({ type: "blur" }), []);
  const onClick = (0, import_react2.useCallback)(() => {
    if (isIeOrEdge()) setTimeout(openFileDialog, 0);
    else openFileDialog();
  }, [openFileDialog]);
  const getRootProps = (0, import_react2.useMemo)(() => () => ({
    ref: rootRef,
    role: "presentation",
    ...!disabled ? {
      tabIndex: 0,
      onKeyDown,
      onFocus,
      onBlur,
      onClick,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop: onDropCb
    } : {}
  }), [
    disabled,
    onBlur,
    onClick,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDropCb,
    onFocus,
    onKeyDown
  ]);
  const getInputProps = (0, import_react2.useMemo)(() => () => ({
    ref: inputRef,
    type: "file",
    style: { display: "none" },
    accept: acceptAttr,
    multiple,
    tabIndex: -1,
    ...!disabled ? {
      onChange: onDropCb,
      onClick: onInputElementClick
    } : {}
  }), [
    acceptAttr,
    multiple,
    onDropCb,
    onInputElementClick,
    disabled
  ]);
  return {
    ...state,
    getRootProps,
    getInputProps,
    rootRef
  };
}
function Uploader(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex flex-col items-center justify-center gap-4",
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
      className: "text-center text-4xl font-bold",
      children: `Upload a file using a button:`
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadButton, { ...props })]
  }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "flex flex-col items-center justify-center gap-4",
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
      className: "text-center text-4xl font-bold",
      children: `...or using a dropzone:`
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDropzone, { ...props })]
  })] });
}
var generateUploadButton = (opts) => {
  warnIfInvalidPeerDependency("@uploadthing/react", peerDependencies.uploadthing, version$1);
  const url = resolveMaybeUrlArg(opts?.url);
  const fetch = opts?.fetch ?? globalThis.fetch;
  const TypedButton = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadButton, {
    ...props,
    url,
    fetch
  });
  return TypedButton;
};
var generateUploadDropzone = (opts) => {
  warnIfInvalidPeerDependency("@uploadthing/react", peerDependencies.uploadthing, version$1);
  const url = resolveMaybeUrlArg(opts?.url);
  const fetch = opts?.fetch ?? globalThis.fetch;
  const TypedDropzone = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDropzone, {
    ...props,
    url,
    fetch
  });
  return TypedDropzone;
};
var generateUploader = (opts) => {
  warnIfInvalidPeerDependency("@uploadthing/react", peerDependencies.uploadthing, version$1);
  const url = resolveMaybeUrlArg(opts?.url);
  const fetch = opts?.fetch ?? globalThis.fetch;
  const TypedUploader = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Uploader, {
    ...props,
    url,
    fetch
  });
  return TypedUploader;
};
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
