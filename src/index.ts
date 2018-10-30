import {element as console, originals} from "./console.js";
import {element as prompt} from "./prompt.js";
declare let jsPanel;

var content;
window.onload = function() {
    jsPanel.create({
        headerTitle : "StupidConsole",
        container: window.document.body,
        callback : function() {
            content = this.content;
            content.appendChild(console);
            content.appendChild(prompt);
        }
    });
};

export default {
    log : originals.log,
    info : originals.info,
    error : originals.error
}