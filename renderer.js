const { ipcRenderer } = require('electron')
const { DataTable } = require('simple-datatables')

let userId;

const dataTable = new DataTable("#todoTable", {
    "headings": [
        "Item",
        "Completed"
    ],
    "data": []
})

// We want to open a dialog, but we may not do that from the renderer
// so we ask something in the main process to do that for us:

document.getElementById("errorButton").addEventListener("click", () => {

    console.log("error clicked")

    ipcRenderer.send('show-error-box', 'some error happened')
})

document.getElementById("openButton").addEventListener("click", () => {

    console.log("open clicked")

    ipcRenderer.send('open-dialog-show') // send should be async?

    ipcRenderer.on('open-dialog-selected', (event, arg) => {
        console.log(arg)
    })

})

document.getElementById("saveButton").addEventListener("click", () => {

    userId = document.getElementById("userIdInput").value

    if (!userId) {
        ipcRenderer.send('show-error-box', 'Plz enter userId')
        return // we're done here
    }

    // say that we have saved it.
    console.log("saving userId: " + userId)

    // request data, the super vanilla js way
    fetch('https://jsonplaceholder.typicode.com/todos?userId=' + userId)
        // fetch returns a promise that resolves as soon as the server responds with headers
        .then(response => response.json())
        // 'json()' returns another a promise, which resolves when the body is available
        .then(updateTable)

})

function updateTable(data) {

    dataTable.clear()

    data.forEach(element => {
        // dataTable.rows().add([element.title, element.completed])
        dataTable.rows().add([
            element.title,
            element.completed ? "yay" : "nay"])
    })

}
