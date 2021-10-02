const fs = require("fs");
const { ipcMain, dialog } = require("electron");

const { saveScreenshot } = require("./desmos-files");

module.exports.setup = () => {
    ipcMain.on("saveImage", (event, base64img) => saveScreenshot(base64img));
}