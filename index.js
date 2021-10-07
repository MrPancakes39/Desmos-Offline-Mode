const { app, BrowserWindow, Menu } = require("electron");

const fs = require("fs");
const path = require("path");

const menu = require("./backend/create-menu");
require("./backend/setup-ipc").setup();

function createWindow(filePath) {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: path.join(__dirname, "app", "favicon.ico"),
        webPreferences: {
            sandbox: true,
            contextIsolation: true,
            preload: path.join(__dirname, "backend", "preload.js")
        }
    });

    Menu.setApplicationMenu(menu);

    win.maximize();
    win.loadFile(path.join(__dirname, "app", "index.html"));

    win["openedFile"] = filePath || null;
    win.on("ready-to-show", () => {
        if (win["openedFile"]) {
            const content = fs.readFileSync(win["openedFile"], "utf-8");
            win.webContents.send("open-file", content);
        }
        win.show();
    });
}

app.whenReady().then(() => {
    if (process.argv.length >= 2 && process.argv[1] !== ".") {
        let filePath = process.argv[1];
        if (validateFile(filePath))
            createWindow(filePath)
    } else {
        createWindow();
    }

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    })
});

function validateFile(filePath) {
    let status = true;
    if (path.extname(filePath) !== ".desmos") {
        console.log(filePath, path.extname(filePath));
        console.error("The file must be a desmos file");
        status = false;
    }

    if (!fs.existsSync(filePath)) {
        console.error("The input file doesn't exist");
        status = false;
    }
    return status;
}