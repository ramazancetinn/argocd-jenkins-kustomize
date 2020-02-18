const express = require("express");

const app = express();

app.get('/', function (req, res) {
    return res.json("Hello World!!")
})

module.exports = app