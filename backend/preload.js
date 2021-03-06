const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    contextBridge.exposeInMainWorld("nodeAPI", {
        send: (channel, data) => {
            let validChannels = ["saveImage", "saveFile", "saveFileAs", "newFile", "open-link"];
            if (validChannels.includes(channel))
                ipcRenderer.send(channel, data);
        },
        receive: (channel, func) => {
            let validChannels = ["open-file", "save-file", "save-file-as", "save-done", "open-about"];
            if (validChannels.includes(channel))
                ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    })
});