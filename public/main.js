app.use(express.static("public"))

//this update mission changes things within the DOM

const update = document.querySelector("#update-button")

update.addEventListener("click", _ =>{
    //standard fetch syntax == fetch(endpoint, options)
    fetch("quotes", {
        method: "put", //sends a put request
        headers: {"Content-Type": "application/json"}, //tells server we're sending json data
        body: JSON.stringify({
            name: "Team Rocket",
            quote: "To protect the world from devastation"
        })
    })
})