import {FloatingWindow} from "./FloatingWindow.js";
import {container as consoleContainer} from "./render.js";

export class Gui {
    public container;
    public form;
    constructor(public title : string) {
        this.container = document.createElement("div");
        this.container.classList.add('uk-scope');
        this.container.classList.add("stupid-consoleContainer-gui");

        this.form = document.createElement('form');
        this.form.classList.add("uk-form-stacked");
        this.form.classList.add("uk-container");
        this.form.addEventListener("submit", function(e) {
            e.preventDefault();
            return false;
        });
        this.container.appendChild(this.form);

        let _title = this.title || "GUI";

        let container = this.container;
        let window = new FloatingWindow({
            theme : "primary",
            headerTitle : _title,
            content : container,
            paneltype: 'stupidconsole'
        });
    }

    createLabel(legend : string) {
        let label = document.createElement("label");
        label.className = "uk-form-label";
        label.innerHTML = legend;
        return label;
    }

    addButton(legend : string, callback : Function) {
        let div = document.createElement("div");
        div.className = "uk-inline";

        let label = this.createLabel("");
        div.appendChild(label);

        let button = document.createElement('a');
        button.setAttribute("href", "");
        button.classList.add("uk-button");
        button.classList.add("uk-button-default");
        //button.classList.add("uk-button-small");
        button.innerHTML = legend;
        button.addEventListener("click", function(e) {
            e.preventDefault();
            callback.apply(div, e);
        });


        label.appendChild(button);

        let controls = document.createElement("div");
        controls.className = "uk-form-controls";

        div.appendChild(controls);
        this.form.appendChild(div);
        return div;
    }

    addInputText(legend : string, content : string, callback : Function) {
        let div = document.createElement("div");
        div.className = "uk-margin";

        let label = this.createLabel(legend);
        div.appendChild(label);

        let controls = document.createElement("div");
        controls.className = "uk-form-controls";

        let input = document.createElement('input');
        input.classList.add("uk-input");
        input.setAttribute("placeholder", content);
        input.value = content;

        input.addEventListener("change", function(e) {
            e.preventDefault();
            callback.apply(input, [input.value, e]);
        });

        controls.appendChild(input);
        div.appendChild(controls);
        this.form.appendChild(div);
        return div;
    }

    addCheckbox(legend : string, checked : boolean, callback : Function) {
        let div = document.createElement("div");
        div.className = "uk-margin";

        let label = this.createLabel("");
        div.appendChild(label);

        let controls = document.createElement("div");
        controls.className = "uk-form-controls";

        let checkbox = document.createElement('input');
        checkbox.classList.add("uk-checkbox");
        checkbox.setAttribute("type", "checkbox");
        if(checked === true) {
            checkbox.checked = checked;
        }

        checkbox.addEventListener("change", function(e) {
            e.preventDefault();
            callback.apply(checkbox, [checkbox.checked, e]);
        });

        let _legend = document.createTextNode(legend);
        label.appendChild(checkbox);
        label.appendChild(_legend);

        div.appendChild(controls);
        this.form.appendChild(div);
        return div;
    }

    addSelect(legend : string, elements : string[], callback : Function) {
        let div = document.createElement("div");
        div.className = "uk-margin";

        let label = this.createLabel(legend);
        div.appendChild(label);

        let controls = document.createElement("div");
        controls.className = "uk-form-controls";

        let select = document.createElement('select');
        select.className = "uk-select";

        for(let i = 0; i < elements.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = elements[i];
            select.appendChild(option);
        }
        select.addEventListener("change", function(e) {
            callback.apply(select,[ select.selectedIndex, e ]);
        });
        controls.appendChild(select);

        div.appendChild(controls);
        this.form.appendChild(div);
        return div;
    }

    // TODO
    addNumber(legend : string, callback : Function) {

    }


    addRange(legend : string, min : number, max : number, callback : Function) {

    }
}