app.use(express.static("public"))

//this update mission changes things within the DOM

const update = document.querySelector("#update-button")

update.addEventListener("click", _ =>{
    //standard fetch syntax == fetch(endpoint, options)
    fetch("quotes", {
        method: "put"
    })
})