const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const notesRouter = require("./routers/notesRouters");

app.use(notesRouter);

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