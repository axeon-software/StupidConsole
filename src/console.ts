import {render} from "./render.js";

export let element = document.createElement('div');

export let originals = {
    log : window.console.log,
    info : window.console.info,
    error : window.console.error,
    warn : window.console.warn
};

console.log = function(...args : any[]) {
    render("log", ...args);
    originals.log(...args);
};

console.info = function(...args : any[]) {
    render("info", ...args);
    originals.info(...args);
};

console.error = function(...args) {
    render("error", ...args);
    originals.error(...args, "[from stupid console : collapse to see the caller]");
};

console.warn = function(...args : any[]) {
    render("warn", ...args);
    originals.warn(...args);
};

let currentError : any;

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
    error = error ? error : currentError
    let val = { msg: msg, url: url, lineno: lineno, col: col, error: error }
    render("error", val);
};