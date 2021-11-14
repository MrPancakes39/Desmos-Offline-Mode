const fs = require("fs");
const { BrowserWindow, dialog } = require("electron");

module.exports.saveScreenshot = (base64img) => {
    const imgData = base64img.replace(/^data:image\/png;base64,/, "");
    let filePath = dialog.showSaveDialogSync({
        title: "Save Graph Screenshot",
        filters: [{ name: "PNG image", extensions: ["png", "PNG"] }]
    });
    if (filePath) {
        filePath = filePath.trim();
        filePath = /\.png$/g.test(filePath) ? filePath : `${filePath}.png`;
        fs.writeFile(filePath, imgData, "base64", (err) => { if (err) console.log(err) });
    }
}

module.exports.openDesmosFile = (path) => {
    const win = BrowserWindow.getFocusedWindow();
    let filePath = dialog.showOpenDialogSync({
        title: "Open Desmos File",
        properties: ["openFile"],
        filters: [{ name: "Desmos Files", extensions: ["desmos"] }]
    });
    filePath = (filePath) ? filePath[0] : null;
    if (filePath && win) {
        const content = fs.readFileSync(filePath, "utf-8");
        win.webContents.send("open-file", content);
        win["openedFile"] = filePath;
    }
}

module.exports.saveDesmosDialog = (json) => {
    const win = BrowserWindow.getFocusedWindow();
    let filePath = dialog.showSaveDialogSync({
        title: "Save Desmos File",
        filters: [{ name: "Desmos Files", extensions: ["desmos"] }]
    });
    if (filePath) {
        filePath = filePath.trim();
        filePath = /\.desmos$/g.test(filePath) ? filePath : `${filePath}.desmos`;
        fs.writeFileSync(filePath, json, "utf-8");
        win["openedFile"] = filePath;
        win.webContents.send("save-done", "[ipcMain] saving file done");
    }
}

module.exports.saveDesmosFile = (json) => {
    const win = BrowserWindow.getFocusedWindow();
    if (win["openedFile"]) {
        fs.writeFileSync(win["openedFile"], json, "utf-8");
        win.webContents.send("save-done", "[ipcMain] saving file done");
    } else
        this.saveDesmosDialog(json);
}

module.exports.saveAsDesmosFile = () => {
    const win = BrowserWindow.getFocusedWindow();
    win.webContents.send("save-file-as", "[ipcMain] send state"); // Gets handled by saveFileAs IPC.
}

module.exports.saveFileFromMain = () => {
    const win = BrowserWindow.getFocusedWindow();
    win.webContents.send("save-file", "[ipcMain] send state"); // Gets handled by saveFile IPC.
}

module.exports.aboutDesmos = () => {
    const win = BrowserWindow.getFocusedWindow();
    const os = require("os");
    const info = {
        ver: require("../package.json").version,
        elec: process.versions["electron"],
        node: process.versions["node"],
        os: `${os.type()} ${os.arch()} ${os.release()}`
    }
    const stringify = JSON.stringify(info);
    win.webContents.send("open-about", stringify);
}

module.exports.newFile = () => {
    const win = BrowserWindow.getFocusedWindow();
    win["openedFile"] = null;
}