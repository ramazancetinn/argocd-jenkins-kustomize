const app  = require("./app")

const PORT = 8005

app.listen(PORT, function () {
    console.log(`Server listens on port: ${PORT}`);
})