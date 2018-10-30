export var element = document.createElement('div');
function isPrimitive(test) {
    return (test !== Object(test));
}
function toString() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var container = window.document.createElement('span');
    for (var i = 0; i < args.length; i++) {
        if (isPrimitive(args[i])) {
            container.innerHTML = args[i].toString();
        }
        else {
            var json = JSON.stringify(args[i]);
            container.innerHTML = json;
        }
    }
    return container;
}
function domConsole(mode) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var container = window.document.createElement('div');
    for (var i = 0; i < args.length; i++) {
        var div = window.document.createElement('div');
        div.className = mode;
        div.appendChild(toString(args[i]));
        container.appendChild(div);
    }
    element.appendChild(container);
}
export var originals = {
    log: window.console.log,
    info: window.console.info,
    error: window.console.error
};
console.log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    domConsole.apply(void 0, ["log"].concat(args));
    originals.log.apply(originals, args);
};
console.info = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    domConsole.apply(void 0, ["info"].concat(args));
    originals.info.apply(originals, args);
};
console.error = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    domConsole.apply(void 0, ["error"].concat(args));
    originals.error.apply(originals, args);
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
