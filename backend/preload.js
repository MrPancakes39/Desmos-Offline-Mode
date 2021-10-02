const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    contextBridge.exposeInMainWorld("nodeAPI", {
        send: (channel, data) => {
            let validChannels = ["saveImage"];
            if (validChannels.includes(channel))
                ipcRenderer.send(channel, data);
        },
        receive: (channel, func) => {
            let validChannels = ["open-file"];
            if (validChannels.includes(channel))
                ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    })
});