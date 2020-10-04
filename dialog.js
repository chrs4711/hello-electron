// File for handling the dialogs that are requested from different parts
// of the application.

// Opening dialogs only works from the main process, but we don't wanna clutter
// the main.js file. So dialogs have their own js file.

const { ipcMain, dialog } = require('electron')

ipcMain.on('open-dialog-show', (event, arg) => {

    const options = {
        title: 'open something',
        buttonLabel: 'Do it',
        properties: [
            'openFile',
            'multiSelections'
        ]
    }

    dialog.showOpenDialog(null, options).then(result => {
        console.log("canceled: " + result.canceled)
        console.log("result: " + result.filePaths)

        event.reply("open-dialog-selected", result.filePaths)

    }).catch(err => {
        console.log(err)
    })
})

ipcMain.on('show-error-box', (event, arg) => {
    console.log(arg)

    dialog.showErrorBox("ERROR ERROR ERROR !!!1", arg)
})