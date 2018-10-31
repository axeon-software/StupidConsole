var StupidConsole = (function () {
    'use strict';

    var container = document.createElement('div');
    container.classList.add('uk-scope');
    container.classList.add("stupid-consoleContainer-output");
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
            if (value) {
                return value.toString();
            }
            else {
                return "undefined";
            }
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
        li.classList.add("consoleContainer-events");
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
    // TODO : error should be re thrown...
    // avoid : error in console.js line 22
    console.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        render.apply(void 0, ["error"].concat(args));
        //throw args[0];
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

    // see https://github.com/jakobmattsson/onDomReady
    var isBound = false;
    var readyList = [];
    var whenReady = function () {
        // Make sure body exists, at least, in case IE gets a little overzealous.
        // This is taked directly from jQuery's implementation.
        if (!document.body) {
            return setTimeout(whenReady, 13);
        }
        for (var i = 0; i < readyList.length; i++) {
            readyList[i]();
        }
        readyList = [];
    };
    var bindReady = function () {
        // Mozilla, Opera and webkit nightlies currently support this event
        if (document.addEventListener) {
            var DOMContentLoaded = function () {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                whenReady();
            };
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
            window.addEventListener("load", whenReady, false); // fallback
            // If IE event model is used
        }
        else if (document["attachEvent"]) {
            var onreadystatechange = function () {
                if (document.readyState === "complete") {
                    document["detachEvent"]("onreadystatechange", onreadystatechange);
                    whenReady();
                }
            };
            document["attachEvent"]("onreadystatechange", onreadystatechange);
            window["attachEvent"]("onload", whenReady); // fallback
            // If IE and not a frame, continually check to see if the document is ready
            var toplevel = false;
            try {
                toplevel = window.frameElement == null;
            }
            catch (e) { }
            // The DOM ready check for Internet Explorer
            if (document.documentElement["doScroll"] && toplevel) {
                var doScrollCheck = function () {
                    // stop searching if we have no functions to call
                    // (or, in other words, if they have already been called)
                    if (readyList.length == 0) {
                        return;
                    }
                    try {
                        // If IE is used, use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        document.documentElement["doScroll"]("left");
                    }
                    catch (e) {
                        setTimeout(doScrollCheck, 1);
                        return;
                    }
                    // and execute any waiting functions
                    whenReady();
                };
                doScrollCheck();
            }
        }
    };
    function domReady(callback) {
        // Push the given callback onto the list of functions to execute when ready.
        // If the dom has alredy loaded, call 'whenReady' right away.
        // Otherwise bind the ready-event if it hasn't been done already
        readyList.push(callback);
        if (document.readyState === "complete") {
            whenReady();
        }
        else if (!isBound) {
            bindReady();
            isBound = true;
        }
    }

    var FloatingWindow = /** @class */ (function () {
        function FloatingWindow(config) {
            this.config = config;
            this.isReady = false;
            var self = this;
            var instance = FloatingWindow.instances++;
            domReady(function () {
                config.container = window.document.body;
                config.id = "floating-window-" + instance;
                console.log("id = " + config.id);
                config.position = {
                    my: 'left-top',
                    at: 'left-top',
                    autoposition: 'right',
                    offsetX: 5,
                    offsetY: 5
                };
                self.isReady = true;
                var restore = jsPanel.layout.restoreId({
                    id: config.id,
                    config: config,
                    storagename: 'stupid-console-jsPanel'
                });
                if (!restore) {
                    self.container = jsPanel.create(config);
                }
            });
        }
        FloatingWindow.instances = 0;
        return FloatingWindow;
    }());
    window.addEventListener("unload", function (e) {
        // save panel layout
        jsPanel.layout.save({
            selector: '.jsPanel-standard',
            storagename: 'stupid-console-jsPanel'
        });
    });

    var Gui = /** @class */ (function () {
        function Gui(title) {
            this.title = title;
            this.container = document.createElement("div");
            this.container.classList.add('uk-scope');
            this.container.classList.add("stupid-consoleContainer-gui");
            this.form = document.createElement('form');
            this.form.classList.add("uk-form-stacked");
            this.form.classList.add("uk-container");
            this.form.addEventListener("submit", function (e) {
                e.preventDefault();
                return false;
            });
            this.container.appendChild(this.form);
            var _title = this.title || "GUI";
            var container = this.container;
            var window = new FloatingWindow({
                theme: "primary",
                headerTitle: _title,
                content: container
            });
        }
        Gui.prototype.createLabel = function (legend) {
            var label = document.createElement("label");
            label.className = "uk-form-label";
            label.innerHTML = legend;
            return label;
        };
        Gui.prototype.addButton = function (legend, callback) {
            var div = document.createElement("div");
            div.className = "uk-inline";
            var label = this.createLabel("");
            div.appendChild(label);
            var button = document.createElement('a');
            button.setAttribute("href", "");
            button.classList.add("uk-button");
            button.classList.add("uk-button-default");
            //button.classList.add("uk-button-small");
            button.innerHTML = legend;
            button.addEventListener("click", function (e) {
                e.preventDefault();
                callback.apply(div, e);
            });
            label.appendChild(button);
            var controls = document.createElement("div");
            controls.className = "uk-form-controls";
            div.appendChild(controls);
            this.form.appendChild(div);
            return div;
        };
        Gui.prototype.addInputText = function (legend, content, callback) {
            var div = document.createElement("div");
            div.className = "uk-margin";
            var label = this.createLabel(legend);
            div.appendChild(label);
            var controls = document.createElement("div");
            controls.className = "uk-form-controls";
            var input = document.createElement('input');
            input.classList.add("uk-input");
            input.setAttribute("placeholder", content);
            input.value = content;
            input.addEventListener("change", function (e) {
                e.preventDefault();
                callback.apply(input, [input.value, e]);
            });
            controls.appendChild(input);
            div.appendChild(controls);
            this.form.appendChild(div);
            return div;
        };
        Gui.prototype.addCheckbox = function (legend, checked, callback) {
            var div = document.createElement("div");
            div.className = "uk-margin";
            var label = this.createLabel("");
            div.appendChild(label);
            var controls = document.createElement("div");
            controls.className = "uk-form-controls";
            var checkbox = document.createElement('input');
            checkbox.classList.add("uk-checkbox");
            checkbox.setAttribute("type", "checkbox");
            if (checked === true) {
                checkbox.checked = checked;
            }
            checkbox.addEventListener("change", function (e) {
                e.preventDefault();
                callback.apply(checkbox, [checkbox.checked, e]);
            });
            var _legend = document.createTextNode(legend);
            label.appendChild(checkbox);
            label.appendChild(_legend);
            div.appendChild(controls);
            this.form.appendChild(div);
            return div;
        };
        Gui.prototype.addSelect = function (legend, elements, callback) {
            var div = document.createElement("div");
            div.className = "uk-margin";
            var label = this.createLabel(legend);
            div.appendChild(label);
            var controls = document.createElement("div");
            controls.className = "uk-form-controls";
            var select = document.createElement('select');
            select.className = "uk-select";
            for (var i = 0; i < elements.length; i++) {
                var option = document.createElement('option');
                option.innerHTML = elements[i];
                select.appendChild(option);
            }
            select.addEventListener("change", function (e) {
                callback.apply(select, [select.selectedIndex, e]);
            });
            controls.appendChild(select);
            div.appendChild(controls);
            this.form.appendChild(div);
            return div;
        };
        // TODO
        Gui.prototype.addNumber = function (legend, callback) {
        };
        Gui.prototype.addRange = function (legend, min, max, callback) {
        };
        return Gui;
    }());

    new FloatingWindow({
        theme: "primary",
        headerTitle: "console",
        content: container
    });
    var index = {
        log: originals.log,
        info: originals.info,
        error: originals.error,
        Gui: Gui
    };

    return index;

}());
//# sourceMappingURL=stupid-console.js.map
