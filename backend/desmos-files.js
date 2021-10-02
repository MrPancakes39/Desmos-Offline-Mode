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
    }
}