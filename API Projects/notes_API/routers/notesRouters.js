const express = require("express");
const router = express.Router();

const {
    server,
    getAllNotes,
    addNotes,
    updateNotes,
    deleteNotes
} = require("../controllers/notesControllers");

router.get("/", server)

router.get("/notes", getAllNotes)

router.post("/notes", addNotes)

router.put("/notes/:id", updateNotes)

router.delete("/notes/:id", deleteNotes)


module.exports = router;