const { ipcRenderer } = require('electron')

console.log("hello from renderer")

// We want to open a dialog, but we may not do that from the renderer
// so we ask something in the main process to do that for us:


document.getElementById("errorButton").addEventListener("click", () => {

    console.log("error clicked")

    ipcRenderer.send('show-error-box', 'some error happened')
})

document.getElementById("openButton").addEventListener("click", function () {

    console.log("open clicked")

    ipcRenderer.send('open-dialog-show') // send should be async?

    ipcRenderer.on('open-dialog-selected', (event, arg) => {
        console.log(arg)
    })

})