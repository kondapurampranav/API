const express = require("express");
const router = express.Router();

const {
    server
} = require("../controllers/notesControllers");

router.get("/", server);


module.exports = router;