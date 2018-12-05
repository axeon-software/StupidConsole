declare let jsPanel;
import {domReady} from "./domReady.js";

export class FloatingWindow {
    container : HTMLElement;
    isReady = false;
    static instances = 0;
    constructor(public config : any) {
        let self = this;
        let instance = FloatingWindow.instances++;
        domReady(function() {
            config.container = window.document.body;
            config.id = "floating-window-" + instance;
            config.position =  {
                my:           'left-top',
                at:           'left-top',
                autoposition: 'right',
                offsetX:      5,
                offsetY:      5
            };
            let restore = jsPanel.layout.restoreId({
                id : config.id,
                config : config,
                storagename: 'stupid-console-jsPanel'
            });

            if(!restore) {
                self.container = jsPanel.create(config);
            }
            self.isReady = true;
        });
    }
}


window.addEventListener("unload", function(e) {
    // save panel layout
    jsPanel.layout.save({
        selector:    '.jsPanel-stupidconsole',
        storagename: 'stupid-console-jsPanel'
    });
});