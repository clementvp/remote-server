const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const url = require("url");

const socket = require("./services/socket");
const sender = require("./services/sender");

let mainWindow;
let tray;

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });

  mainWindow = new BrowserWindow({
    resizable: false,
    frame: false,
    show: false,
    height: 320,
    width: 250,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(startUrl);

  mainWindow.on("close", function (event) {
    mainWindow = null;
  });

  sender();
  socket(mainWindow);
}

app.on("ready", createWindow);

app.whenReady().then(() => {
  const iconName =
    process.platform === "win32" ? "remote-windows.png" : "remote-mac.png";
  tray = new Tray(path.join(__dirname, `./imgs/${iconName}`));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: function () {
        app.quit();
      },
    },
  ]);

  tray.on("right-click", (event) => tray.popUpContextMenu(contextMenu));

  tray.on("click", (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = mainWindow.getBounds();
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition = process.platform === "darwin" ? y : y - height;

      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });
      mainWindow.show();
    }
  });
});

if (process.platform === "darwin") {
  app.dock.hide();
}

app.on("window-all-closed", function (event) {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
