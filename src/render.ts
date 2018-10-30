export let container = document.createElement('div');
container.classList.add('uk-scope');
container.classList.add("stupid-console-output");

let console = document.createElement('ul');
console.classList.add('uk-list');
console.classList.add('uk-list-divider');

let prompt = document.createElement('li');

let form = document.createElement('div');
form.className = "uk-inline .uk-width-1-1";
let span = document.createElement('span');
span.className = "uk-form-icon";
span.setAttribute("uk-icon", "icon: chevron-right");
form.appendChild(span);

let input = document.createElement('input');
input.className = "uk-input";
input.setAttribute("type", "search");
form.appendChild(input);


input.addEventListener("search", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    let expr = input.value;
    let res = eval.apply(window, [expr]);
    render("in", expr);
    if(res) {
        render("out", res);
    }
    else {
        render("out", "undefined");
    }

});

prompt.appendChild(form);
console.appendChild(prompt);
container.appendChild(console);

function isPrimitive(test : any) {
    return (test !== Object(test));
}

function toString(value : any) {
    if(isPrimitive(value)) {
        return value.toString();
    }
    else {
        return JSON.stringify(value);
    }
}

export function render(mode : string, ...args : any) {
    console.removeChild(prompt);
    let li = document.createElement('li');
    li.classList.add(mode);
    li.classList.add("console-events")
    let icone = document.createElement('span');
    icone.classList.add("uk-icon");

    let span = document.createElement('span');

    switch(mode) {
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
        default :
            break;
    }

    let innerHTML = '';


    for(let i = 0; i < args.length; i++) {
        if(mode == "error") {
            if(typeof args[i] == 'string') {
                innerHTML += args[i]
            }
            else {
                innerHTML += args[i].msg
            }
        }
        else {
            if(innerHTML === "") {
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

    console.appendChild(li);
    input.value = "";
    console.appendChild(prompt);
    input.focus();
}

export function clear() {
    console.innerHTML = '';
    console.appendChild(prompt);
    input.focus();
}