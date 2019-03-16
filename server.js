const isDev = (process.env.NODE_ENV === "development");
if (isDev) {
    const config = require('dotenv').config();
}

const express = require("express");
const db = require("./models");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/api"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

db.sequelize.sync({ force: isDev }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on port: " + "http://localhost:" + PORT)
    });
});