const express = require("express");

const app = express();

app.use('/', function (req, res) {
    return res.json("Hello World!")
})

module.exports = app