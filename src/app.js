const express = require("express");

const app = express();

app.get('/', function (req, res) {
    return res.json("Hello Ramo!1")
})

module.exports = app
