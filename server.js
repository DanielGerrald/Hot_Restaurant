// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const tables = require("./data/tables.js");
const waitList = require("./data/waitlist.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function (req, res) {
    res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
    res.json(waitList);
});


app.post("/api/tables", function (req, res) {
    if (tables.length <= 4){
        tables.push(req.body)
    }
    else { waitList.push(req.body)
    }
    res.json(tables);
});