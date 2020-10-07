const electron = require('electron')

require('./dialog')

// creates the native browser window
const BrowserWindow = electron.BrowserWindow

let mainWindow // saves a reference to the main window

// const path = require('path')
// const iconPath = path.join('images/heart-beat.png')
// console.log(iconPath)

function createWindow() {

    mainWindow = new BrowserWindow({ 
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
        icon: `${__dirname}/images/heart-beat-512.png`
    })

    // what we use here is called a `template literal`
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

// handles application life
const app = electron.app

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
