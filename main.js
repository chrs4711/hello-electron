const electron = require('electron')

// handles application life
const app = electron.app

// creates the native browser window
const BrowserWindow = electron.BrowserWindow

let mainWindow // saves a reference to the main window

function createWindow() {

    mainWindow = new BrowserWindow({ width: 800, height: 600})

    // what we use here is called a `template literal`
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

// Quit when closed, except on mac
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// If on mac, re-create the window when we're activated again from the dock.
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})
