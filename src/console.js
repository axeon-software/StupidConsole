import { render } from "./render.js";
export var element = document.createElement('div');
export var originals = {
    log: window.console.log,
    info: window.console.info,
    error: window.console.error,
    warn: window.console.warn
};
console.log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    render.apply(void 0, ["log"].concat(args));
    originals.log.apply(originals, args);
};
console.info = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    render.apply(void 0, ["info"].concat(args));
    originals.info.apply(originals, args);
};
console.error = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    render.apply(void 0, ["error"].concat(args));
    originals.error.apply(originals, args);
};
console.warn = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    render.apply(void 0, ["warn"].concat(args));
    originals.warn.apply(originals, args);
};
var currentError;
window.addEventListener('error', function (event) {
    currentError = new Error(event.message);
    currentError.timeStamp = event.timeStamp;
    currentError.isTrusted = event.isTrusted;
    currentError.filename = event.filename;
    currentError.lineno = event.lineno;
    currentError.colno = event.colno;
    currentError.error = event.error;
    currentError.type = event.type;
});
window["onerror"] = function (msg, url, lineno, col, error) {
    error = error ? error : currentError;
    var val = { msg: msg, url: url, lineno: lineno, col: col, error: error };
    console.error(val);
};
