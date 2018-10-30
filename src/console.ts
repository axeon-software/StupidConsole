export let element = document.createElement('div');

function isPrimitive(test : any) {
    return (test !== Object(test));
}

function toString(...args : any[]) {
    let container = window.document.createElement('span');
    for(let i = 0; i < args.length; i++) {
        if(isPrimitive(args[i])) {
            container.innerHTML = args[i].toString();
        }
        else {
            let json  = JSON.stringify(args[i]);
            container.innerHTML = json;
        }
    }
    return container;
}


function domConsole(mode : string, ...args : any[]) {
    let container = window.document.createElement('div');
    for(let i = 0; i < args.length; i++) {
        let div = window.document.createElement('div');
        div.className = mode;
        div.appendChild(toString(args[i]));
        container.appendChild(div);
    }
    element.appendChild(container);
}

export let originals = {
    log : window.console.log,
    info : window.console.info,
    error : window.console.error
};

console.log = function(...args : any[]) {
    domConsole("log", ...args);
    originals.log(...args);
};

console.info = function(...args : any[]) {
    domConsole("info", ...args);
    originals.info(...args);
};

console.error = function(...args : any[]) {
    domConsole("error", ...args);
    originals.error(...args);
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
    console.error(val)
};