const express = require("express");
const app = express();

app.use(express.json());

const notesRouter = require("./routers/notesRouters");

app.use(notesRouter);

// db connection remaining!!

app.listen(3000, () => {
    console.log("Server is running");
})