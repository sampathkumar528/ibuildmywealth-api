// Importng modules
const express = require('express'),
 cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
// require("dotenv").config();
const app = express();
const router = express.Router();
const https = require("https");

var port = process.env.PORT || 8888;

console.log("Application Environment : " + app.settings.env);
app.use(express.static(__dirname + "/"));

app.use(express.json());

// Enableing CORS
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


//enable the mongoose database uri for both testing and development
// const connectionString = ``;
// console.log("Connecting to the DB at: " + connectionString);
// mongoose.connect(cconnectionString, { useNewUrlParser: true }).then(() => {
//     console.log("Connection Successful");
// }, (err) => {
//     console.log("Something went wrong: " + err);
// });

// mongoose.connection.on("error", (err) => {
//     console.log("\n");
//     logger.error(err.message);
// });

// mongoose.connection.once("open", () => {
//     logger.info("Connected to the DB at : ");
// });
app.get('/test', (req, res) => {
    console.log("Working ibuildmywealth APIs at time ", new Date());
    res.send({msg: "I build my wealth APIs are running"});
})

require("./app/routes/users.route")(app, router);

// Server started at port 8000
app.listen(port, () => {
    console.log("Server started on port: " + port);
});

module.exports = app;
