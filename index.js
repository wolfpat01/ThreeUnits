const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  // once electron has started up, create a window.
  const window = new BrowserWindow({ width: 800, height: 600 });

  // hide the default menu bar that comes with the browser window
  window.setMenuBarVisibility(null);

  // load a website to display
  window.loadFile("./public/index.html");
  window.webContents.openDevTools();
});
