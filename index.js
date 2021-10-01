const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const menu_template = require("./menu-template");

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: path.join(__dirname, "app", "favicon.ico"),
        webPreferences: {
            sandbox: true
        }
    });

    const menu = Menu.buildFromTemplate(menu_template);
    Menu.setApplicationMenu(menu);

    win.maximize();
    win.loadFile(path.join(__dirname, "app", "index.html"));
    win.on("ready-to-show", () => win.show());
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow("default");
        }
    })

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    })
});