const app  = require("./app")

const PORT = 8005
const HOST = "0.0.0.0"

app.listen(PORT, HOST, function () {
    console.log(`Server listens on port: ${PORT}`);
})