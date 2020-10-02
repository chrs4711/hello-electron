const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Create the browser window

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true // wtf is that?
        }
    })

    // and load the index.html of the app.
    console.log("Loading index html...")
    win.loadFile('index.html')
    
    win.webContents.openDevTools()
}

// called when electon is initialized.
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    console.log("Deactivating window.")
    if (process.platform !== 'darwin') {
        app.quit() // apparently only when not on mac :D
        // ooh ok it's conventional on Mac to stay on until I press cmd+Q
    }
    console.log("not quitting since we're on mac.")
})

// recreate window when dock icon is clicked and now window is present.
// also common on Mac
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        console.log("Activating the window")
        createWindow()
    }
})


