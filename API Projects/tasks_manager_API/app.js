const express = require("express");
const app = express();

app.use(express.json());

const userRouters = require("./routers/tasksRouters");

app.use(userRouters);

app.listen(3000, () => {
    console.log("Server is running 🏃");
})  

