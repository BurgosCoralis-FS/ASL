const express = require("express");
const morgan = require("morgan");
const app = express();
const routeHandler = require("./app/routes");

app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});

app.use("/v1", routeHandler);

module.exports = app;