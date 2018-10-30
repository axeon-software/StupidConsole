import { originals } from "./console.js";
import { container as console } from "./render.js";
import { Gui } from "./gui.js";
var content;
window.onload = function () {
    var panel = jsPanel.create({
        theme: "primary",
        headerTitle: "console",
        container: window.document.body,
        callback: function () {
            content = this.content;
            content.appendChild(console);
        }
    });
};
export default {
    log: originals.log,
    info: originals.info,
    error: originals.error,
    Gui: Gui
};
