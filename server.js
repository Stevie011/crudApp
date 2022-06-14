console.log("bring this node home") //just to check if node is reading the file


//these all set requirements for the different apps/addons
const express = require("express")
const bodyParser = require("body-parser")
const res = require("express/lib/response")
const app = express()
const MongoClient = require("mongodb").MongoClient

//connection string copied from mongo db site
let connectionString = "mongodb+srv://Stevie011:testingTesting123@cluster0.ldfv4.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(connectionString, {useUnifiedTopology : true})
    .then(client=>{
        console.log("Connected to database")    //checks we're connected to database properly (wouldn't log to console if MongoClient didn't execute)
        const db = client.db("learning-app-quotes") //specifies which db within mongo to connect to 
        const quotesCollection = db.collection("quotes")    //specifies collection in db

        app.set("view engine", "ejs") //this sets view engine to ejs (embedded javascript) which we installed earlier

        //app.use(/***** */)
        app.use(bodyParser.urlencoded({extended: true})) //tells it to use bodyparser

        //app.use(bodyParser.json()) think this lines meant to be in main.js

        app.get("/", (req, res) =>{
            //res.sendFile("/Users/stevenstewart/crudApp/index.html") //tells it which file to send to the server
            db.collection("quotes").find().toArray()    //changes collection called quotes to array
                .then(results => {
                    console.log(results)    //just console.logs the results for now
                    res.render("index.ejs", { quotes: results}) //renders our index, telling express to use ejs as the template engine, and quotes : results from our db
                })
                .catch(error => console.error(error))
            
        })  
        //app.get(endpoint, callback) is the standard form for app.get

        app.post("/quotes", (req, res)=>{
            //console.log(req.body)
            quotesCollection.insertOne(req.body)
                .then(result=> {res.redirect("/")})
                .catch(error => console.error(error))
        })  //tells it to add the form to the db

        app.listen(3000, function(){
            console.log("Listening on 3k")   //console.log to check app.listen ran properly
        })  //this tells it to go to localhost:3000  

})

.catch(console.error)       //standard error catch
