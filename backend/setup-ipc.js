const fs = require("fs");
const { ipcMain, shell } = require("electron");

const { saveScreenshot, saveDesmosDialog, saveDesmosFile } = require("./desmos-files");

module.exports.setup = () => {
    ipcMain.on("saveImage", (event, base64img) => saveScreenshot(base64img));
    ipcMain.on("saveFile", (event, json) => saveDesmosFile(json));
    ipcMain.on("saveFileAs", (event, json) => saveDesmosDialog(json));
    ipcMain.on("open-link", async (event, link) => {
        let validLinks = require("./valid-links");
        if (validLinks.includes(link))
            await shell.openExternal(link);
        else
            console.error(`The link: ${link}.\nThis Link is not valid.`);
    });
}