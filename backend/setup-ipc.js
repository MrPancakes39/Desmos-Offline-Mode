const fs = require("fs");
const { ipcMain, shell } = require("electron");

const { saveScreenshot, saveDesmosDialog, saveDesmosFile, newFile } = require("./desmos-files");

module.exports.setup = () => {
    ipcMain.on("saveImage", (event, base64img) => saveScreenshot(base64img));
    ipcMain.on("saveFile", (event, json) => saveDesmosFile(json));
    ipcMain.on("saveFileAs", (event, json) => saveDesmosDialog(json));
    ipcMain.on("newFile", (event) => newFile());
    ipcMain.on("open-link", async (event, link) => {
        let validLinks = require("./valid-links");
        if (validLinks.includes(link) || link.startsWith("https://www.desmos.com/"))
            await shell.openExternal(link);
        else
            console.error(`The link: ${link}.\nThis Link is not valid.`);
    });
}