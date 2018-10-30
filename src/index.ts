import {originals} from "./console.js";
import {container as console, clear} from "./render.js";
import {Gui} from "./gui.js";
declare let jsPanel;

let content;

window.onload = function() {
    let panel = jsPanel.create({
        theme : "primary",
        headerTitle : "console",
        container: window.document.body,
        callback : function() {
            content = this.content;
            content.appendChild(console);
        }
    });
};

export default {
    log : originals.log,
    info : originals.info,
    error : originals.error,
    Gui : Gui
}