import { originals } from "./console.js";
import { container as console, clear } from "./render.js";
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
            content.appendChild(console);
        }
    });
    var btn = document.getElementById('stupid-console-clear-btn');
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        clear();
    });
};
export default {
    log: originals.log,
    info: originals.info,
    error: originals.error,
};
