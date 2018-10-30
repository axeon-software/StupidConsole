var StupidConsole = (function () {
    'use strict';

    var container = document.createElement('div');
    container.classList.add('uk-scope');
    container.classList.add("stupid-console-output");
    var console$1 = document.createElement('ul');
    console$1.classList.add('uk-list');
    console$1.classList.add('uk-list-divider');
    var prompt = document.createElement('li');
    var form = document.createElement('div');
    form.className = "uk-inline .uk-width-1-1";
    var span = document.createElement('span');
    span.className = "uk-form-icon";
    span.setAttribute("uk-icon", "icon: chevron-right");
    form.appendChild(span);
    var input = document.createElement('input');
    input.className = "uk-input";
    input.setAttribute("type", "search");
    form.appendChild(input);
    input.addEventListener("search", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        var expr = input.value;
        var res = eval.apply(window, [expr]);
        render("in", expr);
        if (res) {
            render("out", res);
        }
        else {
            render("out", "undefined");
        }
    });
    prompt.appendChild(form);
    console$1.appendChild(prompt);
    container.appendChild(console$1);
    function isPrimitive(test) {
        return (test !== Object(test));
    }
    function toString(value) {
        if (isPrimitive(value)) {
            return value.toString();
        }
        else {
            return JSON.stringify(value);
        }
    }
    function render(mode) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console$1.removeChild(prompt);
        var li = document.createElement('li');
        li.classList.add(mode);
        li.classList.add("console-events");
        var icone = document.createElement('span');
        icone.classList.add("uk-icon");
        var span = document.createElement('span');
        switch (mode) {
            case "log":
                break;
            case "info":
                icone.setAttribute("uk-icon", "icon : info");
                icone.classList.add("uk-text-primary");
                span.className = "uk-text-primary";
                break;
            case "warn":
                icone.setAttribute("uk-icon", "icon : warning");
                icone.classList.add("uk-text-warning");
                span.className = "uk-text-warning";
                break;
            case "error":
                icone.setAttribute("uk-icon", "icon : close");
                icone.classList.add("uk-text-danger");
                span.className = "uk-text-danger";
                break;
            case "in":
                icone.setAttribute("uk-icon", "icon : chevron-left");
                icone.classList.add("uk-text-muted");
                span.className = "uk-text-muted";
                break;
            case "out":
                icone.setAttribute("uk-icon", "icon :  chevron-right");
                icone.classList.add("uk-text-muted");
                span.className = "uk-text-muted";
                break;
            default:
                break;
        }
        var innerHTML = '';
        for (var i = 0; i < args.length; i++) {
            if (mode == "error") {
                if (typeof args[i] == 'string') {
                    innerHTML += args[i];
                }
                else {
                    innerHTML += args[i].msg;
                }
            }
            else {
                if (innerHTML === "") {
                    innerHTML = toString(args[i]);
                }
                else {
                    innerHTML += ', ' + toString(args[i]);
                }
            }
        }
        span.innerHTML = innerHTML;
        li.appendChild(icone);
        li.appendChild(span);
        console$1.appendChild(li);
        input.value = "";
        console$1.appendChild(prompt);
        input.focus();
    }
    function clear() {
        console$1.innerHTML = '';
        console$1.appendChild(prompt);
        input.focus();
    }

    var element = document.createElement('div');
    var originals = {
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

    var content;
    window.onload = function () {
        var panel = jsPanel.create({
            theme: "primary",
            headerTitle: "<div class=\"uk-scope\">\n " +
                "<ul class=\"uk-iconnav\">\n" +
                "    <li><a id='stupid-console-clear-btn' href=\"#\" uk-icon=\"icon: trash\"></a></li>\n" +
                "</ul>" +
                "</div>",
            container: window.document.body,
            callback: function () {
                content = this.content;
                content.appendChild(container);
            }
        });
        var btn = document.getElementById('stupid-console-clear-btn');
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            clear();
        });
    };
    var index = {
        log: originals.log,
        info: originals.info,
        error: originals.error,
    };

    return index;

}());
//# sourceMappingURL=stupid-console.js.map
