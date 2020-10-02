const fs = require('fs');

const { dialog } = require("electron");

console.log("hello from renderer");

document.getElementById("mybutton").addEventListener("click", () => {
    console.log("button clicked");

    const data = "Successfully wrote to the desktop";

    dialog.showSaveDialog(filename => {

        console.log("filename selected!");

        fs.writeFileSync(filename + ".txt", data, "utf-8", () => {
            console.log("attempted to write file to desktop");
        })
    });
});
