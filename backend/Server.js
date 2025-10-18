require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./App");

const DBConnectionHandler = require("./Utils/DBconnect");
DBConnectionHandler();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Job Hunter Server is running!");
});

app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
    if (res.headersSent) return next("There was a problem");
    res.status(err.status || 500).send(err.message || "Something went wrong");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
