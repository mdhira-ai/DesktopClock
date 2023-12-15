const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const serve = require("electron-serve");
const path = require("path");
const { autoUpdater } = require("electron-updater")
const Store = require('electron-store')



const store = new Store();
let tray = null
const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {

  const position = store.get('position')

  const win = new BrowserWindow({
    width: 300,
    height: 200,
    x: position?.[0],
    y: position?.[1],
    icon: path.join(__dirname, "../resources/icon.png"),
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    },
    resizable: false,
    alwaysOnTop: true,
    frame: false,
    focusable: true,

    autoHideMenuBar: true,
    skipTaskbar:true,
  
    
    
    
  });


  function storeready() {
    const position = win.getPosition()
    store.set('position', position)
    console.log("current position", position)

  }




  win.on('close', () => {

    storeready()


  })

  win.on('blur', () => {
    win.setBackgroundColor('#00000000')
  })

  // win.on('focus', () => {
  //   win.setBackgroundColor('#00000000')
  // })  




  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    // win.webContents.openDevTools()


    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();

    });

  }
}


app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify({
    body: 'A new version of the application is available! \n\n Restart your application',
    title: 'New Version Available'

  })
  const icon = path.join(__dirname, "../resources/icon.png")
  tray = new Tray(icon)
  tray.setToolTip('DesktopClock')
  let contextMenu = Menu.buildFromTemplate([
  {
    label : 'Quit', click: () => {
      app.quit()
    }
    
  }
  ])
  tray.setContextMenu(contextMenu)



});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});





ipcMain.on('closebtn', (event, data) => {
  app.quit()

})
