const { Menu, shell } = require("electron");

const isMac = process.platform === "darwin";
const isLinux = process.platform === "linux";

module.exports = Menu.buildFromTemplate([{
        label: "File",
        submenu: [{
                label: "Open File",
                accelerator: "CmdOrCtrl+O",
            },
            { label: "Save", accelerator: "CmdOrCtrl+S" },
            { label: "Save as", accelerator: "CmdOrCtrl+Shift+S" },
            { type: "separator" },
            {
                label: "Exit",
                ...(isMac ? { role: "close" } : { role: "quit" }),
                accelerator: isMac ? "Cmd+W" : (isLinux ? "Ctrl+Q" : "Alt+F4")
            }
        ]
    },
    {
        label: "View",
        submenu: [
            { label: "Reset zoom", role: "resetZoom" },
            { role: "zoomIn" },
            { role: "zoomOut" },
            { role: "togglefullscreen" },
            { type: "separator" },
            { role: "toggleDevTools" }
        ]
    }, {
        role: "help",
        submenu: [
            { label: "Documentation" },
            { label: "Report Issue", click: async () => await shell.openExternal("https://github.com/MrPancakes39/Desmos-Offline-Mode/issues") },
            { type: "separator" },
            { label: "About Desmos Offline Mode", role: "about" }
        ]
    }
]);