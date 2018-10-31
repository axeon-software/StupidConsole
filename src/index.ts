import {originals} from "./console.js";
import {container as consoleContainer, clear} from "./render.js";
import {Gui} from "./Gui.js";
import {FloatingWindow} from "./FloatingWindow.js";

new FloatingWindow({
    theme : "primary",
    headerTitle : "console",
    content : consoleContainer
});

export default {
    log : originals.log,
    info : originals.info,
    error : originals.error,
    Gui : Gui
}