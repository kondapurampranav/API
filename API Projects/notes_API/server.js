const express = require("express");
const app = express();
require("dotenv").config();


app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const time = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${time}ms - ${req.ip}`);
  });

  next();
});

const notesRouter = require("./routers/notesRouters");
const errorHandler = require("./middlewares/errorHandler");

app.use("/notes", notesRouter);
app.use(errorHandler);

// db connection remaining!!
const db = require("./config/db");

(async () => {
  try {
    const [rows] = await db.execute("SELECT 1");
    console.log("DB Connected ✅");
  } catch (e) {
    console.error("DB error:", e.message);
  }
})();



app.listen(3000, () => {
    console.log("Server is running");
})

