const fs = require("fs");
const { ipcMain } = require("electron");

const { saveScreenshot, saveDesmosDialog, saveDesmosFile } = require("./desmos-files");

module.exports.setup = () => {
    ipcMain.on("saveImage", (event, base64img) => saveScreenshot(base64img));
    ipcMain.on("saveFile", (event, json) => saveDesmosFile(json));
    ipcMain.on("saveFileAs", (event, json) => saveDesmosDialog(json));
}