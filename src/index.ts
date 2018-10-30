import {originals} from "./console.js";
import {element as prompt} from "./prompt.js";
import {container as console, clear} from "./render.js";
declare let jsPanel;

let content;

window.onload = function() {
    let panel = jsPanel.create({
        theme : "primary",
        headerTitle : "<div class=\"uk-scope\">\n " +
        "<ul class=\"uk-iconnav\">\n" +
        "    <li><a id='stupid-console-clear-btn' href=\"#\" uk-icon=\"icon: trash\"></a></li>\n" +
        "</ul>" +
        "</div>",
        container: window.document.body,
        callback : function() {
            content = this.content;
            content.appendChild(console);
        }
    });

    let btn = document.getElementById('stupid-console-clear-btn');
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        clear();
    })
};

export default {
    log : originals.log,
    info : originals.info,
    error : originals.error,
}