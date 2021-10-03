const fs = require("fs");
const { ipcMain, dialog } = require("electron");

const { saveScreenshot, saveDesmosDialog } = require("./desmos-files");

module.exports.setup = () => {
    ipcMain.on("saveImage", (event, base64img) => saveScreenshot(base64img));
    ipcMain.on("saveFileAs", (event, json) => {
        saveDesmosDialog(json);
        event.reply("save-done", "[ipcMain] saving file done");
    });
}