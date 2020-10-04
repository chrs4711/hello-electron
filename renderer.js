const { ipcRenderer } = require('electron')
const { DataTable } = require('simple-datatables')

let userId;

const data = {
    "headings": [
        "Item",
        "Completed"
    ],
    "data": [
        [
            "Clean the kitchen",
            "x"
        ],
        [
            "Clean the bathroom",
            ""
        ]
    ]
}

const dataTable = new DataTable("#todoTable", {
    data
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

    console.log("save button pressed.");

    // pull entry from input and save it
    userId = document.getElementById("userIdInput").value

    // say that we have saved it.
    console.log("saving userId: " + userId)


    // request data

    // update table

})
